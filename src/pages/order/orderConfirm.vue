<template>
  <div class="p-order-confirm page">
    <div class="p-confirm">
      <div class="p-container">
        <div class="p-address">
          <div class="p-address__title">收货地址</div>
          <div class="p-address__items">
            <div v-for="(addr, index) in deliveryAddresses" :key="index" class="p-address__item" :class="{'p-address__item--checked': selectedIndex === index}" @click="handleSelected(index)">
              <span class="p-address__contact">{{ addr.receiverName }}</span>
              <span class="p-address__phone">{{ addr.receiverMobile}}</span>
              <span class="p-address__detail">{{addr.receiverProvince + ' ' + addr.receiverCity + ' ' + addr.receiverDistrict + ' ' + addr.receiverAddress}}</span>
              <div class="p-address__action">
                <i class="p-address__icon el-icon-delete" @click="handleDelAddr(addr)"></i>
                <i class="p-address__icon el-icon-edit" @click="handleEditAddr(addr)"></i>
              </div>
            </div>
            <!-- <div class="p-address__item">
              <span class="p-address__contact">联系人</span>
              <span class="p-address__phone">18807412647</span>
              <span class="p-address__detail">350000 350900 350982 三十多三好吧马示段落</span>
              <div class="p-address__action">
                <i class="p-address__icon el-icon-delete"></i>
                <i class="p-address__icon el-icon-edit"></i>
              </div>
            </div> -->
            <div class="p-address__add" @click="handleAddAddr">
              <i class="p-address__icon p-address__icon--add el-icon-circle-plus-outline"></i>
              <span class="p-address__add-addr">添加新地址</span>
            </div>
          </div>
        </div>
        <div class="p-goods">
          <h2 class="p-goods__title">商品</h2>
          <div class="p-goods__items" v-for="(item, index) in selectedCartList" :key="index">
            <div class="p-goods__product">
              <div class="p-goods__name">
                <img class="p-goods__img" :src="item.productMainImage">
                <div class="p-goods__name-text">{{item.productName + ' ' + item.productSubtitle}}</div>
              </div>
              <div class="p-goods__price-container">
                <div class="p-goods__price">{{item.productPrice}}元x{{item.quantity}}</div>
                <div class="p-goods__total">{{item.productTotalPrice}}元</div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-delivery">
          <h2 class="p-delivery__title">配送方式</h2>
          <div class="p-delivery__way">包邮</div>
        </div>
        <div class="p-invoice">
          <h2 class="p-invoice__title">发票</h2>
          <div class="p-invoice__type">电子发票</div>
          <div class="p-invoice__type">个人</div>
        </div>
        <div class="p-settlement">
          <div class="p-settlement__item">
            <div class="p-settlement__label">商品件数：</div>
            <div class="p-settlement__value">{{cartTotalQuantity}}件</div>
          </div>
          <div class="p-settlement__item">
            <div class="p-settlement__label">商品总价：</div>
            <div class="p-settlement__value">{{cartTotalPrice}}元</div>
          </div>
          <div class="p-settlement__item">
            <div class="p-settlement__label">优惠活动：</div>
            <div class="p-settlement__value">0元</div>
          </div>
          <div class="p-settlement__item">
            <div class="p-settlement__label">运费：</div>
            <div class="p-settlement__value">0元</div>
          </div>
          <div class="p-settlement__item p-settlement__itep--total">
            <div class="p-settlement__label">应付总额：</div>
            <div class="p-settlement__price">{{totalPrice}}元</div>
          </div>
        </div>
        <div class="p-operation">
            <button class="p-operation__button">返回购物车</button>
            <button class="p-operation__button p-operation__button--buy" @click="handleSubmit">去结算</button>
          </div>
      </div>
    </div>
    <m-add-edit-addr ref="addEditAddr" @refresh="handleRefresh"></m-add-edit-addr>
  </div>
</template>

<script>
import MAddEditAddr from './components/add-edit-addr.vue';

