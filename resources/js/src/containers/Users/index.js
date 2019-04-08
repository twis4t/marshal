import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/* actions */
import { getAccounts } from '@/actions/AccountActions'

import classNames from 'classnames'
import styles from './styles'
import moment from 'moment'
import { isNull } from 'util'

import ModuleTitle from '@/components/ModuleTitle'

import { withStyles } from '@material-ui/core/styles'
import { Grid as DxGrid, Table, TableHeaderRow, SearchPanel, Toolbar } from '@devexpress/dx-react-grid-material-ui'
import {
  // DataTypeProvider,
  SearchState,
  IntegratedFiltering,
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid'
import { Paper, Button, LinearProgress, Switch, FormControlLabel } from '@material-ui/core'

// Выделение строк при наведении
const CustomTableRowBase = ({ classes, ...restProps }) => <Table.Row className={classes.customRow} {...restProps} />
const CustomTableRow = withStyles(styles, { name: 'CustomTableRow' })(CustomTableRowBase)
CustomTableRowBase.propTypes = {
  classes: PropTypes.object.isRequired,
}

class Users extends Component {
  state = {
    sorting: [{ columnName: 'name', direction: 'asc' }],
    showBanned: false,
  }

  componentDidMount = () => {
    this.props.getAccounts()
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

  render() {
    const { classes, account } = this.props
    return (
      <div className={classes.flexGrow}>
        <ModuleTitle title="Управление пользователями" />
        <div className={classes.actionsBox}>
          <Button variant="outlined" color="primary">
            Добавить
          </Button>
          <div className={classes.flexGrow} />
          <FormControlLabel
            control={<Switch checked={this.state.showArchiveRow} value="showArchive" />}
            label="Архив"
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
              { name: 'shop', title: 'Магазин' },
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
              columnExtensions={[{ columnName: 'actions', width: 120, align: 'center' }]}
              messages={{ noData: 'Нет данных' }}
            />
            <Toolbar />
            <SearchPanel defaultValue="" messages={{ searchPlaceholder: 'Поиск' }} />
            <TableHeaderRow showSortingControls messages={{ sortingHint: 'Сортировка' }} />
          </DxGrid>
        </Paper>
      </div>
    )
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  getAccounts: PropTypes.func.isRequired,
}

const mapStateToProps = store => {
  return {
    account: store.account,
  }
}

const mapDispatchToProps = dispatch => ({
  getAccounts: () => dispatch(getAccounts()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Users))
