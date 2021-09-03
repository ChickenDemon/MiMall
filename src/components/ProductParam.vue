<template>
  <div class="m-product-param module">
    <div class="m-nav" :class="{'m-nav__fixed': isFixed}">
      <div class="m-nav-container">
        <div class="m-nav-container__title">{{title}}</div>
        <div class="m-nav-container__params">
          <a href="">概述</a><span class="m-nav-container__divide">|</span>
          <a href="">参数</a><span class="m-nav-container__divide">|</span>
          <a href="">用户评价</a>
          <slot name="buy"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isFixed: false,
    }
  },

  props: ['title'],

  mounted() {
    window.addEventListener('scroll', this.initHeight);
  },

  methods: {
    initHeight() {
      let scrollTop = window?.pageYOffset || window.documentElement?.scrollTop || document?.body.scrollTop;
      this.isFixed = scrollTop > 152 ? true : false;
    }
  },

  destroyed() {
    window.removeEventListener('scroll', this.initHeight, false);
  }
}
</script>
<style lang="scss" scoped>
.m-product-param.module {
  .m {
    &-nav {
      width: 100%;
      height: 70px;
      line-height: 70px;
      border-top: 1px solid #e5e5e5;

      &__fixed {
        position: fixed;
        top: 0;
        border: none;
        box-shadow: 0 5px 5px #ccc;
        z-index: 99;
        background-color: #fff;
      }
    }

    &-nav-container {
      width: 1226px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;

      &__title {
        font-size: 18px;
        font-weight: 700;
        color: #333;
      }

      &__params {
        display: flex;
        align-items: center;

        a {
          font-size: 14px;
          color: #666;
        }
      }

      &__divide {
        margin: 0 10px;
        color: #333;
        font-size: 14px;
      }
    }
  }
}
</style>
