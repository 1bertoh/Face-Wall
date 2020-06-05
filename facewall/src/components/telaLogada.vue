<template>
  <div id="fundo" class>
    <!--Menu nav-->
    <v-app-bar fixed hide-on-scroll dark class="purple darken-4">
      <v-toolbar-title class="white--text display-1">
        <span @click="go">Face</span>
        <span class="font-weight-black">Wall</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
        fab
        text
        class="hidden-md-and-up"
        :to="{name:'chatRoom', params: {chat: conversation}}"
      >
        <v-icon>chat_bubble</v-icon>
      </v-btn>
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn color dark fab text v-on="on">
              <v-avatar size color="red" width="55">
                <img :src="picture" alt />
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item>{{items[0].title}}</v-list-item>
              <br />
            </v-list-item>
            <v-list-item
              :to="{name:'profile',
              params: {firstName: this.$route.params.firstName, middleName:
              this.$route.params.middleName, lastName: this.$route.params.lastName,
              email: this.$route.params.email, phone: this.$route.params.phone,
              estado: this.$route.params.estado, municipio: this.$route.params.municipio,
              gender:this.$route.params.gender, bd:this.$route.params.bd,
              pic: this.$route.params.pic } }">
              <v-list-item>Profile</v-list-item>
              <br />
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <!--Fim menu nav-->
    <!--compnente de posts-->
    <FriendsPosts class="mt-12" />
    <!--Essa é a barra mostrada qnd o minichat esta minimizado-->
    <v-flex md6>
      <div id="chatWindow2" v-show="tool" class="hidden-sm-and-down" style>
        <v-toolbar dense dark color="primary">
          <v-toolbar-title>{{friends[cn].name}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon @click="tool  = false">close</v-icon>
          <v-icon @click="tool = true">minimize</v-icon>
          <v-icon @click="tool = false, miniChat = true">launch</v-icon>
        </v-toolbar>
      </div>
      <!--Fim da da barra-->
      <!--Mini janela de chat-->
      <div id="teste" class="hidden-sm-and-down">
        <div id="chatWindow" v-show="miniChat" class="hidden" style>
          <v-toolbar dense dark color="primary">
            <v-toolbar-title>{{friends[cn].name}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon @click="miniChat = false">close</v-icon>
            <v-icon @click="miniChat = false, tool = true">minimize</v-icon>
            <v-icon @click="minmax = true">launch</v-icon>
          </v-toolbar>
          <v-container v-show="minmax">
            <div id="chatbox">
              <v-list id="msgArea" class="px-2">
                <v-avatar size="avatarSize" color="red" width="30" height="30">
                  <img :src="this.friends[cn].pic" alt="alt" />
                </v-avatar>
                <div v-for="(chat, index) in conversation[cn]" :key="chat.index">
                  <p v-show="chat.received" id="p1">
                    <span class="caption">{{chat.recTime}}</span>
                    <br />
                    <span>{{chat.received}}</span>
                  </p>
                  <v-spacer></v-spacer>
                  <p id="p2" class="text-right">
                    <span class="caption">{{chat.sentTime}}</span>
                    <br />
                    <span class="pr-2">{{chat.sent}}</span>
                  </p>
                </div>
              </v-list>
              <v-text-field
                class="blue-grey lighten-2"
                tile
                v-model="chattxt"
                name="name"
                label="message"
                multi-line
                append-outer-icon="send"
                @click:append-outer="sendMsg"
                id="chatField"
              ></v-text-field>
            </div>
          </v-container>
        </div>
        <!--fim da mini chanela-->
        <!--botao pra abrir drawer-->
        <div id="doi">
          <v-container class="fill-height">
            <v-btn id="oi" elevation-14 color="lime" dark @click.stop="drawer = !drawer">
              <v-icon>people</v-icon>
            </v-btn>
          </v-container>
          <!--fim do botão-->
          <!-- drawer  com a lsita de amgs-->
          <v-navigation-drawer class="purple lighten-1" v-model="drawer" absolute right>
            <v-app-bar dark class="purple darken-3 #">
              <v-text-field width="80%"
              name="name"
              label="friends"
              id="id"
              prepend-icon="search">
              </v-text-field>
            </v-app-bar>
            <v-divider></v-divider>
            <v-list shaped>
              <v-list-item
                v-for="(friend, index) in friends"
                :key="index"
                @click="aviso(index), miniChat= true"
              >
                <v-list-item-avatar>
                  <v-img :src="friend.pic"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{friend.name}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list dense>
              <v-list-item v-for="item in items" :key="item.title" link>
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </div>
      </div>
    </v-flex>
  </div>
</template>

<script>
import axios from 'axios';
import FriendsPosts from './posts/FriendsPosts';

export default {
  name: 'telaLogada',
  created() {
    this.friendsList();
    this.postsList();
    this.foto();
  },
  components: { FriendsPosts },

  data() {
    return {
      img: './assets/icon-user.png',
      nome: this.$route.params.firstName,
      picture: this.$route.params.pic,
      dados: this.$route.params,
      items: [
        {
          title: `${this.$route.params.firstName} ${this.$route.params.middleName} ${this.$route.params.lastName}`,
        },
      ],
      friends: [],
      posts: [],
      load: false,
      cn: 0,
      drawer: false,
      value: true,
      miniChat: false,
      minmax: true,
      chattxt: '',
      tool: false,
      online: true,
      offline: false,
      conversation: [
        [
          {
            // cada index é um id, dentro to index a ordem é receivedTime, received, sentTime e sent
            received: 'oi',
            recTime: '18:30',
            sent: 'oiiw',
            sentTime: '18:31',
          },
        ],
        [
          {
            received: 'oin',
            recTime: '04:13',
            sent: 'saiu?',
            sentTime: '07:56',
          },
        ],
        [
          {
            received: 'hello',
            recTime: '13:13',
            sent: 'hi',
            sentTime: '15:15',
          },
        ],
        [
          {
            received: 'hola!',
            recTime: '15:78',
            sent: 'que tal?',
            sentTime: '14:17',
          },
        ],
        [
          {
            received: '14+17=?',
            recTime: '14:17',
            sent: 'não sei',
            sentTime: '22:48',
          },
        ],
        [
          {
            received: 'nihao',
            recTime: '12:30',
            sent: 'nihao',
            sentTime: '12:35',
          },
        ],
        [
          {
            received: 'ohayo',
            recTime: '20:14',
            sent: 'ohayo',
            sentTime: '22:49',
          },
        ],
        [
          {
            received: 'xablau',
            recTime: '15:38',
            sent: 'gluglu ie ie',
            sentTime: '14:09',
          },
        ],
        [
          {
            received: 'vem?',
            recTime: '03:45',
            sent: 'vou',
            sentTime: '03:46',
          },
        ],
        [
          {
            received: 'olha',
            recTime: '06:30',
            sent: 'elaaa!',
            sentTime: '09:22',
          },
        ],
      ],
    };
  },
  watch: {},

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
    aviso(index) {
      this.cn = index;
    },
    sendMsg() {
      if (this.chattxt.trim() === '') {
        this.alertPost = true;
        return;
      }
      const d = new Date();
      const hours = d.getHours();
      const minutes = d.getMinutes();
      this.conversation[this.cn].push({
        sentTime: `${hours}: ${minutes}`,
        sent: this.chattxt,
      });
      this.chattxt = '';
    },
    postsList() {
      this.load = true;
      const url = 'https://jsonplaceholder.typicode.com/posts';
      axios
        .get(url)
        .then((response) => {
          this.posts = response.data;
        })
        .finally(() => {
          this.load = false;
        });
    },
    go() {
      this.$router.push({
        name: 'profile',
        params: {
          firstName: this.$route.params.firstName,
          middleName: this.$route.params.middleName,
          lastName: this.$route.params.lastName,
          email: this.$route.params.email,
          phone: this.$route.params.phone,
          estado: this.$route.params.estadoPicked,
          municipio: this.$route.params.municipioPicked,
          gender: this.$route.params.gender,
          bd: this.$route.params.birthday,
          pic: this.$route.params.pic,
        },
      });
    },
  },
};
</script>
<style lang=''>
#fundo {
  background-color: #79109e;
}
#lm {
  top: 2.6em;
}
#p1 {
  min-height: 3em;
  min-width: 3em;
  max-width: 80%;
}
#p2 {
  margin-top: 0.5em;
}
#oi {
  width: 100%;
  top: 57%;
  left: 5%;
}
#doi {
  position: fixed;
  top: 15vh;
  left: 77vw;
  height: 32em;
  width: 21%;
  background-color: #79109f;
}
#chatWindow2 {
  margin-left: 1%;
  width: 28%;
  position: fixed;
  right: 70vw;
  top: 93%;
  background-color: red;
}
#chatWindow {
  margin-left: 1%;
  width: 28%;
  position: fixed;
  right: 70vw;
  top: 49%;
  background-color: lime;
}
#chatbox {
  background-color: (122, 33, 48);

  height: 40vh;
}
#list {
  width: 20em;
  position: fixed;
  bottom: 0.5em;
}
#msgArea {
  height: 12.1em;
  overflow: auto;
}
</style>
