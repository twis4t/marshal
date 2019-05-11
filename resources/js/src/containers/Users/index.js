import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/* actions */
import { getAccounts, editUser, addUser, setStatus } from '@/actions/AccountActions'
import { getRoles } from '@/actions/RoleActions'

import classNames from 'classnames'
import styles from './styles'
import moment from 'moment'
import { isNull } from 'util'

import ModuleTitle from '@/components/ModuleTitle'
import UserForm from '@/components/Users/UserForm'
import ActionButton from '@/components/ActionButton'

import { withStyles } from '@material-ui/core/styles'
import {
  Grid as DxGrid,
  Table,
  TableHeaderRow,
  SearchPanel,
  Toolbar,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui'
import {
  DataTypeProvider,
  SearchState,
  IntegratedFiltering,
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
} from '@devexpress/dx-react-grid'
import { LockOpen as LockOpenIcon } from '@material-ui/icons'
import { Paper, Button, LinearProgress, Switch, FormControlLabel, Avatar } from '@material-ui/core'

// Компонент отображения кнопки действий
const ActionTypeProvider = props => (
  <DataTypeProvider formatterComponent={data => ActionButtonFormatter({ ...data, ...props })} {...props} />
)
const ActionButtonFormatter = meta => <ActionButton actions={meta.actions(meta.row)} />
ActionTypeProvider.propTypes = {
  actions: PropTypes.func.isRequired,
}

// Выделение строк при наведении
const CustomTableRowBase = ({ classes, ...restProps }) => <Table.Row className={classes.customRow} {...restProps} />
const CustomTableRow = withStyles(styles, { name: 'CustomTableRow' })(CustomTableRowBase)
CustomTableRowBase.propTypes = {
  classes: PropTypes.object.isRequired,
}

// Форматер для имени
const UserNameTypeProvider = props => <DataTypeProvider formatterComponent={UserNameFormatter} {...props} />
const UserNameFormatterBase = ({ classes, value }) => (
  <div className={classes.userColumnWrapper} title={value}>
    <Avatar className={classes.userColumnAvatar}>{value[0].toUpperCase()}</Avatar>
    <span className={classes.nameTextWrapper}>{value}</span>
  </div>
)
const UserNameFormatter = withStyles(styles)(UserNameFormatterBase)
UserNameFormatterBase.propTypes = {
  value: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

// Форматер для отношения
const RatioTypeProvider = props => <DataTypeProvider formatterComponent={RatioFormatter} {...props} />
const RatioFormatterBase = props => <LinearProgress variant="determinate" value={props.value} />
const RatioFormatter = withStyles(styles)(RatioFormatterBase)
RatioFormatterBase.propTypes = {
  value: PropTypes.number.isRequired,
}

// Отображаем роль в ячейке
const RoleTypeProvider = props => <DataTypeProvider formatterComponent={RoleFormatter} {...props} />
const RoleFormatter = ({ value }) => (isNull(value) ? '' : value.role)

// Отображаем блокировку
const BanTypeProvider = props => <DataTypeProvider formatterComponent={BanFormatter} {...props} />
const BanFormatter = ({ value }) =>
  isNull(value) ? (
    ''
  ) : (
    <span title={'Заблокирован с ' + moment(value).format('DD.MM.YYYY')}>
      <LockOpenIcon color="secondary" />
    </span>
  )
BanFormatter.propTypes = {
  value: PropTypes.string,
}

class Users extends Component {
  state = {
    sorting: [{ columnName: 'name', direction: 'asc' }],
    showBanned: false,
    userFormDialog: false,
    isNewUser: true,
    userForm: {},
  }

  componentDidMount = async () => {
    this.props.getAccounts()
    this.props.getRoles()
  }

  changeSorting = sorting => this.setState({ sorting })

  // Прячем заблокированных пользователей
  filterBannedAccount = () => {
    const showBanned = this.state.showBanned
    const rows = this.props.account.accounts
    const result = rows.filter(
      row => isNull(row.banned_date) || moment().diff(row.banned_date, 'minutes') < 0 || showBanned
    )
    return result
  }

  handleArchiveChange = event => {
    this.setState({ showBanned: event.target.checked })
  }

  userFormOpen = () => {
    this.setState({ userFormDialog: true })
  }

  userFormClose = () => {
    this.setState({ userFormDialog: false })
  }

  userFormSubmit = async data => {
    this.setState({
      userForm: data,
    })
    if (this.state.isNewUser) {
      await this.props.addUser(data)
    } else {
      await this.props.editUser(data.id, data)
    }

    this.props.getAccounts()
  }

  addUserDialog = () => {
    this.setState({ userForm: {}, isNewUser: true })
    this.userFormOpen()
  }

  setUserStatus = async (id, date) => {
    date = date === null ? date : date || moment().format('YYYY-MM-DD')
    await this.props.setStatus(id, date)
    this.props.getAccounts()
  }

  /**
   * Функция возвращает список возможных
   * действий со строкой реестра
   */
  ActionsList = data => [
    {
      title: 'Редактировать',
      action: () => {
        this.setState({ userForm: data, isNewUser: false })
        this.userFormOpen()
      },
    },
    {
      title: 'Заблокировать',
      visible: data.banned_date === null,
      action: () => {
        this.setUserStatus(data.id)
      },
    },
    {
      title: 'Восстановить',
      visible: data.banned_date !== null,
      action: () => {
        this.setUserStatus(data.id, null)
      },
    },
  ]

  render() {
    const { classes, account } = this.props
    return (
      <div className={classes.flexGrow}>
        <ModuleTitle title="Управление пользователями" breadcrumbs={[{ text: 'Главная', path: '/' },{ text: 'Пользователи'}]}/>
        <div className={classes.actionsBox}>
          <Button variant="outlined" color="primary" onClick={this.addUserDialog}>
            Добавить
          </Button>
          <div className={classes.flexGrow} />
          <FormControlLabel
            control={
              <Switch checked={this.state.showArchiveRow} onChange={this.handleArchiveChange} value="showArchive" />
            }
            label="Заблокированные"
          />
        </div>
        <Paper className={classNames(classes.paperCard, classes.flexGrow)}>
          {account.isFetching ? <LinearProgress color="primary" className={classes.progress} /> : ''}
          <DxGrid
            rows={this.filterBannedAccount()}
            columns={[
              { name: 'name', title: 'Имя' },
              { name: 'email', title: 'Email' },
              { name: 'role', title: 'Роль' },
              // { name: 'shop', title: 'Магазин' },
              { name: 'requests_ratio', title: '% Заявок' },
              { name: 'requests_count', title: 'Заявок' },
              { name: 'answers_count', title: 'Ответов' },
              { name: 'cars_count', title: 'Машин' },
              { name: 'messages_count', title: 'Сообщений' },
              { name: 'banned_date', title: 'Блок' },
              { name: 'actions', title: 'Действия' },
            ]}
          >
            <SortingState
              sorting={this.state.sorting}
              onSortingChange={this.changeSorting}
              columnExtensions={[{ columnName: 'actions', sortingEnabled: false }]}
            />
            <IntegratedSorting />
            <SearchState defaultValue="" searchPlaceholder="Поиск" />
            <IntegratedFiltering />
            <Table
              rowComponent={CustomTableRow}
              columnExtensions={[
                { columnName: 'actions', width: 120, align: 'center' },
                { columnName: 'requests_count', width: 105, align: 'left' },
                { columnName: 'answers_count', width: 105, align: 'left' },
                { columnName: 'cars_count', width: 105, align: 'left' },
                { columnName: 'messages_count', width: 110, align: 'left' },
                { columnName: 'banned_date', width: 100, align: 'left' },
                { columnName: 'requests_ratio', width: 170, align: 'left' },
              ]}
              messages={{ noData: 'Нет данных' }}
            />
            <Toolbar />
            <SearchPanel defaultValue="" messages={{ searchPlaceholder: 'Поиск' }} />
            <TableHeaderRow showSortingControls messages={{ sortingHint: 'Сортировка' }} />
            <PagingState defaultCurrentPage={0} pageSize={10} />
            <IntegratedPaging />
            <PagingPanel />

            <ActionTypeProvider for={['actions']} actions={this.ActionsList} />
            <RoleTypeProvider for={['role']} />
            <UserNameTypeProvider for={['name']} />
            <BanTypeProvider for={['banned_date']} />
            <RatioTypeProvider for={['requests_ratio']} />
          </DxGrid>
        </Paper>
        <UserForm
          isNew={this.state.isNewUser}
          status={this.state.userFormDialog}
          onOpen={this.userFormOpen}
          onClose={this.userFormClose}
          onSubmit={this.userFormSubmit}
          data={this.state.userForm}
          roles={this.props.role.roles}
        />
      </div>
    )
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  role: PropTypes.object.isRequired,
  getAccounts: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
}

const mapStateToProps = store => {
  return {
    account: store.account,
    role: store.role,
  }
}

const mapDispatchToProps = dispatch => ({
  getAccounts: () => dispatch(getAccounts()),
  editUser: (id, data) => dispatch(editUser(id, data)),
  setStatus: (id, date) => dispatch(setStatus(id, date)),
  addUser: data => dispatch(addUser(data)),
  getRoles: () => dispatch(getRoles()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Users))
