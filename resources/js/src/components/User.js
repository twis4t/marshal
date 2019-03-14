import React from 'react'
import PropTypes from 'prop-types'

export class User extends React.Component {
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
            this.getUser(1)
          }}
        >
          Получить
        </button>

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
