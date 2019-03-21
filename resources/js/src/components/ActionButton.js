import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const ITEM_HEIGHT = 48

const generateKey = pre => {
  return `${pre}_${new Date().getTime()}`
}

class ActionButton extends React.Component {
  state = {
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleItemClick = callback => {
    callback()
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state
    const { actions } = this.props
    const open = Boolean(anchorEl)
    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {actions.map(option => (
            <MenuItem key={generateKey(option.title)} onClick={() => this.handleItemClick(option.action)}>
              {option.title}
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}

ActionButton.propTypes = {
  actions: PropTypes.array.isRequired,
}

export default ActionButton
