import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import { LinkOff as LinkOffIcon, Lock as LockIcon } from '@material-ui/icons'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
})

class CategoryModal extends React.Component {
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
    const { status, onClose } = this.props
    return (
      <div>
        <Dialog
          open={status}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Категории</DialogTitle>
          <DialogContent>
            <List>
              {this.props.data.map(value => (
                <ListItem key={value.category} button>
                  <ListItemText primary={value.category} secondary={'test@test.ru'} />
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

CategoryModal.propTypes = {
  status: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(CategoryModal)
