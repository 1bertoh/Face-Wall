<template>
  <div id="bgc">
    <div>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-toolbar color="purple darken-4">
            <v-toolbar-title class="white--text display-1">
              <span>Face</span>
              <span class="font-weight-black">Wall</span>
            </v-toolbar-title>
          </v-toolbar>
          <!--tipo de login escolhido, cadastrar-->
          <div v-if="createAcc">
            <createAcc
            @acc = "acc()"></createAcc>
          </div>
          <!--fim do tipo  cadastrar-->

          <!--Escolha do tipo de login-->
          <v-card id="test">
            <v-container v-if="loginType" id="cont" grid-list-xs>
              <v-card-title justify-center>
                <v-layout row wrap id="test2">
                  <v-flex md12></v-flex>
                  <v-flex md12>
                    <v-card-title class="d-flex justify-center headline">Login</v-card-title>
                  </v-flex>

                  <v-flex xs12 md12 class="d-flex justify-center mb-6">
                    <v-btn
                      color
                      width="250"
                      class="my-4 purple darken-3 justify-center mb-6"
                      @click="Entrar"
                    >Entrar</v-btn>
                  </v-flex>

                  <v-flex xs12 md12 class="d-flex justify-center">
                    <v-btn width="250" class="my-4 purple darken-4" @click="acc">Cadastrar</v-btn>
                  </v-flex>
                </v-layout>
              </v-card-title>
            </v-container>
          </v-card>
          <!--fim da escolha do tipo de login-->

          <!--tipo entrar escolhido-->
          <v-card
          v-if="entrar">
            <compLoginAcc
            @entrar="Entrar">
            </compLoginAcc>
          </v-card>
          <!--Fim do entrar escolhido-->
        </v-dialog>
      </v-row>
    </div>
  </div>
</template>

<script>
import { required, numeric, email, maxLength } from 'vuelidate/lib/validators';
import createAcc from '@/components/telaLogin/createAcc';
import CompLoginAcc from '@/components/telaLogin/loginAcc';


export default {
  name: 'HelloWorld',
  components: {
    createAcc,
    CompLoginAcc,
  },
  validations: {
    firstName: {
      required,
      maxLength: maxLength(10),
    },
    datas: {
      middleName: {
        required,
        maxLength: maxLength(10),
      },
      lastName: {
        required,
        maxLength: maxLength(10),
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
        numeric,
      },
      municipioPicked: {
        required,
      },
      gender: {
        required,
      },
      birthday: {
        required,
      },
      pic: {
        required,
      },
    },
  },
  data() {
    return {
      dialog: true,
      createAcc: false,
      loginType: true,
      entrar: false,
    };
  },
  methods: {
    acc() {
      this.createAcc = !this.createAcc;
      this.loginType = !this.loginType;
    },
    Entrar() {
      this.entrar = !this.entrar;
      this.loginType = !this.loginType;
    },
    // eslint-disable-next-line no-unused-vars
  },
};
</script>

<style >
#bgc {
  background-color: #4a1488;
  height: 100vh;
}
/*.alert .v-text-field__slot, #input-837{

  padding-left: 1px;
border-left:3px solid red ;
border-radius:5px 0 0 5px ;
}*/
</style>
