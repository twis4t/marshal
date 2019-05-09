import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

/* actions */
import { getRequest } from '@/actions/RequestActions'

import ModuleTitle from '@/components/ModuleTitle'
import FullSizeLoader from '@/components/FullSizeLoader'

import classNames from 'classnames'
import styles from './styles'
import moment from 'moment'
//import { isNull } from 'util'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography, Chip, Fade, Divider } from '@material-ui/core'
import {
  NewReleases as NewReleasesIcon,
  SettingsBackupRestore as SettingsBackupRestoreIcon,
  Schedule as ScheduleIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  HighlightOff as HighlightOffIcon,
} from '@material-ui/icons'

class Request extends Component {
  state = {
    //
  }

  componentDidMount = async () => {
    await this.init()
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.init()
    }
  }

  init = async () => {
    this.setState({ id: this.props.match.params.id })
    await this.props.getRequest(this.props.match.params.id)
    if (this.props.errorCode === 404) this.props.push('/request-not-found')
  }

  leadingZero = (num, count = 4) => {
    num = num + ''
    while (num.length < count) num = '0' + num
    return num
  }

  getStatusIcon = id => {
    const statusesIcons = {
      1: <NewReleasesIcon className="status-text--info" />,
      2: <SettingsBackupRestoreIcon className="status-text--warning" />,
      3: <ScheduleIcon className="status-text--reserved" />,
      4: <CheckCircleOutlineIcon className="status-text--success" />,
      5: <HighlightOffIcon className="status-text--danger" />,
    }
    return statusesIcons[id]
  }

  infoRow = (title, value, devided = true) => (
    <div>
      <div className={this.props.classes.infoRow}>
        <div>{title}</div>
        <div className={this.props.classes.infoRowValue}>{value}</div>
      </div>
      {devided ? <Divider light /> : ''}
    </div>
  )

  render() {
    const { classes, isFetching, request } = this.props
    return (
      <div className={classes.flexGrow}>
        {isFetching ? (
          <div className={classes.progressWrapper}>
            <FullSizeLoader enable={true} />
          </div>
        ) : (
          <Fade in={!isFetching}>
            <div>
              <ModuleTitle title="Просмотр заявки" />

              <Grid container spacing={24}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h3" gutterBottom>
                    {'#' + this.leadingZero(this.props.match.params.id)}
                  </Typography>
                  <Chip
                    variant="outlined"
                    icon={this.getStatusIcon(request.status.id)}
                    label={request.status.status || '...'}
                  />
                  <Paper className={classNames(classes.paperCard, classes.infoBlock)}>
                    {this.infoRow('Дата создания', moment(request.created_at).format('DD.MM.YYYY HH:mm'))}
                    {this.infoRow('Категория', request.category.category || '-')}
                    {this.infoRow('Пользователь', request.user.name || '-')}
                    {/* {!isNull(request.car)
                      ? this.infoRow(
                          'Автомобиль',
                          request.car.car_brand.car_brand + ' ' + request.car.car_model.car_model
                        )
                      : ''} */}
                    {request.VIN ? this.infoRow('VIN', request.VIN) : ''}
                    {this.infoRow('Ответов', request.answers_count, false)}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Paper className={classes.paperCard}>345</Paper>
                </Grid>
              </Grid>
            </div>
          </Fade>
        )}
      </div>
    )
  }
}

Request.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  request: PropTypes.object.isRequired,
  errorCode: PropTypes.number.isRequired,
  push: PropTypes.func.isRequired,
  getRequest: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

const mapStateToProps = store => {
  return {
    request: store.request.currentRequest,
    errorCode: store.request.errorCode,
    isFetching: store.request.isSingleFetching,
  }
}

const mapDispatchToProps = dispatch => ({
  getRequest: id => dispatch(getRequest(id)),
  push: path => dispatch(push(path)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Request))
