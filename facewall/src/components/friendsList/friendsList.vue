<template>
  <div>
    <!--chatwindow-->
    <div id="chatWindow" v-if="miniChat" class="hidden">
      <v-toolbar dense dark color="primary">
        <v-toolbar-title>{{friends[cn].name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon @click="miniChat = false">close</v-icon>
        <v-icon @click="minmax = false">minimize</v-icon>
        <v-icon @click="minmax = true">launch</v-icon>
      </v-toolbar>
      <v-container v-show="minmax">
        <div id="chatbox">
          <v-list class="px-2">
            <v-avatar size="avatarSize" color="red" width="30" height="30">
              <img :src="this.friends[cn].pic" alt="alt" />
            </v-avatar>
            <div v-for="(chat, index) in conversation[cn]" :key="chat.index">
              <p id="p1">
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
            v-model="chattxt"
            name="name"
            label="message"
            multi-line
            append-outer-icon="send"
            @click:append-outer="sendMsg"
          ></v-text-field>
        </div>
      </v-container>
    </div>
    <div id="doi">
      <v-container class="fill-height">
        <v-btn id="oi" color="lime" dark @click.stop="drawer = !drawer">
          <v-icon>people</v-icon>
        </v-btn>
      </v-container>

      <v-navigation-drawer class="purple lighten-1" v-model="drawer" absolute right>
        <v-row class="deep-purple accent-4">
          <v-col cols="12" md="11">
            <v-text-field width="80%" name="name" label="friends"
            id="id" prepend-icon="search">
            </v-text-field>
          </v-col>
        </v-row>
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
</template>

<script>
import axios from 'axios';

export default {
  name: 'friendsList',
  props: {
    valor: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.friendsList();
    this.drawer = this.valor;
  },

  data() {
    return {
      friends: [],
      cn: 0,
      drawer: false,
      value: true,
      miniChat: false,
      minmax: true,
      chattxt: '',
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
  methods: {
    friendsList() {
      const url = 'https://jsonplaceholder.typicode.com/users';
      axios.get(url).then((response) => {
        this.friends = response.data;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.friends.length; i++) {
          this.friends[i].pic = `../static/friend${i + 1}.jpg`;
          this.friends[i].sent = [];
          this.friends[i].SentTime = [];
        }
      });
    },
    aviso(index) {
      this.cn = index;
    },
    sendMsg() {
      const d = new Date();
      const hours = d.getHours();
      const minutes = d.getMinutes();
      this.conversation[this.cn].push({
        sentTime: `${hours}: ${minutes}`,
        sent: this.chattxt,
      });
      this.chattxt = '';
    },
  },
};
</script>
<style lang=''>
#lm {
  top: 1.4em;
}
#p1 {
  min-height: 2em;
  min-width: 3em;
  max-width: 80%;
}
#p2 {
  margin-top: 0.5em;
}
#oi {
  width: 86%;
  top: 57%;
  left: 17.5%;
}
#doi {
  position: relative;
  bottom: 5vh;
  left: 1em;
  height: 32em;
  width: 100%;
  background-color: #79109f;
}
#chatWindow {
  margin-left: 1%;
  width: 92%;
  position: relative;
  right: 70vw;
  top: 79vh;
  background-color: red;
}
#chatbox {
  background-color: pink;
  border: 1px solid black;
  height: 40vh;
  overflow: scroll;
}
</style>
