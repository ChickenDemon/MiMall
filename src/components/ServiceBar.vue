<template>
  <div class="m-service-bar module">
    <div>
      <ul class="m-container">
        <img src="" alt="">
        <li class="m-container__item"><img class="m-container__icon-setting" src="/imgs/icon-setting.png" alt="预约维修服务">预约维修服务</li>
        <li class="m-container__item"><img class="m-container__icon-7day" src="/imgs/icon-7day.png" alt="7天无理由退货">7天无理由退货</li>
        <li class="m-container__item"><img class="m-container__icon-15day" src="/imgs/icon-15day.png" alt="15天免费换货">15天免费换货</li>
        <li class="m-container__item"><img class="m-container__icon-post" src="/imgs/icon-post.png" alt="满150天包邮">满150天包邮</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'service-bar',
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.m-service-bar.module {
  padding: 33px 0;
  color: #666;
  font-size: 16px;

  .m {
    &-container {
      display: flex;
      &__item {
        width: 24.9%;
        text-align: center;
        border-right: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &__icon-setting {
        width: 20px;
        height: 19px;
        padding-right: 6px;
      }

      &__icon-7day {
        width: 20px;
        height: 19px;
        padding-right: 6px;
      }

      &__icon-15day {
        width: 20px;
        height: 19px;
        padding-right: 6px;
      }

      &__icon-post {
        width: 20px;
        height: 19px;
        padding-right: 6px;
      }
    }
  }
}
</style>