import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Button,
  Tabs,
  Tab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import { LinkOff as LinkOffIcon, Lock as LockIcon } from '@material-ui/icons'
import SwipeableViews from 'react-swipeable-views'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  avatar: {
    width: 50,
    height: 50,
    color: '#fff',
    backgroundColor: theme.palette.marshal.main,
  },
})

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: '24px 0' }}>
      {children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
}

class UsersList extends React.Component {
  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  render() {
    const { status, onClose, data, theme, classes } = this.props
    return (
      <div>
        <Dialog
          open={status}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Сотрудники компании {data.name}</DialogTitle>
          <DialogContent>
            <Tabs
              value={this.state.value}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.handleChange}
              variant="fullWidth"
            >
              <Tab label="Активные" />
              <Tab label="Запросы" />
              <Tab label="Заблокированы" disabled />
            </Tabs>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              {/* Список активных пользователей компании */}
              <TabContainer dir={theme.direction}>
                <List>
                  {[...Array(8)].map(value => (
                    <ListItem key={value} button>
                      <ListItemAvatar>
                        <Avatar className={classes.avatar}>U</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={`Line item ${value + 1}`} secondary={'test@test.ru'} />
                      <ListItemSecondaryAction>
                        <Tooltip title="Заблокировать">
                          <IconButton aria-label="Ban">
                            <LockIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Исключить">
                          <IconButton aria-label="Delete">
                            <LinkOffIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </TabContainer>
              {/* Список пользователей, запросивших подтверждение */}
              <TabContainer dir={theme.direction}>Запросы на подтверждение</TabContainer>
              {/* Список заблокированных пользователей компании */}
              <TabContainer dir={theme.direction}>Заблокированы</TabContainer>
            </SwipeableViews>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to Google, even when
              no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

UsersList.propTypes = {
  status: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(UsersList)
