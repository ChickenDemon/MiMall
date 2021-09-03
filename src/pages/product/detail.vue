<template>
  <div class="p-detail page">
    <product-param :title="product.name"></product-param>
    <div class="p-container">
      <div class="p-content">
        <div class="p-left">
          <el-carousel height="642px" indicator-position="outside">
            <el-carousel-item v-for="(img, index) in imgs" :key="index">
              <el-image class="p-left__carousel-img" :src="img" alt=""></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="p-right">
          <div class="p-right__title">{{product.name}}</div>
          <span class="p-right__desc">
            {{product.subtitle}}
          </span>
          <div class="p-mode">
            <span class="p-mode__text">小米自营</span>
            <div class="p-mode__price-wrapper">
              <span class="p-mode__price">{{product.price}}</span>
              <span class="p-mode__price p-mode__price--origin">1999</span>
            </div>
            <div class="p-mode__line"></div>
          </div>
          <div class="p-address">
            <img class="p-address__img" src="/imgs/detail/icon-loc.png">
            <div class="p-address__content">
              <div class="p-address__detail">北京 北京市 朝阳区 安定门街道</div>
              <div class="p-address__available">有现货</div>
            </div>
          </div>
          <div class="p-version">
            <span class="p-version__title">选择版本</span>
            <div class="p-version__container">
              <div class="p-version__select" :class="{'p-version__select--checked': select === 1}" @click="handleSelectVersion(1)">6GB+64GB 全网通</div>
              <div class="p-version__select" :class="{'p-version__select--checked': select === 2}" @click="handleSelectVersion(2)">4GB+64GB 移动4G</div>
            </div>
          </div>
          <div class="p-version">
            <span class="p-version__title">选择颜色</span>
            <div class="p-version__container">
              <div class="p-version__select"><span class="p-color"></span>深空灰</div>
            </div>
          </div>
          <div class="p-price">
            <div class="p-price__info">
              <span class="p-price__detail">{{product.name}} {{select === 1 ? '6GB+64GB 全网通' : '4GB+64GB 移动4G'}} 深灰色</span>
              <span class="p-price__price">{{product.price}}元</span>
            </div>
            <div class="p-price__total">总计：{{product.price}}元</div>
          </div>
          <el-button class="p-cart" @click="addCart">加入购物车</el-button>
        </div>
      </div>
      <div class="p-instruction">
        <div class="p-instruction__container">
          <h2 class="p-instruction__title">价格说明</h2>
          <img src="/imgs/detail/item-price.jpeg">
        </div>
      </div>
    </div>
    <service-bar></service-bar>
  </div>
</template>

<script>
import ProductParam from '../../components/ProductParam.vue';
import ServiceBar from '../../components/ServiceBar.vue';

export default {
  name: 'detail',
  components: {
    ProductParam,
    ServiceBar,
  },
  data() {
    return {
      id: this.$route.params.id,
      imgs: [],
      product: {},
      select: 1,
    }
  },
  mounted() {
    this.getProductInfo();
  },
  methods: {
    getProductInfo() {
      this.axios.get(`/products/${this.id}`).then((res) => {
        if (res && res.status === 0) {
          this.product = res.data;
          this.imgs.push(this.product.mainImage);
          console.log('imgs-->', this.imgs);
        }
      });
    },

    handleSelectVersion(select) {
      this.select = select;
    },

    addCart() {
      this.axios.post('/carts', {
        productId: parseInt(this.id),
        selected: true,
      }).then((res) => {
        if (res && res.status === 0) {
          if (res.data && res.data.cartProductVoList) {
            this.$store.dispatch('saveCartCount', res.data.cartProductVoList.length);
            this.$message.success('成功添加至购物车!');
            this.$router.push('/cart');
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.p-detail.page {
  .p {
    &-container {
      width: 1226px;
      margin: 0 auto;
    }

    &-content {
      display: flex;
      flex-direction: row;
    }

    &-left {
      width: 642px;
      flex-shrink: 0;

      &__carousel {
        width: 100%;
      }

      &__carousel-img {
        width: 100%;
        height: 100%;
      }
    }

    &-right {
      width: 100%;
      display: flex;
      flex-direction: column;

      &__title {
        font-size: 28px;
        padding-top: 30px;
        padding-bottom: 16px;
        font-weight: bold;
      }

      &__desc {
        font-size: 14px;
        flex-wrap: wrap;
      }
    }

    &-mode {
      color: #ff6700;
      margin-top: 26px;

      &__text {
        font-size: 16px;
        margin-bottom: 14px;
        display: block;
      }

      &__price-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      &__price {
        font-size: 20px;
        &::after {
          content: '元';
        }

        &--origin {
          font-size: 16px;
          text-decoration: line-through;
          color: #999;
          margin-left: 10px;
        }
      }

      &__line {
        border-top: 1px solid #e5e5e5;
        margin: 25px 0 28px 0;
      }
    }

    &-address {
      display: flex;
      flex-direction: row;
      background: #fafafa;
      padding: 25px 30px;
      border: 1px solid #e5e5e5;

      &__content {
        display: flex;
        flex-direction: column;
        margin-left: 15px;
        font-size: 14px;
      }

      &__img {
        width: 18px;
        height: 20px;
        flex-grow: 0;
      }

      &__detail {
        font-size: 14px;
      }

      &__available {
        color: #ff6700;
        margin-top: 10px;
      }
    }

    &-version {
      margin-top: 30px;

      &__title {
        font-size: 18px;
        margin-bottom: 20px;
        font-weight: bold;
      }

      &__container {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      &__select {
        width: 287px;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        color: #333;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        text-align: center;
        cursor: pointer;

        &--checked {
          color: #ff6700;
          border-color: #ff6700;
        }
      }
    }

    &-color {
      width: 14px;
      height: 14px;
      background-color: #666;
      display: inline-block;
      margin-right: 5px;
    }

    &-price {
      background: #fafafa;
      text-align: center;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      padding: 24px 33px 29px 30px;
      margin: 50px 0 30px 0;

      &__info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      &__total {
        display: flex;
        justify-content: left;
        font-size: 24px;
        color: #f60;
        margin-top: 18px;
      }
    }

    &-cart {
      display: inline-block;
      width: 300px;
      line-height: 30px;
      text-align: center;
      background-color: #f60;
      color: #fff;
      border: none;
      cursor: pointer;
      border-radius: 0;
      margin-bottom: 40px;
    }

    &-instruction {
      height: 340px;

      &__container {
        width: 1226px;
        margin-right: auto;
        margin-left: auto;
      }

      &__title {
        font-size: 24px;
        color: #333;
        padding-top: 38px;
        margin-bottom: 30px;
      }
    }
  }
}
</style>