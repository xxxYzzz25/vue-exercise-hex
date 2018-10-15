<template>
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <router-link to="/admin" class="navbar-brand text-white pt-2 col-sm-3 col-md-2 mr-0" href="javascript:;">QQQ</router-link>
    <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    signout() {
      const api = " https://vue-course-api.hexschool.io/logout";
      const vm = this;
      this.$http.post(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push("/login");
        }
      });
    },
  },
};
</script>
