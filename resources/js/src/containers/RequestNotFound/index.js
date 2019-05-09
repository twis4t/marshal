import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import styles from './styles'
import { withStyles } from '@material-ui/core/styles'
import Img404 from '@/static/req404.png'
import { Button } from '@material-ui/core'

class RequestNotFoud extends Component {
  state = {
    //
  }

  componentDidMount = async () => {
    //
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.wrapper}>
        <img src={Img404} alt="404" />
        <h3>Заявка не найдена!</h3>
        <div className={classes.description}>Попробуйте поискать в общем реестре</div>
        <div>
          <Button className={classes.btn} variant="outlined" color="primary" onClick={() => this.props.push('/')}>
            Главная
          </Button>
          <Button
            className={classes.btn}
            variant="outlined"
            color="secondary"
            onClick={() => this.props.push('/requests')}
          >
            Все заявки
          </Button>
        </div>
      </div>
    )
  }
}

RequestNotFoud.propTypes = {
  classes: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
}

export default connect(
  null,
  { push }
)(withStyles(styles)(RequestNotFoud))
