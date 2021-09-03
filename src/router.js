import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/home';
import Index from './pages/index';
import Product from './pages/product/index';
import Detail from './pages/product/detail';
import Cart from './pages/cart/index';
import Login from './pages/login/index';
import Order from './pages/order/index';
import OrderConfirm from './pages/order/orderConfirm';
import OrderList from './pages/order/orderList';
import OrderPay from './pages/order/pay';
import Alipay from './pages/order/alipay';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'index',
          name: 'index',
          component: Index,
        },
        {
          path: 'product/index/:id',
          name: 'product-index',
          component: Product,
        },
        {
          path: 'product/detail/:id',
          name: 'detail',
          component: Detail,
        },
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      children: [
        {
          path: 'orderConfirm',
          name: 'order-confirm',
          component: OrderConfirm
        },
        {
          path: 'orderList',
          name: 'order-list',
          component: OrderList
        },
        {
          path: 'pay',
          name: 'order-pay',
          component: OrderPay
        },
        {
          path: 'alipay',
          name: 'alipay',
          component: Alipay
        },
      ]
    },
  ]
});