<template>
  <q-page class="bg-grey-2 q-pa-md q-pb-xl">
    <div class="q-py-lg text-h4 text-bold">
      Editar Banco
    </div>
    <q-input outlined v-model="myBankData.name" label="Nome" :hint="`Nome original: ${myBankData.longName}`"/>
    <div class="q-mt-lg">
      Cor:
    </div>
    <q-color
      v-model="myBankData.color"
      no-header
      no-footer
      :palette="[
        '#019A9D', '#046039', '#00329b',
        '#7f0aca', '#fb0606', '#dc1f1b',
        '#fcd505', '#f2880e', '#f77600',
        '#000000'
      ]"
      default-view="palette"
        />
      <div class="q-mt-lg" v-if="myBankData.name !== ''">
        <div class="text-subtitle1 text-italic q-mb-sm">Prévia:</div>
        <q-card>
          <q-card-section>
            <bank-item v-if="myBankData !== {}" :bankData="myBankData" :avatarColor="myBankData.color" />
          </q-card-section>
        </q-card>
      </div>
      <div class="q-my-lg q-gutter-lg">
        <q-btn :to="{ name: 'index' }" color="primary" class="q-py-sm" outline icon="arrow_back" label="Voltar" />
        <q-btn @click="save" class="q-px-xl q-py-sm" color="primary" label="Salvar Banco" />
      </div>
  </q-page>
</template>

<script>
import BankService from 'src/services/BankService'
import BankItem from '../components/bank/BankItem'

export default {
  name: 'EditBank',
  components: {
    'bank-item': BankItem
  },
  data () {
    return {
      myBankData: {
        code: null,
        color: '',
        image: '',
        longName: '',
        name: '',
        order: null,
        pix_keys: []
      }
    }
  },
  methods: {
    async getData () {
      const response = await BankService.getUserBanks(this.$route.params.bank_code)
      return response.data[0]
    },
    async save () {
      const notif = this.$q.notify({
        type: 'ongoing',
        message: 'Salvando...',
        position: 'center'
      })

      await BankService.updateBank({
        code: this.myBankData.code,
        custom_bank_name: this.myBankData.name,
        custom_bank_color: this.myBankData.color,
        custom_bank_image_url: this.myBankData.image
      }).then(() => {
        notif({
          type: 'positive',
          message: 'Banco salvo com sucesso!',
          position: 'center'
        })
      }).catch(() => {
        notif({
          type: 'negative',
          message: 'Houve um erro ao salvar os dados...',
          position: 'center'
        })
      })
    }
  },
  async created () {
    this.myBankData = await this.getData()
  }
}
</script>
