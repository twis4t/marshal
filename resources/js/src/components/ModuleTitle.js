import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import Breadcrumbs from '@material-ui/lab/Breadcrumbs'

const styles = theme => ({
  flexGrow: {
    flexGrow: 1,
  },
  link: {
    transition: 'all .2s',
    color: '#a4a5a9',
    textDecoration: 'none',
    '&:hover': {
      color: '#4b4e5a',
    }
  },
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing(),
    marginBottom: theme.spacing(2),
    boxShadow: '0px 0px 0px 0px rgba(115, 127, 136, 0.3)',
    background: '#eeeff3',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
})

class ModuleTitle extends React.Component {
  handleClick = event => {
    event.preventDefault()
    alert('You clicked a breadcrumb.') // eslint-disable-line no-alert
  }

  render() {
    const { classes, title, breadcrumbs } = this.props
    return (
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <div className={classes.flexGrow} />
        {breadcrumbs ? (
          <Breadcrumbs aria-label="Breadcrumb">
            {breadcrumbs.map((link, i) => 
              {
                if (link.path) {
                  return (
                    <Link key={'breadcrumbs-link-' + i} className={classes.link} color="inherit" to={link.path || '/'}>
                    {link.text || ''}
                    </Link>
                  )
                } else {
                  return ( <Typography key={'breadcrumbs-link-' + i} color="textPrimary">{link.text || ''}</Typography> )
                }
              })
            }
          </Breadcrumbs>
        ) : (
          ''
        )}
      </Paper>
    )
  }
}

ModuleTitle.propTypes = {
  title: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.array,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ModuleTitle)
