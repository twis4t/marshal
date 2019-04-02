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
    marginBottom: theme.spacing.unit * 2,
    '& button': {
      marginRight: theme.spacing.unit,
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
})

export default styles
