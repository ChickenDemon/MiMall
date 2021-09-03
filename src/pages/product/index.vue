<template>
  <div class="p-product page">
    <product-param :title="title">
      <template v-slot:buy>
        <el-button class="l-btn" @click="handleBuy">立即购买</el-button>
      </template>
    </product-param>
    <div class="p-content">
      <div class="p-item-bg">
        <h2 class="p-item-bg__title">{{product.name}}</h2>
        <h3 class="p-item-bg__desc">{{product.subtitle}}</h3>
        <p class="p-item-bg__container">
          <span class="p-item-bg__item">全球首款双频 GP</span>
          <span class="p-item-bg__divide">|</span>
          <span class="p-item-bg__item">骁龙845</span>
          <span class="p-item-bg__divide">|</span>
          <span class="p-item-bg__item">AI 变焦双摄</span>
          <span class="p-item-bg__divide">|</span>
          <span class="p-item-bg__item">红外人脸识别</span>
        </p>
        <span class="p-item-bg__price">{{product.price}}</span>
      </div>
      <div class="p-item-bg2"></div>
      <div class="p-item-bg3"></div>
      <div class="p-video">
        <h2 class="p-video__title">60帧超慢动作摄影<br>慢慢回味每一瞬间的精彩</h2>
        <p class="p-video__desc">后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
        <div class="p-video-box">
          <img class="p-video-box__bg" src="/imgs/product/gallery-1.png" alt="" @click="handlePlay">
          <video class="p-video__overlay" id="video" src="/imgs/product/video.mp4" controls="true"></video>
        </div>
      </div>
    </div>
    <m-video ref="video" url="/imgs/product/video.mp4" :controls="true" @handleVideoClose="handleVideoClose"></m-video>
  </div>
</template>

<script>
import ProductParam from '../../components/ProductParam.vue';
import MVideo from './components/video.vue';

export default {
  name: 'product',
  components: {
    ProductParam,
    MVideo,
  },

  data() {
    return {
      play: true,
      videoVisible: false,
      product: {},
      title: '',
    }
  },

  mounted() {
    this.getProductInfo();
  },

  methods: {
    handlePlay() {
      let video = document.getElementById('video');
      if (video.paused) {
        this.$refs.video.handleShowVideo();
        this.videoVisible = true;
      }
    },

    handleVideoClose(videoVisible) {
      this.videoVisible = videoVisible;
    },

    getProductInfo() {
      let id = this.$route.params.id;
      this.axios.get(`/products/${id}`).then((res) => {
        if(res.data.id) {
          this.product = res.data;
          console.log('product-->', this.product);
          this.title = this.product.name;
        }
      })
    },

    handleBuy() {
      this.$router.push(`/product/detail/${this.product.id}`);
    },
  }

}
</script>

<style lang="scss" scoped>
.p-product.page {
  .p {
    &-box {
      width: 1349px;
      height: 200px;
    }

    &-item-bg {
      height: 718px;
      background: url('/imgs/product/product-bg-1.png') center no-repeat;
      display: flex;
      flex-direction: column;
      align-items: center;
      &__title {
        font-size: 80px;
      }

      &__desc {
        font-size: 24px;
      }

      &__item {
        font-size: 16px;
        color: #333;
      }

      &__divide {
        font-size: 16px;
        margin: 0 15px;
      }

      &__container {
        margin: 21px 0 40px 0;
      }

      &__price {
        font-size: 30px;
        color: #333;

        &::before {
          content: '￥';
        }
      }
    }

    &-item-bg2 {
      height: 480px;
      background: url('/imgs/product/product-bg-2.png') center no-repeat;
      background-size: 90%;
      margin: 0 auto;
    }

    &-item-bg3 {
      height: 638px;
      background: url('/imgs/product/product-bg-3.png') no-repeat;
      background-size: 100%;
      margin: 0 auto;
    }

    &-video {
      background: #070708;
      height: 1044px;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      &__title {
        font-size: 60px;
        padding-top: 82px;
        margin-bottom: 47px;
      }

      &__desc {
        font-size: 24px;
        margin-bottom: 58px;
      }

      &__overlay {
        width: 1226px;
        height: 540px;
      }
    }

    &-video-box {
      &__bg {
        width: 1226px;
        height: 540px;
        position: absolute;
        z-index: 1;

        &--hidden {
          z-index: -1;
        }
      }
    }
  }

  .l {
    &-btn {
      width: 110px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: nowrap;
      text-align: center;
      background: #ff6600;
      color: #fff;
      border: none;
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
</style>