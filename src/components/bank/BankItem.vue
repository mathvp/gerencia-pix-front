<template>
  <q-expansion-item>
    <template v-slot:header>
      <q-item-section avatar class="q-py-sm">
        <q-avatar class="bankAvatar text-bold" rounded :style="avatarBackground" text-color="white" size="60px">
          <span v-if="!localBankData.image">{{ logoImage }}</span>
          <img v-if="localBankData.image" :src="localBankData.image">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1" class="text-bold text-h6">{{ localBankData.name }}</q-item-label>
        <q-item-label class="keys-counter" caption lines="1">{{ keysCountText() }}</q-item-label>
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
            <p>Tem certeza que deseja excluir a Chave Pix <span class="text-bold">{{currentPixKey.value}}</span>?</p>
            <p>OBS.: Essa ação não pode ser desfeita</p>
          </div>
        </q-card-section>

        <q-card-actions class="row q-gutter-md">
          <div class="col-12 col-md-3">
          <q-btn label="Voltar" color="primary" class="q-px-lg" v-close-popup />
          </div>
          <div class="col-12 col-md-8">
          <q-btn @click="performDelete" label="Sim, quero excluir esta Chave" color="red-6" v-close-popup />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-expansion-item>
</template>

<script>
import PixKeyItem from './PixKeyItem'
import PixKeyService from '../../services/PixKeyService'

export default {
  name: 'BankItem',
  components: {
    'pix-key-item': PixKeyItem
  },
  data () {
    return {
      showDeleteDialog: false,
      showUpdateDialog: false,
      currentPixKey: {},
      localBankData: {}
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
    setInitialValue () {
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
      const userId = 1
      const pixKeyUpdated = await PixKeyService.updatePixKey(userId, this.localBankData.code, keyData)

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
      this.showDeleteDialog = true
    },

    async performDelete () {
      const userId = 1
      const pixKeyDeleted = await PixKeyService.deletePixKey(userId, this.localBankData.code, this.currentPixKey.id)

      if (typeof pixKeyDeleted.status !== 'undefined' && pixKeyDeleted.status === 200) {
        this.localBankData.pix_keys = this.localBankData.pix_keys.filter(pixKey => pixKey.id !== this.currentPixKey.id)
        this.showNotificationMsg(pixKeyDeleted.data.msg, 'positive')
      } else {
        this.showNotificationMsg('Erro ao excluir a Chave...', 'negative')
      }
    },

    showNotificationMsg (message, color) {
      this.$q.notify({
        position: 'top',
        timeout: 2500,
        message,
        color
      })
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
  created () {
    this.setInitialValue()
  }
}
</script>

<style>
  .bankAvatar span {
    text-shadow: 1px 1px 2px rgba(0,0,0,.3);
  }
</style>
