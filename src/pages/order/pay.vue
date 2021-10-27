<template>
  <div class="p-pay page">
    <div class="p-container">
      <div class="p-detail-wrap">
        <div class="p-detail">
          <div class="p-detail__icon">
            <img width="70%" src="/imgs/icon-gou.png">
          </div>
          <div class="p-detail__text">
            <div class="p-detail__text--success">
              订单提交成功！去付款咯～
            </div>
            <div class="p-detail__text--tip">
              请在<span style="color: #ff6700;">30分钟</span>内完成支付, 超时后将取消订单
            </div>
            <div class="p-detail__text--tip">
              收货信息：{{addressInfo}}
            </div>
          </div>
          <div class="p-detail__sum">
            <div class="p-detail__pay-text">
              应付总额：<span style="color: #ff6700; font-size: 28px;">{{payment}}</span>元
            </div>
            <div class="p-detail__pay-text" @click="handleShowDetail">
              订单详情
              <i class="el-icon-arrow-down" style="transition: all .5s; cursor: pointer" :class="{'p-detail__show-icon': isShow}"></i>
            </div>
          </div>
        </div>
        <div v-if="isShow" class="p-msg">
          <div class="p-msg__item">
            <div class="p-msg__text">
              订单号：
            </div>
            <div class="p-msg__value">{{orderNo}}</div>
          </div>
          <div class="p-msg__item">
            <div class="p-msg__text">
              收货信息：
            </div>
            <div class="p-msg__value">{{addressInfo}}</div>
          </div>
          <div class="p-msg__item p-msg__item--goods">
            <div class="p-msg__text">
              商品名称：
            </div>
            <div class="p-msg__goods">
              <div class="p-msg__value" v-for="(goods, index) in orderDetail" :key="index">
                <img class="p-msg__img" v-lazy="goods.productImage">
                {{goods.productName}}
              </div>
            </div>
          </div>
          <div class="p-msg__item">
            <div class="p-msg__text">
              发票信息：
            </div>
            <div class="p-msg__value">电子发票 个人</div>
          </div>
        </div>
      </div>
      <div class="p-way">
        <div class="p-way__title">
          选择以下支付方式付款
        </div>
        <div class="p-way__content">
          <div class="p-way__title p-way__title--platform">
            支付平台
          </div>
          <div class="p-way__way">
            <div class="p-way__pay" @click="handleSubmit(1)">
              <img class="p-way__icon" src="/imgs/pay/icon-ali.png">
            </div>
            <div class="p-way__pay" @click="handleSubmit(2)">
              <img class="p-way__icon" src="/imgs/pay/icon-wechat.png">
            </div>
          </div>
        </div>
      </div>
    </div>
    <scan-qrcode ref="qrcode" @scanClosed="handleScanClosed"></scan-qrcode>
    <modal
      title="支付确认"
      :btnType="3"
      :showModal="isShowModal"
      sureText="查看订单"
      cancelText="未支付"
      @onClickCancel="handleCancel"
      @onSubmit="handleModalSubmit"
    ></modal>
  </div>
</template>

<script>
import QRCode from 'qrcode';
import ScanQrcode from './components/scan-qrcode.vue';
import Modal from '../../components/Modal.vue';

export default {
  name: 'order-pay',
  components: {
    ScanQrcode,
    Modal
  },
  data() {
    return {
      orderNo: this.$route.query?.orderNo,
      isShow: false,
      addressInfo: '',
      orderDetail: [],
      payment: 0,
      payType: 0,
      isShowModal: false,
      timer: '',
    }
  },
  mounted() {
    this.getOrderDetail();
  },

  methods: {
    getOrderDetail () {
      // 获取订单信息
      this.axios.get(`/orders/${this.orderNo}`).then((res) => {
        if (res?.status === 0) {
          // 拿到订单收货地址
          const item = res.data.shippingVo;
          // 地址信息，用来渲染到页面
          this.addressInfo = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`;
          // 拿到订单各种商品的列表
          this.orderDetail = res.data.orderItemVoList
          this.payment = res.data.payment
        }
      })
    },

    handleShowDetail() {
      this.isShow = !this.isShow;
    },

    handleSubmit(type) {
      if (type === 1) {
        window.open(`/#/order/alipay?orderNo=${this.orderNo}`, '_blank')
      } else if (type === 2) {
        this.axios.post('/pay', {
          orderId: this.orderNo,
          orderName: '小米商城',
          amount: 0.01,
          payType: 2,
        }).then((res) => {
          if (res?.status === 0) {
            QRCode.toDataURL(res.data.content).then(url => {
              this.$refs.qrcode.handleOpen(url);
              this.loopOrderState()
            }).catch(() => {
              this.$message.error('微信二维码生成失败，请稍后重试');
            });
            
          }
        })
      }
    },

    loopOrderState() {
      this.timer = setInterval(() => {
        this.axios.get(`/orders/${this.orderNo}`).then((res) => {
          if (res?.status === 0) {
            console.log(res);
            // 订单状态:0-已取消 -10-未付款，20-已付款，40-已发货，50-交易成功，60-交易
            if (res.data.status === 20) {
              clearInterval(this.timer);
              this.handleModalSubmit();
            }
          }
        })
      }, 1000);
    },

    handleModalSubmit() {
      this.$router.push('/order/orderList');
    },

    handleScanClosed() {
      this.isShowModal = true;
    },

    handleCancel() {
      this.isShowModal = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.p-pay.page {
  background: #f5f5f5;
  padding-top: 30px;
  padding-bottom: 61px;

  .p {
    &-container {
      width: 1226px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 auto;
    }

    &-detail-wrap {
      width: 100%;
      padding: 62px 50px;
      background-color: #fff;
      font-size: 14px;
      margin-bottom: 30px;
      box-sizing: border-box;
    }

    &-detail {
      display: flex;
      flex-direction: row;

      &__icon {
        width: 90px;
        height: 90px;
        background: #80c58a;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 40px;
      }

      &__text {
        display: flex;
        flex-direction: column;
        margin-right: 248px;

        &--success {
          font-size: 24px;
          color: #333;
          margin-bottom: 20px;
          font-weight: bold;
        }

        &--tip {
          color: #666;
        }
      }

      &__sum {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      &__pay-text {
        color: #333;
      }

      &__show-icon {
        transform:rotate(180deg);
      }
    }

    &-msg {
      border-top: 1px solid #d7d7d7;
      margin-top: 45px;
      padding-top: 47px;
      padding-left: 130px;
      
      &__item {
        display: flex;
        flex-direction: row;
        margin-bottom: 19px;

        &--goods {
          display: flex;
          flex-direction: row;
        }
      }

      &__text {
        width: 100px;
        font-size: 14px;
        color: #333;
      }

      &__img {
        width: 30px;
        vertical-align: middle;
      }

      &__value {
        // display: flex;
        // align-items: center;
        // justify-content: center;
        text-align: center;
      }

      &__goods {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }

    &-way {
      width: 100%;
      padding: 26px 50px 72px;
      background-color: #fff;
      color: #333;
      box-sizing: border-box;

      &__title {
        font-size: 20px;
        font-weight: 200;
        color: #333;
        padding-bottom: 24px;
        border-bottom: 1px solid #d7d7d7;
        margin-bottom: 26px;

        &--platform {
          border: none;
          font-size: 18px;
          padding: 0;
        }
      }

      &__way {
        display: flex;
        flex-direction: row;
      }

      &__pay {
        width: 188px;
        height: 64px;
        border: 1px solid #d7d7d7;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;
        cursor: pointer;
      }

      &__icon {
        width: 103px;
        height: 38px;
      }
    }
  }
}
</style>