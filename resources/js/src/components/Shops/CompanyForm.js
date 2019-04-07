import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FullSizeLoader from '@/components/FullSizeLoader'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  ListItemText,
  Checkbox,
  MenuItem,
} from '@material-ui/core'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
})

class CompanyForm extends React.Component {
  state = {
    defaultFields: {
      name: '',
      description: '',
      address: '',
      phone: '',
      comment: '',
    },
    status: false,
    isNew: true,
    fields: {},
    loader: false,
    selectedCategories: [],
  }

  static getDerivedStateFromProps(props, state) {
    if (props.status !== state.status) {
      if (props.isNew === false) {
        return {
          status: props.status,
          isNew: props.isNew,
          fields: props.data,
          selectedCategories: props.data.categories.map(val => val.id),
        }
      } else {
        return {
          status: props.status,
          isNew: props.isNew,
          fields: state.defaultFields,
          selectedCategories: [],
        }
      }
    }
    return null
  }

  componentDidMount = () => {
    this.setState({ fields: this.state.defaultFields })
  }

  handleFormClose = () => {
    this.setState({ fields: this.state.defaultFields })
    this.props.onClose()
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    const currentFields = this.state.fields
    this.setState({
      fields: {
        ...currentFields,
        [name]: value,
      },
    })
  }

  handleFormSubmit = async () => {
    this.setState({ loader: true })
    await this.props.onSubmit(this.state.fields, this.state.selectedCategories)
    this.setState({ loader: false })
    this.handleFormClose()
  }

  handleChangeMultiple = event => {
    const options = event.target.value || []
    this.setState({
      selectedCategories: [...options],
    })
  }

  render() {
    const { status, classes } = this.props
    return (
      <div>
        <Dialog
          open={status}
          onClose={this.handleFormClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.state.isNew ? 'Добавить' : 'Изменить'} компанию</DialogTitle>
          <DialogContent>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  label="Наименование*"
                  variant="outlined"
                  id="name"
                  name="name"
                  value={this.state.fields.name}
                  autoComplete="organization"
                  autoFocus
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <TextField
                  label="Описание"
                  variant="outlined"
                  name="description"
                  id="description"
                  value={this.state.fields.description}
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  label="Адрес*"
                  variant="outlined"
                  id="address"
                  name="address"
                  value={this.state.fields.address}
                  autoComplete="street-address"
                  autoFocus
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  label="Телефон*"
                  variant="outlined"
                  id="phone"
                  name="phone"
                  value={this.state.fields.phone}
                  autoComplete="tel"
                  autoFocus
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <TextField
                  label="Комментарий"
                  variant="outlined"
                  name="comment"
                  id="comment"
                  value={this.state.fields.comment}
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <FormControl variant="outlined" margin="normal" fullWidth>
                <InputLabel htmlFor="outlined-cat">Категории</InputLabel>
                <Select
                  multiple
                  value={this.state.selectedCategories}
                  onChange={this.handleChangeMultiple}
                  input={<OutlinedInput name="cat" labelWidth={76} id="outlined-cat" />}
                  renderValue={selected =>
                    selected
                      .map(id => this.props.categories.filter(item => item.id === id).map(cat => cat.category))
                      .join(', ')
                  }
                >
                  {this.props.categories.map(cat => (
                    <MenuItem key={cat.id} value={cat.id}>
                      <Checkbox checked={this.state.selectedCategories.indexOf(cat.id) > -1} />
                      <ListItemText primary={cat.category} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </form>
            <DialogContentText id="alert-dialog-description">
              * Помечены поля, обязательные для заполнения
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleFormClose} color="secondary" autoFocus>
              Отмена
            </Button>
            <Button onClick={this.handleFormSubmit} color="primary" autoFocus>
              {this.state.isNew ? 'Добавить' : 'Сохранить'}
            </Button>
          </DialogActions>
          {this.state.loader ? <FullSizeLoader enable={true} /> : ''}
        </Dialog>
      </div>
    )
  }
}

CompanyForm.propTypes = {
  status: PropTypes.bool.isRequired,
  isNew: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(CompanyForm)
