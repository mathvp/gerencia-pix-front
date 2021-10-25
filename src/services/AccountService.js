import { axiosInstance } from 'boot/axios'
import { LocalStorage } from 'quasar'

export default {
  async login (email, password) {
    const response = await axiosInstance.post('/users/login', {
      email,
      password
    })
      .then((res) => {
        try {
          LocalStorage.set('token', res.data.accessToken)
          LocalStorage.set('id', res.data.id)
        } catch (error) {
          return error
        }
        return { status: res.status, data: res.data }
      })
      .catch((error) => {
        console.log(error)
        return { status: error.response.status, message: error.response.data.error }
      })

    return response
  },
  logout () {
    return new Promise((resolve, reject) => {
      if (!LocalStorage.has('token')) {
        resolve()
      }
      LocalStorage.set('token', null)
      LocalStorage.set('id', null)
      LocalStorage.remove('token')
      LocalStorage.remove('id')
      resolve()
    })
  },
  async register (userData) {
    const response = await axiosInstance.post('/users', {
      ...userData
    })
      .then((res) => {
        return { status: res.status, data: res.data }
      })
      .catch((error) => {
        console.log(error)
        return { status: error.response.status, message: error.response.data.error }
      })

    return response
  },
  isLoggedIn () {
    if (LocalStorage.has('token') && (LocalStorage.getItem('token') !== null) && LocalStorage.has('id') && (LocalStorage.getItem('id') !== null)) {
      return true
    }
    return false
  }
}
