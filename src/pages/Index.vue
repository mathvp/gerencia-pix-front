<template>
  <q-page class="bg-grey-2">
    <bank-list />
    <q-page-sticky position="bottom-right" :offset="[50, 50]">
        <q-btn push fab icon="add" color="primary" :to="{ name: 'addBank' }" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import BankList from '../components/bank/BankList.vue'

export default {
  name: 'PageIndex',
  components: {
    'bank-list': BankList
  }
}
</script>
