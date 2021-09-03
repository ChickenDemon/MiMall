<template>
  <div id="app">
    <router-view>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      res: {},
    }
  },
  components: {
  },
  mounted() {
    if (this.$cookie.get('userId')) {
      this.getUser();
      this.getCartCount();
    }
  },
  methods: {
    getUser() {
      this.axios.get('/user').then((res) => {
        if (res && res.status === 0) {
          this.$store.dispatch('saveUserName', res.data.username);
        }
      })
    },

    getCartCount() {
      this.axios.get('/carts/products/sum').then((res) => {
        if (res && res.status === 0) {
          this.$store.dispatch('saveCartCount', res.data);
        }
      })
    }
  }
}
</script>

<style>
@import './assets/scss/reset.scss';
</style>
