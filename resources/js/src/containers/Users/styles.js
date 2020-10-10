const styles = theme => ({
  flexGrow: {
    flexGrow: 1,
  },
  paperCard: {
    color: theme.palette.text.secondary,
    position: 'relative',
    boxShadow: '0px 3px 4px 0px rgba(115, 127, 136, 0.3)',
  },
  actionsBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    '& button': {
      height: 42,
      marginRight: theme.spacing(),
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
  progress: {
    width: '100%',
    position: 'absolute',
  },
  buttonProgress: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  customRow: {
    '&:hover': {
      backgroundColor: '#f4f4f4',
    },
  },
  userColumnWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userColumnAvatar: {
    width: 30,
    height: 30,
    marginRight: 8,
    fontSize: 14,
  },
  nameTextWrapper: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
})

export default styles
