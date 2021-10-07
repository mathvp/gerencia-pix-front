<template>
  <q-page class="bg-grey-2 q-pa-md q-pb-xl">
    <div class="q-py-lg text-h4 text-bold">
      Adicionar novo Banco
    </div>
    <div class="q-mt-md">
      <p>Digite o nome ou o código do Banco ou selecione:</p>
      <q-select
          v-model="selectedBank"
          use-input
          input-debounce="0"
          :options="allBanksOptions"
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

      <div class="q-my-lg" v-if="selectedBank">
        <div class="text-h6">Personalização</div>
        <p>Altere o nome, a imagem ou a cor da forma que preferir:</p>
        <div>
          <q-input outlined v-model="customBankData.name" label="Nome do Banco" @input="updateBankName" />

          <div class="q-mt-lg">
            Cor:
          </div>
          <q-color
            v-model="customBankData.color"
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

          <q-input outlined class="q-mt-lg" v-model="customBankData.image" label="Imagem" @input="updateBankImage" />
        </div>
      </div>

      <div class="q-mt-lg" v-if="selectedBank">
        <div class="text-subtitle1 text-italic q-mb-sm">Prévia:</div>
        <q-card>
          <q-card-section>
            <bank-item :bankData="tempBankData" :avatarColor="customBankData.color" />
          </q-card-section>
        </q-card>
      </div>

      <div class="q-my-lg q-gutter-lg">
        <q-btn :to="{ name: 'index' }" color="primary" class="q-py-sm" outline icon="arrow_back" label="Voltar" />
        <q-btn @click="save" class="q-px-xl q-py-sm" color="primary" label="Salvar Banco" :disable="!selectedBank" />
      </div>
  </q-page>
</template>

<script>
import BankItem from '../components/bank/BankItem'
import BankService from '../services/BankService'
const defaultColor = '#009e8c'

export default {
  name: 'NewBank',
  components: {
    'bank-item': BankItem
  },
  data () {
    return {
      allBanksList: [],
      allBanksOptions: [],
      selectedBank: null,
      tempBankData: {
        name: null,
        color: defaultColor,
        image: null
      },
      customBankData: {
        name: null,
        color: defaultColor,
        image: null
      }
    }
  },
  methods: {
    filterFn (val, update, abort) {
      if (val.length < 2) {
        update(() => {
          this.allBanksOptions = this.allBanksList
        })
      }

      update(() => {
        const needle = val.toLowerCase()
        this.allBanksOptions = this.allBanksList.filter(v => v.longName.toLowerCase().indexOf(needle) > -1)
        if (this.allBanksOptions.length === 0) {
          this.allBanksOptions = this.allBanksList.filter(v => v.code.toLowerCase().indexOf(needle) > -1)
        }
      })
    },
    blurSelectionField () {
      this.tempBankData = Object.assign({}, this.selectedBank)
      this.$refs.allBanksSelect.blur()
    },
    async getData () {
      const response = await BankService.getAllBanks()
      return response.data
    },
    updateBankName () {
      if (this.customBankData.name) {
        this.tempBankData.name = this.customBankData.name
      } else {
        this.tempBankData.name = this.selectedBank.name
      }
    },
    updateBankImage () {
      if (this.customBankData.image) {
        this.tempBankData.image = this.customBankData.image
      } else {
        this.tempBankData.image = this.selectedBank.image
      }
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

      await BankService.saveBank(userId, {
        code: bankCode,
        custom_bank_name: this.customBankData.name,
        custom_bank_color: this.customBankData.color,
        custom_bank_image_url: this.customBankData.image
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
    this.allBanksList = await this.getData()
    this.allBanksOptions = this.allBanksList
  }
}
</script>
