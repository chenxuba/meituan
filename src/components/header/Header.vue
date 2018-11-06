<template>
  <div class="header">
    <!-- 顶部通栏开始 -->
    <div class="top-wrapper">
      <div class="back-wrapper" @click="goback">
        <span class="icon-arrow_lift"></span>
      </div>

      <form class="search-wrapper">
        <span class="search-icon"></span>
        <input class="search-bar" type="text" placeholder="搜索店内商品" />
      </form>

      <div class="more-wrapper">
        <a class="spelling-bt" href="#">拼单</a>
        <div class="more-bt">
          <i class="s-radius"></i>
          <i class="s-radius"></i>
          <i class="s-radius"></i>
        </div>
      </div>
    </div>
    <!-- 顶部通栏结束 -->
    <!-- 主题内容开始 -->
    <div class="content-wrapper">
      <div class="icon">
        <img :src="poilist.pic_url" />
      </div>
      <div class="name">
        <h3>{{poilist.name}}</h3>
      </div>
      <div class="collect" @click="collect">
        <img src="./img/star.png" v-show="downIcon" />
        <img src="./img/timg.png" v-show="!downIcon" />
        <span>收藏</span>
      </div>
    </div>

    <!-- 主题内容结束 -->
    <!-- 公告内容开始 -->
    <div class="bulletin-wrapper">
      <img class="icon" v-if="poilist.discounts2" :src="poilist.discounts2[0].icon_url" />

      <span class="text" v-if="poilist.discounts2">{{poilist.discounts2[0].info}}</span>
      <div class="detail" v-if="poilist.discounts2" @click="showBulletin">
        {{poilist.discounts2.length}}个活动
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <!-- 公告内容结束 -->
    <!-- 背景内容开始 -->
    <div class="bg-wrapper" :style="head_pic">
      <!-- <img :src="poilist.head_pic_url" /> -->
    </div>
    <!-- 背景内容结束 -->
    <!-- 公告详情开始 -->
    <transition name="bulletin-detail">
      <div class="bulletin-detail" v-show="isShow">
        <div class="detail-wrapper">
          <!-- 相关内容容器 -->
          <div class="main-wrapper" :style="detail_bg">
            <div class="icon">
              <img :src="poilist.pic_url" />
            </div>
            <h3 class="name">{{poilist.name}}</h3>
            <!-- 星级评价 -->
            <div class="score">
              <app-star :score="poilist.wm_poi_score"></app-star>
              <span>{{poilist.wm_poi_score}}</span>
            </div>

            <p class="tip">
              {{poilist.min_price_tip}} <i>|</i> {{poilist.shipping_fee_tip}} <i>|</i> {{poilist.mt_delivery_time}}
            </p>

            <p class="time">
              配送时间: {{poilist.shipping_time_x}}
            </p>

            <div class="discounts" v-if="poilist.discounts2">
              <p v-for="(ok,index) in poilist.discounts2" :key="index">
                <img :src="ok.icon_url" />
                <span>{{ok.info}}</span>
              </p>
            </div>
          </div>

          <!-- 关闭内容容器 -->
          <div class="close-wrapper">
            <span class="icon-close" @click="closeBulletin"></span>
          </div>
        </div>
      </div>
    </transition>
    <!-- 公告详情结束 -->

  </div>
</template>

<script>
  import Star from '../star/Star'

  export default {
    data() {
      return {
        downIcon: true,
        isShow: false
      }
    },
    props: {
      poilist: {
        type: Object,
        default: {
          function () {
            return{}
          }
        }
      }
    },
    computed: {
      detail_bg() {
        return "background-image: url(" + this.poilist.poi_back_pic_url + ")"
      },
      head_pic() {
        return "background-image: url(" + this.poilist.head_pic_url + ")"
      }
    },
    methods: {
      collect() {
        this.downIcon = !this.downIcon //控制收藏按钮
      },
      closeBulletin() {
        this.isShow = false;
      },
      showBulletin(){
          this.isShow = true;
      },
      goback(){
           this.$router.push("/index")
      }
    },
    components: {
      "app-star": Star
    },
  };

</script>

