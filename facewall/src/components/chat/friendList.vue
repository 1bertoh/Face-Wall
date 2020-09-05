<template>
    <div>
        <div class="hidden-sm-and-down">
        <!--botao pra abrir drawer-->
        <div id="friendList_position">
          <v-container class="fill-height">
            <v-btn id="btn_friendList" elevation-14 color="lime" dark @click=" drawer = !drawer ">
              <v-icon>people</v-icon>
            </v-btn>
          </v-container>
          <!--fim do botão-->
          <!-- drawer  com a lsita de amgs-->
          <v-navigation-drawer
          class="purple lighten-1" v-model="drawer" absolute right>
            <v-app-bar dark
            fixed
            class="purple darken-3
            ">
              <v-text-field width="80%"
              @keyup="filterFriends()"
              v-model="searchName"
              name="name"
              label="friends"
              prepend-icon="search">
              </v-text-field>
            </v-app-bar>
            <v-divider></v-divider>
            <v-list shaped
            style="padding-top:4em;">
              <v-list-item
                v-for="(friend, index) in filteredFriends"
                :key="index"
                @click="$emit('getfriendid', friend.id)"
                class=""
              >
                <v-list-item-avatar>
                  <v-img :src="friend.pic"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{friend.name}}</v-list-item-title>
                  
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-alert type="warning"
                  dense
                  color="purple"
                  :value="noFriendsFound"
                  border="left">
                    No friends found
                  </v-alert>
                </v-list-item-content>
                
              </v-list-item>
            </v-list>

            <v-divider></v-divider>
          </v-navigation-drawer>
        </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'friendList',
    props: [ 'normalizados'],
    created() {
      this.friendsList();
    },
    data() {
        return {
            drawer: false,
            searchName: null,
            noFriendsFound: false,
            friends: '',
            filteredFriends: ''
        }
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
          }
          this.filteredFriends = this.friends;
        });
    },
      filterFriends() {
        this.filteredFriends = this.friends.filter((friend) => {
          let currentName = friend.name.toLowerCase();
          let searchName = this.searchName.toLowerCase();
          if(currentName.match(searchName)){
          return friend
          }
        })
        if (this.filteredFriends.length === 0) {
            this.noFriendsFound = true 
          } else {
            this.noFriendsFound = false
          }
      }
    }
}
</script>
<style lang="">
    #friendList_position {
  position: fixed;
  top: 15vh;
  left: 79vw;
  height: 32em;
  width: 19%;
  background-color: #79109f;
}
#btn_friendList {
  width: 100%;
  top: 52%;
  left: 5%;
}
</style>