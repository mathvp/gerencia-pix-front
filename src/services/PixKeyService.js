import { axiosInstance } from '../boot/axios'
import { LocalStorage } from 'quasar'

const token = LocalStorage.getItem('token')

const config = {
  headers: { 'x-access-token': token }
}

export default {
  async savePixKey (userId, bankData) {
    const response = await axiosInstance.post(`/users/banks/${bankData.code}/pix-keys`,
      {
        value: bankData.value
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
  async updatePixKey (userId, bankCode, pixKeyData) {
    const response = await axiosInstance.put(`/users/banks/${bankCode}/${pixKeyData.id}`,
      {
        value: pixKeyData.newValue
      }, config).then((res) => {
      return { status: res.status, data: res.data }
    }).catch((error) => {
      console.log('Erro', error)
      return { status: error.response.status, message: error.response.data.error }
    })

    return response
  },
  async deletePixKey (userId, bankCode, pixKeyId) {
    const response = await axiosInstance.delete(`/users/banks/${bankCode}/${pixKeyId}`, config).then((res) => {
      return { status: res.status, data: res.data }
    }).catch((error) => {
      console.log('Erro', error)
      return { status: error.response.status, message: error.response.data.error }
    })

    return response
  }
}
