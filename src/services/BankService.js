import { axiosInstance } from 'boot/axios'
import { LocalStorage } from 'quasar'

const token = LocalStorage.getItem('token')

const config = {
  headers: { 'x-access-token': token }
}

export default {
  async getUserBanks () {
    const response = await axiosInstance.get('/users/banks', config).then((res) => {
      return { status: res.status, data: res.data }
    }).catch((error) => {
      if (typeof error.status === 'undefined') {
        return { status: 500, message: 'Não foi possível obter os dados...' }
      }
      return { status: error.response.status, message: error.response.data.error }
    })

    return response
  },
  async getAllBanks () {
    const response = await axiosInstance.get('/banks', config).then((res) => {
      return { status: res.status, data: res.data }
    }).catch((error) => {
      return { status: error.response.status, message: error.response.data.error }
    })

    return response
  },
  async saveBank (bankData) {
    const response = await axiosInstance.post('/users/banks',
      {
        ...bankData
      },
      config
    ).then((res) => {
      return { status: res.status, data: res.data }
    }).catch((error) => {
      console.log('Erro', error)
      return { status: error.response.status, message: error.response.data.error }
    })

    return response
  },
  async sortOrder (newOrders) {
    const response = await axiosInstance.put('/users/banks',
      {
        newOrders
      },
      config
    ).then((res) => {
      return { status: res.status, data: res.data }
    }).catch((error) => {
      console.log('Erro', error)
      if (typeof error.status === 'undefined') {
        return { status: 500, message: 'Não foi possível atualizar' }
      }
      return { status: error.response.status, message: error.response.data.error }
    })

    return response
  }
}
