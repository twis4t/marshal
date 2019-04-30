import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/* actions */
import { getRequests } from '@/actions/RequestActions'

import { Grid as DxGrid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui'
import { DataTypeProvider, IntegratedFiltering, SortingState, IntegratedSorting } from '@devexpress/dx-react-grid'

import classNames from 'classnames'
import styles from './styles'
import moment from 'moment'
import { isNull } from 'util'

import ModuleTitle from '@/components/ModuleTitle'
import ActionButton from '@/components/ActionButton'

import { withStyles } from '@material-ui/core/styles'
import { Paper, Button, LinearProgress } from '@material-ui/core'

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

// Отображаем дату в ячейке
const DateTypeProvider = props => <DataTypeProvider formatterComponent={DateFormatter} {...props} />
const DateFormatter = ({ value }) => moment(value).format('DD.MM.YYYY HH:mm:SS')

// Отображаем номер в ячейке
const NumberTypeProvider = props => <DataTypeProvider formatterComponent={NumberFormatter} {...props} />
const NumberFormatter = ({ value }) => <b>#{value}</b>
NumberFormatter.propTypes = {
  value: PropTypes.number.isRequired,
}

// Отображаем номер в ячейке
const AnswerTypeProvider = props => (
  <DataTypeProvider formatterComponent={withStyles(styles)(AnswerFormatter)} {...props} />
)
const AnswerFormatter = ({ classes, value }) => (
  <span className={value ? classes.answersCountRed : classes.answersCountGreen}>{value}</span>
)
AnswerFormatter.propTypes = {
  value: PropTypes.number.isRequired,
  classes: PropTypes.object,
}

class Requests extends Component {
  state = {
    sorting: [{ columnName: 'id', direction: 'asc' }],
  }

  componentDidMount = async () => {
    this.props.getRequests()
  }

  changeSorting = sorting => this.setState({ sorting })

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
          <Button variant="outlined" color="primary" onClick={console.log(0)}>
            Button
          </Button>
          <div className={classes.flexGrow} />
        </div>
        <Paper className={classNames(classes.paperCard, classes.flexGrow)}>
          {request.isFetching ? <LinearProgress color="primary" className={classes.progress} /> : ''}

          <DxGrid
            rows={request.requests}
            columns={[
              { name: 'id', title: 'Номер' },
              { name: 'user', title: 'Пользователь' },
              { name: 'created_at', title: 'Добавлена' },
              { name: 'text', title: 'Текст' },
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
                { columnName: 'id', width: 105, align: 'left' },
              ]}
              messages={{ noData: 'Нет данных' }}
            />
            <TableHeaderRow showSortingControls messages={{ sortingHint: 'Сортировка' }} />

            <ActionTypeProvider for={['actions']} actions={this.ActionsList} />
            <UserTypeProvider for={['user']} />
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
  getRequests: PropTypes.func.isRequired,
}

const mapStateToProps = store => {
  return {
    request: store.request,
  }
}

const mapDispatchToProps = dispatch => ({
  getRequests: () => dispatch(getRequests()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Requests))