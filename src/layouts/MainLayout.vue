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
        <q-item
          clickable
          @click="confirmLogout = true"
          exact
        >
          <q-item-section
            side
          >
            <q-icon name="logout" color="primary" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Sair</q-item-label>
            <q-item-label caption>
              Logout
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-dialog v-model="confirmLogout">
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="logout" color="primary" text-color="white" />
            <span class="q-ml-sm">Tem certeza que deseja Sair?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Sim" color="primary" :to="{ name: 'logout' }" />
            <q-btn flat label="Não" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
    title: 'Início',
    caption: 'Voltar para tela inicial',
    icon: 'home',
    link: { name: 'index' }
  },
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
    link: { name: 'addPixKey' }
  }
]

export default {
  name: 'MainLayout',
  components: { SideMenu },
  data () {
    return {
      leftDrawerOpen: false,
      menuLinks: linksData,
      confirmLogout: false
    }
  }
}
</script>
