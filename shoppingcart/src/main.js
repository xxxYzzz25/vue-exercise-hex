import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VeeValidate from 'vee-validate';
import zhTW_Validate from 'vee-validate/dist/locale/zh_TW';

import App from "./App.vue";
import router from "./router";
import './bus';
import currencyFilter from './filters/currency';

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);

Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_TW', zhTW_Validate);

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