<style scoped>
  @import url(../../common/css/icon.css);

  .header {
    height: 140px;
    padding-top: 20px;
  }

  /* 背景图片样式 */
  .header .bg-wrapper {
    width: 100%;
    height: 160px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    background-size: 100% 100%;

  }

  /* 顶部通栏样式开始 */
  .header .top-wrapper {
    position: relative;
  }

  .header .top-wrapper .back-wrapper {
    width: 50px;
    height: 31px;
    position: absolute;
    left: 0;
    top: 0;
    text-align: center;
    line-height: 31px;
  }

  .header .top-wrapper .back-wrapper span {
    display: inline-block;
    color: white;
  }

  .header .top-wrapper .search-wrapper {
    width: 100%;
    height: 31px;
    /* background: pink; */
    padding: 0 104px 0 50px;
    /* 设置盒子从边框开始计算*/
    box-sizing: border-box;
  }

  .header .top-wrapper .search-wrapper .search-icon {
    width: 28px;
    height: 31px;
    background: url(./img/search.png) no-repeat 11px center;
    background-size: 13px 13px;
    position: absolute;
  }

  .header .top-wrapper .search-wrapper .search-bar {
    width: 100%;
    height: 31px;
    border: 0;
    /* 设置盒子从边框开始计算*/
    box-sizing: border-box;
    background: #f5f5f9;
    border-radius: 25px;
    padding-left: 28px;
    /* 去除选中时蓝色边框*/
    outline: none;
  }

  .header .top-wrapper .more-wrapper {
    width: 65px;
    height: 24px;
    /* background: orange; */
    position: absolute;
    right: 0;
    top: 0;
    padding: 7px 15px 0 24px;
  }

  .header .top-wrapper .more-wrapper .spelling-bt {
    width: 30px;
    height: 17px;
    color: white;
    line-height: 17px;
    border: 1px solid white;
    text-align: center;
    float: left;
    text-decoration: none;
    font-size: 10px;
  }

  .header .top-wrapper .more-wrapper .more-bt {
    float: right;
    width: 20px;
    height: 24px;
    margin-left: 13px;
    margin-top: 6px;
  }

  .header .top-wrapper .more-wrapper .more-bt .s-radius {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    border: 1px solid white;
    display: block;
    float: left;
    margin-right: 1px;
  }



  /* 主题内容 样式 */
  .header .content-wrapper {
    padding: 15px 10px 11px;
    height: 50px;
  }

  .header .content-wrapper .icon {
    width: 50px;
    height: 50px;
    /* background:white; */
    border-radius: 5px;
    float: left;
  }

  .header .content-wrapper .icon img {
    width: 55px;
    height: 50px;
    border-radius: 10px;

  }

  .header .content-wrapper .name {
    float: left;
    padding: 18px 0 0 12px;
  }

  .header .content-wrapper .name h3 {
    font-size: 16px;
    font-weight: bold;
    color: white;
  }

  .header .content-wrapper .collect {
    width: 25px;
    height: 37px;
    float: right;
    text-align: center;
    padding-top: 6px;
  }

  .header .content-wrapper .collect img {
    width: 20px;
    height: 20px;
  }

  .header .content-wrapper .collect span {
    margin-top: 7px;
    color: white;
    font-size: 11px;
  }

  /* 公告内容样式 */
  .header .bulletin-wrapper {
    height: 16px;
    padding: 10px 10px;
  }

  .header .bulletin-wrapper .icon {
    width: 16px;
    height: 16px;
    float: left;
    margin-right: 6px;
  }

  .header .bulletin-wrapper .text {
    font-size: 11px;
    color: white;
    float: left;
    line-height: 16px;
  }

  .header .bulletin-wrapper .detail {
    color: white;
    float: right;
    font-size: 11px;
    line-height: 16px;
  }

  .header .bulletin-wrapper .detail span {
    font-size: 16px;
    line-height: 16px;
    float: right;
  }

  /* 动画效果 */
  .bulletin-detail-enter-active,
  .bulletin-detail-leave-active {
    transition: .5s all;
  }

  .bulletin-detail-enter,
  .bulletin-detail-leave-to {
    opacity: 0;
  }

  .bulletin-detail-enter-to,
  .bulletin-detail-leave {
    opacity: 1;
  }

  /* 公告详情 样式 */
  .header .bulletin-detail {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(98, 98, 98, 0.8);
    z-index: 999;
  }

  .header .bulletin-detail .detail-wrapper {
    width: 100%;
    height: 100%;
    padding: 43px 20px 125px;
    box-sizing: border-box;

  }

  .header .bulletin-detail .detail-wrapper .main-wrapper {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    border-radius: 10px;
    text-align: center;
  }

  .header .bulletin-detail .detail-wrapper .main-wrapper .icon {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    display: inline-block;
    margin-top: 40px;
  }

  .header .bulletin-detail .detail-wrapper .main-wrapper .icon img {
    width: 60px;
    height: 60px;
    border-radius: 10px;
  }

  .header .bulletin-detail .detail-wrapper .main-wrapper .name {
    font-size: 15px;
    color: white;
    margin-top: 13px;
  }

  .header .bulletin-detail .detail-wrapper .main-wrapper .score {
    height: 10px;
    margin-top: 6px;
    text-align: center;
    font-size: 0;
  }

  .header .bulletin-detail .detail-wrapper .main-wrapper .score .star {
    display: inline-block;
    margin-right: 7px;
  }

  .header .bulletin-detail .detail-wrapper .main-wrapper .score span {
    display: inline-block;
    font-size: 10px;
    color: white;
  }

  .header .bulletin-detail .detail-wrapper .main-wrapper .tip {
    font-size: 11px;
    color: #bababc;
    margin-top: 8px;
  }

  .header .bulletin-detail .detail-wrapper .main-wrapper .tip i {
    margin: 0 7px;
  }

  .header .bulletin-detail .detail-wrapper .main-wrapper .time {
    font-size: 11px;
    color: #bababc;
    margin: 13px 15px 0 15px;
    border-bottom: 1px solid #BABABC;
    padding: 0 10px 20px 10px;
  }

  .header .bulletin-detail .detail-wrapper .main-wrapper .discounts {
    margin-top: 20px;
    padding: 0 20px;
    margin-left: 45px;
  }

  .header .bulletin-detail .detail-wrapper .main-wrapper .discounts p {
    margin-bottom: 10px;
    text-align: left;
  }

  .header .bulletin-detail .detail-wrapper .main-wrapper .discounts img {
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }

  .header .bulletin-detail .detail-wrapper .main-wrapper .discounts span {
    font-size: 11px;
    line-height: 16px;
    color: white;
  }

  .header .bulletin-detail .detail-wrapper .close-wrapper {
    padding-top: 20px;
    height: 40px;
    text-align: center;
  }

  .header .bulletin-detail .detail-wrapper .close-wrapper span {
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    font-size: 14px;
    color: white;
    display: inline-block;
    background: rgba(118, 118, 118, 0.7);
    border: 1px solid rgba(140, 140, 140, 0.9);
  }

</style>
