/* eslint-disable no-const-assign */
<!--!!!COLOCAR ROTA NO PROFILE!!!-->
<template>
  <div id="fundo">
    <!--Menu nav-->
    <div class>
      <v-toolbar dark class="purple darken-4">
        <v-toolbar-title class="white--text display-1">
          <span>Face</span>
          <span class="font-weight-black">Wall</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn fab text class="hidden-md-and-up" :to="{name:'chatRoom'}">
          <v-icon>chat_bubble</v-icon>
        </v-btn>
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn color dark fab text v-on="on">
              <v-avatar
                size="avatarSize"
                color="red"
                width="55"
              >
                <img :src="$route.params.pic" alt />
              </v-avatar>
                
              </v-btn>
            </template>
            <v-list>
              <v-list-item disabled v-for="(item, index) in items" :key="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-toolbar>
    </div>
    <!--Fim menu nav-->
    <v-container grid-list-xs>
      <v-card>
        <v-row>
          <v-col cols="12" md="4" class="d-sm-flex d-flex justify-center">
            <v-avatar width="180" height="180">
              <img :src="dados.pic" alt />
            </v-avatar>
          </v-col>
          <v-col cols="12" md="8" class="d-sm-flex justify-center d-flex justify-center">
            <v-card-title class="display-2">{{nome}}</v-card-title>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="profile" cols="12" md="4">
            <span class="font-weight-bold">Gender:</span>
            {{dados.gender}}
          </v-col>
          <v-col class="profile" cols="12" md="4">
            <span class="font-weight-bold">Email:</span>
            {{dados.email}}
          </v-col>
          <v-col class="profile" cols="12" md="4">
            <span class="font-weight-bold">Username:</span>
            {{nome}}
          </v-col>
        </v-row>
        <v-row>
          <v-col class="profile" cols="12" md="4">
            <span class="font-weight-bold">State:</span>
            {{dados.estadoPicked}}{{dados.estado}},
            <span class="font-weight-bold">City:</span>
            {{dados.municipioPicked}}{{dados.municipio}}
          </v-col>
          <!-- ao clicar abrira uma lista de endereços usando o v-if-->
          <v-col class="profile" cols="12" md="4">
            <span class="font-weight-bold">Phone:</span>
            {{dados.phone}}
          </v-col>
          <v-col class="profile" cols="12" md="4">
            <span class="font-weight-bold">Work:</span>
            N/A
          </v-col>
        </v-row>
        <v-row>
          <v-col class="profile" cols="12" md="4">
            <span class="font-weight-bold">Birthday:</span>
            {{dados.bd}}
          </v-col>
          <v-col class="profile" cols="12" md="4">
            <span class="font-weight-bold">Age:</span>
            {{age}}
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'profile',
  created() {
    this.friendsList();
    this.idade();
  },
  data() {
    return {
      friends: [],
      nome: `${this.$route.params.firstName} ${this.$route.params.middleName} ${this.$route.params.lastName}`,
      dados: this.$route.params,
      idadebd: this.$route.params.bd,
      age: '',
    };
  },
  methods: {
    friendsList() {
      this.load = true;
      const url = 'https://jsonplaceholder.typicode.com/users';
      axios.get(url).then((response) => {
        this.friends = response.data;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.friends.length; i++) {
          this.friends[i].pic = `./static/friend${i + 1}.jpg`;
        }
      });
    },
    idade() {
      const date = new Date().toISOString().substr(0, 10);
      const dataNasc = this.idadebd.split('-');
      const ano = dataNasc[0];
      const mes = dataNasc[1];
      const dia = dataNasc[2];

      const dataAtu = date.split('-');
      const anoAtual = dataAtu[0];
      const mesAtual = dataAtu[1];
      const diaAtual = dataAtu[2];

      let idade = anoAtual - ano;
      if (mesAtual < mes || (mesAtual === mes && diaAtual < dia)) {
        // eslint-disable-next-line no-plusplus
        idade--;
      }

      idade = idade < 0 ? 0 : idade;

      this.age = idade;
    },
  },
};
</script>
<style lang=''>
#fundo {
  background-color: #79109e;
  height: 100%;
}
.profile {
  padding-left: 5em;
}
</style>
