import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Dashboard from "./views/Dashboard.vue";
import Products from "./components/admin/Products.vue";
import Coupons from "./components/admin/Coupons.vue";
import Orders from "./components/admin/Orders.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*",
      redirect: "login"
    },
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/admin",
      name: "Dashboard",
      component: Dashboard,
      children: [
        {
          path: "",
          name: "Products",
          component: Products,
          meta: { requiresAuth: true }
        },
        {
          path: "coupons",
          name: "Coupons",
          component: Coupons,
          meta: { requiresAuth: true }
        },
        {
          path: "orders",
          name: "Orders",
          component: Orders,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
});
