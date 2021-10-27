<template>
  <div class="m-loading module">
    <img class="m-img" src="/imgs/loading-svg/loading-bars.svg">
  </div>
</template>

<script>
export default {
  name: 'loading',

}
</script>

<style lang="scss" scoped>
.m-loading.module {
  height: 80px;
  line-height: 80px;
  text-align: center;
  padding: 30px 0;
  .m {
    &-img {
      height: 100%;
    }
  }
}
</style>