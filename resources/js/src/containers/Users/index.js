import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import classNames from 'classnames'
import styles from './styles'

import ModuleTitle from '@/components/ModuleTitle'

import { withStyles } from '@material-ui/core/styles'
//import { Grid as DxGrid, Table, TableHeaderRow, SearchPanel, Toolbar } from '@devexpress/dx-react-grid-material-ui'
/*import {
  DataTypeProvider,
  SearchState,
  IntegratedFiltering,
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid'*/
import { Paper, Button, /*LinearProgress,*/ Switch, FormControlLabel } from '@material-ui/core'

class Users extends Component {
  state = {
    //
  }

  componentDidMount = () => {
    //
  }

  render() {
    const { classes } = this.props
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
          {/*shopsData.isFetching ? <LinearProgress color="primary" className={classes.progress} /> : ''*/}
        </Paper>
      </div>
    )
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
}

/*const mapStateToProps = store => {
  return {
    //
  }
}*/

/*const mapDispatchToProps = dispatch => ({
  //
})*/

export default connect()(withStyles(styles)(Users))
// mapStateToProps,
// mapDispatchToProps
