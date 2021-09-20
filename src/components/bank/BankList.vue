<template>
  <div class="q-pa-md" style="width: 100%">
    <q-list bordered class="rounded-borders bg-white" separator>
      <bank-item v-for="bank in myBanksList" :key="bank.id" :bankData="bank" />
    </q-list>
  </div>
</template>

<script>
import BankItem from './BankItem.vue'
import TestService from '../../services/TestService'

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
      const response = await TestService.getData()
      this.myBanksList = response.data.test
    }
  },
  created () {
    this.getBankData()
  }
}
</script>
