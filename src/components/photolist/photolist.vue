<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
        data-scroll="1"
      >
        <div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px);">
          <a
            :class="['mui-control-item', cate.id == 0 ? 'mui-active': '']"
            v-for="cate in cates"
            :key="cate.id"
            @click="getPhotoByCategoryID(cate.id)"
          >{{cate.name}}</a>
        </div>
      </div>
    </div>

    <ul class="photo-list">
      <router-link v-for="photo in photo_list" :key="photo.id" :to="'/home/photoinfo/'+photo.id" tag="li">
        <img v-lazy="photo.image_url" />
        <div class="info">
          <h1 class="info-title">{{photo.title}}</h1>
          <div class="info-body">{{photo.summary}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>


<script>
import mui from "../../lib/mui/js/mui.min.js";
//初始化scroll控件
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      cates: [],
      photo_list: []
    };
  },
  methods: {
    getALlCategory() {
      this.$http.get("api/categorylist").then(res => {
        if (res.body.status === 200) {
          res.body.body.unshift({ id: 0, name: "全部" });
          this.cates = res.body.body;
        } else {
          Toast("获取分类失败：" + res.body.msg);
        }
      });
    },
    getPhotoByCategoryID(category_id) {
      this.$http.get("api/photolist/" + category_id).then(res => {
        if (res.body.status === 200) {
          this.photo_list = res.body.body;
        } else {
          Toast("获取图片失败:" + res.body.msg);
        }
      });
    }
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  created() {
    this.getALlCategory();
    this.getPhotoByCategoryID(0);
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    background-color: #ccc;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>