<template>
  <div class="app-container">
    <mt-header fixed title="我的商城">
      <router-link to="" slot="left" v-show="flag">
        <mt-button icon="back" @click="goback">返回</mt-button>
      </router-link>
    </mt-header>
    <transition>
      <router-view></router-view>
    </transition>
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-llb" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/shopcart">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{$store.getters.getCartCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>

      <router-link class="mui-tab-item-llb" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data(){
    return {flag:true}
  },
  methods: {
    loadCartInfo() {
      this.$http.get("api/cartinfo").then(res => {
        if (res.body.status == 200) {
          res.body.body.forEach(element => {
            this.$store.commit("addToCart", element);
          });
        }
      });
    },
    goback(){
      this.$router.go(-1)
    }
  },
  created(){
    this.loadCartInfo()
    if(this.$route.path == '/home'){
      this.flag=false;
    }
  },
  watch:{
    '$route.path':function(val){
      if(val=='/home'){
        this.flag = false;
      }else{
        this.flag = true;
      }
    }
  }
};
</script>
<style lang="scss">
.mint-header.is-fixed {
  z-index: 9999;
}
.app-container {
  padding-top: 40px;
  padding-bottom: 70px;
  width: 100%;
  /*解决vue切换的时候 顶部面板移动 一个vue完全消失另一个才出现 */
  overflow-x: hidden;
  position: absolute;
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.mui-bar-tab .mui-tab-item-llb.mui-active {
  color: #007aff;
}
.mui-bar-tab .mui-tab-item-llb {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
.mui-bar-tab .mui-tab-item-llb .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>