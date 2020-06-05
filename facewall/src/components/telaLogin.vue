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
          <v-card v-if="createAcc">
            <v-card-title>
              <span class="headline">User Profile</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="firstName"
                      label=" first name*"
                      :rules="[nameRules, $v.firstName.maxLength || 'max length exceeded' ]"
                      :counter="10"
                      required
                      :class="{alert:alert}"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="datas.middleName"
                      label=" middle name"
                      :rules="[nameRules, $v.datas.middleName.maxLength || 'max length exceeded' ]"
                      :counter="10"
                      required
                      :class="{alert:alert}"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="datas.lastName"
                      label=" last name*"
                      :rules="[nameRules, $v.datas.lastName.maxLength || 'max length exceeded']"
                      :counter="10"
                      required
                      :class="{alert:alert}"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="datas.email"
                      label="Email*"
                      hint="xxxxx@XXXXX.com"
                      :rules="[$v.datas.email.required && $v.datas.email.email ||
                  'Please a valid e-mail' ]"
                      persistent-hint
                      required
                      :class="{alert:alert}"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Password*" type="password" required :class="{alert:alert}"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <!--Data picker-->
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="datas.birthday"
                          label="Birthday"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                          :class="{alert:alert}"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="datas.birthday" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color @click="menu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="datas.phone"
                      :rules="[$v.datas.phone.numeric || 'Only numbers']"
                      label="phone*"
                      class="{hasError}"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-select
                      v-model="datas.estadoPicked"
                      hint="Select your State"
                      :items="estado"
                      item-text="state"
                      item-value="abbr"
                      label="Select"
                      persistent-hint
                      return-object
                      single-line
                      @change="estadoPick(index), showMunicipios = true"
                      :class="{alert:alert}"
                    ></v-select>
                    <v-select
                      v-model="datas.municipioPicked"
                      v-if="showMunicipios"
                      hint="Select your City"
                      :items="municipio"
                      item-text="state"
                      item-value="abbr"
                      label="Select"
                      persistent-hint
                      return-object
                      single-line
                      @change="estadoPick(index)"
                      :class="{alert:alert}"
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-radio-group v-model="datas.gender" label="Your gender">
                      <v-radio label="Male" value="Male"></v-radio>
                      <v-radio label="Female" value="Female"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>

                <label class="text-weight-200">
                  Upload your pic
                  <br />
                  <input type="file" @change="onFileChange" />
                </label>
              </v-container>
              <small>*indicates required field</small>
              <br />
              <v-alert
                v-if="alert"
                outline
                dark
                dense
                color="error"
                icon="warning"
                :value="true"
              >Please fill the fields</v-alert>
            </v-card-text>
            <v-card-actions @click="disable">
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="acc(), alert=false">Voltar</v-btn>
              <v-btn
                id
                text
                v-if="!this.$v.datas.$invalid && !this.$v.firstName.$invalid"
                color="blue darken-1"
                @click="  alert=false"
              >
                <router-link
                  :to="{name:'telaLogada', params: {firstName:firstName,
            middleName:datas.middleName, lastName:datas.lastName, email:datas.email,
              phone: datas.phone, estado: datas.estadoPicked,municipio
              : datas.municipioPicked, gender:datas.gender, bd:datas.birthday, pic: datas.pic } }"
                >enviar</router-link>
              </v-btn>

              <v-btn
                id
                text
                v-if="this.$v.datas.$invalid || this.$v.firstName.$invalid"
                color="blue darken-1"
                @click=" alert = true"
              >enviar</v-btn>
            </v-card-actions>
          </v-card>
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
          <v-card>
            <v-container v-if="entrar" grid-list-xs>
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
                      :append-icon="passwordVisibility ? 'visibility' : 'visibility_off'"
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
                    <v-btn color="blue darken-1" text @click="Entrar(), alert=false">Voltar</v-btn>
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
          </v-card>
          <!--Fim do entrar escolhido-->
        </v-dialog>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { required, numeric, email, maxLength } from 'vuelidate/lib/validators';

export default {
  name: 'HelloWorld',
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
  created() {
    this.estados1();
  },
  data() {
    return {
      dialog: true,
      firstName: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      datas: {
        middleName: '',
        lastName: '',
        email: '',
        phone: '',
        estadoPicked: [],
        municipioPicked: [],
        gender: '',
        birthday: '',
        pic: '',
      },

      date: new Date().toISOString().substr(0, 10),
      menu: false,
      createAcc: false,
      loginType: true,
      entrar: false,
      passwordVisibility: true,
      estados: [],
      estado: [],
      estadoId: [],
      municipios: [],
      municipio: [],
      estadoPicked: '',
      municipioPicked: '',
      showMunicipios: false,
      sexo: '',
      url: '',
      alert: false,
    };
  },
  watch: {},
  methods: {
    acc() {
      this.createAcc = !this.createAcc;
      this.loginType = !this.loginType;
    },
    Entrar() {
      this.entrar = !this.entrar;
      this.loginType = !this.loginType;
    },
    estados1() {
      const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
      axios.get(url).then((response) => {
        this.estados = response.data;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.estados.length; i++) {
          this.estado.push(this.estados[i].nome);
        }
      });
    },
    estadoPick() {
      const x = this.estado.indexOf(this.datas.estadoPicked);

      // eslint-disable-next-line no-multi-assign
      const y = (this.estadoId = this.estados[x].id);

      const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${y}/municipios`;
      axios.get(url).then((response) => {
        this.municipios = response.data;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.municipios.length; i++) {
          this.municipio.push(this.municipios[i].nome);
        }
      });
    },
    // eslint-disable-next-line no-unused-vars
    onFileChange(e) {
      // const file = e.target.files[0];
      // this.datas.pic = URL.createObjectURL(file);
      const file = document.querySelector('input[type=file]').files[0];
      const reader = new FileReader();
      // eslint-disable-next-line no-shadow
      reader.onload = (e) => {
        this.datas.pic = e.target.result;
      };
      reader.onerror = (error) => {
        alert(error);
      };
      reader.readAsDataURL(file);
    },
    disable() {
      if (this.$v.datas.$invalid) {
        this.disabled = false;
      }
    },
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
