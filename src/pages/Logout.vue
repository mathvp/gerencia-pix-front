<template>
  <p>Redirecionando...</p>
</template>

<script>
import LoginService from '../services/LoginService'

export default {
  name: 'Logout',
  async created () {
    await LoginService.logout().then(() => {
      this.$router.push({ name: 'login' })
    })
  }
}
</script>
