<template>
  <div class="m-video module" id="videoModule">
    <div class="m-cover" :class="{'m-cover--show': videoVisible}"></div>
    <div class="m-container" :class="[videoVisible ? 'm-container--show': 'm-container--fade']">
      <video class="m-container__video" id="module-video" :src="url" controls="true"></video>
      <img class="m-container__close" src="/imgs/icon-close.png" @click="handleClose">
    </div>
  </div>
</template>

<script>
export default {
  name: 'video-module',
  data() {
    return {
      videoVisible: false,
      coverClass: '',
    }
  },
  components: {
  },
  props: ['url', 'controls'],

  methods: {
    handleShowVideo() {
      let videoModule = document.getElementById('videoModule');
      videoModule.style = 'z-index: 10';
      this.videoVisible = true;
      const video = document.getElementById('module-video');
      video.play();
    },

    handleClose() {
      this.videoVisible = false;
      this.$emit('handleVideoClose', this.videoVisible);
      const video = document.getElementById('module-video');
      video.pause();
      let videoModule = document.getElementById('videoModule');
      setTimeout(() => {
        videoModule.style = 'z-index: -1';
      }, 600);
    },
  },

  computed: {
    videoStyle: {
      get: function() {
        let style = [];
        if (this.videoVisible) {
          style.push('top: 0');
        } else {
          style.push
        }
        return style.join(';');
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.m-video.module {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 42px;
  z-index: -1;

  .m {
    &-container {
      position: relative;
      width: 1000px;
      height: 576px;
      margin: auto;
      z-index: 11;
      transition: top 0.6s;
      display: flex;
      align-items: center;
      justify-content: center;

      &--show {
        top: 3.5%;
      }

      &--fade {
        top: -100%;
      }

      &__video {
        width: 100%;
        height: 100%;
      }

      &__close {
        position: absolute;
        top: 15px;
        right: 10px;

        &:hover {
          transform: scale(1.3);
        }
      }
    }

    &-cover {
      position: fixed;
      width: 100%;
      height: 100%;
      background: #0000007a;
      z-index: 0;
      top: -100%;

      &--show {
        top: 0;
        z-index: 10;
      }
    }
  }
}
</style>