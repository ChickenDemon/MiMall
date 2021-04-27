import Vue from 'vue';
import App from './App.vue';
import routers from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
// import env from './env';

/** mock开关 */
const mock = true;
if(mock) {
  require('./mock/api');
}
/** 根据前端的跨域方式作调整 */
// axios.defaults.baseURL = env.baseURL;
axios.defaults.timeout = 8000;
/** 接口拦截 */
axios.interceptors.response.use(function(response) {
  let res = response.data;
  if(res.status === 0) {
    return res.data;
  }else if(res.status === 10) {
    window.location.href = '/#/login';
  }else {
    alert(res.msg);
  }
});

/** 把axios挂载到Vue上面去 */
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
  router: routers,
  render: h => h(App),
}).$mount('#app')
