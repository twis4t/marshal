import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { User } from '../components/User'
import { setName, getUser } from '../actions/UserActions'

class App extends Component {
  render() {
    const { user, setName, getUser } = this.props
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Заголовок 2</h1>
        </header>
        <p className="App-intro">Интро</p>
        <User name={user.name} setName={setName} getUser={getUser} isFetching={user.isFetching} />
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    user: store.user,
  }
}

const mapDispatchToProps = dispatch => ({
  setName: name => dispatch(setName(name)),
  getUser: id => dispatch(getUser(id)),
})

App.propTypes = {
  user: PropTypes.object.isRequired,
  setName: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
