<template>
  <div class="q-pa-md" style="width: 100%">
    <q-list bordered class="rounded-borders bg-white" separator>
      <bank-item v-for="bank in myBanksList" :key="bank.id" :bankData="bank" />
    </q-list>
  </div>
</template>

<script>
import BankItem from './BankItem.vue'

export default {
  name: 'BankList',
  components: {
    'bank-item': BankItem
  },
  data () {
    return {
      myBanksList: [
        {
          id: 1,
          name: 'NuBank',
          iconSrc: 'https://nubank.com.br/images/nu-icon.png?v=2',
          keys: [
            {
              id: 1,
              keyValue: '12bb25d5-4b45-4af2-954e-5b2bf2b07434'
            },
            {
              id: 2,
              keyValue: '12bb25d5-4b45-4af2-954e-5b2bf2b07434'
            }
          ]
        },
        {
          id: 2,
          name: 'Itaú',
          iconSrc: 'https://alumnicoppead.com.br/wp-content/uploads/2016/01/itau-logo.jpg'
        },
        {
          id: 3,
          name: 'Itaú',
          iconSrc: 'https://alumnicoppead.com.br/wp-content/uploads/2016/01/itau-logo.jpg'
        },
        {
          id: 4,
          name: 'Itaú',
          iconSrc: 'https://alumnicoppead.com.br/wp-content/uploads/2016/01/itau-logo.jpg'
        },
        {
          id: 5,
          name: 'Itaú',
          iconSrc: 'https://alumnicoppead.com.br/wp-content/uploads/2016/01/itau-logo.jpg'
        },
        {
          id: 6,
          name: 'Itaú',
          iconSrc: 'https://alumnicoppead.com.br/wp-content/uploads/2016/01/itau-logo.jpg'
        },
        {
          id: 7,
          name: 'Itaú',
          iconSrc: 'https://alumnicoppead.com.br/wp-content/uploads/2016/01/itau-logo.jpg'
        },
        {
          id: 8,
          name: 'Itaú',
          iconSrc: 'https://alumnicoppead.com.br/wp-content/uploads/2016/01/itau-logo.jpg'
        },
        {
          id: 2,
          name: 'Itaú',
          iconSrc: 'https://alumnicoppead.com.br/wp-content/uploads/2016/01/itau-logo.jpg'
        },
        {
          id: 9,
          name: 'Itaú',
          iconSrc: 'https://alumnicoppead.com.br/wp-content/uploads/2016/01/itau-logo.jpg'
        }
      ]
    }
  }
}
</script>
