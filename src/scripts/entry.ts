import Vue from 'vue';
import App from './App.vue';
import store from './store/';
import '../styles/main.sass';

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app');
