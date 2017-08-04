import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import apiConfig from './api/index'

import './assets/css/animate.min.css'
import iView from 'iview'
import VueLocalStorage from 'vue-localstorage'
import 'iview/dist/styles/fonts/ionicons.eot'
import 'iview/dist/styles/fonts/ionicons.svg'
import 'iview/dist/styles/fonts/ionicons.ttf'
import 'iview/dist/styles/fonts/ionicons.woff'
import 'iview/dist/styles/iview.css'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
global.api = apiConfig;
Vue.use(iView)
Vue.use(VueLocalStorage)
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  methods:{
	 checkLogin () {
        
		    if(this.$localStorage.get('userinfo') == null){
        //如果没有登录状态则跳转到登录页
        	 this.$router.push({path: '/login'})
        }else if(this.$localStorage.get('jsq')){
           this.$router.push({path: '/timer'})
        }else{
          this.$router.push({path: '/classes'})
        }
	   }
  },
  created () {
     this.checkLogin()
  }
}).$mount('#app')
