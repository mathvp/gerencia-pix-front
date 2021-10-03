<template>
  <div class="q-pa-md" style="width: 100%">
    <q-list bordered class="rounded-borders bg-white" separator>
      <bank-item v-for="bank in myBanksList" :key="bank.id" :bankData="bank" />
    </q-list>
  </div>
</template>

<script>
import BankItem from './BankItem.vue'
import BankService from '../../services/BankService'

export default {
  name: 'BankList',
  components: {
    'bank-item': BankItem
  },
  data () {
    return {
      myBanksList: []
    }
  },
  methods: {
    async getBankData () {
      const userId = 1
      const response = await BankService.getUserBanks(userId)
      this.myBanksList = response.data
    }
  },
  created () {
    this.getBankData()
  }
}
</script>
