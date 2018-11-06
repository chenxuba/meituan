<template>
    <div class="detail" >
        <!-- 头部 -->
       <app-header :poilist="detail"></app-header>
       <!-- 导航部分 -->
       <app-nav :poilist="detail"></app-nav>
        <router-view></router-view>
    </div>
</template>

<script>
import axios from "axios";
import Header from '@/components/header/Header' 
import Nav from '@/components/nav/Nav'

export default {
  data() {
    return {
      detail: {}, //每个店铺的具体信息包括商品分类和列表
      id: this.$route.params.id
    };
  },
  created() {
    axios.get("https://chenxuba.github.io/meituan.json").then(res => {
      let datas = res.data.data.poilist;
      if (datas && datas.length > 0) {
        this.detail = datas[this.id];
        // console.log(this.detail);
      }
    });
  },
  components:{
      "app-header": Header,
       "app-nav":Nav
  }
};
</script>

<style scoped>

/* 店铺详情 */
.detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* background: red; */
  z-index: 999;
}
</style>
