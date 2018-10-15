<template>
  <div>
    <loading :active.sync="isLoading" ></loading>
      <div class="btn-group" role="group" >
    <button type="button" class="btn btn-primary my-4" @click="openModal(false)">
      新增優惠券
    </button>
    </div>
    <table class="table ">
      <thead>
        <tr>
          <th>標題</th>
          <th>打幾折</th>
          <th>到期日</th>
          <th>有其啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{item.title}}</td>
          <td>{{item.percent}}</td>
          <td>{{item.due_date}}</td>
          <td>
          <span v-if="item.is_enabled">啟用</span>
          <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group" role="group" >
          <button class="btn btn-outline-primary" @click="openModal(true, item)">編輯</button>
          <button class="btn btn-outline-danger">刪除</button>
          </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!--modal-->
    <div class="modal" tabindex="-1" role="dialog" id="couponModel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">新增優惠券</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="coupon-title">標題</label>
              <input type="text" class="form-control" id="coupon-title" v-model="coupon.title" placeholder="請輸入標題">
            </div>
            <div class="form-group">
              <label for="coupon-code">優惠碼</label>
              <input type="text" class="form-control" id="coupon-code" v-model="coupon.code" placeholder="請輸入優惠碼">
            </div>
            <div class="form-group">
              <label for="coupon-duedate">到期日</label>
              <input type="text" class="form-control" id="coupon-duedate" v-model="coupon.due_date" placeholder="請輸入到期日">
            </div>
            <div class="form-group">
              <label for="coupon-percent">折數</label>
              <input type="number" class="form-control" id="coupon-percent" v-model.number="coupon.percent" placeholder="請輸入折數">
            </div>
            <div class="form-group">
              <input type="checkbox"  id="coupon-enable" v-model="coupon.is_enabled" true-value="1" false-value="0" placeholder="請輸入折數">
              <label for="coupon-enable">是否啟用</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addCoupons">新增</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      isLoading: false,
      coupons: {},
      coupon: {
        title: "",
        is_enabled: 0,
        percent: 0,
        due_date: 0,
        code: ""
      },
      isNew: false
    };
  },
  methods: {
    getCoupons(page = 1) {
      const vm = this;
      vm.isLoading = true;
      const api = `https://vue-course-api.hexschool.io/api/shopping/admin/coupons?page=${page}`;
      this.axios.get(api).then(res => {
        if (res.data.success) {
          vm.coupons = res.data.coupons;
          vm.isLoading = false;
        }
      });
    },
    addCoupons() {
      const vm = this;
      let httpStatus = "post";
      let api = `https://vue-course-api.hexschool.io/api/shopping/admin/coupon`;
      if (!vm.isNew) {
        httpStatus = "put";
        api = `https://vue-course-api.hexschool.io/api/shopping/admin/coupon/${vm.coupon.id}`;
      }
      this.axios[httpStatus](api, { data: vm.coupon }).then(res => {
        console.log(res.data);
        if (res.data.success) {
          vm.getCoupons();
          $("#couponModel").modal("hide");
        } else {
          vm.getCoupons();
          $("#couponModel").modal("hide");
          console.log("新增失敗");
        }
      });
    },
    openModal(isNew, item) {
      if (!isNew) {
        this.isNew = true;
        this.coupon = {};
      } else {
        this.isNew = false;
        this.coupon = Object.assign({}, item);
      }
      $("#couponModel").modal("show");
    }
  },
  created() {
    this.getCoupons();
  }
};
</script>