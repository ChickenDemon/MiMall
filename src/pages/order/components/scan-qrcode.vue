<template>
  <div class="m-scan-qrcode module" v-show="isShow">
    <div class="m-wrap">
      <img class="m-wrap__scan" src="/imgs/pay/icon-scan.png">
      <div class="m-wrap__pay">
        <div class="m-wrap__header">
            <div class="m-wrap__title">微信支付</div>
            <img class="m-wrap__close" @click="onClickCancel" src="/imgs/icon-close.png">
        </div>
        <div class="m-wrap__code">
          <img class="m-wrap__code-img" :src="qrCodeUrl">
          <div class="m-wrap__footer">
            请使用微信扫一扫<br/>
            二维码完成支付
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'scan-qrcode',
  data() {
    return {
      isShow: false,
      qrCodeUrl: '',
    }
  },
  methods: {
    handleOpen(url) {
      this.isShow = true;
      this.qrCodeUrl = url;
    },

    onClickCancel() {
      this.isShow = false;
      this.$emit('scanClosed')
    }
  }
}
</script>

<style lang="scss" scoped>
.m-scan-qrcode.module {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: #0000007a;
  // opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;

  .m {
    &-wrap {
      display: flex;
      flex-direction: row;
      align-items: center;
      &__scan {
        width: 296px;
        height: 485px;
      }

      &__pay {
        width: 370px;
        height: 440px;
      }

      &__header {
        height: 60px;
        line-height: 60px;
        color: #333;
        font-size: 20px;
        padding: 0 18px;
        background-color: #f5f5f5;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      &__close {
        height: 13px;
        cursor: pointer;
      }

      &__code {
        background: #fff;
        padding: 44px 0 26px;
        text-align: center;
      }

      &__code-img {
        width: 237px;
        height: 240px;
        padding-bottom: 26px;
      }

      &__footer {
        font-size: 14px;
        line-height: 19px;
      }
    }
  }
}
</style>