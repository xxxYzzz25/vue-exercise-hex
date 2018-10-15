<template>
  <div class="mt-5 pt-2">
    <loading :active.sync="isLoading" ></loading>

    <table class="table ">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買品項</th>
          <th>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="item in orders" :key="item.id" :class="{'alreadyPay' : item.is_paid}">
            <td>{{item.create_at}}</td>
            <td>{{item.user.email}}</td>
            <td><div v-for="list in item.products" :key="list.id">{{list.product.title}}</div></td>
            <td>{{item.total | currency}}</td>
            <td>
            <span v-if="item.is_paid" class="text-success">已付款</span>
            <span v-else>尚未付款</span>
            </td>
          </tr>
      </tbody>
    </table>
    <Pagination :page="pagination" @goToPage="getOrder"></Pagination>
  </div>
</template>

<script>
import Pagination from "../Paginaion";
export default {
  data() {
    return {
      isLoading: false,
      isNew: false,
      orders: [],
      pagination: {}
    };
  },
  components: {
    Pagination
  },
  methods: {
    getOrder(page = 1) {
      const vm = this;
      vm.isLoading = true;
      
      const api = `https://vue-course-api.hexschool.io/api/shopping/admin/orders?page=${page}`;
      this.axios.get(api).then(res => {
        if (res.data.success) {
          vm.isLoading = false;
          vm.orders = res.data.orders;
          vm.pagination = res.data.pagination;
        }
      });
    }
  },
  created() {
    this.getOrder();
  }
};
</script>