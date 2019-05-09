const styles = theme => ({
  flexGrow: {
    flexGrow: 1,
  },
  paperCard: {
    color: theme.palette.text.secondary,
    position: 'relative',
    boxShadow: '0px 3px 4px 0px rgba(115, 127, 136, 0.3)',
  },
  progressWrapper: {
    position: 'relative',
    height: '80vh',
  },
  buttonProgress: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  infoBlock: {
    marginTop: 20,
    padding: 15,
    '&:first-child, ': {
      paddingTop: 0,
    },
    '&:last-child, ': {
      paddingBottom: 0,
    },
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '12px 0',
  },
  infoRowValue: {
    color: '#36363a',
  },
})

export default styles
