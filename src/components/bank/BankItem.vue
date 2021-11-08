<template>
  <Draggable>
     <q-card flat bordered class="q-pa-none q-my-xs noselect">
      <q-card-section class="q-pa-none bank-item">
        <q-expansion-item class="expansion-wrapper">
          <template v-slot:header>
            <q-item-section avatar class="q-py-lg bank-image-wrapper">
              <q-icon name="drag_indicator" />
              <q-avatar class="bankAvatar text-bold" rounded :style="avatarBackground" text-color="white" size="60px">
                <span v-if="!localBankData.image">{{ logoImage }}</span>
                <img v-if="localBankData.image" :src="localBankData.image">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1" class="text-bold text-h6">{{ localBankData.name }}</q-item-label>
              <q-item-label class="keys-counter" caption lines="1">{{ keysCountText() }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn-dropdown flat dense round dropdown-icon="more_vert" >
                <q-list>
                  <q-item clickable :to="{ name: 'editBank', params: { bank_code: localBankData.code } }">
                    <q-item-section side>
                      <q-icon color="primary" name="edit" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-primary" >
                        Editar Banco
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="deleteBankDialog">
                    <q-item-section side>
                      <q-icon color="negative" name="delete" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-negative">Excluir Banco</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-item-section>
          </template>

          <q-card class="q-mb-lg">
            <q-card-section>
              <p class="text-grey-8 text-caption" v-if="localBankData.pix_keys">Clique sobre a Chave para copiar</p>
                <pix-key-item @update-item="updatePixKey" @delete-item="deletePixKeyDialog" v-for="pixKey in localBankData.pix_keys" :key="pixKey.id" :pixKeyData="pixKey" />
            </q-card-section>
          </q-card>

          <q-dialog v-model="showDeleteDialog" persistent>
            <q-card class="q-pa-md">
              <q-card-section class="row q-gutter-md">
                <div class="col-12 col-md-1 q-mr-md">
                  <q-avatar icon="warning" color="warning" text-color="white" />
                </div>
                <div class="col-12 col-md-9">
                  <p>{{deleteMessage}}</p>
                  <p>OBS.: Essa ação não pode ser desfeita</p>
                </div>
              </q-card-section>

              <q-card-actions class="row q-gutter-md">
                <div class="col-12 col-md-3">
                <q-btn label="Voltar" color="primary" class="q-px-lg" v-close-popup />
                </div>
                <div class="col-12 col-md-8">
                <q-btn v-if="deleteType === 'pix'" @click="performDeletePix" label="Sim, quero excluir esta Chave" color="red-6" v-close-popup />
                <q-btn v-if="deleteType === 'bank'" @click="performDeleteBank" label="Sim, quero excluir este Banco" color="red-6" v-close-popup />
                </div>
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-expansion-item>
    </q-card-section>
    </q-card>
  </Draggable>
</template>

<script>
import PixKeyItem from './PixKeyItem'
import PixKeyService from '../../services/PixKeyService'
import { Draggable } from 'vue-smooth-dnd'
import BankService from 'src/services/BankService'

export default {
  name: 'BankItem',
  components: {
    'pix-key-item': PixKeyItem,
    Draggable
  },
  data () {
    return {
      showDeleteDialog: false,
      showUpdateDialog: false,
      currentPixKey: {},
      localBankData: {},
      deleteMessage: '',
      deleteType: null
    }
  },
  props: {
    bankData: {
      type: Object,
      default: () => {
        return {
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
    avatarColor: {
      type: String,
      default: '#009e8c'
    }
  },
  methods: {
    async setInitialValue () {
      this.localBankData = this.bankData
    },
    keysCountText () {
      const keysQtd = this.localBankData.pix_keys ? this.localBankData.pix_keys.length : 0

      if (keysQtd > 0) {
        return keysQtd === 1 ? '1 Chave cadastrada' : `${keysQtd} Chaves cadastradas`
      }

      return 'Nenhuma Chave cadastrada'
    },

    async updatePixKey (keyData) {
      const pixKeyUpdated = await PixKeyService.updatePixKey(this.localBankData.code, keyData)

      if (typeof pixKeyUpdated.status !== 'undefined' && pixKeyUpdated.status === 200) {
        const pixKeyIndex = this.localBankData.pix_keys.findIndex(pix => pix.id === keyData.id)

        this.localBankData.pix_keys[pixKeyIndex].value = keyData.newValue

        this.showNotificationMsg(pixKeyUpdated.data.msg, 'positive')
      } else {
        this.showNotificationMsg('Erro ao excluir a Chave...', 'negative')
      }
    },

    deletePixKeyDialog (keyData) {
      this.currentPixKey = keyData
      this.deleteMessage = `Tem certeza que deseja excluir a Chave Pix ${this.currentPixKey.value}?`
      this.deleteType = 'pix'
      this.showDeleteDialog = true
    },

    deleteBankDialog () {
      this.deleteMessage = `Tem certeza que deseja excluir o Banco ${this.localBankData.name} e todas as Chaves Pix associadas?`
      this.deleteType = 'bank'
      this.showDeleteDialog = true
    },

    async performDeletePix () {
      const pixKeyDeleted = await PixKeyService.deletePixKey(this.localBankData.code, this.currentPixKey.id)

      if (typeof pixKeyDeleted.status !== 'undefined' && pixKeyDeleted.status === 200) {
        this.localBankData.pix_keys = this.localBankData.pix_keys.filter(pixKey => pixKey.id !== this.currentPixKey.id)
        this.showNotificationMsg(pixKeyDeleted.data.msg, 'positive')
      } else {
        this.showNotificationMsg('Erro ao excluir a Chave...', 'negative')
      }
    },

    async performDeleteBank () {
      const bankDeleted = await BankService.deleteBank(this.localBankData.code)

      if (typeof bankDeleted.status !== 'undefined' && bankDeleted.status === 200) {
        this.showNotificationMsg(bankDeleted.data.msg, 'positive')
      } else {
        this.showNotificationMsg('Erro ao excluir o Banco...', 'negative')
      }
    },

    showNotificationMsg (message, color) {
      this.$q.notify({
        position: 'top',
        timeout: 2500,
        message,
        color
      })
    },
    test () {
      console.log('OK!!!')
    }
  },
  computed: {
    logoImage () {
      const initials = this.localBankData.name ? this.localBankData.name[0].toUpperCase() : ''

      return initials
    },
    avatarBackground () {
      return `background-color: ${this.avatarColor}`
    }
  },
  async created () {
    await this.setInitialValue()
  }
}
</script>

<style>
  .expansion-wrapper .q-item {
    padding: 0 .3rem;
  }

  .expansion-wrapper .q-item__section--main ~ .q-item__section--side {
    padding-left: 0;
  }

  .bank-image-wrapper {
    flex-direction: row;
    align-items: center;
    color: #777676;
  }
  .bankAvatar span {
    text-shadow: 1px 1px 2px rgba(0,0,0,.3);
  }

  .bank-item .q-item {
    border-radius: 5px;
  }

  .noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