export default {
  name: 'order-confirm',
  components: {
    MAddEditAddr,
  },
  data() {
    return {
      deliveryAddresses: [],
      selectedCartList: [],
      cartList: [],
      totalPrice: 0,
      cartTotalQuantity: 0,
      cartTotalPrice: 0,
      selectedIndex: 0,
    }
  },
  mounted() {
    this.getCartList();
    this.getAddrList();
  },
  methods: {
    getCartList() {
      this.axios.get('/carts').then((res) => {
        if (res?.status === 0) {
          console.log('res->', res);
          this.selectedCartList = res.data.cartProductVoList.filter((item) => item.productSelected);
          let sum = 0;
          this.selectedCartList.forEach((item) => {
            sum += item.quantity;
          })
          this.totalPrice = res.data.cartTotalPrice;
          this.cartTotalQuantity = sum;
          this.cartTotalPrice = res.data.cartTotalPrice;
        }
      });
    },

    getAddrList() {
      this.axios.get('/shippings').then((res) => {
        if (res?.status === 0) {
          console.log('resaddr->', res);
          this.deliveryAddresses = res.data.list;
          console.log('address->', this.deliveryAddresses);
        }
      });
    },

    handleAddAddr() {
      this.$refs.addEditAddr.handleOpen();
    },

    handleDelAddr(addr) {
      this.axios.delete(`/shippings/${addr.id}`).then((res) => {
        if (res?.status === 0) {
          this.$message.success(res.data);
          this.getAddrList();
        } else {
          this.$message.error('删除地址失败');
        }
      })
    },

    handleEditAddr(addr) {
      this.$refs.addEditAddr.handleOpen(addr);
    },

    handleRefresh() {
      this.getAddrList();
    },

    handleSelected(index) {
      this.selectedIndex = index;
    },

    handleSubmit() {
      const item = this.deliveryAddresses[this.selectedIndex];
      if (!item) {
        this.$message.error('请选择地址');
        return;
      }

      this.axios.post('/orders', {
        shippingId: item.id
      }).then((res) => {
        if (res?.status === 0) {
          this.$router.push({
            name: 'order-pay',
            query: {
              orderNo: res.data.orderNo,
            } 
          })
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.p-order-confirm.page {
  background: #f5f5f5;
  padding: 30px 61.5px 84px;
  .p {
    &-confirm {
      width: 1226px;
      margin: 0 auto;
      background-color: #fff;
      box-sizing: border-box;
    }

    &-container {
      padding: 0 0 40px 40px;
    }

    &-address {
      padding-top: 38px;
      &__title {
        font-size: 20px;
        color: #333;
        font-weight: 200;
        margin-bottom: 21px;
      }

      &__items {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }

      &__item {
        width: 271px;
        height: 180px;
        border: 1px solid #e5e5e5;
        padding: 15px 24px 10px;
        margin-right: 15px;
        margin-bottom: 15px;
        font-size: 14px;
        color: #757575;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;

        &--checked {
          border-color: #ff6700;
        }
      }

      &__contact {
        line-height: 27px;
        font-size: 18px;
        font-weight: 300;
        color: #333;
        margin-bottom: 10px;
      }

      &__detail {
        height: 50px;
      }

      &__action {
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      &__icon {
        font-size: 24px;
        cursor: pointer;

        &--add {
          font-size: 35px;
          color: #75757582;
          margin-bottom: 10px;
        }
      }

      &__add {
        width: 271px;
        height: 180px;
        border: 1px solid #e5e5e5;
        padding: 15px 24px 10px;
        margin-right: 15px;
        font-size: 14px;
        color: #757575;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      &__add-addr {
        color: #999;
      }
    }

    &-goods {
      margin-top: 34px;
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 10px;
      &__title {
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 5px;
        font-size: 20px;
      }

      &__items {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
      }

      &__product {
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 16px;
        color: #333;
      }

      &__name {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      &__img {
        width: 30px;
        height: 30px;
      }
      
      &__name-text {
        font-size: 16px;
        color: #333;
      }

      &__price-container {
        width: 405px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      &__price {

      }

      &__total {
        padding-right: 44px;
        color: #f60;
      }
    }

    &-delivery {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 31px;

      &__title {
        width: 80px;
        display: inline-block;
        margin-right: 71px;
        font-size: 20px;
      }

      &__way {
        font-size: 16px;
        color: #ff6700;
        margin-right: 23px;
      }
    }

    &-invoice {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 31px;

      &__title {
        width: 80px;
        display: inline-block;
        margin-right: 71px;
        font-size: 20px;
      }

      &__type {
        font-size: 16px;
        color: #ff6700;
        margin-right: 23px;
      }
    }

    &-settlement {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 50px 44px 33px 0;
      border-bottom: 1px solid #e5e5e5;
      &__item {
        display: flex;
        flex-direction: row;
        text-align: right;
        font-size: 16px;
        line-height: 15px;
        margin-bottom: 12px;
        color: #666;

        &--total {
          height: 37px;
          line-height: 37px;
        }
      }

      &__label {
        width: 80px;
        height: 17px;
      }

      &__value {
        display: inline-block;
        width: 100px;
        color: #ff6700;
      }

      &__price {
        display: inline-block;
        width: 100px;
        color: #ff6700;
        font-size: 28px;
      }
    }

    &-operation {
      display: flex;
      justify-content: flex-end;
      margin-top: 37px;

      &__button {
        margin-right: 20px;
        width: 202px;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        border: none;
        color: #fff;
        background-color: #b0b0b0;
        cursor: pointer;

        &--buy {
          background-color: #f60;
        }
      }
    }
  }
}
</style>