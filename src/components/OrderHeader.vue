<template>
  <div class="m-order-header module">
    <div class="m-container">
      <div class="m-container__header">
        <div class="m-container__logo-container" @click="handleToHome">
          <a class="m-container__background"></a>
          <a class="m-container__logo"></a>
        </div>
        <div class="m-container__title-container">
          <span class="m-container__title">我的购物车</span>
          <span class="m-container__tip">温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
        </div>
      </div>
      <div class="m-topbaruser">
        <a class="m-topbaruser__item" href="javascript:;" v-if="username">{{username}}</a>
        <a class="m-topbaruser__item" href="javascript:;" v-if="!username" @click="toLogin">登录</a>
        <a class="m-topbaruser__item" href="javascript:;" v-if="username" @click="handleLogout">注销</a>
        <a class="m-topbaruser__item" href="javascript:;">我的订单</a>
        <div class="m-cart" @click="toCart"><img class="m-cart__icon-cart" src="/imgs/icon-cart-checked.png"><span class="m-cart__text">购物车({{cartCount}})</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'order-header',
  data() {
    return {
    }
  },
  components: {},
  computed: {
    // username() {
    //   return this.$store.state.username;
    // },

    // cartCount() {
    //   return this.$store.state.cartCount;
    // }
    ...mapState(['username', 'cartCount']),
  },
  methods: {
    toCart() {
      this.$router.push('/cart');
    },

    toLogin() {
      this.$router.push('/login')
    },

    ...mapActions(['saveUserName']),

    handleLogout() {
      this.axios.post('/user/logout').then((res) => {
        if (res && res.status === 0) {
          this.$message.success('已注销');
          this.saveUserName('');
        }
      })
    },

    handleToHome() {
      this.$router.push('/index');
    }
  }
}
</script>

<style lang="scss" scoped>
.m-order-header.module {
  border-bottom: 2px solid #f60;
  .m {
    &-container {
      width: 1226px;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 30px 0;
      justify-content: space-between;

      &__header {
        display: flex;
        flex-direction: row;
      }

      &__logo-container {
        width: 110px;
        height: 55px;
        display: flex;
        flex-shrink: 0;
      }

      &__background {
        width: 55px;
        height: 55px;
        background: #FF6600;
      }

      &__logo {
        width: 55px;
        height: 55px;
        // margin-right: 50px;
        position: absolute;
        overflow: hidden;
        
        &:before {
          content: ' ';
          display: inline-block;
          width: 55px;
          height: 55px;
          background: url('/imgs/mi-logo.png') no-repeat center;
          background-size: 55px;
          transition: margin .2s;
        }

        &:after {
          content: ' ';
          display: inline-block;
          width: 55px;
          height: 55px;
          background: url('/imgs/mi-home.png') no-repeat center;
          background-size: 55px;
        }

        &:hover::before {
          margin-left: -55px;
          transition: margin .2s;
        }
      }

      &__title {
        font-size: 28px;
        color: #333;
        font-weight: bold;
      }

      &__tip {
        font-size: 14px;
        margin-left: 17px;
        color: #999;
        font-weight: 200;
      }
    }

    &-topbaruser {
      display: flex;
      align-items: center;

      &__item {
        margin-right: 17px;
        color: #333;
      }
    }

    &-cart {
      width: 110px;
      height: 39px;
      background: #FF6600;
      text-align: center;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &__text {
        display: flex;
        align-items: center;
        height: 39px;
        text-align: center;
      }

      &__icon-cart {
        width: 16px;
        height: 12px;
        margin-right: 4px;
      }
    }
  }
}
</style>
