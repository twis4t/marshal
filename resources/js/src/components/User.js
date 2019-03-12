import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

export class User extends React.Component {
  onBtnClick(name) {
    this.props.setName(name)
  }
  getUser(id) {
    this.props.getUser(id)
  }

  render() {
    const { name, isFetching } = this.props
    return (
      <div>
        <p>Привет, {name}!</p>
        <button
          onClick={() => {
            this.onBtnClick('test')
          }}
        >
          Изменить
        </button>
        <button
          onClick={() => {
            this.getUser(1)
          }}
        >
          Получить
        </button>
        <Button variant="contained" color="primary">
          Hello World
        </Button>

        {isFetching ? <div>Загрузка...</div> : <div />}
      </div>
    )
  }
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
}
