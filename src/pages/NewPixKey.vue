<template>
  <q-page class="bg-grey-2 q-pa-md q-pb-xl">
    <div class="q-py-lg text-h4 text-bold">
      Adicionar Chave PIX
    </div>
    <div class="q-mt-md">
      <p>Digite o nome ou o código do Banco ou selecione:</p>
      <q-select
          v-model="selectedBank"
          use-input
          input-debounce="0"
          :options="myBanksOptions"
          @filter="filterFn"
          option-value="code"
          option-label="name"
          clearable
          label="Código ou Nome do Banco"
          @input="blurSelectionField"
          ref="allBanksSelect"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Nenhum Banco encontrado...
              </q-item-section>
            </q-item>
          </template>

          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
            >
              <q-item-section>
                <q-item-label>{{ scope.opt.code }} - {{ scope.opt.name }}</q-item-label>
                <q-item-label caption>{{ scope.opt.longName }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="q-mt-lg" v-if="selectedBank">
        <q-input outlined v-model="pixKeyValue" :label="`Insira aqui sua Chave PIX do ${selectedBank.name}`" />
      </div>

      <div class="q-my-lg q-gutter-lg">
        <q-btn :to="{ name: 'index' }" color="primary" class="q-py-sm" outline icon="arrow_back" label="Voltar" />
        <q-btn @click="save" class="q-px-xl q-py-sm" color="primary" label="Salvar Chave PIX" :disable="!selectedBank" />
      </div>
  </q-page>
</template>

<script>
import PixKeyService from '../services/PixKeyService'
import BankService from '../services/BankService'

export default {
  name: 'NewPixKey',
  data () {
    return {
      allBanksList: [],
      myBanksOptions: [],
      selectedBank: null,
      pixKeyValue: null
    }
  },
  methods: {
    filterFn (val, update, abort) {
      if (val.length < 2) {
        update(() => {
          this.myBanksOptions = this.allBanksList
        })
      }

      update(() => {
        const needle = val.toLowerCase()
        this.myBanksOptions = this.allBanksList.filter(v => v.longName.toLowerCase().indexOf(needle) > -1)
        if (this.myBanksOptions.length === 0) {
          this.myBanksOptions = this.allBanksList.filter(v => v.code.toLowerCase().indexOf(needle) > -1)
        }
      })
    },
    blurSelectionField () {
      this.$refs.allBanksSelect.blur()
    },
    async getData () {
      const userId = 1
      const response = await BankService.getUserBanks(userId)
      return response.data
    },
    async save () {
      const userId = 1
      const bankCode = this.selectedBank.code

      const notif = this.$q.notify({
        type: 'ongoing',
        message: 'Salvando...',
        position: 'center'
      })

      this.selectedBank = null

      await PixKeyService.savePixKey(userId, {
        code: bankCode,
        value: this.pixKeyValue
      }).then(() => {
        notif({
          type: 'positive',
          message: 'Chave PIX salva com sucesso!',
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
    this.allBanksList = await this.getData()
    this.myBanksOptions = this.allBanksList
  }
}
</script>
