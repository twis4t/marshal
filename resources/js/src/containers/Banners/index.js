import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
/* actions */
import { getBanners, uploadBanners, removeBanner } from '@/actions/BannerActions'

import ModuleTitle from '@/components/ModuleTitle'
import Dropzone from '@/components/Dropzone'

import DeleteIcon from '@material-ui/icons/Delete'

import { Grid, Collapse, LinearProgress, Paper, IconButton } from '@material-ui/core'
// import {
//   ListAlt as ListAltIcon,
// } from '@material-ui/icons'
import styles from './styles'
//import { useDropzone } from 'react-dropzone'
//import classNames from 'classnames'
import moment from 'moment'
import { withStyles } from '@material-ui/core/styles'

class Banners extends Component {
  componentDidMount = () => {
    this.props.getBanners()
  }

  uploadBanners = async data => {
    await this.props.uploadBanners(data)
    this.props.getBanners()
  }

  removeBanner = async id => {
    await this.props.removeBanner(id)
    this.props.getBanners()
  }

  render() {
    const { classes, isFetching, banners } = this.props
    return (
      <div>
        <ModuleTitle title="Управление баннерами" breadcrumbs={[{ text: 'Главная', path: '/' }, { text: 'Баннеры' }]} />

        {!isFetching ? (
          <Grid container spacing={24}>
            <Grid item xs={12} md={3}>
              <Dropzone onSubmit={this.uploadBanners} />
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container spacing={24}>
                <Grid item xs={12} md={6}>
                  {banners.map(v => (
                    <Paper key={'banner -' + v.id} className={classes.paperCard}>
                      <img src={v.banner} alt="banner" width="100%" />
                      <div className={classes.actions}>
                        <div>Добавлен: {moment(v.created_at).format('DD.MM.YYYY')}</div>
                        <IconButton
                          color="secondary"
                          className={classes.button}
                          aria-label="Delete"
                          onClick={() => this.removeBanner(v.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </Paper>
                  ))}
                </Grid>
              </Grid>
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
  uploadBanners: PropTypes.func.isRequired,
  removeBanner: PropTypes.func.isRequired,
}

const mapStateToProps = store => {
  return {
    banners: store.banner.banners,
    isFetching: store.banner.isFetching,
  }
}

const mapDispatchToProps = dispatch => ({
  getBanners: () => dispatch(getBanners()),
  uploadBanners: data => dispatch(uploadBanners(data)),
  removeBanner: id => dispatch(removeBanner(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Banners))
