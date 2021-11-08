<template>
  <q-page class="login-bg">
    <div class="column items-center">
      <div class="col column items-center">
        <img src="../assets/pix-logo.png" class="pix-logo" alt="Gerencia PIX">
        <div class="text-h3 text-bold text-white q-my-xl app-name">
          Gerencia PIX
        </div>
        <div class="form-wrapper">
          <q-form
            @submit="onSubmit"
            class="q-mb-md"
          >
            <q-input
              filled
              square
              class="full-width"
              color="primary"
              v-model="email"
              @input="v => { email = v.toLowerCase()}"
              @focus="emailFocused"
              label="Email"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Informe seu email']"
            />

            <q-input
              filled
              square
              class="full-width q-mt-sm"
              :type="isPwd ? 'password' : 'text'"
              v-model="password"
              label="Senha"
              lazy-rules
              :rules="[
                val => val !== null && val !== '' || 'Informe sua senha'
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-btn
              size="lg"
              label="Login"
              class="full-width q-my-md"
              type="submit"
              color="red-6"
            />
          </q-form>

          <router-link
            class="text-white text-body2 create-account-link"
            :to="{ name: 'register' }"
          >
            Ainda não tem uma conta? Clique aqui
          </router-link>
        </div>
      </div>
    </div>

    <q-dialog v-model="loginError">
      <q-card>
        <q-card-section>
          <div class="text-h6">Erro</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{errorMessage}}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import AccountService from '../services/AccountService'

export default {
  data () {
    return {
      isPwd: true,
      email: null,
      password: null,
      loginError: false,
      errorMessage: '',
      myNotify: () => undefined,
      messages: [
        'Você precisa estar logado para acessar esse recurso'
      ]
    }
  },

  methods: {
    onSubmit () {
      this.showLoading()

      this.login().then(async (res) => {
        if (res.status === 200 || res.status === 201) {
          await this.$router.push({ name: 'index' })
          return
        }
        this.$q.loading.hide()
        this.errorMessage = res.message
        this.loginError = true
      })
    },
    async login () {
      return await AccountService.login(this.email, this.password)
    },
    showLoading () {
      this.$q.loading.show({
        message: 'Verificando suas credenciais... Aguarde...'
      })
    },
    emailFocused () {
      this.myNotify()
    }
  },
  mounted () {
    const showMessage = this.$route.params.msg ? this.$route.params.msg : null

    if (!(showMessage === null || (showMessage - 1) > this.messages.length)) {
      this.myNotify()
      this.myNotify = this.$q.notify({
        type: 'warning',
        message: this.messages[showMessage - 1]
      })
    }
  },
  beforeDestroy () {
    this.$q.loading.hide()
  }
}
</script>

<style scoped>
.login-bg::before {
  background-image: url('../assets/login-bg.jpg');
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(.16rem);
  position: absolute;
  content: "";
}

.login-bg {
  position: relative;
}

.login-bg > .column {
  position: relative;
  background-image:
  linear-gradient(
    rgba(50, 188, 123, 0.8),
      rgba(50, 188, 173, 0.8)
    );
  min-height: 100vh;
  height: 100%;
  width: 100%;
}

.pix-logo {
  width: 8rem;
  margin: 5.5rem 0 0 0;
}

.login-bg .text-h3 {
  text-shadow: 0 .7rem 2rem rgba(7, 102, 93, 0.6);
}

.form-wrapper {
  width: 100%;
  max-width: 300px;
}

.create-account-link {
  text-decoration: none;
  text-shadow: 0 1px .25rem rgb(0, 36, 33);
}

@media (max-width: 920px) {
  .pix-logo {
    margin: 3rem 0 0 0;
  }
}

.app-name {
  margin-top: 18px;
}
</style>

<style>
.q-field--filled.q-field--highlighted .q-field__control::before,
.q-field--filled .q-field__control::before {
  background: rgb(255, 255, 255);
  opacity: 1;
}
</style>
