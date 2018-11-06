<template>
  <div class="goods">
    <!-- 分类列表 -->
    <div class="menu-wrapper" ref="menuScroll" >
      <ul>
        <li class="menu-item" v-for="(item,index) in goods" :key="index" :class="{'current':currentIndex === index}" @click="selectMenu(index)">
          <p class="text">
            <img class="icon" :src="item.icon" v-if="item.icon"/>
            {{item.name}}
          </p>
          <i class="num" v-show="alculateCount(item.spus)">
            {{alculateCount(item.spus)}}
          </i>
        </li>
      </ul>
    </div>
    <!-- 商品列表 -->
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
        <li class="food-list food-list-hook" v-for="(item,index) in goods" :key="index">
          <h3 class="title">{{item.name}}</h3>
          <!-- 具体的商品列表 -->
        <ul>
          <li v-for="(food,index) in item.spus" :key="index" class="food-item" @click="showDetail(food)">
            <div class="icon" :style="head_bg(food.picture)"></div>
            <div class="content">
              <h3 class="name">{{food.name}}</h3>
              <p class="desc" v-if="food.description">{{food.description}}</p>
              <div class="extra">
                <span class="saled">{{food.month_saled_content}}</span>
                <span class="praise">{{food.praise_content}}</span>
              </div>
              <img :src="food.product_label_picture"  class="product">
              <p class="price">
                <span class="text">¥{{food.min_price}}</span>
                <span class="unit">/{{food.unit}}</span>
              </p>
            </div>
            <div class="cartcontrol-wrapper">
              <app-cart-control :food="food"></app-cart-control>
            </div>
          </li>
        </ul>
        </li>
      </ul>
    </div>
    <!-- 购物车 -->
    <app-shopcart :poilist="poilist" :selectFoods="selectFoods"></app-shopcart>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Shopcart from "@/components/shopcart/Shopcart";
import Cartcontrol from "../cartcontrol/Cartcontrol";
import axios from "axios";

export default {
  name: "goods",

  data() {
    return {
      menuScroll: {},
      foodScroll: {},
      listheight: [], //把所有li元素的可视高度进行一个累加，放进一个数组里
      scrollY: 0, //y轴滚动的初始高度
      id: this.$route.params.id,
      poilist: {},//当前的店铺信息
      goods:[] ////当前的店铺右侧分类和分类下属的商品
    };
  },
  methods: {
    head_bg(imgName) {
      return "background-image: url(" + imgName + ")";
    },
    selectMenu(index) {
      let foodlist = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );
      let element = foodlist[index];
      this.foodScroll.scrollToElement(element, 250); //250是滚动所花费的时间
    },
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuScroll, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        click: true,
        probeType: 3 //必须指定probeType为3时，才会派发scroll事件
      });
      //  监听滚动的位置
      //foodScroll 添加监听事件on  监听右侧的滚动事件 滑动触发
      this.foodScroll.on("scroll", pos => {
        // console.log(pos.y) 会打印出y轴坐标，会出现负数以及小数
        //对得到的pos.y 进行取绝对值Math.abs和取整数Math.round,并赋与scrollY
        this.scrollY = Math.abs(Math.round(pos.y));
        //console.log(this.scrollY) //姿势正确的话会得到整数 和 正数
        //我们既然可以拿到scrollY滚动的值，之后呢，我们就可以去通过计算属性，
        //然后呢遍历一下我们刚刚获取到的listHeight的这个数组里面的所有的区间 ，
        //在使用区间跟我们刚刚获取到的这个scrollY滚动的值做对比，
        //如果当前的区间在这个里面的话，那我们就会生成一个 对应的下标，
        //所以在计算属性里做文章，移步 computed
      });
    },
    calulateHeight() {
      let foodlist = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );
      // console.log(foodlist)
      let height = 0; //定义一个height，最顶部的位置，为0
      this.listheight.push(height); //把当前的位置高度push进刚刚定义的数组里去
      // console.log(height) 0
      //遍历一下刚刚拿到的li元素，即：foodlist
      for (let i = 0; i < foodlist.length; i++) {
        //拿到每一个li元素
        let item = foodlist[i];
        //把每一个li元素的可视高度进行一个累加 即:clientHeight
        height += item.clientHeight;
        // console.log(height)
        //这个时候把每一个li的可视高度都放进listHeight数组里
        this.listheight.push(height);
        // console.log(this.listheight);
      }
    },
    alculateCount(spus){
      let count = 0
      spus.forEach((food)=>{
        if(food.count>0){
          count+=food.count
        }
      })
      return count;
    },
    showDetail(food){
      console.log(food)
      alert(food.name)
    }
  },

  components: {
    "app-shopcart": Shopcart,
    "app-cart-control": Cartcontrol
  },
  computed: {
    currentIndex() {
      //计算listHeight的下标值
      //只要他的下标值和分类列表的下标值一致的话，那个分类就有一个对应选中的样式
      //拿到listHeight具体的下标，先遍历listHeight
      for (let i = 0; i <= this.listheight.length; i++) {
        //获取商品区间的范围 ps:商品区间就是相邻两个商品的之间的高度
        //定义商品1,它的高度为height1
        let height1 = this.listheight[i];
        //定义商品2,它的高度为height2
        let height2 = this.listheight[i + 1];
        //是否在上述区间中
        //ps:用滚动的值scrollY和height1,height2做对比,
        //如果scrollY大于等于height1并且小于height2,
        //就说明 i 在该区间内了,然后就把i返回,即得到下标
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
          // console.log(i);
        }
      }
      // return 0;
    },
    //定义一个计算属性来监听数量是否有变化
    selectFoods(){
      let foods = [] //1.定一个foods数组，用来存放点击的商品
      this.goods.forEach((myfoods)=>{  
            myfoods.spus.forEach((food)=>{ //遍历商品，把点击的商品放进foods数组内
                if(food.count>0){
                  foods.push(food)
                }
            })
      })
      return foods
    }
  },
  created() {
    axios.get("https://chenxuba.github.io/meituan.json").then(res => {
      let datas = res.data.data.poilist;
      if (datas && datas.length > 0) {
        this.poilist = datas[this.id]; //当前的店铺信息
        // console.log(this.poilist)
        this.goods = this.poilist.food_spu_tags //当前的店铺右侧分类和分类下属的商品
        console.log(this.goods)
        // console.log(this.detail);
        this.$nextTick(() => {
          this.initScroll(), 
          this.calulateHeight();
        });
      }
    });
  }
};
</script>


