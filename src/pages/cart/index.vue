<template>
  <div class="p-cart page">
    <order-header></order-header>
    <div class="p-content">
      <div class="p-cart">
        <div class="p-cart__title">
          <div class="p-cart__label">
            <div class="p-cart__checkbox-container">
              <span class="p-cart__checkbox"
                :class="{'p-cart__checkbox--checked': allChecked}"
                @click="toggleAll">
              </span>
              <div class="p-cart__all">全选</div>
            </div>
            <div class="p-cart__name-label">商品名称</div>
            <div class="p-cart__price">单价</div>
            <div class="p-cart__count">数量</div>
            <div class="p-cart__sum">小计</div>
            <div class="p-cart__operation">操作</div>
          </div>
        </div>
        <div class="p-cart__content">
          <div class="p-cart__item" v-for="(item, index) in cartList" :key="index">
            <div class="p-cart__checkbox-container" @click="handleChecked(item)">
              <div class="p-cart__checkbox"
                :class="{'p-cart__checkbox--checked': item.productSelected}"
              >
              </div>
            </div>
            <div class="p-cart__name"><img class="p-cart__img" :src="item.productMainImage"><span class="p-cart__name-text">{{item.productName}} , {{item.productSubtitle}}</span></div>
            <div class="p-cart__price p-cart__text">{{item.productPrice}}</div>
            <div class="p-cart__count p-cart__text">
              <el-input-number v-model="item.quantity" @change="handleChange($event, item)" @blur="handleBlur($event, item)" :min="1" :max="item.productStock"></el-input-number>
            </div>
            <div class="p-cart__sum p-cart__text p-cart__sum--total">{{item.productPrice * item.quantity}}</div>
            <div class="p-cart__operation" @click="handleDeleteItem(item.productId)"><img class="p-cart__close" src="/imgs/icon-close.png"></div>
          </div>
        </div>
      </div>
      <div class="p-buy">
        <div class="p-buy__count">
          <span class="p-buy__continue" @click="handleToHome">继续购物</span>
          <span>共<span class="p-buy__num">{{cartList.length}}</span>件商品，已选择<span class="p-buy__num">{{checkedNum}}</span>件</span>
        </div>
        <div class="p-buy__settlement">
          <div>合计：<span class="p-buy__totalPrice">{{getTotalPrice}}</span>元</div>
          <button class="p-buy__buy" @click="handleSubmit">去结算</button>
        </div>
      </div>
    </div>
    <m-service-bar></m-service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from '../../components/OrderHeader.vue';
import NavFooter from '../../components/NavFooter.vue';
import MServiceBar from '../../components/ServiceBar.vue';

