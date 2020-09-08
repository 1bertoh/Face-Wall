<template>
  <div>
    <v-card class="light-green accent-3
">
      <v-toolbar color="purple">
        <v-toolbar-title class="white--text display-1">
          <span>Face</span>
          <span class="font-weight-black">Wall</span>
        </v-toolbar-title>
      </v-toolbar>
      <div>
        
        <v-layout row wrap>
          <v-card id="box" elevation="15">
            <div id="box1">
              <div>
                <v-row>
                  <v-col cols="2" sm="2" xs="2">
                    <v-avatar size color="red"
                    class="ml-2"
                    width="50" height="50">
                      <img :src="normalizados[friendId].pic" alt="alt" />
                    </v-avatar>
                  </v-col>

                  <v-col cols="10" sm="9" xs="9">
                    <div  v-for="(chat, index) in normalizados[friendId].chat" :key="chat.index">
                      <p id="p1">
                        <span class="caption">{{chat.recTime}}</span>
                        <br />
                        <span
                        class="pr-2">{{chat.received}}</span>
                      </p>
                      <p id="p2" class="text-right">
                        <span class="caption">{{chat.sentTime}}</span>
                        <br />
                        <span class="pr-2">{{chat.sent}}</span>
                      </p>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>

            <v-row >
              <v-col cols="9">
                <v-text-field v-model="chattxt"
                @keyup.enter="sendMsg" filled outlined name="name"
                label ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn
                class=""
                height="53"
                  color="success"
                  @click.prevent.stop="sendMsg()"
                >
                  <v-icon>send</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>

          <v-flex md4 class="d-flex justify-left">
          <v-navigation-drawer
            height="91vh"
            mini-variant-width="82"
            permanent
            expand-on-hover
            id="drawerColor"
            class
          >
            <v-list id="lista" v-for="(friend, index) in normalizados" :key="friend.nome" dense>
              <v-list-item class="px-2" :class="{onlinee : online == true,
              offline : online == false}" @click="friendId = friend.id">
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
  props: ['normalizados'],
  data() {
    return {
      friendId: 1,
      online: true,
      toy: 'chat.sentTime0',
      chattxt: '',
    };
  },

  computed: {},

  methods: {
    sendMsg() {
      if (this.chattxt.trim() === '' ) { this.alertPost = true; return; }
      const d = new Date();
      const hours = d.getHours();
      const minutes = d.getMinutes();
      this.normalizados[this.friendId].chat.push({
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
  background-color: rebeccapurple;
  height: 20em;
}
#lista {
  height: 4em;
  overflow: hidden;
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
  background-color: #d3d48b;
  border: 1px dotted black;
  position: relative;
  height: 23em;
  overflow: scroll;
  overflow-x: hidden
}
#p1 {
  background-color: ;
  min-height: 2em;
  min-width: 3em;
  max-width: 80%;
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

::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}
::-webkit-scrollbar-button {
  width: 18px;
  height: 8px;
}
::-webkit-scrollbar-thumb {
  background: rgb(117, 126, 214);
  border: 0px none rgb(117, 126, 214);
  border-radius: 50px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgb(117, 126, 214);
}
::-webkit-scrollbar-thumb:active {
  background: rgb(117, 126, 214);
}
::-webkit-scrollbar-track {
  background: #ffffff;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-track:hover {
  background: #666666;
}
::-webkit-scrollbar-track:active {
  background: #333333;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
