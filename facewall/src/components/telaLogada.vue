<template>
  <div id="fundo" class>
    <!--Menu nav-->
    <v-app-bar fixed hide-on-scroll dark class="purple darken-4">
      <v-toolbar-title class="white--text display-1">
        <span @click="goToProfile">Face</span>
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



    <v-row justify='center'>
      <v-col md="3" class="hidden-sm-and-down">
        <!--minichat box componnet-->
        <miniChatBox
        :friendId =' friendId'
        :miniChat = 'miniChat'
        :normalizados = 'normalizados'
        @sendMsg = 'sendMsg($event)'>
        </miniChatBox>
        <!--fim mini chat box xomponnet-->
      </v-col>

      <v-col justify='center' cols="11" md="6" >
        <!--compnente de posts-->
        <FriendsPosts
        :friends = 'friends'
        :normalizados = 'normalizados'
        @addpost = 'addPosts($event)'
        class="mt-12" />
        <!--Fim componen de posts-->
      </v-col>

      <v-col md="3" class="hidden-sm-and-down">
        <!-- friend List component-->
        <friendsList
        :friends = 'friends'
        :filteredFriends = 'friends'
        :normalizados = 'normalizados'
        @getfriendid = 'getFriendId($event)'>
        </friendsList>
        <!--fim friend list component-->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import miniChatBox from '@/components/chat/miniChatBox';
import friendsList from '@/components/chat/friendList';
import axios from 'axios';
import FriendsPosts from './posts/FriendsPosts';

export default {
  name: 'telaLogada',
  created() {
    this.friendsList();
  },
  components: {
    FriendsPosts,
    miniChatBox,
    friendsList,
  },

  data() {
    return {
      nome: this.$route.params.firstName,
      picture: this.$route.params.pic,
      dados: this.$route.params,
      items: [
        {
          title: `${this.$route.params.firstName} ${this.$route.params.middleName} ${this.$route.params.lastName}`,
        },
      ],
      friends: [],
      load: false,
      friendId: 0,
      value: true,
      miniChat: false,
      minmax: true,
      chattxt: '',
      tool: false,
      online: true,
      offline: false,
      normalizados: '',
      conversation: [
        [
          {
            // cada index é um id, dentro to index a ordem é receivedTime, received, sentTime e sent
            received: 'oi', // dentro d cada array será add mais obj
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
      friendsPostsPic: []
    };
  },

  methods: {
    friendsList() {
      this.load = true;
      axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
        // eslint-disable-next-line no-plusplus
          this.friends = response.data;
          for (let i = 0; i < this.friends.length; i++) {
            this.friends[i].pic = `./static/friend${i + 1}.jpg`;
            this.friends[i].chat = this.conversation[i] // add o obj chat nos friends
            this.friends[i].post = this.friendsPostsPic[i];
            this.postPicRender(i);
          }
          this.toNormalize();
        });
    },
    toNormalize() {
      this.normalizados = this.friends.reduce((soma, curr) => {
        soma[curr.id] = curr;
        return soma;
      }, {})
    },
    getFriendId(id) {
      this.friendId = id;
      this.miniChat = true;
    },
    goToProfile() {
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
    sendMsg(txt) {
      const d = new Date();
      const hours = d.getHours();
      const minutes = d.getMinutes();
      this.normalizados[this.friendId].chat.push({
        sentTime: `${hours}: ${minutes}`,
        sent: txt,
      });
    },
    addPosts(post) {
      this.friendsPostsPic = post;
    },
    postPicRender(i) {
      if(this.friends[i].post.length <= 1) {
        this.friends[i].postType1 = 'v-img';
        this.friends[i].postType2 = 'v-img';
      } else {
        this.friends[i].postType1 = 'v-carousel';
        this.friends[i].postType2 = 'v-carousel-item';
      }
    }
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
#list {
  width: 20em;
  position: fixed;
  bottom: 0.5em;
}
#alou{
  z-index: 2;
}

</style>
