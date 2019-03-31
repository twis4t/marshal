import axios from 'axios'

// axios.defaults.headers.common['Authorization'] = this.props.user.token_type + ' ' + this.props.user.access_token

const instance = axios.create({
  baseURL: 'https://marshal.bh-app.ru/api/',
})

const lsUser = JSON.parse(localStorage.getItem('user')) || {}
lsUser.isAuth = lsUser.hasOwnProperty('access_token')

if (lsUser.isAuth) {
  instance.defaults.headers.common['Authorization'] = lsUser.token_type + ' ' + lsUser.access_token
}

export default instance
