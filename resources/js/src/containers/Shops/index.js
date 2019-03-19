import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ModuleTitle from '@/components/ModuleTitle'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import styles from './styles'
import rowData from './data'
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui'

import { Paper } from '@material-ui/core'

class Shops extends Component {
  state = {
    rowData: rowData,
  }

  makeShopLogo = logo => {
    return <img src={logo} />
  }

  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi

    params.api.sizeColumnsToFit()
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.flexGrow}>
        <ModuleTitle title="Управление магазинами" />

        <Paper className={classNames(classes.paperCard, classes.flexGrow)}>
          <Grid
            rows={this.state.rowData}
            columns={[
              { name: 'logo', title: 'logo' },
              { name: 'name', title: 'name' },
              { name: 'description', title: 'description' },
              { name: 'staff', title: 'staff' },
            ]}
          >
            <Table />
            <TableHeaderRow />
          </Grid>
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
