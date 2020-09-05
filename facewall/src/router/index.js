import Vue from 'vue';
import Router from 'vue-router';
import telaLogin from '@/components/telaLogin/telaLogin';
import telaLogada from '@/components/telaLogada';
import friendsList from '@/components/friendsList/friendsList';
import chatRoom from '@/components/posts/chatRoom';
import profile from '@/components/profile';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'telaLogin',
      component: telaLogin,
    },
    {
      path: '/:firstName/:middleName/:lastName/:email/:phone/:estado/:municipio/:gender/:bd/:pic',
      name: 'telaLogada',
      component: telaLogada,
    },
    {
      path: '/list',
      name: 'friendsList',
      component: friendsList,
    },
    {
      path: '/chatRoom',
      name: 'chatRoom',
      component: chatRoom,
    },
    
    {
      path: '/profile/:firstName/:middleName/:lastName/:email/:phone/:estado/:municipio/:gender/:bd/:pic',
      name: 'profile',
      component: profile,
    },
  ],
});
