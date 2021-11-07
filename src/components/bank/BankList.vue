<template>
  <div class="q-px-md q-pb-xl" style="width: 100%">
    <q-inner-loading :showing="myBanksList.length === 0">
      <q-spinner-facebook size="5rem" color="primary" />
      <div class="text-h5 text-primary text-italic">
        Carregando dados, por favor, aguarde...
      </div>
    </q-inner-loading>
    <div v-if="myBanksList.length === 0 && showEmptyMessage" class="text-h5 text-italic text-grey text-center q-pt-xl">
      {{emptyMessage}}
    </div>
    <div v-if="myBanksList.length > 0" class="q-px-md q-pt-lg" style="width: 100%">
      <p>Clique e segure sobre um Banco para ordenar a listagem</p>
    </div>
    <q-list v-if="myBanksList.length > 0" class="rounded-borders bg-grey-2">
      <Container
        @drop="onDrop"
        :drop-placeholder="upperDropPlaceholderOptions"
        drag-class="card-ghost"
        drop-class="card-ghost-drop">
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
      showEmptyMessage: false,
      emptyMessage: 'Nenhum Banco cadastrado...',
      upperDropPlaceholderOptions: {
        className: 'cards-drop-preview',
        animationDuration: '150',
        showOnTop: true
      }
    }
  },
  methods: {
    async getBankData () {
      const response = await BankService.getUserBanks()

      if (response.status === 200) {
        this.myBanksList = response.data
      } else {
        this.emptyMessage = response.message
        this.showEmptyMessage = true
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

<style>
.card-ghost {
    transition: transform 0.18s ease;
    transform: rotateZ(1deg);
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 2px 4px 10px rgba(150, 150, 200, 0.3);
}

.card-ghost-drop {
    transition: transform 0.18s ease-in-out;
    transform: rotateZ(0deg)
}

.cards-drop-preview {
  background-color: rgba(150, 150, 200, 0.1);
  border: 1px dashed #abc;
  margin: 5px 45px 5px 5px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
