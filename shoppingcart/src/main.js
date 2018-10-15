import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import App from "./App.vue";
import router from "./router";
import './bus';
import currencyFilter from './filters/currency';

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = " https://vue-course-api.hexschool.io/api/user/check";
    axios.post(api).then(response => {
      console.log(response.data);
      if (response.data.success) {
        next();
      }else{
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
