import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { AgGridReact } from 'ag-grid-react'
import ModuleTitle from '@/components/ModuleTitle'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import styles from './styles'
import rowData from './data'

import { Paper } from '@material-ui/core'

import 'ag-grid/dist/styles/ag-grid.css'
import 'ag-grid/dist/styles/ag-theme-material.css'
import 'ag-grid/dist/styles/ag-theme-balham.css'

class Shops extends Component {
  state = {
    columnDefs: [
      {
        headerName: 'Лого',
        field: 'logo',
      },
      { headerName: 'Наименование', field: 'name' },
      { headerName: 'Описание', field: 'description' },
      { headerName: 'Сотрудники', field: 'staff' },
    ],
    rowData: rowData,
    domLayout: 'autoHeight',
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
    },
  }

  makeShopLogo = logo => {
    return <img src={logo} />
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.flexGrow}>
        <ModuleTitle title="Управление магазинами" />

        <Paper className={classNames(classes.paperCard, classes.flexGrow)}>
          <div className="ag-theme-material">
            <AgGridReact
              animateRows={true}
              defaultColDef={this.state.defaultColDef}
              domLayout={this.state.domLayout}
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData}
            />
          </div>
        </Paper>
      </div>
    )
  }
}

Shops.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = store => {
  return {
    user: store.user,
  }
}

Shops.propTypes = {
  //
}

export default connect(mapStateToProps)(withStyles(styles)(Shops))
