<template>
  <div class="p-alipay page">
    <div class="p-form" v-html="content"></div>
    <m-loading v-if="isLoading"></m-loading>
  </div>
</template>

<script>
import MLoading from '../../components/Loading.vue';

export default {
  name: 'alipay',
  components: {
    MLoading,
  },
  data() {
    return {
      orderNo: this.$route.query.orderNo,
      content: '',
      isLoading: true,
    }
  },

  mounted() {
    this.paySubmit();
  },

  methods: {
    paySubmit() {
      this.axios.post('/pay', {
        orderId: this.orderNo,
        orderName: '小米商城',
        amount: 0.01,
        payType: 1,
      }).then((res) => {
        if (res?.status === 0) {
          this.content = res.data.content;
          setTimeout(() => {
            document.forms[0].submit();
          }, 100);
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.p-alipay.page {
  .p {
    &-form {
    }
  }
}
</style>
