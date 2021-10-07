import { axiosInstance } from 'boot/axios'

export default {
  async savePixKey (userId, bankData) {
    const response = await axiosInstance.post(`/users/${userId}/banks/${bankData.code}/pix-keys`,
      {
        value: bankData.value
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
