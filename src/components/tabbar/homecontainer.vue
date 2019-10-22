<template>
  <div>
    <mt-swipe :auto="1000">
      <mt-swipe-item v-for="item in swipeList" :key="item.url">
        <img :src="item.img" alt />
      </mt-swipe-item>
    </mt-swipe>
    <!--九宫格，用mui的griddefault-->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <!-- <span class="mui-icon mui-icon-home"></span> -->
          <img src="../../images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <!-- <span class="mui-icon mui-icon-chatbubble"></span> -->
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <!-- <span class="mui-icon mui-icon-location"></span> -->
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <!-- <span class="mui-icon mui-icon-search"></span> -->
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <!-- <span class="mui-icon mui-icon-phone"></span> -->
          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      swipeList: []
    };
  },
  methods: {
    getSwipeData() {
      this.$http.get("http://127.0.0.1:3001/getinfo").then(res => {
        if (res.status === 200) {
          this.swipeList = res.body;
        } else {
          Toast("轮播图加载失败");
        }
        this.swipeList = res.body;
        console.log(res);
      });
    }
  },
  created() {
    this.getSwipeData();
  }
};
</script>

<style lang="scss">
.mint-swipe {
  height: 200px;
}
.mint-swipe-item {
  &:nth-child(1) {
    background-color: red;
  }
  &:nth-child(2) {
    background-color: blue;
  }
  &:nth-child(3) {
    background-color: green;
  }
}
image {
  width: 100%;
  height: 100%;
}
.mui-grid-view.mui-grid-9{
    background-color: white;
    img{
        width:60px;
        height: 60px;
    }
    .mui-media-body{
        font-size: 13px;
    }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: 0;
}

</style>