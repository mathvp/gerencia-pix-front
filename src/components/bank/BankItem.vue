<template>
  <q-expansion-item>
    <template v-slot:header>
      <q-item-section avatar class="q-py-sm">
        <q-avatar rounded size="60px">
          <img :src="bankData.iconSrc">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1" class="text-bold text-h6">{{ bankData.name }}</q-item-label>
        <q-item-label caption lines="1">{{keysCountText()}}</q-item-label>
      </q-item-section>
    </template>

    <q-card class="q-mb-lg">
      <q-card-section>
        <p class="text-grey-8 text-caption" v-if="bankData.keys">Clique sobre a Chave para copiar</p>
          <pix-key-item v-for="pixKey in bankData.keys" :key="pixKey.id" :pixKeyData="pixKey" />
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
      default: () => {}
    }
  },
  methods: {
    keysCountText () {
      const keysQtd = this.bankData.keys ? this.bankData.keys.length : 0

      if (keysQtd > 0) {
        return keysQtd === 1 ? '1 Chave cadastrada' : `${keysQtd} Chaves cadastradas`
      }

      return 'Nenhuma Chave cadastrada'
    }
  }
}
</script>
