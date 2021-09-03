<template>
  <div class="m-modal module" v-show="showModal">
      <div class="m-container">
        <div class="m-mask"></div>
        <div class="m-dialog">
          <div class="m-dialog-header">
            <span class="m-dialog-header__title">{{title}}</span>
            <img class="m-dialog-header__close" @click="onClickCancel" src="/imgs/icon-close.png">
          </div>
          <div class="m-dialog-body">
            <slot name="body"></slot>
          </div>
          <div class="m-dialog-footer">
            <el-button v-if="btnType === 1" @click="onSubmit" class="m-dialog-footer__button m-dialog-footer__button--sure">{{sureText}}</el-button>
            <el-button v-if="btnType === 3" @click="onClickSure" class="m-dialog-footer__button m-dialog-footer__button--sure">{{sureText}}</el-button>
            <el-button v-if="btnType === 2 || btnType === 3" @click="onClickCancel" class="m-dialog-footer__button m-dialog-footer__button--cancel">{{cancelText}}</el-button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>

export default {
  name: 'modal',
  props: {
    /** 弹框类型：小-small, 中-middle, 大-large, 表单-form */
    modalType: {
      type: String,
      default: 'form',
    },

    title: {
      type: String,
      default: '标题'
    },
    /** 按钮类型：1：确定；2：取消；3：确定，取消 */
    btnType: {
      type: Number,
      default: 1,
    },
    
    sureText: {
      type: String,
      default: '确定',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    showModal: Boolean,
  },
  methods: {
    onClickSure() {
      this.$emit("onClickSure");
    },

    onClickCancel() {
      this.$emit("onClickCancel");
    },

    onSubmit() {
      this.$emit("onSubmit");
    },
  }
}
</script>

<style lang="scss" scoped>

.m-modal.module {
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
    &-container {
      width: 660px;
      height: 340px;
      background: #fff;
      opacity: 1;
    }

    &-dialog {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &-dialog-header {
      height: 60px;
      background: #f5f5f5;
      position: relative;
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 16px;

      &__title {
        margin-left: 25px;
      }

      &__close {
        position: absolute;
        top: 23px;
        right: 25px;
        width: 14px;
        height: 14px;
        transition: transform .3s;
        &:hover {
          transform: scale(1.3);
        }
      }
    }

    &-dialog-body {
      display: flex;
      justify-content: center;
      font-size: 14px;
    }

    &-dialog-footer {
      height: 42px;
      display: flex;
      justify-content: center;
      margin-bottom: 20px;

      &__button {
        width: 160px;
        height: 40px;
        color: #fff;
        &--sure {
          background: #ff6600;
        }

        &--cancel {
          background: #b0b0b0;
          margin-left: 14px;
        }
      }
    }
  }
}


</style>