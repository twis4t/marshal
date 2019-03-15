import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { User } from '@/components/User'
import { getUser } from '@/actions/UserActions'

class App extends Component {
  render() {
    const { user, getUser } = this.props
    return (
      <div className="App">
        Интро
        <User name={user.name} getUser={getUser} isFetching={user.isFetching} />
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
  getUser: (email, password) => dispatch(getUser(email, password)),
})

App.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
