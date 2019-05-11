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
  progress: {
    width: '100%',
    position: 'absolute',
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
  messagesWrapper: {
    maxHeight: 720,
    overflow: 'auto',
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
    color: '#2e3344',
  },
  noMessages: {
    textAlign: 'center',
    color: '#a5a5a5',
    padding: 20,
  },
  messageRow: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 5px',
  },
  messageText: {
    padding: '10px 12px',
    maxWidth: '80%',
  },
  messageFromSeller: {
    alignItems: 'flex-start',
  },
  messageFromСustomer: {
    alignItems: 'flex-end',
  },
  messageFromSellerParam: {
    alignItems: 'flex-start',
    backgroundColor: theme.palette.marshal.main,
    color: '#fff',
    borderRadius: '0 12px 12px 12px',
  },
  messageFromСustomerParam: {
    alignItems: 'flex-end',
    backgroundColor: '#dcdee4',
    color: '#424548',
    borderRadius: '12px 0 12px 12px',
  },
  messageUser: {
    paddingBottom: 4,
    color: '#a5a5a5',
    fontSize: 'smaller',
  },
  messageDate: {
    paddingTop: 4,
    color: '#a5a5a5',
    fontSize: 'smaller',
  },
})

export default styles
