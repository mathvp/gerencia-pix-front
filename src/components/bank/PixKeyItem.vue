<template>
  <q-card class="q-mb-sm bg-grey-2" flat bordered>
    <q-item clickable v-ripple>
      <q-item-section @click="copyPixKey(pixKeyData.value)">
        <span class="text-caption">Chave {{pixKeyData.id}}:</span> <span class="text-bold text-body1">{{pixKeyData.value}}</span>
      </q-item-section>
      <q-item-section top side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn size="12px" @click="copyPixKey(pixKeyData.value)" flat dense round icon="content_copy" />
          <q-btn-dropdown flat dense round dropdown-icon="more_vert" >
            <q-list>
              <q-item clickable @click="onItemClick">
                <q-item-section side>
                  <q-icon color="primary" name="edit" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-primary">Editar Chave</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section side>
                  <q-icon color="negative" name="delete" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-negative">Excluir Chave</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script>
import { copyToClipboard } from 'quasar'

export default {
  name: 'PixKeyItem',
  props: {
    pixKeyData: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    copyPixKey (keyValue) {
      copyToClipboard(keyValue)
        .then(() => {
          this.showNotificationMsg('Chave copiada com sucesso!', 'positive')
        })
        .catch(() => {
          this.showNotificationMsg('Erro ao copiar a Chave...', 'negative')
        })
    },
    showNotificationMsg (message, color) {
      this.$q.notify({
        position: 'top',
        timeout: 2500,
        message,
        color
      })
    },
    onItemClick () {
      console.log('Clicked on an Item', this.pixKeyData.value)
    }
  }
}
</script>
