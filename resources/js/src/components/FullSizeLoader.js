import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { CircularProgress, Fade } from '@material-ui/core/'

const styles = theme => ({
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.marshal.main,
  },
})

class FullSizeLoader extends React.Component {
  render() {
    const { classes, enable } = this.props
    return (
      <Fade in={enable}>
        <div className={classes.wrapper}>
          <CircularProgress className={classes.progress} />
        </div>
      </Fade>
    )
  }
}

FullSizeLoader.propTypes = {
  classes: PropTypes.object.isRequired,
  enable: PropTypes.bool.isRequired,
}

export default withStyles(styles)(FullSizeLoader)
