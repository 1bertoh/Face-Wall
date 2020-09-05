<template>
    <v-card>
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
                    <v-text-field
                      :append-icon="passwordVisibility ? 'visibility_off' : 'visibility'"
                      @click:append="passwordVisibility = !passwordVisibility"
                      passwordVisibility="Password"
                      :type="passwordVisibility ? 'password' : 'text'"
                      label="Password*" 
                      required
                      :class="{alert:alert}"
                    >
                    </v-text-field>
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
                <v-file-input
                @change="onFileChange"
                accept="image/png, image/jpeg, image/bmp"
                prepend-icon="mdi-camera"
                label="Upload your pic"
              ></v-file-input>
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
              <v-btn color="blue darken-1" text @click="$emit('acc'), alert=false">Voltar</v-btn>
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
                >
                  enviar
                </router-link>
              </v-btn>

              <v-btn
                id
                text
                v-if="this.$v.datas.$invalid || this.$v.firstName.$invalid"
                color="blue darken-1"
                @click=" alert = true"
              >
                enviar
              </v-btn>
            </v-card-actions>
    </v-card>
</template>
<script>
import { required, numeric, email, maxLength } from 'vuelidate/lib/validators';
import axios from 'axios'

export default {
  name: 'createAcc',
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
      passwordVisibility: true,
      estados: [],
      estado: [],
      estadoId: [],
      municipios: [],
      municipio: [],
      showMunicipios: false,
      sexo: '',
      url: '',
      alert: false,
    };
  },
  watch: {},
  methods: {
    estados1() {
      axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then((response) => {
        this.estados = response.data.sort((a, b) => {
          if (a.nome < b.nome) {
            return -1;
          }
        }); // serve para pegar dados, e ordená-los
        this.estado = this.estados.map((estate) => {
          return estate.nome;
        });
      });
    },
    estadoPick() {
      this.municipio = []; // sempre q pickar um novo estado reseta municipo
      const x = this.estado.indexOf(this.datas.estadoPicked);
      const y = this.estados[x].id;
      axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${y}/municipios`).then((response) => {
        this.municipios = response.data;
        this.municipio = this.municipios.map((municipio) => {
          return municipio.nome;
        });
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
