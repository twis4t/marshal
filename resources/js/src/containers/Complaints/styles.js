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
  blockResult: {
    display: 'block',
    textTransform: 'uppercase',
    padding: '6px 8px',
    borderRadius: 2,
    border: 'solid 1px',
    textAlign: 'center',
    fontWeight: 600,
  },
  blockResultTrue: {
    borderColor: '#b7e285',
    background: '#edf5e5',
    color: '#8bc34a',
  },
  blockResultFalse: {
    borderColor: '#ffc9b8',
    background: '#fff3f3',
    color: '#ff784d',
  },
})

export default styles
