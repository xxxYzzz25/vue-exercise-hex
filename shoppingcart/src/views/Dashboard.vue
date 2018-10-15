<template>
  <div>
    <Navbar/>
    <Alert-message/>
    <div class="container-fluid">
      <div class="row">     
        <Sidebar/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/admin/Navbar";
import Sidebar from "../components/admin/Sidebar";
import AlertMessage from "../components/AlertMessage";

export default {
  components: {
    Navbar,
    Sidebar,
    AlertMessage
  }
};
</script>
