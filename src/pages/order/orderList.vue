<template>
  <div class="p-order-list page">
    <div class="p-wrap">
      <div class="p-item" v-for="(item, index) in orderList" :key="index">
        <div class="p-item__header">
          <div>
            {{item.createTime}}<span class="p-item__devide">|</span>
            {{item.receiverName}}<span class="p-item__devide">|</span>
            订单号：{{item.orderNo}}<span class="p-item__devide">|</span>
            {{item.paymentTypeDesc}}
          </div>
          <div>应付金额：<span class="p-item__money">{{item.payment}}</span>元</div>
        </div>
        <div class="p-item__content">
          <div v-for="(goods, goodsIndex) in item.orderItemVoList" :key="goodsIndex" class="p-item__goods-wrap">
            <div class="p-item__goods">
              <img class="p-item__img" :src="goods.productImage">
              <div class="p-item__name-wrap">
                <span>{{goods.productName}}</span>
                <span>{{goods.totalPrice + 'X' + goods.quantity}}元</span>
              </div>
            </div>
            <div class="p-item__status">
              {{item.statusDesc}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order-list',
  data() {
    return {
      orderList: [],
      pageNum: 1,
    }
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      this.axios.get('/orders', {
        params: {
          // 一页N条记录
          pageSize: 10,
          // 页码发给接口
          pageNum: this.pageNum
        }
      }).then((res) => {
        if (res?.status === 0) {
          this.orderList = res.data.list;
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.p-order-list.page {
  background: #f5f5f5;
  padding: 33px 0 110px 0;

  .p {
    &-wrap {
      width: 1226px;
      margin-right: auto;
      margin-left: auto;

    }

    &-item {
      border: 1px solid #d7d7d7;
      margin-bottom: 31px;

      &__header {
        height: 74px;
        line-height: 74px;
        padding: 0 43px;
        background-color: #fffaf7;
        font-size: 16px;
        color: #666;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      &__devide {
        margin: 0 9px;
      }

      &__money {
        font-size: 26px;
        color: #333;
      }

      &__content {
        
      }

      &__goods-wrap {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 43px;
        background: #fff;
      }

      &__goods {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      &__img {
        width: 112px;
        height: 112px;
      }

      &__name-wrap {
        display: flex;
        flex-direction: column;
        font-size: 20px;
        color: #333;
      }

      &__status {
        height: 145px;
        line-height: 145px;
        font-size: 20px;
        color: #f60;
      }
    }
  }
}
</style>