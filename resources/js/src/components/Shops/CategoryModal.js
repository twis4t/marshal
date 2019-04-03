import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { withStyles } from '@material-ui/core/styles'
import {
  Avatar,
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
  TextField,
} from '@material-ui/core'
import { Clear as ClearIcon } from '@material-ui/icons'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  activeCategory: {
    backgroundColor: '#8bc34a',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
})

class CategoryModal extends React.Component {
  state = {
    value: 0,
    currentCategory: {
      id: 0,
      name: '',
    },
  }

  handleChangeName = event => {
    this.setState({
      currentCategory: {
        id: this.state.currentCategory.id,
        name: event.target.value,
      },
    })
  }

  render() {
    const { status, onClose, classes } = this.props
    return (
      <div>
        <Dialog
          open={status}
          onClose={onClose}
          fullWidth={true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Категории</DialogTitle>
          <DialogContent>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="outlined-name"
                label="Категория"
                className={classes.textField}
                value={this.state.currentCategory.name}
                onChange={this.handleChangeName}
                margin="normal"
                variant="outlined"
              />
            </form>
            <List>
              {this.props.data.map(value => (
                <ListItem key={value.category} button>
                  <Avatar className={value.shops.length > 0 ? classes.activeCategory : null}>
                    {value.shops.length || 0}
                  </Avatar>
                  <ListItemText
                    primary={value.category}
                    secondary={'Добавлена: ' + moment(value.created_at).format('DD.MM.YYYY HH:mm:SS')}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title="Удалить">
                      <div>
                        <IconButton aria-label="Ban" disabled={value.shops.length > 0}>
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </div>
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
