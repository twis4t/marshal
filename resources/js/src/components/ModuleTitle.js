import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 2,
    boxShadow: '0px 0px 6px 0px rgba(115, 127, 136, 0.3)',
  },
})

class ModuleTitle extends React.Component {
  render() {
    const { classes, title } = this.props
    return (
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
      </Paper>
    )
  }
}

ModuleTitle.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ModuleTitle)
