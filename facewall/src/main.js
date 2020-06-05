import Vue from 'vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vuelidate from 'vuelidate';
import vuetify from './plugins/vuetify';

import App from './App';
import router from './router';


Vue.use(Vuelidate);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify,
  router,
  iconfont: 'md',
  render: h => h(App),
});
