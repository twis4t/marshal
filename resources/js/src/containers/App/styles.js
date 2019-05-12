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
  trendDates: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 10px',
    fontSize: 'smaller',
    position: 'absolute',
    width: '100%',
    bottom: '10px',
    '& div': {
      transition: 'all .2s',
      opacity: 0,
      borderRadius: 4,
      background: '#ffffffdb',
      padding: '4px 6px',
      border: 'solid 1px #f3f3f3',
    },
    '&:hover': {
      '& div': {
        opacity: 1,
      },
    },
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
