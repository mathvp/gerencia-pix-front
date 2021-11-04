<template>
  <q-page class="login-bg">
    <div class="column items-center">
      <div class="col column items-center">
        <div class="row full-width q-mt-xl">
          <div class="col-2">
            <img src="../assets/pix-logo.png" class="pix-logo" alt="Gerencia PIX">
          </div>
          <div class="col-10 q-pt-md">
            <span class="text-h4 text-bold text-white">Gerencia PIX</span>
          </div>
        </div>
        <q-card flat bordered class="my-card q-mt-lg q-mb-xl q-pa-lg">
          <q-card-section>
            <div class="text-h4 text-bold">Cadastro</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="q-mb-lg">
              <p>
                Preencha com seus dados e clique no botão Cadastrar para criar uma conta.
              </p>
            </div>
            <q-form
              @submit="onSubmit"
              class="q-my-md"
              ref="register-form"
            >
              <q-input
                filled
                square
                class="full-width q-mb-lg q-mt-md"
                color="primary"
                v-model="first_name"
                label="Nome"
                hint="Apenas o primeiro nome. Ex.: João"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Informe seu Nome']"
              />
              <q-input
                filled
                square
                class="full-width q-mb-lg"
                color="primary"
                v-model="last_name"
                label="Sobrenome"
                hint="Ex.: da Silva"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Informe seu Sobrenome']"
              />
              <q-input
                filled
                square
                class="full-width q-mb-lg"
                color="primary"
                v-model="email"
                type="email"
                label="Email"
                hint="Um email válido"
                lazy-rules
                :rules="[
                  val => val && val.length > 0 || 'Informe seu email',
                  val => validateEmail(val) || 'Informe um email válido'
                ]"
              />

              <q-input
                filled
                square
                class="full-width q-mb-lg"
                :type="isPwd ? 'password' : 'text'"
                v-model="password"
                label="Senha"
                hint="No mínimo 6 caracteres"
                lazy-rules
                :rules="[
                  val => val !== null && val !== '' || 'Informe sua senha',
                  val => val.length >= 6 || 'A senha deve conter 6 ou mais caracteres',
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
              <q-input
                filled
                square
                class="full-width q-mb-lg"
                :type="isPwd ? 'password' : 'text'"
                v-model="passwordCopy"
                label="Repita a Senha"
                hint="A mesma que o campo anterior"
                lazy-rules
                :rules="[ val => validatePass(val) || 'As senhas não conferem' ]"
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
                label="Cadastrar"
                class="full-width q-my-md"
                type="submit"
                color="red-6"
              />
            </q-form>
            <q-btn
              flat
              color="primary"
              label="Voltar"
              icon="arrow_back"
              :to="{ name:'login' }"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="formSent">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{responseTitle}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{responseMessage}}
        </q-card-section>

        <q-card-section v-if="responseErrors.length" class="q-pt-none">
          <div v-for="(error, index) in responseErrors" :key="index">{{error}}</div>
        </q-card-section>

        <q-card-section v-if="!responseErrors.length" class="q-pt-none">
          Aguarde {{counter}}...
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-if="responseErrors.length" label="OK" color="primary" v-close-popup />
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
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      passwordCopy: null,
      isPwd: true,
      responseTitle: '',
      responseMessage: '',
      responseErrors: [],
      counter: 5,
      formSent: false
    }
  },

  methods: {
    validatePass (password) {
      return password === this.password
    },
    validateEmail (mail) {
      return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)
    },
    async onSubmit (event) {
      event.preventDefault()
      const valid = await this.$refs['register-form'].validate()

      if (valid) {
        this.responseTitle = ''
        this.responseMessage = ''
        this.responseErrors = []
        this.sendForm()
      }
    },
    async sendForm () {
      const response = await AccountService.register({
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password
      }).then((res) => {
        if (res.status === 200) {
          this.responseTitle = 'Tudo certo!'
          this.responseMessage = 'Sua conta foi criada com sucesso! Iremos te redirecionar para o Login'
          return true
        }

        this.responseTitle = 'Erro'
        this.responseMessage = (this.responseErrors.length === 1) ? 'Houve um erro ao tentar criar a conta:' : 'Houveram erros ao tentar criar a conta:'
        this.responseErrors.push(res.message)

        return false
      }).catch((err) => {
        this.responseTitle = 'Erro'
        this.responseMessage = 'Houve um erro ao criar a conta'
        this.responseErrors.push('Tente novamente')
        console.log(err)

        return false
      }).finally(() => {
        this.formSent = true
      })

      if (response) {
        this.redirect(5)
      }
    },
    redirect (time) {
      this.counter = time
      const timer = setInterval(() => {
        if (this.counter === 1) {
          clearInterval(timer)
          this.$router.push({ name: 'login' })
        }
        this.counter -= 1
      }, 1000)
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
  width: 4rem;
}

.text-h4.text-bold.text-white {
  text-shadow: 0 .7rem 2rem rgba(7, 102, 93, 0.6);
}

</style>
