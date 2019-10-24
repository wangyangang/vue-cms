<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="item in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="item.selected" @change="selectedChanged(item.id,item.selected)"></mt-switch>
            <img :src="item.image_url" />
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.price}}</span>
                <numbox :count="item.count" :goods_id="item.id"></numbox>
                <!-- 问题：如何从购物车中获取商品的数量呢 -->
                <!-- 1. 我们可以先创建一个 空对象，然后循环购物车中所有商品的数据， 把 当前循环这条商品的 Id， 作为 对象 的 属性名，count值作为 对象的 属性值，这样，当把所有的商品循环一遍，就会得到一个对象： { 88: 2, 89: 1, 90: 4 } -->
                <a @click.prevent="remove(item.id)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red">{{$store.getters.getCountAndAmount.count}}</span> 件， 总价
              <span class="red">￥{{$store.getters.getCountAndAmount.amount}}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>

    <p>1111111</p>
  </div>
</template>

<script>
import numbox from "../subcomponents/cart_numbox.vue";
import {Toast} from 'mint-ui'
export default {
  data() {
    return {
      goodslist: [] // 购物车中所有商品的数据
    };
  },
  created() {
    this.loadCartInfo();
  },
  methods: {
    //加载购物车信息
    loadCartInfo() {
      this.goodslist = this.$store.state.cart;
    },
    remove(id) {
      // 点击删除，把商品从 store 中根据 传递的 Id 删除，同时，把 当前组件中的 goodslist 中，对应要删除的那个商品，使用 index 来删除
      //this.goodslist.splice(index, 1);
      this.$store.commit("removeFormCar", id);
      this.$http.post('api/cartinfo/'+id, {}).then(res=>{
                if(res.body.status == 200){
                    Toast('删除成功')
                }else{
                    Toast('删除失败'+res.body.msg);
                }
            })
    },
    selectedChanged(id, val) {
      // 每当点击开关，把最新的 快关状态，同步到 store 中
      console.log(id + " --- " + val);
      this.$store.commit("updateGoodsSelected", { id:id,selected:val });
      this.$http.post('api/cartinfo/'+id,{id:id,selected:val}).then(res=>{

                    })
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
