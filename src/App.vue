<template>
  <div id="app">
  
    <!--底部导航开始-->
    <div class="nav">
     <router-link active-class ="active" to="/index">外卖</router-link>
     <router-link active-class ="active" to="/faxian">发现</router-link>
     <router-link active-class ="active" to="/order">订单</router-link>
     <router-link active-class ="active" to="/my">我的</router-link>
   </div>
    <!--底部导航结束-->
     <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
  
};
</script>

<style scoped>


/*tab-bar*/
.nav{
    width: 100%;
    height: 46px;
    line-height: 46px;
    text-align: center;
    display: flex;
    position: fixed;
    bottom: 0;
    background: #fff;
    border-top: 1px solid #777;
    z-index: 99;
  }
  .nav a{
    flex: 1;
    text-decoration: none;
    color: #a3aaaf;
  }
  .nav a.active{
    color: #0099ff;
    /* background-color:yellow;; */
  }


</style>
