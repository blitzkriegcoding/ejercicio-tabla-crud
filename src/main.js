import Vue from 'vue'
import App from './App.vue'
import {store} from './store/store'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import getSlicePagination from './services/services';


Vue.use(BootstrapVue)
Vue.use(getSlicePagination)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
