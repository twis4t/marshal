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
})

export default styles
