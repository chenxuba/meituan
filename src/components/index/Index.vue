<template>
  <div class="index">
    <!--banner区域开始-->
    <div class="banner">
      <img src="/static/img/banner.jpg" />
    </div>
    <!--banner区域结束-->
    <!--swiper区域开始-->
    <app-swiper></app-swiper>
    <!--swiper区域结束-->
    <!--分割线开始-->
    <app-line></app-line>
    <!--分割线结束-->
    <!--商家列表开始-->
    <app-shoplist :poilist="poilist"></app-shoplist>
    <!--商家列表结束-->
  </div>
</template>

<script>
  import Line from '@/components/line/Line' //引入 Line 组件
  import ShopList from '@/components/shoplist/ShopList' //引入 ShopList 组件
  import Swiper from '@/components/swiper/Swiper' //引入 Swiper 组件
  import axios from 'axios'
  export default {
    data() {
      return {
        poilist: {} //全部的店铺列表信息
      }
    },
    components: {
      "app-line": Line,
      "app-shoplist": ShopList,
      "app-swiper": Swiper
    },
    created() {
      axios.get("https://chenxuba.github.io/meituan.json").then((res) => {
        this.poilist = res.data.data.poilist
        // console.log(this.poilist)
      })
    }
  };

</script>

<style scoped>
  /* banner样式 */
  .banner {
    width: 100%;
    height: 170px;
  }

  .banner img {
    width: 100%;
    height: 170px;
  }

</style>
