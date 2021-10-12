<template>
  <q-expansion-item>
    <template v-slot:header>
      <q-item-section avatar class="q-py-sm">
        <q-avatar class="bankAvatar text-bold" rounded :style="avatarBackground" text-color="white" size="60px">
          <span v-if="!bankData.image">{{ logoImage }}</span>
          <img v-if="bankData.image" :src="bankData.image">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1" class="text-bold text-h6">{{ bankData.name }}</q-item-label>
        <q-item-label class="keys-counter" caption lines="1">{{ keysCountText() }}</q-item-label>
      </q-item-section>
    </template>

    <q-card class="q-mb-lg">
      <q-card-section>
        <p class="text-grey-8 text-caption" v-if="bankData.pix_keys">Clique sobre a Chave para copiar</p>
          <pix-key-item v-for="pixKey in bankData.pix_keys" :key="pixKey.id" :pixKeyData="pixKey" />
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
import PixKeyItem from './PixKeyItem'

export default {
  name: 'BankItem',
  components: {
    'pix-key-item': PixKeyItem
  },
  data () {
    return {}
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
    keysCountText () {
      const keysQtd = this.bankData.pix_keys ? this.bankData.pix_keys.length : 0

      if (keysQtd > 0) {
        return keysQtd === 1 ? '1 Chave cadastrada' : `${keysQtd} Chaves cadastradas`
      }

      return 'Nenhuma Chave cadastrada'
    }
  },
  computed: {
    logoImage () {
      const initials = this.bankData.name ? this.bankData.name[0].toUpperCase() : ''

      return initials
    },
    avatarBackground () {
      return `background-color: ${this.avatarColor}`
    }
  }
}
</script>

<style>
  .bankAvatar span {
    text-shadow: 1px 1px 2px rgba(0,0,0,.3);
  }
</style>
