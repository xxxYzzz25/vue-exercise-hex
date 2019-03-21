<template>
  <!-- headers -->
  <nav class="navbar navbar-light topNavbar mb-4">
    <div class="container">
      <div class="d-inline-flex topNavbar-link">
        <router-link to="/" class="icon-nav icon-home">
          <div class="icon-text">首&emsp;頁</div>
        </router-link>
        <router-link to="/discount" class="icon-nav icon-discount">
          <div class="icon-text">優惠活動</div>
        </router-link>
      </div>

      <router-link class="navbar-brand logo" to="/">
        <img src="../assets/images/logo.png" class="img-fluid" alt>
      </router-link>

      <div class="d-inline-flex align-items-center topNavbar-link">
        <router-link to="/admin" class="icon-nav icon-admin">
          <div class="icon-text">管理商品</div>
        </router-link>
        <router-link to="/login" class="icon-nav icon-member">
          <div class="icon-text">登&emsp;入</div>
        </router-link>
      </div>
    </div>
  </nav>
</template>
