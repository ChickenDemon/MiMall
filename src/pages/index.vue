<template>
  <div class="p-index page">
    <div class="p-container">
      <div class="p-ads">
        <div class="p-top">
          <div class="p-menu">
            <ul class="p-wrap">
              <li class="p-wrap__item" v-for="(item, index) in menuList" :key="index" @mouseover="onOver(index)" @mouseout="onOut(index)">
                <a href="javascript;">{{ item }}</a>
                <div class="p-wrap__arrow"></div>
                <div v-if="index === 0" class="p-wrap-child" :class="{'p-wrap-child--show': showMobileChild}">
                  <div class="p-wrap-child__item" v-for="(menu, mindex) in menuItems" :key="`${menu}${mindex}`">
                    <div class="p-wrap-child__child" v-for="(child, cindex) in menu" :key="`${child}${cindex}`" @click="onClick(child)">
                      <img class="p-wrap-child__img" :src="child ? child.imgs: '/imgs/item-box-1.png'" alt="">
                      {{child.name}}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="p-carousel">
            <el-carousel trigger="click" height="451px" :interval="5000" arrow="always">
              <el-carousel-item v-for="(item, index) in carouselList" :key="index">
                <a :href="`/#/product/index/${item.id}`"><img class="p-carousel__img" :src="item.img"></a>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="p-advertisement">
            <div class="p-advertisement__item" v-for="(item, index) in adsList" :key="index">
              <img v-lazy="item.img">
            </div>
          </div>
          <div class="p-banner">
            <img v-lazy="'/imgs/banner-1.png'">
          </div>
        </div>
        <div class="p-product">
          <div class="p-product-box">
            <h2 class="p-product-box__title">手机</h2>
            <div class="p-product-container">
              <div class="p-product-container__left">
                <img src="/imgs/mix-alpha.jpg">
              </div>
              <div class="p-product-container__right">
                <div class="p-product-list" v-for="(item, index) in phoneList" :key="index">
                  <div class="p-product-list__item" v-for="(pItem, pIndex) in item" :key="`${pIndex}${index}`">
                    <span v-if="pItem.status === 0" class="p-product-list__label p-product-list__label--new">新品</span>
                    <span v-else-if="pItem.status === 1" class="p-product-list__label p-product-list__label--kill">秒杀</span>
                    <div class="p-product-list__img"><img v-lazy="pItem.mainImage"></div>
                    <span class="p-product-list__title">{{pItem.name}}</span>
                    <span class="p-product-list__desc">{{pItem.subtitle}}</span>
                    <div class="p-product-list__price" @click="onAddCart(pItem.id)">{{pItem.price}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <m-service-bar></m-service-bar>
    <m-modal :showModal="showModel" sureText="查看购物车" :btnType="1" modalType="middle" @onSubmit="onSubmit" @onClickCancel="onClickCancel">
      <template v-slot:body>
        <p>商品添加成功</p>
      </template>
    </m-modal>
  </div>
</template>

<script>
import MServiceBar from '../components/ServiceBar.vue';
import MModal from '../components/Modal.vue';
import _ from 'lodash';

export default {
  name: 'index',
  data() {
    return {
      showMobileChild: false,
      carouselList: [
        {
          id: '42',
          img: '/imgs/slider/slide-1.jpg',
        },
        {
          id: '45',
          img: '/imgs/slider/slide-2.jpg',
        },
        {
          id: '46',
          img: '/imgs/slider/slide-3.jpg',
        },
      ],
      menuList: [
        '手机 电话卡',
        '电视 盒子',
        '笔记本 平板',
        '家电 插线板',
        '出行 穿戴',
        '智能 路由器',
        '电源 配件',
        '生活 箱包'
      ],

      menuItems: [
        [
          {
            id: 30,
            imgs: '/imgs/item-box-1.png',
            name: '小米CC9'
          },
          {
            id: 31,
            imgs: '/imgs/item-box-2.png',
            name: '小米CC9'
          },
          {
            id: 32,
            imgs: '/imgs/item-box-3.jpg',
            name: '小米CC9'
          },
          {
            id: 33,
            imgs: '/imgs/item-box-4.jpg',
            name: '小米CC9'
          },
        ],
        [
          {
            id: 30,
            imgs: '/imgs/item-box-1.png',
            name: '小米CC9'
          },
          {
            id: 31,
            imgs: '/imgs/item-box-2.png',
            name: '小米CC9'
          },
          {
            id: 32,
            imgs: '/imgs/item-box-3.jpg',
            name: '小米CC9'
          },
          {
            id: 33,
            imgs: '/imgs/item-box-4.jpg',
            name: '小米CC9'
          },
        ],
        [
          {
            id: 30,
            imgs: '/imgs/item-box-1.png',
            name: '小米CC9'
          },
          {
            id: 31,
            imgs: '/imgs/item-box-2.png',
            name: '小米CC9'
          },
          {
            id: 32,
            imgs: '/imgs/item-box-3.jpg',
            name: '小米CC9'
          },
          {
            id: 33,
            imgs: '/imgs/item-box-4.jpg',
            name: '小米CC9'
          },
        ],
        [
          {
            id: 30,
            imgs: '/imgs/item-box-1.png',
            name: '小米CC9'
          },
          {
            id: 31,
            imgs: '/imgs/item-box-2.png',
            name: '小米CC9'
          },
          {
            id: 32,
            imgs: '/imgs/item-box-3.jpg',
            name: '小米CC9'
          },
          {
            id: 33,
            imgs: '/imgs/item-box-4.jpg',
            name: '小米CC9'
          },
        ],
      ],
      adsList: [
        {
          id: 33,
          img: '/imgs/ads/ads-1.png',
        },
        {
          id: 34,
          img: '/imgs/ads/ads-2.jpg',
        },
        {
          id: 35,
          img: '/imgs/ads/ads-3.png',
        },
        {
          id: 36,
          img: '/imgs/ads/ads-4.jpg',
        },
      ],
      phoneList: [],
      showModel: false,
    }
  },
  mounted() {
    this.onShow();
  },
  methods: {
    onShow() {
      this.axios.get('/products', {
        params: {
          categoryId: 100012,
          pageSize: 14,
        }
      }).then((res) => {
        if(res.data.list?.length) {
          this.phoneList = _.chunk(res.data.list.splice(6, 14), 4);
          console.log('-------', this.phoneList);
        }
      })
    },

    onOver(index) {
      if(index === 0) {
        this.showMobileChild = true;
        console.log('log---', this.showMobileChild);
      }
    },

    onOut(index) {
      if(index === 0) {
        this.showMobileChild = false;
      }
    },

    onAddCart(id) {
      
      this.axios.post('/carts', {
        productId: id,
        selected: true,
      }).then((res) => {
        this.showModel = true;
        console.log('res->', res);
        this.$store.dispatch('saveCartCount', res.data.cartProductVoList.length);
      }).catch(() => {
        this.showModel = true;
      })
    },

    onSubmit() {
      this.showModel = false;
      this.$router.push('/cart');
    },

    onClickCancel() {
      this.showModel = false;
    }
  },

  components: {
    MServiceBar,
    MModal,
  }
}
</script>

<style lang="scss" scoped>
.p-index.page {
  .p {
    &-carousel {
      flex-shrink: 1;
      width: 100%;
      position: relative;

      &__img {
        width: 100%;
        height: 100%;
      }

      ::v-deep {
        & .el-carousel {
          & .el-carousel__container {
            & .el-carousel__arrow--left {
              left: 279px;
            }
          }
        }
      }
    }

    &-top {
      width: 1200px;
      margin: 0 auto;
    }

    &-menu {
      width: 264px;
      height: 451px;
      background: #55585a17;
      position: absolute;
      z-index: 10;
    }

    &-wrap {
      padding: 26px 0;
      cursor: pointer;
      position: relative;
      &__item {
        height: 50px;
        padding: 0 30px;
        line-height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        &:hover {
          background: #ff6600;
        }

        a {
          color: #fff !important;
        }
      }

      &__arrow {
        width: 8px;
        height: 8px;
        border-top: 1px solid #fff;
        border-right: 1px solid #fff;
        transform: rotate(45deg);
      }
    }

    &-wrap-child {
      display: flex;
      flex-direction: column;
      position: absolute;
      left: 264px;
      top: 0;
      width: 0;
      height: 453px;
      opacity: 0;
      background: #fff;
      display: none;

      &__item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 6px;
      }

      &__img {
        width: 42px;
        height: 35px;
      }

      &__child {
        display: flex;
        flex-direction: row;
        width: 217px;
        height: 75px;
        align-items: center;
        justify-content: center;
      }

      &--show {
        width: 936px;
        opacity: 1;
        display: block;
      }
    }

    &-advertisement{
      width: 100%;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      justify-content: space-between;
      margin: 13px 0 31px 0;

      &__item {
        width: 296px;
        height: 167px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    &-banner {
      padding-bottom: 50px;
      img {
        width: 100%;
      }
    }

    &-product {
      background: #f5f5f5;
      padding-top: 30px;
      padding-bottom: 50px;
    }

    &-product-box {
      display: flex;
      flex-direction: column;
      width: 1200px;
      margin: 0 auto;

      &__title {
        font-size: 22px;
        height: 21px;
        line-height: 21px;
        color: #333;
        margin-bottom: 20px;
      }
    }

    &-product-container {
      display: flex;
      flex-direction: row;

      &__left {
        width: 224px;
        height: 619px;
        img {
          width: 100%;
          height: 100%;
        }
      }

      &__right {
        margin-left: 16px;
        flex-grow: 1;
      }
    }

    &-product-list {
      display: flex;
      flex-direction: row;
      margin-bottom: 14px;
      justify-content: space-between;

      &__img {
        width: 161px;
        height: 161px;
        
        img {
          width: 100%;
          height: 100%;
        }
      }

      &__item {
        background: #fff;
        width: 230px;
        height: 302px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      &__title {
        font-weight: bold;
        font-size: 14px;
        margin-top: 10px;
      }

      &__desc {
        font-size: 12px;
        margin-bottom: 10px;
        color: gray;
      }

      &__price {
        font-weight: bold;
        font-size: 14px;
        color: #f20a0a;

        &::before {
          content
          : '￥';
        }

        &:after {
          content: ' ';
          display: inline-block;
          width: 24px;
          height: 18px;
          background: url('/imgs/icon-cart-hover.png') no-repeat center;
          background-size: 24px;
          vertical-align: middle;
          cursor: pointer;
        }
      }

      &__label {
        display: inline-block;
        width: 67px;
        height: 24px;
        font-size: 14px;
        line-height: 24px;
        color: #fff;

        &--new {
          background: #7ecf68;
        }
        &--kill {
          background: #e82626;
        }
      }
    }
  }
}
</style>