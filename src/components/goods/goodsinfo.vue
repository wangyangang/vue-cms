<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiperVue :swipelist="swipelist" :isfull="false"></swiperVue>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{ goodsinfo.old_price }}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥{{ goodsinfo.now_price }}</span>
          </p>
          <p>
            购买数量：
            <numbox @getcount="getCount" :max="goodsinfo.stock"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            <!-- 分析： 如何实现加入购物车时候，拿到 选择的数量 -->
            <!-- 1. 经过分析发现： 按钮属于 goodsinfo 页面， 数字 属于 numberbox 组件 -->
            <!-- 2. 由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsinfo 页面zhong 中获取到 选中的商品数量值-->
            <!-- 3. 怎么解决这个问题：涉及到了 子组件向父组件传值了（事件调用机制） -->
            <!-- 4. 事件调用的本质： 父向子传递方法，子调用这个方法， 同时把 数据当作参数 传递给这个方法 -->
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsinfo.id}}</p>
          <p>库存情况：{{goodsinfo.stock}}件</p>
          <p>上架时间：{{goodsinfo.ctime | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import swiperVue from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/goodinfo_numbox.vue";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      swipelist: [],
      goodsID: this.$route.params.id,
      goodsinfo: {},
      ballFlag: false, // 控制小球的隐藏和显示的标识符
      selectedCount: 1 //商品数量
    };
  },
  methods: {
    getSwipeData() {
      this.$http.get("api/swipelist").then(res => {
        if (res.body.status === 200) {
          this.swipelist = res.body.body.slice(3, 6);
        } else {
          Toast("轮播图加载失败");
        }
      });
    },
    getGoodsInfo() {
      this.$http.get("api/goodsinfo/" + this.goodsID).then(res => {
        console.log(res);
        if (res.body.status === 200) {
          this.goodsinfo = res.body.body;
        } else {
          Toast(res.body.msg);
        }
      });
    },
    goDesc() {
      this.$router.push({ name: "goodsdesc", params: { id: this.goodsID } });
    },
    goComment() {
      this.$router.push({ name: "goodscomment", params: { id: this.goodsID } });
    },
    addToShopCar() {
      // 添加到购物车
      this.ballFlag = !this.ballFlag;
      var goodsItem = {
        id: this.goodsinfo.id,
        count: this.selectedCount,
        price: this.goodsinfo.now_price,
        selected: true
      };
      this.$store.commit('addToCart', goodsItem);
      this.$http.post('api/cartinfo', goodsItem).then(res=>{
        if(res.body.status == 200){
          Toast('添加购物车成功')
        }else{
          Toast('添加购物车失败:'+ res.body.msg);
        }
      })
    },
    getCount(num) {
      console.log(num)
      this.selectedCount = num;
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;
      // 小球动画优化思路：
      // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
      // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
      // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
      // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
      // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()

      // 获取小球的 在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取 徽标 在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    }
  },
  created() {
    this.getSwipeData();
    this.getGoodsInfo();
  },
  components: {
    swiperVue,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 146px;
  }
}
</style>