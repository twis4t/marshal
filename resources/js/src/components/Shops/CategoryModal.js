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
  Menu,
  Paper,
  InputAdornment,
} from '@material-ui/core'
import { Clear as ClearIcon, AddBox as AddBoxIcon } from '@material-ui/icons'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  activeCategory: {
    backgroundColor: '#8bc34a',
  },
  textField: {
    /*marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,*/
    paddingRight: 4,
  },
  editForm: {
    outline: 'none',
    display: 'flex',
    flexDirection: 'row',
    boxShadow: 'none',
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  editField: {
    marginRight: 10,
  },
  menuWrapper: {
    /*paddintTop: 0,
    paddintBottom: 0,*/
  },
  noShadow: {
    boxShadow: 'none',
  },
})

class CategoryModal extends React.Component {
  state = {
    menuAnchorEl: null,
    newCategory: '',
    editableCategory: {
      id: 0,
      category: '',
    },
  }

  menuHandleClick = (event, val) => {
    this.setState({ menuAnchorEl: event.currentTarget, editableCategory: val })
  }

  menuHandleClose = () => {
    this.setState({ menuAnchorEl: null })
  }

  handleChangeNewName = event => {
    this.setState({
      newCategory: event.target.value,
    })
  }

  handleEditName = event => {
    this.setState({
      editableCategory: {
        ...this.state.editableCategory,
        category: event.target.value,
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
            <TextField
              id="outlined-name"
              placeholder="Добавить категорию"
              className={classes.textField}
              value={this.state.newCategory}
              onChange={this.handleChangeNewName}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="Toggle password visibility" onClick={''}>
                      <AddBoxIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <List>
              {this.props.data.map(value => (
                <ListItem key={value.category} button onClick={e => this.menuHandleClick(e, value)}>
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
            <Menu
              className={classes.menuWrapper}
              classes={{ paper: classes.noShadow }}
              id="simple-menu"
              anchorEl={this.state.menuAnchorEl}
              open={Boolean(this.state.menuAnchorEl)}
              onClose={this.menuHandleClose}
            >
              <Paper className={classes.editForm}>
                <TextField
                  className={classes.editField}
                  id="outlined-name"
                  value={this.state.editableCategory.category}
                  variant="outlined"
                  onChange={this.handleEditName}
                />
                <Button variant="outlined" color="primary">
                  Сохранить
                </Button>
              </Paper>
            </Menu>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary" autoFocus>
              Закрыть
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