<style scoped>
.goods .menu-wrapper .menu-item.current {
  background: #fff;
  font-weight: bold;
  border-left: 2px solid #12b0ee;
}
.goods {
  display: flex;
  position: absolute;
  top: 204px;
  bottom: 51px;
  width: 100%;
  overflow: hidden;
  /* background: red; */
}
.goods .menu-wrapper {
  flex: 0 0 80px;
  background: #f4f4f4;
}
.goods .foods-wrapper {
  flex: 1;
  /* background: pink; */
}
/* Menu item */
.goods .menu-wrapper .menu-item {
  padding: 16px 20px 15px 6px;
  border-bottom: 1px solid #e4e4e4;
  position: relative;
}
.goods .menu-wrapper .menu-item .text {
  font-size: 13px;
  color: #333;
  line-height: 17px;
  vertical-align: middle;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.goods .menu-wrapper .menu-item .text .icon {
  width: 15px;
  height: 15px;
  vertical-align: middle;
}

/* 具体分类商品布局 */
.goods .foods-wrapper .food-list {
  padding: 11px;
}

.goods .foods-wrapper .food-list .title {
  height: 13px;
  font-size: 13px;
  background: url(./img/btn_yellow_highlighted@2x.png) no-repeat left center;
  background-size: 2px 10px;
  padding-left: 7px;
  margin-bottom: 12px;
}

.goods .foods-wrapper .food-list .food-item {
  display: flex;
  margin-bottom: 25px;
  position: relative;
}

.goods .foods-wrapper .food-list .food-item .icon {
  flex: 0 0 63px;
  background-position: center;
  background-size: 120% 100%;
  background-repeat: no-repeat;
  margin-right: 11px;
  height: 75px;
}
.goods .foods-wrapper .food-list .food-item .content {
  flex: 1;
}

/* 具体内容样式 */
.goods .foods-wrapper .food-list .food-item .content .name {
  font-size: 16px;
  line-height: 21px;
  color: #333333;
  margin-bottom: 10px;
  padding-right: 27px;
}

.goods .foods-wrapper .food-list .food-item .content .desc {
  font-size: 10px;
  line-height: 19px;
  color: #bfbfbf;
  margin-bottom: 8px;

  /* 超出部分显示省略号*/
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.goods .foods-wrapper .food-list .food-item .content .extra {
  font-size: 10px;
  color: #bfbfbf;
  margin-bottom: 7px;
}
.goods .foods-wrapper .food-list .food-item .content .extra .saled {
  margin-right: 14px;
}
.goods .foods-wrapper .food-list .food-item .content .product {
  height: 15px;
  margin-bottom: 6px;
}
.goods .foods-wrapper .food-list .food-item .content .price {
  font-size: 0;
}
.goods .foods-wrapper .food-list .food-item .content .price .text {
  font-size: 14px;
  color: #fb4e44;
}
.goods .foods-wrapper .food-list .food-item .content .price .unit {
  font-size: 12px;
  color: #bfbfbf;
}

/* 加减号 */
.goods .foods-wrapper .food-list .food-item .cartcontrol-wrapper {
  position: absolute;
  bottom: 0;
  right: 0;
}



/* 左侧数量显示样式 */
.goods .menu-wrapper .menu-item .num{
  position: absolute;
  right: 5px;
  top: 5px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  color: white;
  background: red;
  text-align: center;
  font-size: 8px;
  line-height: 15px;
}
</style>
