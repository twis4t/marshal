import React, { Component } from 'react'
import { connect } from 'react-redux'

class Shops extends Component {
  render() {
    return <div>234</div>
  }
}

const mapStateToProps = store => {
  return {
    user: store.user,
  }
}

Shops.propTypes = {
  //
}

export default connect(mapStateToProps)(Shops)
