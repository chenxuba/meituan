<template>
  <div class="swiper">
    <ul class="list">
      <li v-for="(item,index) in swiper" :key="index">
        <img :src="item.src" />
        <span>{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiper: [
        {
          src:
            "http://p1.meituan.net/jungle/8b5e1702d4145ccf058ba5fb31008c5310912.png",
          title: "美食"
        },
        {
          src:
            "http://p0.meituan.net/jungle/45ff2f098a20a77122bff8385192f0ec10547.png",
          title: "嗷嗷饿超市"
        },
        {
          src:
            "http://p1.meituan.net/jungle/12a9834827909fa55f54bce96e67470711250.png",
          title: "生鲜果蔬"
        },
        {
          src:
            "http://p1.meituan.net/jungle/da9181f93dd2e11c5d74cf685470408f10016.png",
          title: "嗷嗷饿专送"
        },
        {
          src:
            "http://p1.meituan.net/jungle/da9181f93dd2e11c5d74cf685470408f10016.png",
          title: "夜宵"
        },
        {
          src:
            "http://p1.meituan.net/jungle/da9181f93dd2e11c5d74cf685470408f10016.png",
          title: "甜点饮品"
        },
        {
          src:
            "http://p0.meituan.net/jungle/2ec76f8f4f21a4ec163adc7fccfa1a399428.png",
          title: "小吃馆"
        },
        {
          src:
            "http://p0.meituan.net/jungle/2eee7747fd143249b100b9fa5ee5e31d9873.png",
          title: "家常菜"
        }
      ]
    };
  }
};
</script>

<style scoped>
/* swiper样式 */
.swiper {
  width: 100%;
  height: 180px;
  padding-bottom: 20px;
  /*background-color: pink;*/
}
.swiper .list{
  overflow: hidden;
  zoom: 1;
}
.swiper .list li {
  width: 25%;
  float: left;
  text-align: center;
  padding-top: 14px;
}

.swiper .list li img {
  width: 50px;
  height: 50px;
  margin-bottom: 12px;
}

.swiper .list li span {
  display: block;
  text-align: center;
  font-size: 14px;
  line-height: 14px;
  color: #2f2f2f;
}
</style>
