<template>
  <div class="shop-list">
    <div class="title-bar">
      <span>附近商家</span>
    </div>
    <div class="shop-list-item" 
         v-for="(item,index) in poilist" :key="index"   
         @click="showDetail(item.id)"
         >
      <div class="left">
        <img :src="item.pic_url" />
      </div>
      <div class="right">
        <div class="name">{{item.name}}</div>
        <div class="mid">
          <!-- 星星评价 开始 -->
          <div class="star">
              <app-star :score="item.wm_poi_score"></app-star>
          </div>
          <!-- 星星评价 开始 -->
          <span class="count">月售{{item.month_sale_num}}</span>
          <span class="distance">{{item.distance}}</span>
          <span class="time">{{item.mt_delivery_time}}</span>
        </div>
        <div class="fee">
          <span class="start">{{item.min_price_tip}}</span>
          <span class="delivery">{{item.shipping_fee_tip}}</span>
          <span class="average">{{item.average_price_tip}}</span>
        </div>
        <div class="activity" v-for="(icon,index) in item.discounts2" :key="index">
          <p>
            <img :src="icon.icon_url" />
            {{icon.info}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Star from '../star/Star'

export default {
  data() {
    return {
      isOk: false,
    };
  },
  methods: {
    showDetail(id) {
     this.$router.push({path:'shopdetail/'+id})
    }
  },
  props: {
    poilist: {}
  },
  components: {
      "app-star": Star
    },
};
</script>

<style scoped>
/* 附近商家样式 */
.title-bar {
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.title-bar span {
  display: inline-block;
  position: relative;
  font-weight: bold;
  color: #333;
}

.title-bar span:before {
  content: "";
  position: absolute;
  top: 20px;
  right: -43px;
  width: 30px;
  border-top: 1px solid #333;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.title-bar span:after {
  content: "";
  position: absolute;
  top: 20px;
  left: -43px;
  width: 30px;
  border-top: 1px solid #333;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.shop-list-item {
  display: flex;
  padding: 10px 0;
  margin-bottom: 5px;
  position: relative;
}

.shop-list-item .left {
  flex: 0 0 90px;
  /*background: red;*/
}

.shop-list-item .right {
  flex: 1;
  display: flex;
  padding-right: 15px;
  flex-direction: column;
  /*background: orange;*/
}

.shop-list-item .left img {
  display: block;
  width: 70px;
  margin: 0 auto;
}

.shop-list-item .right .name {
  font-size: 17px;
  color: #333;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.shop-list-item .right .mid {
  flex: 1;
  font-size: 12px;
  color: #666;
  margin-top: 10px;
}

/*星星*/

.shop-list-item .right .mid .star {
  width: 70px;
  height: 14px;
  /*background-color: pink;*/
  float: left;
}

/* .shop-list-item .right .mid .star span {
  width: 10px;
  height: 10px;
  background: url("/static/img/timg.png");
  display: inline-block;
  background-repeat: no-repeat;
  background-size: 10px 10px;
} */

.shop-list-item .right .mid .count {
  float: left;
  margin-left: 10px;
}

.shop-list-item .right .mid .time {
  margin-right: 10px;
  float: right;
  position: relative;
}

.shop-list-item .right .mid .time:after {
  position: absolute;
  content: "";
  top: -1px;
  right: -8px;
  height: 15px;
  border-right: 1px solid #999;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.shop-list-item .right .mid .distance {
  margin-left: 5px;
  float: right;
}

.shop-list-item .right .fee {
  flex: 1;
  font-size: 13px;
  margin-top: 10px;
}

.shop-list-item .right .fee .start {
  margin-right: 10px;
  position: relative;
}

.shop-list-item .right .fee .delivery {
  margin-right: 10px;
  position: relative;
}

.shop-list-item .right .fee .start:after {
  position: absolute;
  content: "";
  top: 0px;
  right: -8px;
  height: 15px;
  border-right: 1px solid #999;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.shop-list-item .right .fee .delivery:after {
  position: absolute;
  content: "";
  top: 0px;
  right: -8px;
  height: 15px;
  border-right: 1px solid #999;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.shop-list-item .right .fee span {
  display: inline-block;
  color: #656565;
}

.shop-list-item .right .activity {
  flex: 1;
  font-size: 13px;
  color: #b0b0b0;
  margin-top: 10px;
}

.shop-list-item .right .activity p {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.shop-list-item .right .activity img {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  vertical-align: bottom;
}

.shop-list-item:after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
</style>
