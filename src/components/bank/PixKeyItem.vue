<template>
  <q-card class="q-mb-sm bg-grey-2" flat bordered>
    <q-item :clickable="!editPix">
      <q-item-section>
        <span class="text-caption">Chave {{pixKeyData.id}}:</span>
        <div class="row">
          <div class="col-12">
          <q-input
            ref="pixVal"
            class="text-bold text-body1 pix-key-value"
            v-model="pixKeyValue"
            :readonly="!editPix"
            :filled="editPix"
            :outlined="editPix"
            @blur="() => { editPix = false}"
            @click="copyPixKey(pixKeyData.value)"
          />
          </div>
          <q-btn
            color="primary"
            icon="save"
            label="Salvar"
            class="q-my-sm"
            v-if="editPix"
            @click="updatePixKeyAction"
          />
        </div>
      </q-item-section>
      <q-item-section top side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn size="12px" class="copy-pix-key" @click="copyPixKey(pixKeyData.value)" flat dense round icon="content_copy" />
          <q-btn-dropdown flat dense round dropdown-icon="more_vert" >
            <q-list>
              <q-item clickable @click="editAction">
                <q-item-section side>
                  <q-icon color="primary" name="edit" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-primary">Editar Chave</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="deleteAction">
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
      default: () => {
        return {
          id: null,
          bank_code: null,
          value: '',
          user_id: null
        }
      }
    }
  },
  data () {
    return {
      pixKeyValue: '',
      editPix: false
    }
  },
  methods: {
    setInitialValue () {
      this.pixKeyValue = this.$props.pixKeyData.value
    },
    copyPixKey (keyValue) {
      if (this.editPix) {
        return
      }

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
    editAction () {
      this.editPix = true
      this.$refs.pixVal.focus()
    },
    updatePixKeyAction () {
      this.$emit('update-item', {
        id: this.pixKeyData.id,
        newValue: this.pixKeyValue
      })

      this.editPix = false
    },
    deleteAction () {
      this.$emit('delete-item', this.pixKeyData)
    }
  },
  created () {
    this.setInitialValue()
  }
}
</script>
