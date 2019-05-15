import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
/* actions */
import { getBanners } from '@/actions/BannerActions'

import ModuleTitle from '@/components/ModuleTitle'

import { Grid, Collapse, LinearProgress, Paper } from '@material-ui/core'
// import {
//   ListAlt as ListAltIcon,
// } from '@material-ui/icons'
import styles from './styles'
//import { useDropzone } from 'react-dropzone'
//import classNames from 'classnames'
//import moment from 'moment'
import { withStyles } from '@material-ui/core/styles'

class Banners extends Component {
  componentDidMount = () => {
    this.props.getBanners()
  }

  render() {
    const { classes, isFetching } = this.props
    return (
      <div>
        <ModuleTitle title="Управление баннерами" breadcrumbs={[{ text: 'Главная', path: '/' }, { text: 'Баннеры' }]} />

        {!isFetching ? (
          <Grid container spacing={24}>
            <Grid item xs={12} md={3}>
              <Paper className={classes.paperCard}>1</Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              2
            </Grid>
          </Grid>
        ) : (
          <Collapse in={isFetching}>
            <LinearProgress />
          </Collapse>
        )}
      </div>
    )
  }
}

Banners.propTypes = {
  classes: PropTypes.object.isRequired,
  banners: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  getBanners: PropTypes.func.isRequired,
}

const mapStateToProps = store => {
  return {
    banners: store.banner.banners,
    isFetching: store.banner.isFetching,
  }
}

const mapDispatchToProps = dispatch => ({
  getBanners: () => dispatch(getBanners()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Banners))
