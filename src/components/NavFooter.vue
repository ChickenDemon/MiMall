<template>
  <div class="m-nav-footer module">
    <div class="m-logo-container">
      <img class="m-logo-container__logo" src="/imgs/logo-footer.png" alt="小米商城"> 
      <span class="m-logo-container__text">小米商城</span>
    </div>
    <div class="m-link">
      <a class="m-link__item" href="" target="_blank">ChickenDemon主页</a><span class="m-link__division">|</span>
      <a class="m-link__item" href="" target="_blank">月光树林MCBBS</a><span class="m-link__division">|</span>
      <a class="m-link__item" href="" target="_blank">月光树林MC百科</a><span class="m-link__division">|</span>
      <a class="m-link__item" href="" target="_blank">微信支付</a>
    </div>
    <div class="m-copyright">Copyright ©2021 <span class="m-copyright__text">www.ChickenDemon.com</span> All Rights Reserved.</div>
  </div>
</template>

<script>
export default {
  name: 'nav-footer'
}
</script>

<style lang="scss" scoped>
.m-nav-footer {
  background: #333;
  height: 234px;
  border-top: 4px solid #ff6600;
  font-size: 16px;
  text-align: center;
  color: #b3b3b3; 
  .m {
    &-logo-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 46px;
      margin-bottom: 30px;
      &__logo {
        width: 53px;
        height: 36px;
        margin-bottom: 13px;
      }

      &__text {
        color: #b3b3b3;
      }
    }

    &-link {
      margin-bottom: 13px;
      &__item {
        color: #b3b3b3;
      }

      &__division {
        margin: 0 10px;
      }
    }

    &-copyright {
      &__text {
        cursor: pointer;
        color: #ff6600;
      }
    }
  }
}
</style>