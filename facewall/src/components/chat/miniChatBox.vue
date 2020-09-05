<template>
    <div >
        <!--Essa é a barra mostrada qnd o minichat esta minimizado-->
        <div id="chatWindow2" v-show="tool" class="hidden-sm-and-down" style>
        <v-toolbar dense dark color="primary">
          <v-toolbar-title>{{normalizados[friendId].name}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon @click="tool  = false">close</v-icon>
          <v-icon @click="tool = true">minimize</v-icon>
          <v-icon @click="tool = false, miniChat = true">launch</v-icon>
        </v-toolbar>
        </div>
        <!--Fim da da barra-->

        <!--Mini janela de chat-->
      <div class="hidden-sm-and-down">
        <div id="chatWindow" v-show="miniChat" class="hidden" style>
          <v-toolbar dense dark color="primary">
            <v-toolbar-title>{{normalizados[friendId].name}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon @click="miniChat = false">close</v-icon>
            <v-icon @click="miniChat = false, tool = true">minimize</v-icon>
            <v-icon @click="minmax = true">launch</v-icon>
          </v-toolbar>
          <v-container v-show="minmax">
            <div id="chatbox">
              <v-list id="msgArea" class="px-2">
                <v-avatar size="avatarSize" color="red" width="30" height="30">
                  <img :src="this.normalizados[friendId].pic" alt="alt" />
                </v-avatar>
                <div v-for="(chat, index) in normalizados[friendId].chat" :key="chat.index">
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
                id="getEvent"
                class="blue-grey lighten-2"
                tile
                v-model="chattxt"
                name="name"
                label="message"
                multi-line
                append-outer-icon="send"
                @click:append-outer="sendMsg"
                @keydown.enter='sendMsg'
                ></v-text-field>
            </div>
            </v-container>
        </div>
        <!--fim da mini de chat chanela-->
        </div>
    </div>
</template>
<script>
import axios from 'axios';


export default {
  name: 'miniChatBox',
  props: ['friendId', 'miniChat', 'normalizados'],
  created() {
  },
  data() {
    return {
      tool: false,
      chattxt: null,
      minmax: true,
    }
  },
  methods: {
    sendMsg() {
      if (this.chattxt.trim() === '') {
        return;
      }
      
      this.$emit('sendMsg', this.chattxt)
      this.chattxt = '';
    },
  },
};
</script>
<style lang="">
    #chatWindow2 {
  z-index: 2;
  margin-left: 1%;
  width: 28%;
  position: fixed;
  right: 70vw;
  top: 93%;
  background-color: red;
}
#chatWindow {
  z-index: 2;
  margin-left: 1%;
  width: 28%;
  position: fixed;
  right: 70vw;
  top: 49%;
  background-color: lime;
}
#msgArea {
  height: 12.1em;
  overflow: auto;
}
#chatbox {
  background-color: (122, 33, 48);

  height: 40vh;
}
#p1 {
  min-height: 3em;
  min-width: 3em;
  max-width: 80%;
}
#p2 {
  margin-top: 0.5em;
}
</style>
