<template>
  <div>
    <v-container class fill-height grid-list-md>
      <v-row justify="center">
        <v-card width="100%" id="postes">
          <v-row justify="center">
            <v-col>
              <div>
                <v-textarea
                  name="name"
                  placeholder="What are you thinking?"
                  outlined
                  rounded
                  shaped
                  solo
                  rows="3"
                  height
                  v-model="myPostTxt"
                  :rules="[$v.myPostTxt.maxLength || 'max length exceeded'] "
                  :counter="150"
                ></v-textarea>
                <v-alert type="warning" v-show="alertPost" dense>Please write something</v-alert>
              </div>
            </v-col>
          </v-row>
          <v-col v-show="picPick" cols="12" md class>
            <v-banner>
              <input type="file"
              id="inputFile"
              @change="onFileChange" />
              <v-btn @click="picPick = !picPick" text color="primary">Cancel</v-btn>
            </v-banner>
          </v-col>

          <p
          class="text-right mr-2 caption">
          {{fileName}}
          </p>
          <v-row justify="end">
            <v-col cols="12" md="5" class="d-flex justify-end">
              <v-btn id="btn" color="success">
                <v-icon>sentiment_satisfied_alt</v-icon>
              </v-btn>
              <v-btn id="btn" @click="getFile" color="success">
                <v-icon>add_photo_alternate</v-icon>
              </v-btn>

              <v-btn id="btn" @click="toPost" color="success">post</v-btn>
            </v-col>
          </v-row>
        </v-card>

        <!--meus posts-->
        <v-card
          width="100%"
          id="postes"
          v-for="(post, index) in myPost"
          :key="post.text"
          class="my-3"
        >
          <v-list-item @click="$emit('gotoprofile', 'me')" class="py-2">
            <v-list-item-avatar width="55" height="60" color="gray">
              <img :src="$route.params.pic" alt />
            </v-list-item-avatar>
            <v-list-item-content
            
            class="font-weight-medium headline" left>
              {{post.nome}}
              <span class="font-weight-medium caption">{{post.postTime}}</span>
            </v-list-item-content>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn dark color="pink" fab text v-on="on">
                  <v-icon>expand_more</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item small @click="myPostDel">
                  <v-icon>delete</v-icon>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>
          <v-divider></v-divider>

          <v-flex md12 class="d-flex justify-center">
            <div abs>
              <img class id="fp" align-center :src="post.postImg" />
            </div>
          </v-flex>

          <v-card-text>{{post.postTxt}}</v-card-text>
          <v-flex md12>
            <v-card-actions>
              <v-btn color="success" :id="`cor${index}`" @click="like(index)" fab small>
                <v-icon small>favorite</v-icon>
              </v-btn>
              <v-btn
                color="success"
                :id="`myComment${index}`"
                @click="post.showComment = !post.showComment"
                fab
                small
              >
                <v-icon small>comment</v-icon>
              </v-btn>
              <v-btn color="success" fab small>
                <v-icon small>share</v-icon>
              </v-btn>
            </v-card-actions>
          </v-flex>
          <div v-if="post.showComment">
            <v-textarea
              width
              height="100"
              v-model="myPost[index].comentario"
              class="blue-grey lighten-5"
              outlined
            ></v-textarea>

            <!--my comments-->
            <div id="comment" v-if="post.postComment.length > 0">
              <v-hover v-for="(comment, ind) in post.postComment" :key="comment">
              <template v-slot="{ hover }" id="comment">
              <div
                    :class="`elevation-${hover ? 24 : 6}
          mb-${hover ? 4 : 1}`"
                    class="mx-auto pa-6 transition-swing light-green accent-3"
                  >
                  <v-list-item
                  @click="$emit('gotoprofile', 'me')"
                  class="">
            <v-list-item-avatar width="35" class="pb-2" height="40" color="gray">
              <img :src="$route.params.pic" alt />
            </v-list-item-avatar>
            <v-list-item-content
            class="font-weight-black " left>
              <p
              class="text-right">
                {{post.nome}}
              </p>
            </v-list-item-content>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn dark color="pink" fab text v-on="on">
                  <v-icon>expand_more</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item small @click="commentDel(index, ind,'myPost')">
                  <v-icon>delete</v-icon>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>
          <v-list-item>
            <span class="pl-6">{{comment.comentario}}</span>
          </v-list-item>
                  </div>
                </template>
              </v-hover>
            </div>
            <v-card-actions right>
            <v-spacer></v-spacer>
            <v-btn @click="toComment('myComment', index)" small right color="success">enviar</v-btn>
          </v-card-actions>
          </div>
        </v-card>
        <!--fim meus posts-->

        <!-- friends post-->
        <v-card
          id="postes"
          v-for="(friend, index) in normalizados"
          :key="friend.name"
          class="my-3 transition-swing"
        >
          <v-layout row wrap>
            <v-list-item
            @click="$emit('gotoprofile', friend.id)"
            class="py-2">
              <v-list-item-avatar width="55" height="60" color="gray">
                <img :src="friend.pic" alt />
              </v-list-item-avatar>
              <v-list-item-content
              class="font-weight-medium headline" left>
                {{friend.name}}
                <span class="font-weight-medium caption">last week</span>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-col cols="12">
              <v-carousel :is="friend.postType1" abs>
                <v-carousel-item
                  :is="friend.postType2"
                  v-for="(poste) in friend.post"
                  :key="poste"
                  :src="poste"
                />
              </v-carousel>
            </v-col>

            <v-card-text>{{posts[index].body}}</v-card-text>

            <v-card-actions>
              <v-btn color="success" :id="`cor${index}`" @click="like(index)" fab small>
                <v-icon small>favorite</v-icon>
              </v-btn>
              <v-btn color="success" @click="commentShow(friend.id)" fab small>
                <v-icon small>comment</v-icon>
              </v-btn>
              <v-btn color="success" fab small>
                <v-icon small>share</v-icon>
              </v-btn>
            </v-card-actions>

            <!--Comenta´rios-->
            <v-col v-show="friend.showComment" block cols="12">
              <v-textarea height="100" v-model="friend.postTxt" outlined></v-textarea>

              <div id="comment" v-if="friend.postComment.length > 0">
                <v-hover v-for="(comment, ind) in friend.postComment" :key="comment">
                  <template v-slot="{ hover }" id="comment">
                    <div
                      :class="`elevation-${hover ? 24 : 6}
          mb-${hover ? 4 : 1}`"
                      class="mx-auto pa-6 transition-swing light-green accent-3"
                    >

                    <v-list-item class="">
            <v-list-item-avatar width="35" class="pb-2" height="40" color="gray">
              <img :src="$route.params.pic" alt />
            </v-list-item-avatar>
            <v-list-item-content class="font-weight-black " left>
              <p
              class="text-right">
                {{comment.nome}}
              </p>
            </v-list-item-content>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn dark color="pink" fab text v-on="on">
                  <v-icon>expand_more</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item small @click="commentDel(friend.id, ind)">
                  <v-icon>delete</v-icon>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>
          <v-list-item>
            <span class="pl-6">{{comment.comentario}}</span>
          </v-list-item>
                    </div>
                  </template>
                </v-hover>
              </div>
              <v-card-actions right>
                <v-spacer></v-spacer>
                <v-btn small right @click="toComment(friend.id)" color="success">enviar</v-btn>
              </v-card-actions>
            </v-col>
          </v-layout>
        </v-card>
      </v-row>

      <div class="hidden-sm-and-down" justify>
        <v-flex md5>
          <div id="list"></div>
        </v-flex>
      </div>
    </v-container>
  </div>
</template>
<script>
import axios from 'axios';
import { required, maxLength } from 'vuelidate/lib/validators';

export default {
  name: 'FriendsPosts',
  props: ['friends', 'normalizados'],
  validations: {
    myPostTxt: {
      required,
      maxLength: maxLength(150),
    },
  },
  created() {
    this.postsList();
    this.friendsList();
    this.postInfo();
  },

  data() {
    return {
      posts: [],
      file: [],
      picPick: false,
      url: null,
      color: false,
      comment: false,
      myPostTxt: '',
      myPost: [],
      postComment: '',
      fileName:'',
      pics: {
        friends: [
          ['static/amigosFotos/1.jpg', 'static/amigosFotos/2.jpg'],
          ['static/amigosFotos/3.jpg'],
          [
            'https://66.media.tumblr.com/308c3726da537f2daea5dcb32d650e70/tumblr_phg1i0eqoJ1tn5e3x_1280.jpg',
            'https://i.pinimg.com/originals/13/e1/65/13e1651b0b153f1d3d9422929ea0b8d2.jpg',
          ],
          [
            'https://cdn.pixabay.com/photo/2019/03/14/03/25/sunset-4054137_960_720.jpg',
            'https://i.pinimg.com/originals/bd/32/0f/bd320fbc2b119f401e0a81bcf2a75808.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQGHfPw5WqFICLTx4sPzML2M8xUjTGCMI0cMNnRA6GD50NHaWXJ&usqp=CAU',
          ],
          ['static/amigosFotos/7.jpeg'],
          ['static/amigosFotos/8.jpeg'],
          ['static/amigosFotos/9.jpeg'],
          [
            'static/amigosFotos/10.jpeg',
            'https://i0.wp.com/mundoperdido.com.br/wp-content/uploads/2019/06/Frases-tumblr-casal.jpg?fit=1080%2C814&ssl=1',
          ],
          ['static/amigosFotos/11.jpeg'],
          ['static/amigosFotos/12.jpeg'],
        ],
        mine: {},
      },
      alertPost: false,
    };
  },

  methods: {
    friendsList() {
      this.load = true;
      for (let i = 0; i < this.friends.length; i++) {
        this.friends[i].postTime = 'Last week';
        this.friends[i].postCommente = [];
      }
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
          for (let i = 0; i < this.friends.length; i++) {
            this.friends[i].post = this.pics.friends[i];
            this.friends[i].postPhr = this.posts[i].body;
            this.load = false;
          }
        });
    },
    commentShow(id) {
      this.normalizados[id] = Object.assign({}, this.normalizados[id], {
        showComment: !this.normalizados[id].showComment,
      });
    },
    like(index) {
      this.color = !this.color;
      const cor = document.getElementById(`cor${index}`);
      // eslint-disable-next-line no-unused-expressions
      this.color ? (cor.style.color = 'red') : (cor.style.color = 'white');
    },
    toPost() {
      if (this.myPostTxt.trim() === '') {
        this.alertPost = true;
        return;
      }
      if (this.$v.myPostTxt.$invalid) {
        this.alertPost = false;
        return;
      }

      const d = new Date();
      const hours = d.getHours();
      const minutes = d.getMinutes();
      this.myPost.unshift({
        postTxt: this.myPostTxt,
        postImg: this.url,
        postTime: `${hours}: ${minutes}`,
        postComment: [],
        comentario: '',
        showComment: false,
        nome: `${this.$route.params.firstName} 
          ${this.$route.params.middleName} 
          ${this.$route.params.lastName}`,
      });
      this.url = '';
      this.myPostTxt = '';
      this.picPick = false;
      this.alertPost = false;
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      this.fileName = file.name;
    },
    toComment(id, index) {
      if (id === 'myComment') {
        this.myPost[index].postComment.push({
          comentario: this.myPost[index].comentario,
          nome: `${this.$route.params.firstName} 
          ${this.$route.params.middleName} 
          ${this.$route.params.lastName}`,
        });
        this.myPost[index].comentario = '';
      }
      const x = [this.normalizados[id].postTxt, id];
      this.$emit('tocomment', x);
    },
    myPostDel(index) {
      this.myPost.splice(index, 1);
    },
    postInfo() {
      this.$emit('addpost', this.pics.friends);
    },
    commentDel(postIndex, commPost, type) {
      if (type === 'myPost') {
        this.myPost[postIndex].postComment.splice(commPost, 1);
      } else {
        this.normalizados[postIndex].postComment.splice(commPost, 1);
      }
    },
    getFile() {
    document.getElementById('inputFile').click();
    }
  },
};
</script>
<style lang=''>
#postes {
  /*left: 5%;*/
  z-index: 1;
}
#fp {
  right: 1em;
  bottom: 2em;
  width: 100%;
  padding: 2.5%;
}
#list {
  width: 20em;
  position: fixed;
  bottom: 0.5em;
}
#miniChat {
  position: fixed;
  right: 80%;
  top: 46vh;
}
#bt {
  position: relative;
  left: 54%;
}
#comment {
  border: 4px solid slateblue;
  margin-top: 0.2em;
  max-height: 20em;
  overflow: scroll;
}
</style>
