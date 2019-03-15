import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

/* Маршруты, требующие авторизации */
function createPrivateRoute({ component }) {
  const PrivateRoute = ({ user, ...rest }) => {
    if (user.isAuth) {
      return React.createElement(component, rest)
    }
    return <Redirect to={{ pathname: '/login', state: { from: rest.location } }} />
  }

  PrivateRoute.propTypes = {
    user: PropTypes.object.isRequired,
  }

  const ConnectedComponent = connect(mapStateToProps)(PrivateRoute)
  return {
    render: function PrivateRoute(props) {
      return <ConnectedComponent {...props} />
    },
  }
}

const mapStateToProps = store => {
  return {
    user: store.user,
  }
}

export default createPrivateRoute
