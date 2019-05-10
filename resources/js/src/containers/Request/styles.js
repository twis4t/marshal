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
  answerAvatar: {
    backgroundColor: '#2e3344',
  },
  noAnswersTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
    color: '#ff9800',
  },
  noAnswers: {
    textAlign: 'center',
    color: '#a5a5a5',
    padding: 20,
  },
  noMessagesTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
    color: '#2196f3',
  },
  noMessages: {
    textAlign: 'center',
    color: '#a5a5a5',
    padding: 20,
  },
})

export default styles
