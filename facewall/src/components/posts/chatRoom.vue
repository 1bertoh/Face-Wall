<template>
  <div>
    <v-card height="100vh" id="cardColor" class>
      <v-toolbar color="purple">
        <v-toolbar-title class="white--text display-1">
          <span>Face</span>
          <span class="font-weight-black">Wall</span>
        </v-toolbar-title>
      </v-toolbar>
      <div>
        <v-flex md4 class="d-flex justify-left">
          <v-navigation-drawer
            height="90vh"
            mini-variant-width="80"
            permanent
            expand-on-hover
            id="drawerColor"
            class
          >
            <v-list id="lista" v-for="(friend, index) in friends" :key="friend.nome" dense>
              <v-list-item class="px-2" :class="{onlinee : online == true,
              offline : online == false}" @click="changeChat(index)">
                <v-list-item-avatar>
                  <v-img :src="friend.pic"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="title">{{friend.name}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
          </v-navigation-drawer>
        </v-flex>
        <v-layout row wrap>
          <v-card id="box" elevation="15">
            <div id="box1">
              <div>
                <v-row>
                  <v-col cols="2" sm="2" xs="2">
                    <v-avatar size color="red" width="50" height="50">
                      <img :src="this.friends[cn].pic" alt="alt" />
                    </v-avatar>
                  </v-col>
                  <!--listagem do chat em elação ao indice=id, cada if refere-se ao índece+1=id-->
                  <v-col v-if="0==this.cn" cols="10" sm="9" xs="9">
                    <div  v-for="(chat, index) in conversation[0]" :key="chat.index">
                      <p v-show="chat.received" id="p1">
                        <span class="caption">{{chat.recTime}}</span>
                        <br />
                        <span>{{chat.received}}</span>
                      </p>
                      <p id="p2" class="text-right">
                        <span class="caption">{{chat.sentTime}}</span>
                        <br />
                        <span class="pr-2">{{chat.sent}}</span>
                      </p>
                    </div>
                  </v-col>

                  <v-col v-if="1==this.cn" cols="10" sm="9" xs="9">
                    <div  v-for="(chat, index) in conversation[1]" :key="chat.index">
                      <p v-show="chat.received" id="p1">
                        <span class="caption">{{chat.recTime}}</span>
                        <br />
                        <span>{{chat.received}}</span>
                      </p>
                      <p id="p2" class="text-right">
                        <span class="caption">{{chat.sentTime}}</span>
                        <br />
                        <span class="pr-2">{{chat.sent}}</span>
                      </p>
                    </div>
                  </v-col>

                  <v-col v-if="2==this.cn" cols="10" sm="9" xs="9">
                    <div  v-for="(chat, index) in conversation[2]" :key="chat.index">
                      <p v-show="chat.received" id="p1">
                        <span class="caption">{{chat.recTime}}</span>
                        <br />
                        <span>{{chat.received}}</span>
                      </p>
                      <p id="p2" class="text-right">
                        <span class="caption">{{chat.sentTime}}</span>
                        <br />
                        <span class="pr-2">{{chat.sent}}</span>
                      </p>
                    </div>
                  </v-col>

                  <v-col v-if="3==this.cn" cols="10" sm="9" xs="9">
                    <div  v-for="(chat, index) in conversation[3]" :key="chat.index">
                      <p v-show="chat.received" id="p1">
                        <span class="caption">{{chat.recTime}}</span>
                        <br />
                        <span>{{chat.received}}</span>
                      </p>
                      <p id="p2" class="text-right">
                        <span class="caption">{{chat.sentTime}}</span>
                        <br />
                        <span class="pr-2">{{chat.sent}}</span>
                      </p>
                    </div>
                  </v-col>

                  <v-col v-if="4==this.cn" cols="10" sm="9" xs="9">
                    <div  v-for="(chat, index) in conversation[4]" :key="chat.index">
                      <p v-show="chat.received" id="p1">
                        <span class="caption">{{chat.recTime}}</span>
                        <br />
                        <span>{{chat.received}}</span>
                      </p>
                      <p id="p2" class="text-right">
                        <span class="caption">{{chat.sentTime}}</span>
                        <br />
                        <span class="pr-2">{{chat.sent}}</span>
                      </p>
                    </div>
                  </v-col>

                  <v-col v-if="5==this.cn" cols="10" sm="9" xs="9">
                    <div  v-for="(chat, index) in conversation[5]" :key="chat.index">
                      <p v-show="chat.received" id="p1">
                        <span class="caption">{{chat.recTime}}</span>
                        <br />
                        <span>{{chat.received}}</span>
                      </p>
                      <p id="p2" class="text-right">
                        <span class="caption">{{chat.sentTime}}</span>
                        <br />
                        <span class="pr-2">{{chat.sent}}</span>
                      </p>
                    </div>
                  </v-col>

                  <v-col v-if="6==this.cn" cols="10" sm="9" xs="9">
                    <div  v-for="(chat, index) in conversation[6]" :key="chat.index">
                      <p v-show="chat.received" id="p1">
                        <span class="caption">{{chat.recTime}}</span>
                        <br />
                        <span>{{chat.received}}</span>
                      </p>
                      <p id="p2" class="text-right">
                        <span class="caption">{{chat.sentTime}}</span>
                        <br />
                        <span class="pr-2">{{chat.sent}}</span>
                      </p>
                    </div>
                  </v-col>

                  <v-col v-if="7==this.cn" cols="10" sm="9" xs="9">
                    <div  v-for="(chat, index) in conversation[7]" :key="chat.index">
                      <p v-show="chat.received" id="p1">
                        <span class="caption">{{chat.recTime}}</span>
                        <br />
                        <span>{{chat.received}}</span>
                      </p>
                      <p id="p2" class="text-right">
                        <span class="caption">{{chat.sentTime}}</span>
                        <br />
                        <span class="pr-2">{{chat.sent}}</span>
                      </p>
                    </div>
                  </v-col>

                  <v-col v-if="8==this.cn" cols="10" sm="9" xs="9">
                    <div  v-for="(chat, index) in conversation[8]" :key="chat.index">
                      <p v-show="chat.received" id="p1">
                        <span class="caption">{{chat.recTime}}</span>
                        <br />
                        <span>{{chat.received}}</span>
                      </p>
                      <p id="p2" class="text-right">
                        <span class="caption">{{chat.sentTime}}</span>
                        <br />
                        <span class="pr-2">{{chat.sent}}</span>
                      </p>
                    </div>
                  </v-col>

                  <v-col v-if="9==this.cn" cols="10" sm="9" xs="9">
                    <div  v-for="(chat, index) in conversation[9]" :key="chat.index">
                      <p v-show="chat.received" id="p1">
                        <span class="caption">{{chat.recTime}}</span>
                        <br />
                        <span>{{chat.received}}</span>
                      </p>
                      <p id="p2" class="text-right">
                        <span class="caption">{{chat.sentTime}}</span>
                        <br />
                        <span class="pr-2">{{chat.sent}}</span>
                      </p>
                    </div>
                  </v-col>
                  <!-- para criar novos chats basta criar novos elementos-->
                  <!--Fim da listagem de chat-->
                </v-row>
              </div>
            </div>
            <v-row id="textBox">
              <v-col cols="10" sm="10" xs="10">
                <v-text-field v-model="chattxt"
                @keyup.enter="sendMsg" filled outlined name="name"
                label id="chatText"></v-text-field>
              </v-col>
              <v-col cols="2" xs="2" sm="2" class="d-flex justify-right">
                <v-btn
                  width="60"
                  block
                  color="success"
                  id="sendBtn"
                  @click.prevent.stop="sendMsg()"
                >
                  <v-icon>send</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-layout>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'chatRoom',

  created() {
    this.API_friends();
    this.time();
  },
  data() {
    return {
      friends: [],
      cn: 0,
      online: true,
      toy: 'chat.sentTime0',
      chattxt: '',
      teste: [
        [{ rt0: '18:30' }, { r0: 'oie' }, { st: '18:35' }, { s0: 'td bem?' }],
        [],
      ],
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

  computed: {},

  methods: {
    API_friends() {
      const url = 'https://jsonplaceholder.typicode.com/users';
      axios.get(url).then((response) => {
        this.friends = response.data;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.friends.length; i++) {
          this.friends[i].pic = `./static/friend${i + 1}.jpg`;
          this.friends[i].sent = [];
          this.friends[i].SentTime = [];
        }
      });
    },
    changeChat(index) {
      this.cn = index;
    },
    sendMsg() {
      if (this.chattxt.trim() === '' ) { this.alertPost = true; return; }
      const d = new Date();
      const hours = d.getHours();
      const minutes = d.getMinutes();
      this.conversation[this.cn].push({
        sentTime: `${hours}: ${minutes}`,
        sent: this.chattxt,
      });
      this.chattxt = '';
    },
    time() {
      let y = '';
      // eslint-disable-next-line prefer-const
      // eslint-disable-next-line no-mixed-operators
      setInterval(() => { let x = Math.floor(Math.random() * 10 + 1);
        if (x % 2 === 0) {
          this.online = true;
        }
        else {
          this.online = false;
        }
      }, 5000);
    },
  },
};
</script>
<style lang=''>
#drawerColor {
  z-index: 1;
  background-color: rebeccapurple;
  height: 20em;
}
#lista {
  height: 4em;
  overflow: hidden;
}
#cardColor {
  background-color: #c0ca33;
}
#box {
  background-color: #e6ee9c;
  position: absolute;
  width: 80vw;
  height: 80vh;
  bottom: 2em;
  margin-left: 6em;
  margin-right: 2em;
  padding: 1em;
}
#box1 {
  border: 1px dotted black;
  position: relative;
  height: 23em;
  overflow-y: auto;
}
#p1 {
  background-color: ;
  min-height: 2em;
  min-width: 3em;
  max-width: 80%;
}
#textBox {
  position: fixed;
  width: 30em;
  top: 29em;
}
#sendBtn {
  height: 4em;
  width: 5em;
}
#oi {
  border-left: 3px solid greenyellow;
  margin-left: 1px;
}
#oi2 {
  border-left: 3px solid red;
  margin-left: 1px;
}
.onlinee {
  border-left: 0.4em solid greenyellow;
}
.offline {
  border-left:0.4em solid red ;
}
</style>
