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
  }
}
