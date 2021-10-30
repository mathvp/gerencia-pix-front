<template>
  <div class="q-pa-md" style="width: 100%">
    <div v-if="myBanksList.length === 0" class="text-h5 text-italic text-grey text-center q-pt-xl">
      {{emptyMessage}}
    </div>
    <q-list v-if="myBanksList.length > 0" bordered class="rounded-borders bg-white" separator>
      <Container @drop="onDrop">
        <bank-item v-for="bank in myBanksList" :key="bank.code" :bankData="bank" :avatarColor="bank.color" />
      </Container>
    </q-list>
  </div>
</template>

<script>
import BankItem from './BankItem.vue'
import BankService from '../../services/BankService'
import { Container } from 'vue-smooth-dnd'
import { applyDrag } from '../../utils'

export default {
  name: 'BankList',
  components: {
    'bank-item': BankItem,
    Container
  },
  data () {
    return {
      myBanksList: [],
      dragging: false,
      emptyMessage: 'Nenhum Banco cadastrado...'
    }
  },
  methods: {
    async getBankData () {
      const response = await BankService.getUserBanks()

      if (response.status === 200) {
        this.myBanksList = response.data
      } else {
        this.emptyMessage = response.message
      }
    },
    async onDrop (dropResult) {
      const oldList = this.myBanksList
      this.myBanksList = await applyDrag(this.myBanksList, dropResult)

      const newOrder = this.myBanksList.flatMap((bank, index) => {
        if (bank.code !== oldList[index].code) {
          return {
            code: bank.code,
            order: index
          }
        }
        return []
      })

      const sort = await BankService.sortOrder(newOrder)
      if (sort.status !== 200) {
        this.myBanksList = oldList
      }
    }
  },
  created () {
    this.getBankData()
  }
}
</script>
