const styles = theme => ({
  flexGrow: {
    flexGrow: 1,
  },
  paperCard: {
    color: theme.palette.text.secondary,
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0px 3px 4px 0px rgba(115, 127, 136, 0.3)',
    padding: 0,
    marginBottom: 15,
  },
  box: {
    padding: 15,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0px 5px 5px 15px',
  },
})

export default styles
