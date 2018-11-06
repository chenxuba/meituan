import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/index/Index';
import Order from '@/components/order/Order';
import ShopDetail from '@/components/shopdetail/ShopDetail';
import Goods from '@/components/goods/Goods';
import Ratings from '@/components/ratings/Ratings';
import Seller from '@/components/seller/Seller';
Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      redirect: "/index"
    },
    {
      path: "/shopdetail/:id",
      redirect: "/shopdetail/:id/goods"
    }, //重定向
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/shopdetail/:id',
      name: 'shopdetail',
      component: ShopDetail,
      children: [{
          path: '/shopdetail/:id/goods',
          name: 'goods',
          component: Goods
        },
        {
          path: '/shopdetail/:id/ratings',
          name: 'ratings',
          component: Ratings
        },
        {
          path: '/shopdetail/:id/seller',
          name: 'seller',
          component: Seller
        }
      ]
    }
  ]
});
