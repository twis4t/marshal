import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/* actions */
import { getRequests, getRequestStatuses } from '@/actions/RequestActions'
import { getShops } from '@/actions/ShopActions'
import { getAccounts } from '@/actions/AccountActions'

import { Grid as DxGrid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui'
import { DataTypeProvider, IntegratedFiltering, SortingState, IntegratedSorting } from '@devexpress/dx-react-grid'

import classNames from 'classnames'
import styles from './styles'
import moment from 'moment'
import { isNull } from 'util'
import MomentUtils from '@date-io/moment'
import 'moment/locale/ru'
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers'

import ModuleTitle from '@/components/ModuleTitle'
import ActionButton from '@/components/ActionButton'
import Autocomplete from '@/components/Autocomplete'

import { withStyles } from '@material-ui/core/styles'
import { Paper, LinearProgress, Button, IconButton, Grid } from '@material-ui/core'
import { FilterList as FilterListIcon } from '@material-ui/icons'

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

// Отображаем пользователя в ячейке
const UserTypeProvider = props => <DataTypeProvider formatterComponent={UserFormatter} {...props} />
const UserFormatter = ({ value }) => (isNull(value) ? '' : value.name)

// Отображаем статус в ячейке
const StatusTypeProvider = props => <DataTypeProvider formatterComponent={StatusFormatter} {...props} />
const StatusFormatter = ({ value }) => (isNull(value) ? '' : value.status)

// Отображаем магазин в ячейке
const ShopTypeProvider = props => <DataTypeProvider formatterComponent={ShopFormatter} {...props} />
const ShopFormatter = ({ value }) => (isNull(value) ? '' : value.name)

// Отображаем дату в ячейке
const DateTypeProvider = props => <DataTypeProvider formatterComponent={DateFormatter} {...props} />
const DateFormatter = ({ value }) => moment(value).format('DD.MM.YYYY HH:mm:SS')

// Отображаем номер в ячейке
const NumberTypeProvider = props => <DataTypeProvider formatterComponent={NumberFormatter} {...props} />
const NumberFormatter = ({ value }) => <b>#{value}</b>
NumberFormatter.propTypes = {
  value: PropTypes.number.isRequired,
}

// Отображаем количество ответов в ячейке
const AnswerTypeProvider = props => (
  <DataTypeProvider formatterComponent={withStyles(styles)(AnswerFormatter)} {...props} />
)
const AnswerFormatter = ({ classes, value }) => (
  <span className={value ? classes.answersCountGreen : classes.answersCountRed}>{value}</span>
)
AnswerFormatter.propTypes = {
  value: PropTypes.number.isRequired,
  classes: PropTypes.object,
}

class Requests extends Component {
  state = {
    sorting: [{ columnName: 'id', direction: 'asc' }],
    dateFrom: new Date(),
    dateTo: new Date(),
    showFilters: false,
    selectedStatuses: [],
    selectedUsers: [],
    selectedShops: [],
  }

  componentDidMount = async () => {
    this.props.getRequests()
    this.props.getRequestStatuses()
    this.props.getShops()
    this.props.getAccounts()
  }

  changeSorting = sorting => this.setState({ sorting })

  handleDateFromChange = date => {
    this.setState({ dateFrom: date })
  }

  handleDateToChange = date => {
    this.setState({ dateTo: date })
  }

  handleShopsChanges = shops => {
    this.setState({ selectedShops: shops })
  }

  handleUsersChanges = users => {
    this.setState({ selectedUsers: users })
  }

  handleStatusesChanges = statuses => {
    this.setState({ selectedStatuses: statuses })
  }

  toggleFiltersArea = () => {
    if (this.state.showFilters) {
      this.setState({
        selectedShops: [],
        selectedUsers: [],
        selectedStatuses: [],
      })
    }
    this.setState({ showFilters: !this.state.showFilters })
  }

  applyFilter = () => {
    this.props.getRequests({
      shops: this.state.selectedShops.map(v => v.value),
      users: this.state.selectedUsers.map(v => v.value),
      statuses: this.state.selectedStatuses.map(v => v.value),
      dateFrom: moment(this.state.dateFrom).format('YYYY-MM-DD'),
      dateTo: moment(this.state.dateTo).format('YYYY-MM-DD'),
    })
  }

  requestStatusesList = () => this.props.request.requestStatuses.map(v => ({ value: v.id, label: v.status }))
  requestShopsList = () => this.props.shop.shops.map(v => ({ value: v.id, label: v.name }))
  requestUsersList = () => this.props.account.accounts.map(v => ({ value: v.id, label: v.name }))

  /**
   * Функция возвращает список возможных
   * действий со строкой реестра
   */
  ActionsList = data => [
    {
      title: 'Test',
      action: () => {
        console.log(data)
      },
    },
  ]

  render() {
    const { classes, request } = this.props
    return (
      <div className={classes.flexGrow}>
        <ModuleTitle title="Просмотр заявок" />
        <div className={classes.actionsBox}>
          <MuiPickersUtilsProvider locale={'ru'} utils={MomentUtils}>
            <DatePicker
              margin="normal"
              variant="outlined"
              label="Период - С"
              cancelLabel="Отмена"
              todayLabel="Сегодня"
              format="DD.MM.YYYY"
              autoOk
              showTodayButton
              maxDate={this.state.dateTo}
              value={this.state.dateFrom}
              onChange={this.handleDateFromChange}
            />
            <DatePicker
              margin="normal"
              variant="outlined"
              label="Период - По"
              cancelLabel="Отмена"
              todayLabel="Сегодня"
              format="DD.MM.YYYY"
              autoOk
              showTodayButton
              minDate={this.state.dateFrom}
              value={this.state.dateTo}
              onChange={this.handleDateToChange}
            />
          </MuiPickersUtilsProvider>
          <div className={classes.flexGrow} />
          <IconButton
            onClick={this.toggleFiltersArea}
            className="filterBtn"
            color={this.state.showFilters ? 'secondary' : 'default'}
          >
            <FilterListIcon />
          </IconButton>
          <Button className="submitBtn" variant="outlined" color="primary" height={30} onClick={this.applyFilter}>
            Применить
          </Button>
        </div>
        {this.state.showFilters ? (
          <Grid container spacing={8}>
            <Grid item xs={12} md={4}>
              <Autocomplete
                items={this.requestShopsList()}
                label="Магазины"
                placeholder="Выберите магазины"
                onChange={this.handleShopsChanges}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                items={this.requestUsersList()}
                label="Пользователи"
                placeholder="Выберите пользователей"
                onChange={this.handleUsersChanges}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                items={this.requestStatusesList()}
                label="Статусы"
                placeholder="Выберите статусы"
                onChange={this.handleStatusesChanges}
              />
            </Grid>
          </Grid>
        ) : (
          ''
        )}
        <Paper className={classNames(classes.paperCard, classes.flexGrow)}>
          {request.isFetching ? <LinearProgress color="primary" className={classes.progress} /> : ''}

          <DxGrid
            rows={request.requests}
            columns={[
              { name: 'id', title: 'Номер' },
              { name: 'status', title: 'Статус' },
              { name: 'user', title: 'Пользователь' },
              { name: 'created_at', title: 'Добавлена' },
              { name: 'text', title: 'Текст' },
              { name: 'shop', title: 'Магазин' },
              { name: 'answers_count', title: 'Ответы' },
              { name: 'actions', title: 'Действия' },
            ]}
          >
            <SortingState
              sorting={this.state.sorting}
              onSortingChange={this.changeSorting}
              columnExtensions={[{ columnName: 'actions', sortingEnabled: false }]}
            />
            <IntegratedSorting />
            <IntegratedFiltering />
            <Table
              rowComponent={CustomTableRow}
              columnExtensions={[
                { columnName: 'actions', width: 120, align: 'center' },
                { columnName: 'answers_count', width: 100, align: 'center' },
                { columnName: 'id', width: 130, align: 'left' },
              ]}
              messages={{ noData: 'Нет данных' }}
            />
            <TableHeaderRow showSortingControls messages={{ sortingHint: 'Сортировка' }} />

            <ActionTypeProvider for={['actions']} actions={this.ActionsList} />
            <UserTypeProvider for={['user']} />
            <StatusTypeProvider for={['status']} />
            <ShopTypeProvider for={['shop']} />
            <DateTypeProvider for={['created_at']} />
            <NumberTypeProvider for={['id']} />
            <AnswerTypeProvider for={['answers_count']} />
          </DxGrid>
        </Paper>
      </div>
    )
  }
}

Requests.propTypes = {
  classes: PropTypes.object.isRequired,
  request: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  shop: PropTypes.object.isRequired,
  getRequests: PropTypes.func.isRequired,
  getShops: PropTypes.func.isRequired,
  getAccounts: PropTypes.func.isRequired,
  getRequestStatuses: PropTypes.func.isRequired,
}

const mapStateToProps = store => {
  return {
    request: store.request,
    account: store.account,
    shop: store.shop,
  }
}

const mapDispatchToProps = dispatch => ({
  getRequests: options => dispatch(getRequests(options)),
  getRequestStatuses: () => dispatch(getRequestStatuses()),
  getShops: () => dispatch(getShops()),
  getAccounts: () => dispatch(getAccounts()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Requests))