export default {
  name: 'cart',
  components: {
    OrderHeader,
    NavFooter,
    MServiceBar
  },
  data() {
    return {
      /** 购物车列表 */
      cartList: [],
      /** 是否全选 */
      allChecked: false,
      totalPrice: 0,
    };
  },

  mounted() {
    this.initData();
  },

  computed:{
    /** 选中商品数量 */
		checkedNum: {
			get : function(){
				return this.cartList.filter(good => good.productSelected).length;
			},
		},

    getTotalPrice: {
      get() {
        return this.totalPrice;
      }
    },
	},

  methods: {
    initData() {
      this.axios.get('/carts').then((res) => {
        if (res && res.status === 0) {
          this.cartList = res.data.cartProductVoList;
          this.allChecked = res.data.selectedAll;
          this.totalPrice = res.data.cartTotalPrice;
        }
      })
    },

    toggleAll() {
      this.allChecked = !this.allChecked;
      const url = this.allChecked ? '/carts/selectAll' : '/carts/unSelectAll';
      this.axios.put(url).then((res) => {
        if (res && res.status === 0 && res.data.cartProductVoList) {
          this.cartList = res.data.cartProductVoList;
        }
      });
    },

    handleToHome() {
      this.$router.push('/index');
    },

    handleDeleteItem(id) {
      this.axios.delete(`carts/${id}`).then((res) => {
        if (res?.status === 0) {
          this.$message.success('删除成功');
          this.totalPrice = res.data.cartTotalPrice;
        } else {
          this.$message.error('删除失败');
        }
      });
      this.initData();
    },

    handleChange(value, item) {
      if (value > item.productStock) {
        this.$message.warning('购买数量不能超过库存数量');
      } else {
        this.axios.put(`/carts/${item.productId}`, {
          quantity: value,
          selected: item.productSelected,
        }).then((res) => {
          if(res?.status === 0) {
            this.totalPrice = res.data.cartTotalPrice;
          } else {
            this.$message.error('操作失败');
          }
        });
      }
    },

    handleBlur(event, item) {
      if (event.srcElement.ariaValueNow === 'undefined' || event.srcElement.ariaValueNow === null) {
        item.quantity = event.target.ariaValueMin;
      }
    },

    handleChecked(item) {
      item.productSelected = !item.productSelected;
      this.axios.put(`/carts/${item.productId}`, {
        quantity: item.quantity,
        selected: item.productSelected,
      }).then((res) => {
        if(res?.status === 0) {
          this.allChecked = res.data.selectedAll;
          this.totalPrice = res.data.cartTotalPrice;
        } else {
          this.$message.error('勾选失败');
        }
      });
    },

    handleSubmit() {
      const isCheck = this.cartList.filter(item => item.productSelected === true);
      if (!isCheck.length) {
        this.$message.warning('请选择一件商品')
      } else {
        this.$router.push('/order/confirm')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.p-cart.page {
  background: #f5f5f5;
  .p {
    &-content {
      width: 1226px;
      margin: 0 auto;
      padding-top: 30px;
      padding-bottom: 114px;
    }

    &-cart {
      display: flex;
      flex-direction: column;
      color: #999;
      font-size: 14px;

      &__title {
        background: #fff;
        width: 100%;
        display: flex;
        flex-direction: row;
        height: 79px;
        line-height: 79px;
      }

      &__checkbox-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 136px;
      }

      &__checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #e5e5e5;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;

        &--checked {
          background: url("/imgs/icon-gou.png") #ff6600 no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }
      
      &__label {
        display: flex;
        flex-direction: row;
        height: 79px;
        line-height: 79px;
      }

      &__item {
        display: flex;
        flex-direction: row;
        height: 126px;
        line-height: 126px;
        border-top: 1px solid #e5e5e5;
      }

      &__name-label {
        display: flex;
        justify-content: center;
        width: 408px;
      }

      &__name {
        display: flex;
        justify-content: left;
        align-items: center;
        width: 408px;
        font-size: 18px;
        color: #333;
      }

      &__name-text {
        line-height: 24px;
      }

      &__price {
        display: flex;
        justify-content: center;
        width: 136px;
      }

      &__count {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 272px;
      }

      &__text {
        color: #333;
        font-size: 16px;
      }

      &__sum {
        display: flex;
        justify-content: center;
        width: 136px;

        &--total {
          color: #f60;
        }
      }

      &__operation {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 136px;
      }

      &__content {
        background: #fff;
        width: 100%;
        display: flex;
        flex-direction: column;
      }

      &__close {
        height: 12px;
        cursor: pointer;
      }

      &__img {
        width: 80px;
        height: 80px;
      }
    }

    &-buy {
      display: flex;
      flex-direction: row;
      font-size: 14px;
      margin-top: 20px;
      justify-content: space-between;
      align-items: center;

      &__count {
        display: flex;
        justify-content: space-between;
        margin-left: 30px;
        cursor: pointer;
      }

      &__continue {
        color: #666;
        margin-right: 37px;
      }

      &__num {
        color: #f60;
        margin: 0 5px;
      }

      &__settlement {
        color: #f60;
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      &__totalPrice {
        font-size: 24px;
      }

      &__buy {
        width: 202px;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        margin-left: 37px;
        background-color: #f60;
        color: #fff;
        border: none;
        cursor: pointer;
      }
    }
  }
}
</style>
