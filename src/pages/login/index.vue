<template>
  <div class="p-login page">
    <div class="p-header">
      <img class="p-header__img" @click="onClickImg" v-lazy="'/imgs/login-logo.png'">
    </div>
    <div class="p-wrapper">
      <div class="p-container">
        <div class="p-login-form">
          <div class="p-login-title">
            <span class="p-login-title__red-text">账号登录</span>
            <span class="p-login-title__divide">|</span>
            <span>扫码登录</span>
          </div>
          <div class="p-login-content">
            <div class="p-login-content__input-container">
              <input class="p-login-content__input" @keyup.enter="onLogin" type="text" placeholder="请输入账号" v-model="username">
            </div>
            <div class="p-login-content__input-container">
              <input class="p-login-content__input" @keyup.enter="onLogin" type="password" placeholder="请输入密码" v-model="password">
            </div>
            <button class="p-login-content__button" @click="onLogin">登录</button>
            <div class="p-login-content__footer" @click="onRegister">
              <span style="cursor: pointer;">手机短信登录/注册</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from '../../components/NavFooter.vue';
import { mapActions } from 'vuex';
export default {
  name: 'login',
  components: { 
    NavFooter,
  },
  data() {
    return {
      username: '',
      password: '',
      userId: '',
    }
  },

  mounted() {
    window.addEventListener('keydown', this.keyDown);
  },

  destroyed() {
    // 销毁事件
      window.removeEventListener('keydown', this.keyDown, false);
  },

  methods: {
    onLogin () {
      const data = {
        username: this.username,
        password: this.password,
      };
      this.axios.post('/user/login', data).then((res) => {
        if (res.msg === '登录成功') {
          this.$message({
            message: '登录成功',
            type: 'success',
          });
          // this.$cookie.set('userId', res.data.id, { expires: 1 });
          // this.$store.dispatch('saveUserName', res.data.username);
          this.saveUserName(res.data.username);
          this.$router.push({path: '/index'});
        }
      });
    },

    ...mapActions(['saveUserName']),

    onRegister () {
      const data = {
        username: 'chicken',
        password: 'chicken',
        email: 'chicken@qq.com',
      };
      this.axios.post('/user/register', data).then((res) => {
        if (res.msg === '注册成功') {
          alert('注册成功');
        }
      });
    },

    onClickImg() {
      this.$router.push('/index');
    },

    keyDown(e) {
      if (e.keyCode === 13) {
        this.onLogin();
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.p-login.page {
  .p {
    &-header {
      margin: 0 auto 0;
      width: 1226px;
      height: 113px;

      &__img {
        height: 100%;
        cursor: pointer;
      }
    }

    &-wrapper {
      background: url('/imgs/login-bg.jpg') no-repeat center;
      height: 576px
    }

    &-container {
      width: 1226px;
      height: 100%;
      margin: 0 auto 0;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
    }

    &-login-form {
      width: 410px;
      height: 510px;
      background: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &-login-title {
      display: flex;
      justify-content: center;
      margin: 40px 0 49px;
      font-size: 24px;
      font-weight: bold;
      line-height: 23px;
      &__red-text {
        color: #ff6600;
      }

      &__divide {
        margin: 0 32px;
      }
    }

    &-login-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 348px;

      &__input-container {
        width: 346px;
        height: 50px;
        border: 1px solid #e5e5e5;
        margin-bottom: 20px;
        overflow: hidden;
      }

      &__input {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: none;
        padding: 18px;
      }

      &__button {
        width: 100%;
        line-height: 50px;
        margin-top: 10px;
        font-size: 16px;
        background-color: #f60;
        border: none;
        color: #fff;
        cursor: pointer;
      }

      &__footer {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        color: #f60;
        font-size: 14px;
        margin-top: 14px;
      }
    }
  }
}
</style>