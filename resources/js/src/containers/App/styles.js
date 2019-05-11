const styles = theme => ({
  flexGrow: {
    flexGrow: 1,
  },
  paperCard: {
    color: theme.palette.text.secondary,
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0px 3px 4px 0px rgba(115, 127, 136, 0.3)',
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoBoxCol: {
    //
  },
  infoBoxValue: {
    marginBottom: 2,
  },
  infoBoxActionButton: {
    margin: 20,
  },
  iconAvatar: {
    backgroundColor: '#7d8294',
    margin: 20,
    width: 60,
    height: 60,
  },
})

export default styles
