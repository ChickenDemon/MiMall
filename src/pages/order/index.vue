<template>
  <div>
    <order-header :title="title">
      <template v-slot:tip>
        <span class="m-container__tip">{{ tip }}</span>
      </template>
    </order-header>
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from '../../components/OrderHeader.vue';
import NavFooter from '../../components/NavFooter.vue';
import ServiceBar from '../../components/ServiceBar.vue';
export default {
  name: 'order-index',
  components: { 
    OrderHeader,
    NavFooter,
    ServiceBar
  },
  data() {
    return {
      title: '',
      tip: '',
    }
  },
  computed: {
    path: {
      get: function() {
        return this.$route.path;
      }
    }
  },
  mounted() {
    const path = this.path;
    switch (path) {
      case '/order/orderConfirm': {
        this.title = '订单确认';
        this.tip = '请填写收货地址';
        break;
      }

      case '/order/orderList': {
        this.title = '订单列表';
        this.tip = '请谨防钓鱼链接或诈骗电话，了解更多>';
        break;
      }

      case '/order/pay': {
        this.title = '订单支付';
        this.tip = '请谨防钓鱼链接或诈骗电话，了解更多>';
        break;
      }

      default:
        break;
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.p-order.page {
  .p {
    &-header {
    }
  }
}
</style>