import { axiosInstance } from 'boot/axios'

export default {
  async getUserBanks (userId) {
    const response = await axiosInstance.get(`/users/${userId}/banks`,
      {
        headers: {
        }
      }).then((res) => {
      return { status: res.status, data: res.data }
    }).catch((error) => {
      return { status: error.response.status, message: error.response.data.error }
    })

    return response
  },
  async getAllBanks () {
    const response = await axiosInstance.get('/banks',
      {
        headers: {
        }
      }).then((res) => {
      return { status: res.status, data: res.data }
    }).catch((error) => {
      return { status: error.response.status, message: error.response.data.error }
    })

    return response
  },
  async saveBank (userId, bankData) {
    const response = await axiosInstance.post(`/users/${userId}/banks`,
      {
        ...bankData
      }, {
        headers: {}
      }
    ).then((res) => {
      return { status: res.status, data: res.data }
    }).catch((error) => {
      console.log('Erro', error)
      return { status: error.response.status, message: error.response.data.error }
    })

    return response
  }
}
