<template>
    <div>
        <v-container  grid-list-xs>
              <v-layout row wrap>
                <v-flex cols="12" md="12" sm="12" xs="12" class="d-flex justify-center">
                  <v-col cols="12" md="12" sm="8" xs="8" class="d-flex justify-center">
                    <v-text-field
                      width="50px"
                      v-model="firstName"
                      label="Nome"
                      :rules="nameRules"
                      :counter="10"
                      required
                    ></v-text-field>
                  </v-col>
                </v-flex>

                <v-flex sm11 xs10 class="d-sm-flex d-flex justify-center">
                  <v-col cols="12" md="12" sm="12" xs="12">
                    <v-text-field
                      width="10"
                      name="name"
                      label="Senha"
                      hint="Pelo menos 8 letras"
                      min="8"
                      :append-icon="passwordVisibility ? 'visibility_off' : 'visibility'"
                      @click:append="passwordVisibility = !passwordVisibility"
                      passwordVisibility="Password"
                      :type="passwordVisibility ? 'password' : 'text'"
                    ></v-text-field>
                  </v-col>
                </v-flex>
                <v-col>
                  <v-alert
                    v-if="alert"
                    outline
                    dark
                    dense
                    color="error"
                    icon="warning"
                    :value="true"
                  >Please fill the fields</v-alert>
                </v-col>

                <v-col cols="12" class="d-sm-flex justify-center">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="$emit('entrar'), alert=false">Voltar</v-btn>
                    <v-btn v-if="!this.$v.firstName.$invalid" color="blue darken-1" text>
                      <router-link
                        :to="{name:'telaLogada',
                  params: {firstName:firstName, middleName:'Sousa', lastName:'Jackson',
                  email:`${firstName}SJ@gmail.com`, phone: 2245865645,
                  estado: 'São Paulo',municipio: 'São Paulo', gender:'Female',
                  bd:'1997-02-26', pic: '/static/kitty.png'} }"
                      >log in</router-link>
                    </v-btn>
                    <v-btn
                      v-if=" this.$v.firstName.$invalid"
                      color="blue darken-1"
                      text
                      @click="alert=true"
                    >log in</v-btn>
                  </v-card-actions>
                </v-col>
              </v-layout>
            </v-container>
    </div>
</template>
<script>
import { required, maxLength } from 'vuelidate/lib/validators';

export default {
    name: 'LoginAcc',
    validations: {
    firstName: {
      required,
      maxLength: maxLength(10),
    },
    },
    data() {
        return {
            firstName: null,
            nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      passwordVisibility: true,
      alert: false,
        }
    },
}
</script>
