import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import PropTypes from 'prop-types'
/* actions */
import { getStatistic, getRequestCategoriesStat, getRequestStatusesCount } from '@/actions/StatisticActions'
import { getAuthLogs } from '@/actions/AccountActions'

import ModuleTitle from '@/components/ModuleTitle'
import Trend from 'react-trend'

import {
  Paper,
  Grid,
  Avatar,
  Typography,
  IconButton,
  Collapse,
  LinearProgress,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
} from '@material-ui/core'
import {
  ListAlt as ListAltIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  AccountCircle as AccountCircleIcon,
  Message as MessageIcon,
  Forum as ForumIcon,
  DirectionsCar as DirectionsCarIcon,
  Warning as WarningIcon,
} from '@material-ui/icons'
import styles from './styles'
import classNames from 'classnames'
import Chart from 'react-apexcharts'
import moment from 'moment'
import { withStyles } from '@material-ui/core/styles'

class App extends Component {
  state = {
    chartOptions: {
      labels: ['wait'],
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        hover: {
          filter: {
            type: 'lighten',
            value: 0.08,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'lighten',
            value: 0.08,
          },
        },
      },
      plotOptions: {
        pie: {
          size: 90,
          expandOnClick: false,
          donut: {
            labels: {
              show: true,
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      stroke: {
        show: true,
        curve: 'smooth', // "smooth" / "straight" / "stepline"
        lineCap: 'butt', // round, butt , square
        width: 6,
      },
    },
    catSeries: [0, 0],
    statSeries: [0, 0],
    catLabels: ['wait..'],
    statLabels: ['wait..'],
  }

  componentDidMount = async () => {
    this.props.getStatistic()
    this.props.getAuthLogs()
    await this.props.getRequestCategoriesStat()
    this.setState({ catSeries: this.props.categoriesStat.map(v => v.count) })
    this.setState({ catLabels: this.props.categoriesStat.map(v => v.category) })
    await this.props.getRequestStatusesCount()
    this.setState({ statSeries: this.props.statusesStat.map(v => v.count) })
    this.setState({ statLabels: this.props.statusesStat.map(v => v.status) })
  }

  infoTitle = (title, value, icon, action, iconBg = true) => {
    const classes = this.props.classes
    return (
      <div className={classes.infoBox}>
        <div>{iconBg ? <Avatar className={classes.iconAvatar}>{icon}</Avatar> : <div className={classes.iconDiv}>{icon}</div>}</div>
        <div>
          <Typography className={classes.infoBoxValue} variant="h4" gutterBottom>
            {value}
          </Typography>
          <div>{title}</div>
        </div>
        <div className={classes.flexGrow} />
        {action ? (
          <IconButton className={classes.infoBoxActionButton} aria-label="More" onClick={() => action()}>
            <KeyboardArrowRightIcon />
          </IconButton>
        ) : (
          ''
        )}
      </div>
    )
  }
  infoBox = (title, value, icon, action, trend) => {
    trend = trend || {}
    const classes = this.props.classes
    return (
      <Paper className={classes.paperCard}>
        {this.infoTitle(title, value, icon, action, true)}
        <div>
          <Trend
            smooth
            autoDraw
            autoDrawDuration={700}
            autoDrawEasing="ease-out"
            data={trend.data || [0, 0]}
            gradient={trend.gradient || []}
            radius={25}
            strokeWidth={3.3}
            strokeLinecap={'round'}
          />
          <div className={classes.trendDates}>
            <div>{moment(trend.dates[0]).format('DD.MM.YYYY') || ''}</div>
            <div>{moment(trend.dates[~~(trend.dates.length / 2)]).format('DD.MM.YYYY') || ''}</div>
            <div>{moment(trend.dates[trend.dates.length - 1]).format('DD.MM.YYYY') || ''}</div>
          </div>
        </div>
      </Paper>
    )
  }

  logResult = res => {
    const { classes } = this.props
    return (
      <div className={classNames(classes.logResult, res ? classes.logResultTrue : classes.logResultFalse)}>
        {res ? 'ok' : 'fail'}
      </div>
    )
  }

  logsTable = () => {
    const { classes, authLogs } = this.props
    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            {/* <TableCell>Браузер</TableCell> */}
            <TableCell>IP</TableCell>
            <TableCell>Время</TableCell>
            <TableCell>Результат</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authLogs.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.email || '-'}
              </TableCell>
              {/* <TableCell>{row.browser}</TableCell> */}
              <TableCell>{row.ip}</TableCell>
              <TableCell>{moment(row.created_at).format('DD.MM.YYYY HH:mm:SS')}</TableCell>
              <TableCell>{this.logResult(row.result)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  getStatuscColor = id => {
    const statusesColor = {
      1: '#2196f3',
      2: '#ff9800',
      3: '#9c27b0',
      4: '#4caf50',
      5: '#ff5722',
    }
    return statusesColor[id]
  }

  getChartOptions = chart => {
    const options = { ...this.state.chartOptions }
    switch (chart) {
      case 'categories':
        options.labels = this.state.catLabels
        return options
      case 'statuses':
        options.labels = this.state.statLabels
        options.colors = this.props.statusesStat.map(v => this.getStatuscColor(v.id))
        return options
      default:
        return {}
    }
  }

  render() {
    const { classes, statistic, statisticFeatch } = this.props
    return (
      <div className="App">
        <ModuleTitle title="Главная" />

        {!statisticFeatch ? (
          <Grid container spacing={24}>
            <Grid item xs={12} md={3}>
              {this.infoBox(
                'Заявок создано',
                statistic.requestsStat.total || 0,
                <ListAltIcon />,
                () => this.props.push('/requests'),
                {
                  data: Object.values(statistic.requestsStat.dates),
                  dates: Object.keys(statistic.requestsStat.dates),
                  gradient: ['#1374dc', '#42b3f4'],
                }
              )}
            </Grid>
            <Grid item xs={12} md={3}>
              {this.infoBox(
                'Пользователей зарегистрировано',
                statistic.usersStat.total || 0,
                <AccountCircleIcon />,
                () => this.props.push('/users'),
                {
                  data: Object.values(statistic.usersStat.dates),
                  dates: Object.keys(statistic.usersStat.dates),
                  gradient: ['#ff9800', '#ffc107'],
                }
              )}
            </Grid>
            <Grid item xs={12} md={3}>
              {this.infoBox('Сообщений написано', statistic.messagesStat.total || 0, <MessageIcon />, null, {
                data: Object.values(statistic.messagesStat.dates),
                dates: Object.keys(statistic.messagesStat.dates),
                gradient: ['#8bc34a', '#a0e253'],
              })}
            </Grid>
            <Grid item xs={12} md={3}>
              {this.infoBox('Откликов отправлено', statistic.answersStat.total || 0, <ForumIcon />, null, {
                data: Object.values(statistic.answersStat.dates),
                dates: Object.keys(statistic.answersStat.dates),
                gradient: ['#ff5722', '#ff7043'],
              })}
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paperCard}>{this.logsTable()}</Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={24}>
                <Grid item xs={12} md={6}>
                  <Paper className={classes.paperCard}>
                    {this.infoTitle(
                      'Машин зарегистрировано',
                      statistic.carsStat.total || 0,
                      <DirectionsCarIcon />,
                      null,
                      false
                    )}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper className={classes.paperCard}>
                    {this.infoTitle(
                      'Необработанных жалоб',
                      statistic.complaintsStat.open || 0,
                      <WarningIcon />,
                      null,
                      false
                    )}
                  </Paper>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Paper className={classNames(classes.paperCard, classes.chartWrap)}>
                    <h4>Статистика по категориям</h4>
                    <Chart
                      options={this.getChartOptions('categories')}
                      series={this.state.catSeries}
                      type="donut"
                      height="255"
                      width="340"
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Paper className={classNames(classes.paperCard, classes.chartWrap)}>
                    <h4>Статистика по статусам</h4>
                    <Chart
                      options={this.getChartOptions('statuses')}
                      series={this.state.statSeries}
                      type="donut"
                      height="255"
                      width="340"
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Collapse in={statisticFeatch}>
            <LinearProgress />
          </Collapse>
        )}
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  statistic: PropTypes.object.isRequired,
  categoriesStat: PropTypes.array.isRequired,
  statusesStat: PropTypes.array.isRequired,
  authLogs: PropTypes.array.isRequired,
  statisticFeatch: PropTypes.bool.isRequired,
  isLogFetching: PropTypes.bool.isRequired,
  statisticCatFeatch: PropTypes.bool.isRequired,
  statisticStatusesFeatch: PropTypes.bool.isRequired,
  getStatistic: PropTypes.func.isRequired,
  getRequestCategoriesStat: PropTypes.func.isRequired,
  getRequestStatusesCount: PropTypes.func.isRequired,
  getAuthLogs: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
}

const mapStateToProps = store => {
  return {
    statistic: store.statistic.statistic,
    categoriesStat: store.statistic.categoriesStat,
    statusesStat: store.statistic.statusesStat,
    statisticFeatch: store.statistic.isFetching,
    statisticCatFeatch: store.statistic.isCatFetching,
    statisticStatusesFeatch: store.statistic.isStatusesFetching,
    authLogs: store.account.authLogs,
    isLogFetching: store.account.isLogFetching,
  }
}

const mapDispatchToProps = dispatch => ({
  getStatistic: () => dispatch(getStatistic()),
  getRequestCategoriesStat: () => dispatch(getRequestCategoriesStat()),
  getRequestStatusesCount: () => dispatch(getRequestStatusesCount()),
  getAuthLogs: options => dispatch(getAuthLogs(options)),
  push: path => dispatch(push(path)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App))
