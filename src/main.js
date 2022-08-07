import Vue from 'vue';
import App from './App.vue';
import routers from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyLoad from 'vue-lazyload';
import VueCookie from 'vue-cookie';
import store from './store';
// import env from './env';


/** mock开关 */
const mock = false;
if(mock) {
  require('./mock/api');
}
/** 根据前端的跨域方式作调整 */
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;
/** 接口拦截 */
axios.interceptors.response.use(function(response) {
  let res = response.data;
  const path = location.hash;
  if(res.status === 0) {
    return res;
  }else if(res.status === 10) {
    if(path.includes('#')) {
      // if (path !== '/#/login') {
      //   window.location.href = '/#/login';
      // }
    }
  }else {
    alert(res.msg);
    return Promise.reject(res);
  }
});

/** 把axios挂载到Vue上面去 */
Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.use(VueCookie);
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
});
Vue.config.productionTip = false;

new Vue({
  router: routers,
  store,
  render: h => h(App),
}).$mount('#app')
