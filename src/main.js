// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue';
import axios from './utils/Axios.js';
import VueiClient from '@supermap/vue-iclient-mapboxgl';

import "tailwindcss/tailwind.css"
import 'ant-design-vue/dist/antd.css';
import './assets/styles/tailwind.css'
Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.use(Antd).use(VueiClient);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
