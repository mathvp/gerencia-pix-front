<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-icon name="pix" size="md" />
          Gerenciador Chaves Pix
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menu
        </q-item-label>
        <SideMenu
          v-for="link in menuLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import SideMenu from 'src/components/SideMenu.vue'

const linksData = [
  {
    title: 'Cadastrar Banco',
    caption: 'Instituições Financeiras',
    icon: 'account_balance',
    link: { name: 'addBank' }
  },
  {
    title: 'Cadastrar Chave',
    caption: 'Pix',
    icon: 'pix',
    link: { name: 'addBank' }
  }
]

export default {
  name: 'MainLayout',
  components: { SideMenu },
  data () {
    return {
      leftDrawerOpen: false,
      menuLinks: linksData
    }
  }
}
</script>
