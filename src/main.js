import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/global.css'
import VueRouter from "vue-router";
import router from "@/router";
import service from "@/axios/request";

Vue.prototype.$httpUrl='http://localhost:8090'
Vue.prototype.$axios=service;
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')