<template>
  <q-item
    clickable
    :to="link"
  >
    <q-item-section
      v-if="icon"
      side
    >
      <q-icon :name="icon" color="primary" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'SideMenu',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: Object,
      default: () => {
        return { name: 'index' }
      }
    },

    icon: {
      type: String,
      default: ''
    }
  }
}
</script>
