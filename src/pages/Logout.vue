<template>
  <p>Redirecionando...</p>
</template>

<script>
import AccountService from '../services/AccountService'

export default {
  name: 'Logout',
  async created () {
    await AccountService.logout().then(() => {
      this.$router.push({ name: 'login' })
    }).catch(() => {
      this.$router.push({ name: 'login' })
    })
  }
}
</script>
