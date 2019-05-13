import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

/* actions */
import { getRequest, getAnswer } from '@/actions/RequestActions'

import ModuleTitle from '@/components/ModuleTitle'
import FullSizeLoader from '@/components/FullSizeLoader'

import classNames from 'classnames'
import styles from './styles'
import moment from 'moment'
//import { isNull } from 'util'
import { withStyles } from '@material-ui/core/styles'
import {
  Paper,
  Grid,
  Typography,
  Chip,
  Fade,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  LinearProgress,
  Collapse,
} from '@material-ui/core'
import {
  NewReleases as NewReleasesIcon,
  SettingsBackupRestore as SettingsBackupRestoreIcon,
  Schedule as ScheduleIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  HighlightOff as HighlightOffIcon,
  Folder as FolderIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  Warning as WarningIcon,
  Message as MessageIcon,
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

  getAnswer = async id => {
    this.props.getAnswer(id)
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

  printAnswers = answers => {
    answers = answers || []
    return (
      <List>
        {answers.map(answer => (
          <ListItem key={'answer-' + answer.id} button onClick={() => this.getAnswer(answer.id)}>
            <ListItemAvatar>
              <Avatar className={this.props.classes.answerAvatar}>
                {answer.is_new ? <NewReleasesIcon /> : <FolderIcon />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={answer.shop.name} secondary={answer.user.name} />
            <ListItemSecondaryAction>
              <KeyboardArrowRightIcon />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    )
  }

  printMessages = messages => {
    messages = messages || []
    return (
      <div className={this.props.classes.messagesBox}>
        {messages.map(message => (
          <div
            key={'message-' + message.id}
            className={classNames(
              this.props.classes.messageRow,
              message.user.role.id === 3 ? this.props.classes.messageFromSeller : this.props.classes.messageFromСustomer
            )}
          >
            <div className={this.props.classes.messageUser}>{message.user.name}</div>
            <div
              className={classNames(
                this.props.classes.messageText,
                message.user.role.id === 3
                  ? this.props.classes.messageFromSellerParam
                  : this.props.classes.messageFromСustomerParam
              )}
            >
              {message.message}
            </div>
            <div className={this.props.classes.messageDate}>
              {moment(message.created_at).format('DD.MM.YYYY HH:mm')}
            </div>
          </div>
        ))}
      </div>
    )
  }

  noAnswers = () => (
    <div className={this.props.classes.noAnswers}>
      <div className={this.props.classes.noAnswersTitle}>
        <WarningIcon /> Ответов нет
      </div>
      <div>На эту заявку никто не откликнулся</div>
    </div>
  )

  noMessages = () => (
    <div className={this.props.classes.noMessages}>
      <div className={this.props.classes.noMessagesTitle}>
        <MessageIcon /> Сообщений нет
      </div>
      <div>Нет сообщений по выбранному отклику</div>
    </div>
  )

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
    const { classes, isFetching, isAnswerFetching, request, answer } = this.props
    return (
      <div className={classes.flexGrow}>
        {isFetching ? (
          <div className={classes.progressWrapper}>
            <FullSizeLoader enable={true} />
          </div>
        ) : (
          <Fade in={!isFetching}>
            <div>
              <ModuleTitle
                title="Просмотр заявки"
                breadcrumbs={[
                  { text: 'Главная', path: '/' },
                  { text: 'Все заявки', path: '/requests' },
                  { text: '#' + this.leadingZero(this.props.match.params.id) },
                ]}
              />

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
                    {this.infoRow('Дата обновления', moment(request.updated_at).format('DD.MM.YYYY HH:mm'))}
                    {request.category ? this.infoRow('Категория', request.category.category) : ''}
                    {request.user ? this.infoRow('Пользователь', request.user.name) : ''}
                    {request.car !== null && request.car !== undefined
                      ? this.infoRow(
                          'Автомобиль',
                          request.car.car_brand.car_brand + ' ' + request.car.car_model.car_model
                        )
                      : ''}
                    {request.vin !== null && request.vin !== undefined ? this.infoRow('VIN', request.vin) : ''}
                    {this.infoRow('Ответов', request.answers_count, false)}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={24}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Ответы на заявку
                      </Typography>
                      {request.answers.length === 0 ? this.noAnswers() : this.printAnswers(request.answers)}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Переписка с клиентом
                      </Typography>
                      <Collapse in={isAnswerFetching}>
                        <LinearProgress />
                      </Collapse>
                      {answer.messages.length === 0 ? (
                        this.noMessages()
                      ) : (
                        <Fade in={!isAnswerFetching}>
                          <Paper className={classNames(classes.paperCard, classes.infoBlock, classes.messagesWrapper)}>
                            {this.printMessages(answer.messages)}
                          </Paper>
                        </Fade>
                      )}
                    </Grid>
                  </Grid>
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
  answer: PropTypes.object.isRequired,
  errorCode: PropTypes.number.isRequired,
  push: PropTypes.func.isRequired,
  getRequest: PropTypes.func.isRequired,
  getAnswer: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isAnswerFetching: PropTypes.bool.isRequired,
}

const mapStateToProps = store => {
  return {
    request: store.request.currentRequest,
    answer: store.request.answer,
    errorCode: store.request.errorCode,
    isFetching: store.request.isSingleFetching,
    isAnswerFetching: store.request.isAnswerFetching,
  }
}

const mapDispatchToProps = dispatch => ({
  getRequest: id => dispatch(getRequest(id)),
  getAnswer: id => dispatch(getAnswer(id)),
  push: path => dispatch(push(path)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Request))
