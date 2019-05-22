import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import PropTypes from 'prop-types'
/* actions */
import { getStatistic } from '@/actions/StatisticActions'
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
} from '@material-ui/icons'
import styles from './styles'
import classNames from 'classnames'
import Chart from 'react-apexcharts'
import moment from 'moment'
import { withStyles } from '@material-ui/core/styles'

class App extends Component {
  componentDidMount = () => {
    this.props.getStatistic()
    this.props.getAuthLogs()
    //console.log(Object.values(this.props.statistic.requestsStat.dates))
  }

  infoBox = (title, value, icon, action, trend) => {
    trend = trend || {}
    const classes = this.props.classes
    return (
      <Paper className={classes.paperCard}>
        <div className={classes.infoBox}>
          <div>
            <Avatar className={classes.iconAvatar}>{icon}</Avatar>
          </div>
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
        <div>
          <Trend
            smooth
            autoDraw
            autoDrawDuration={700}
            autoDrawEasing="ease-out"
            data={trend.data}
            gradient={trend.gradient}
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

  chartOptions = () => ({
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
  })

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
                  <Paper className={classes.paperCard}>1</Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper className={classes.paperCard}>2</Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paperCard}>
                    <Chart
                      options={{
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
                            colors: ['#F44336', '#E91E63', '#9C27B0'],
                          },
                        ],
                      }}
                      series={[4, 12, 4, 6, 8]}
                      type="donut"
                      width="380"
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
  authLogs: PropTypes.array.isRequired,
  statisticFeatch: PropTypes.bool.isRequired,
  isLogFetching: PropTypes.bool.isRequired,
  getStatistic: PropTypes.func.isRequired,
  getAuthLogs: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
}

const mapStateToProps = store => {
  return {
    statistic: store.statistic.statistic,
    statisticFeatch: store.statistic.isFetching,
    authLogs: store.account.authLogs,
    isLogFetching: store.account.isLogFetching,
  }
}

const mapDispatchToProps = dispatch => ({
  getStatistic: () => dispatch(getStatistic()),
  getAuthLogs: options => dispatch(getAuthLogs(options)),
  push: path => dispatch(push(path)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App))
