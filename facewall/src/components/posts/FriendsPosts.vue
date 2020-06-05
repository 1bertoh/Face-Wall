<template>
  <div>
    <v-container class fill-height grid-list-md>
      <v-layout row>
        <v-flex md9 class>
          <v-row justify="center">
            <v-card width="60%" id="postes">
              <v-row justify="center">
                <v-col cols="12" md="11" sm="11" xl="11">
                  <div class>
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
                    <v-alert type="warning" v-show="alertPost" dense>Please write something
                    </v-alert>
                  </div>
                </v-col>
              </v-row>
              <v-col v-show="picPick" cols="12" md class>
                <v-banner>
                  <input type="file" @change="onFileChange" />
                  <v-btn @click="picPick = !picPick" text color="primary">Cancel</v-btn>
                </v-banner>
              </v-col>

              <v-row justify="end">
                <v-col cols="12" md="5" class="d-flex justify-end">
                  <v-btn id="btn" color="success">
                    <v-icon>sentiment_satisfied_alt</v-icon>
                  </v-btn>
                  <v-btn id="btn" @click="picPick = !picPick" color="success">
                    <v-icon>add_photo_alternate</v-icon>
                  </v-btn>

                  <v-btn id="btn" @click="teste" color="success">post</v-btn>
                </v-col>
              </v-row>
            </v-card>

            <!--meus posts-->
            <v-card
              width="60%"
              id="postes"
              v-for="(post, index) in myPost"
              :key="post.text"
              class="my-3"
            >
              <v-layout row wrap>
                <v-list-item class="py-2">
                  <v-list-item-avatar width="55" height="60" color="gray">
                    <img :src="$route.params.pic" alt />
                  </v-list-item-avatar>
                  <v-list-item-content class="font-weight-medium headline" left>
                    MARIA
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
                      @click="myCommentShow(index)"
                      fab
                      small
                    >
                      <v-icon small disabled="disabled">comment</v-icon>
                    </v-btn>
                    <v-btn color="success" fab small>
                      <v-icon small>share</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-flex>
                <v-textarea v-if="comment"
                  width height="100"
                  class="blue-grey lighten-5"
                  outlined></v-textarea>

                <v-card-actions right v-if="comment">
                  <v-spacer></v-spacer>
                  <v-btn small right color="success">enviar</v-btn>
                </v-card-actions>
              </v-layout>
            </v-card>
            <!--fim meus posts-->

            <v-card
              width="60%"
              id="postes"
              v-for="(friend, index) in friends"
              :key="friend.name"
              class="my-3"
            >
              <v-layout row wrap>
                <v-list-item class="py-2">
                  <v-list-item-avatar width="55" height="60" color="gray">
                    <img :src="friend.pic" alt />
                  </v-list-item-avatar>
                  <v-list-item-content class="font-weight-medium headline" left>
                    {{friend.name}}{{index}}
                    <span class="font-weight-medium caption">last week</span>
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-flex md12 class="d-flex justify-center">
                  <v-carousel abs>
                    <v-carousel-item
                      v-for="(poste, i) in pics.friends[index]"
                      :key="poste"
                      :src="poste"
                    />
                  </v-carousel>
                </v-flex>

                <v-card-text>{{posts[index].body}}</v-card-text>
                <v-flex md12 sm12 xs12>
                  <v-card-actions>
                    <v-btn color="success" :id="`cor${index}`" @click="like(index)" fab small>
                      <v-icon small>favorite</v-icon>
                    </v-btn>
                    <v-btn color="success" disabled @click="commentShow(index)" fab small>
                      <v-icon small>comment</v-icon>
                    </v-btn>
                    <v-btn color="success" fab small>
                      <v-icon small>share</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-flex>
                <v-col
                  block
                  col="12"
                  v-show="false"
                  md-and-down="12"
                  sm="12"
                  xs="12"
                  :id="`comment${index}`"
                >
                  <v-textarea block width height="100"
                  class v-model="postComment"
                    outlined>
                    </v-textarea>
                  <div>
                    <div id="comment" v-for="(post, index) in postTeste[index]" :key="post.name">
                      <span>
                        {{post.nome}}
                        {{post.comment}}
                      </span>
                    </div>
                  </div>

                  <v-card-actions right>
                    <v-spacer></v-spacer>
                    <v-btn small right @click="toComment(index)" color="success">enviar</v-btn>
                  </v-card-actions>
                </v-col>
              </v-layout>
            </v-card>
          </v-row>
        </v-flex>
        <div class="hidden-sm-and-down" justify>
          <v-flex md5>
            <div id="list"></div>
          </v-flex>
        </div>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import axios from 'axios';
import { required, maxLength } from 'vuelidate/lib/validators';

export default {
  name: 'telaLogada',
  validations: {
    myPostTxt: {
      required,
      maxLength: maxLength(150),
    },
  },
  created() {
    this.friendsList();
    this.postsList();
  },

  data() {
    return {
      friends: [],
      posts: [],
      file: [],
      picPick: false,
      url: null,
      color: false,
      comment: false,
      myPostTxt: '',
      myPost: [],
      postComment: '',
      postTeste: [
        // comments
        [{ nome: 'Maria' }, { comment: 'que lindo miga' }],
        [
          { nome: 'Jão' },
          { comment: 'oi sumida' },
          { nome: 'Ana' },
          { comment: 'Uau' },
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ],
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
      const url = 'https://jsonplaceholder.typicode.com/users';
      axios
        .get(url)
        .then((response) => {
          this.friends = response.data;
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.friends.length; i++) {
            this.friends[i].pic = `./static/friend${i + 1}.jpg`;

            this.friends[i].postTime = 'Last week';
            this.friends[i].postCommente = [];
          }
        })
        .finally(() => {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.friends.length; i++) {
            this.friends[i].post = this.pics.friends[i];
            this.friends[i].postPhr = this.posts[i].body;
          }
        });
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
    /* commentShow(index) {
      this.comment = !this.comment;
      const x = document.getElementById(`comment${index}`);
      this.comment ? (x.style.display = 'inline') : (x.style.display = 'none');
    }, */
    like(index) {
      this.color = !this.color;
      const cor = document.getElementById(`cor${index}`);
      // eslint-disable-next-line no-unused-expressions
      this.color ? (cor.style.color = 'red') : (cor.style.color = 'white');
    },
    teste() {
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
      });
      this.url = '';
      this.myPostTxt = '';
      this.picPick = false;
      this.alertPost = false;
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    toComment(index) {
      this.postTeste[index].push({ coment: 'oi' });
    },
    myPostDel(index) {
      this.myPost.splice(index);
    },
  },
};
</script>
<style lang=''>
#postes {
  left: 17%;
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
  border: 1px solid black;
}
</style>
