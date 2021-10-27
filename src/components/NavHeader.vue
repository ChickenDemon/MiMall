<template>
  <div class="p-navheader page">
    <div class="p-header">
      <div class="p-navtopbar">
        <div class="p-container">
          <div class="p-topbarmenu">
            <a class="p-topbarmenu__item">小米商城</a>
            <a class="p-topbarmenu__item">MIUI</a>
            <a class="p-topbarmenu__item">云服务</a>
            <a class="p-topbarmenu__item">协议规则</a>
          </div>
          <div class="p-topbaruser">
            <a class="p-topbaruser__item" href="javascript:;" v-if="username">{{username}}</a>
            <a class="p-topbaruser__item" href="javascript:;" v-if="!username" @click="toLogin">登录</a>
            <a class="p-topbaruser__item" href="javascript:;" v-if="username" @click="handleLogout">注销</a>
            <a class="p-topbaruser__item" href="javascript:;">我的订单</a>
            <div class="p-cart" @click="toCart"><img class="p-cart__icon-cart" src="/imgs/icon-cart-checked.png"><span class="p-cart__text">购物车({{cartCount}})</span></div>
          </div>
        </div>
      </div>
      <div class="p-navheader">
        <a class="p-navheader__logo-container"><a class="p-navheader__background"></a><a class="p-navheader__logo"></a></a>
        <div class="p-item-container">
          <div class="p-menu-container">
            <div class="p-item-memu" @mouseover="showMiChildren" @mouseout="hideMiChildren">
              <span class="p-item-memu__item">小米手机</span>
              <div class="p-children" :class="{'p-children__show' : showMi}">
                <ul>
                  <li class="p-product" v-for="(item, index) in phoneList" :key="index">
                    <a :href="`/#/product/index/${item.id}`" target="_blank">
                      <div class="p-product__img">
                        <img :src="item.mainImage" :alt="item.subtitle">
                      </div>
                      <div class="p-product__name">{{item.name}}</div>
                      <div class="p-product__price">{{item.price | currency}}</div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="p-item-memu">
              <span class="p-item-memu__item">RedMi红米</span>
              <div></div>
            </div>
            <div class="p-item-memu" @mouseover="showTVChildren" @mouseout="hideTVChildren">
              <span class="p-item-memu__item">电视</span>
              <div class="p-children" :class="{'p-children__show' : showTV}">
                <ul>
                  <li class="p-product">
                    <a href="" target="_blank">
                      <div class="p-product__img">
                        <img src="/imgs/nav-img/nav-3-1.jpg">
                      </div>
                      <div class="p-product__name">小米壁画电视</div>
                      <div class="p-product__price">6999</div>
                    </a>
                  </li>
                  <li class="p-product">
                    <a href="" target="_blank">
                      <div class="p-product__img">
                        <img src="/imgs/nav-img/nav-3-2.jpg">
                      </div>
                      <div class="p-product__name">小米全面屏电视E55A</div>
                      <div class="p-product__price">1999</div>
                    </a>
                  </li>
                  <li class="p-product">
                    <a href="" target="_blank">
                      <div class="p-product__img">
                        <img src="/imgs/nav-img/nav-3-3.png">
                      </div>
                      <div class="p-product__name">小米电视4A 32英寸</div>
                      <div class="p-product__price">2599</div>
                    </a>
                  </li>
                  <li class="p-product">
                    <a href="" target="_blank">
                      <div class="p-product__img">
                        <img src="/imgs/nav-img/nav-3-4.jpg">
                      </div>
                      <div class="p-product__name">小米电视4A 55英寸</div>
                      <div class="p-product__price">2599</div>
                    </a>
                  </li>
                  <li class="p-product">
                    <a href="" target="_blank">
                      <div class="p-product__img">
                        <img src="/imgs/nav-img/nav-3-5.jpg">
                      </div>
                      <div class="p-product__name">小米电视4A 65英寸</div>
                      <div class="p-product__price">3699</div>
                    </a>
                  </li>
                  <li class="p-product">
                    <a href="" target="_blank">
                      <div class="p-product__img">
                        <img src="/imgs/nav-img/nav-3-6.png">
                      </div>
                      <div class="p-product__name">查看全部</div>
                      <div class="p-product__text">小米电视</div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="p-header-search">
            <div class="p-search-container">
              <input type="text" class="p-search-container__input">
              <img class="p-search-container__search" src="/imgs/icon-search.png">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'nav-header',
  data() {
    return {
      showMi: false,
      showTV: false,
      phoneList: [],
    }
  },
  computed: {
    // username() {
    //   return this.$store.state.username;
    // },

    // cartCount() {
    //   return this.$store.state.cartCount;
    // }
    ...mapState(['username', 'cartCount']),
  },
  mounted() {
    this.getProductList();
    if (this.$route.query?.from === 'login') {
      this.getCartCount();
    }
  },

  filters: {
    currency(val) {
      if(!val) {
        return '';
      }
      return '￥' + val.toFixed(2) + '元';
    }
  },

  methods: {
    getCartCount() {
      this.axios.get('/carts/products/sum').then((res) => {
        if (res && res.status === 0) {
          this.$store.dispatch('saveCartCount', res.data);
        }
      })
    },

    getProductList() {
      this.axios.get('/products', {
        params: {
          categoryId: '100012',
        }
      }).then((res) => {
        console.log('resssss' + res.data.list);
        this.phoneList = res.data.list;
      })
    },

    showMiChildren() {
      this.showMi = true;
    },

    hideMiChildren() {
      this.showMi = false;
    },

    showTVChildren() {
      this.showTV = true;
    },

    hideTVChildren() {
      this.showTV = false;
    },
    
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
          this.$cookie.set('userId', {expires: '-1'});
          this.$store.dispatch('saveUserName', '');
          this.$store.dispatch('saveCartCount', '0');
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.p-navheader.page {
  .p {
    &-navtopbar{
      height: 39px;
      line-height: 39px;
      background: #333;
      color: #b0b0b0;
    }

    &-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;
      width: 1226px;
      margin-right: auto;
      margin-left: auto;
    }

    &-topbarmenu {
      &__item {
        margin-right: 17px;
      }
    }

    &-topbaruser {
      display: flex;
      &__item {
        margin-right: 17px;
        color: #b0b0b0;
      }
    }

    &-cart {
      width: 110px;
      height: 39px;
      background: #FF6600;
      text-align: center;
      color: #fff;
      display: flex;
      align-items: baseline;
      justify-content: center;
      cursor: pointer;

      &__text {
        height: 39px;
        text-align: center;
      }

      &__icon-cart {
        width: 16px;
        height: 12px;
        margin-right: 4px;
      }
    }

    &-navheader {
      width: 1226px;
      margin-right: auto;
      margin-left: auto;
      display: flex;
      align-items: center;
      position: relative;

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
    }

    &-item-memu {
      display: flex;
      align-items: center;
      line-height: 112px;

      &__item {
        font-size: 16px;
        font-weight: bold;
        margin-right: 20px;
        color: #333;
        cursor: pointer;

        &:hover {
          color: #FF6600;
        }
      }
    }

    &-header-search {
      width: 319px;
      display: flex;
      align-items: center;
    }

    &-search-container {
      border: 1px solid #E0E0E0;
      width: 319px;
      display: flex;
      align-items: center;

      &__input {
        width: 264px;
        height: 50px;
        border: none;
        border-right: 1px solid #E0E0E0;
        display: flex;
        align-items: center;
        padding-left: 14px;
        margin-right: 16px;
        box-sizing: border-box;
      }

      &__search {
        width: 18px;
        height: 18px;
      }
    }

    &-item-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding-left: 170px;
    }

    &-menu-container {
      display: flex;
      flex-direction: row;
    }

    &-children {
      position:absolute;
      top: 112px;
      left: 0px;
      width: 1226px;
      border-top: 1px solid #E5E5E5;
      box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
      background: #fff;
      z-index: 20;
      opacity: 0;
      overflow: hidden;
      height: 0;
      transition: all .5s;

      &__show {
        opacity: 1;
        height: 220px;
      }
    }

    &-product {
      position: relative;
      float: left;
      width: 16.6%;
      height: 220px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      font-weight: bold;

      &::before {
        content: ' ';
        position: absolute;
        top: 28px;
        left: 0;
        border-left: 1px solid #D7D7D7;
        height: 100px;
        width: 1px;
      }
      
      &:first-child::before {
        display: none;
      }
      a {
        display: inline-block;
      }

      &__img {
        height: 137px;

        img {
          width: auto;
          height: 111px;
          margin-top: 26px;
        }
      }

      &__name {
        margin-top: 19px;
        margin-bottom: 8px;
        color: #333;
      }

      &__price {
        color: #FF6600;
      }

      &__text {
        color: #FF6600;
      }
    }
  }
}
</style>