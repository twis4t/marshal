const styles = theme => ({
  flexGrow: {
    flexGrow: 1,
  },
  hidden: {
    display: 'none',
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
    '& .submitBtn, & div': {
      height: 42,
      marginRight: theme.spacing(),
      '&:last-child': {
        marginRight: 0,
      },
    },
    '& .filterBtn': {
      marginRight: theme.spacing(),
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
  answersCountRed: {
    padding: '3px 6px',
    borderRadius: '4px',
    color: '#fff',
    backgroundColor: '#ff5722',
  },
  answersCountGreen: {
    padding: '3px 6px',
    borderRadius: '4px',
    color: '#fff',
    backgroundColor: '#8bc34a',
  },
})

export default styles
