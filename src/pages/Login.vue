<template>
  <q-page class="login-bg">
    <div class="column items-center">
      <div class="col column items-center">
        <img src="../assets/pix-logo.png" class="pix-logo" alt="Gerencia PIX">
        <div class="text-h3 text-bold text-white q-my-xl">
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
              label="Email"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Informe seu email']"
            />

            <q-input
              filled
              square
              class="full-width q-mt-sm"
              type="password"
              v-model="password"
              label="Senha"
              lazy-rules
              :rules="[
                val => val !== null && val !== '' || 'Informe sua senha'
              ]"
            />
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
            :to="{ path: '#' }"
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
import LoginService from '../services/LoginService'

export default {
  data () {
    return {
      email: null,
      password: null,
      loginError: false,
      errorMessage: ''
    }
  },

  methods: {
    onSubmit () {
      this.login().then((res) => {
        if (res.status === 200 || res.status === 201) {
          this.$router.push({ name: 'index' })
        }
        this.errorMessage = res.message
        this.loginError = true
      })
    },
    async login () {
      return await LoginService.login(this.email, this.password)
    }
  }
}
</script>

<style>
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

.q-field--filled.q-field--highlighted .q-field__control::before,
.q-field--filled .q-field__control::before {
  background: rgb(255, 255, 255);
  opacity: 1;
}

.form-wrapper {
  width: 100%;
  max-width: 300px;
}

.create-account-link {
  text-decoration: none;
  text-shadow: 0 1px .25rem rgb(0, 36, 33);
}
</style>
