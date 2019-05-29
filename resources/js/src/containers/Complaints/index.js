import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
/* actions */
import { getComplaints } from '@/actions/RequestActions'

import ModuleTitle from '@/components/ModuleTitle'

import { Collapse, LinearProgress, Paper } from '@material-ui/core'
import { Grid as DxGrid, Table, TableHeaderRow, PagingPanel } from '@devexpress/dx-react-grid-material-ui'
import {
  DataTypeProvider,
  IntegratedFiltering,
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
} from '@devexpress/dx-react-grid'

// import {
//   ListAlt as ListAltIcon,
// } from '@material-ui/icons'
import moment from 'moment'
import styles from './styles'
import { isNull } from 'util'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

// Выделение строк при наведении
const CustomTableRowBase = ({ classes, ...restProps }) => <Table.Row className={classes.customRow} {...restProps} />
const CustomTableRow = withStyles(styles, { name: 'CustomTableRow' })(CustomTableRowBase)
CustomTableRowBase.propTypes = {
  classes: PropTypes.object.isRequired,
}

// Отображаем пользователя в ячейке
const UserTypeProvider = props => <DataTypeProvider formatterComponent={UserFormatter} {...props} />
const UserFormatter = ({ value }) => (isNull(value) ? '' : value.name)

const StatusTypeProvider = props => <DataTypeProvider formatterComponent={StatusFormatter} {...props} />
const StatusFormatter = ({ value }) =>
  isNull(value) ? (
    <div style={{ color: '#ff5722' }}>Открыта</div>
  ) : (
    <div style={{ color: '#4caf50' }}>Закрыта {moment(value).format('DD.MM.YYYY')}</div>
  )
StatusFormatter.propTypes = {
  value: PropTypes.string,
}

// Отображаем номер заявки в ячейке
const leadingZero = (num, count = 4) => {
  num = num + ''
  while (num.length < count) num = '0' + num
  return num
}
const NumberTypeProvider = props => <DataTypeProvider formatterComponent={NumberFormatter} {...props} />
const NumberFormatter = ({ value }) => <b>#{leadingZero(value)}</b>
NumberFormatter.propTypes = {
  value: PropTypes.number.isRequired,
}

class Complaints extends Component {
  state = {
    sorting: [{ columnName: 'id', direction: 'desc' }],
  }

  componentDidMount = () => {
    this.props.getComplaints()
  }

  render() {
    const { classes, isFetching, complaints } = this.props
    return (
      <div>
        <ModuleTitle title="Просмотр жалоб" breadcrumbs={[{ text: 'Главная', path: '/' }, { text: 'Жалобы' }]} />

        <Collapse in={isFetching}>
          <LinearProgress />
        </Collapse>

        <Paper className={classNames(classes.paperCard, classes.flexGrow)}>
          <DxGrid
            rows={complaints}
            columns={[
              { name: 'id', title: 'Номер' },
              { name: 'request_id', title: 'Заявка' },
              { name: 'user', title: 'Пользователь' },
              { name: 'comment', title: 'Комментарий' },
              { name: 'created_at', title: 'Добавлена' },
              { name: 'finished', title: 'Статус' },
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
              columnExtensions={[{ columnName: 'id', width: 130, align: 'left' }]}
              messages={{ noData: 'Нет данных' }}
            />
            <TableHeaderRow showSortingControls messages={{ sortingHint: 'Сортировка' }} />
            <PagingState defaultCurrentPage={0} pageSize={10} />
            <IntegratedPaging />
            <PagingPanel />
            <UserTypeProvider for={['user']} />
            <StatusTypeProvider for={['finished']} />
            <NumberTypeProvider for={['request_id']} />
          </DxGrid>
        </Paper>
      </div>
    )
  }
}

Complaints.propTypes = {
  classes: PropTypes.object.isRequired,
  complaints: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  getComplaints: PropTypes.func.isRequired,
}

const mapStateToProps = store => {
  return {
    complaints: store.request.complaints,
    isFetching: store.request.isComplaintsFetching,
  }
}

const mapDispatchToProps = dispatch => ({
  getComplaints: () => dispatch(getComplaints()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Complaints))
