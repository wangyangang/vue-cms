<template>
  <div class="goods-list">
    <router-link class="goods-item" v-for="goods in goodslist" :key="goods.id" 
    :to="'/home/goodsinfo/'+goods.id" tag='div'>
      
        <img :src="goods.image_url" alt="">
      
      <h1 class="title">{{goods.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{goods.now_price}}</span>
          <span class="old">￥{{goods.old_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{goods.stock}}件</span>
        </p>
      </div>
    </router-link>

    <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data(){
    return {
      goodslist:[],
      pageIndex :1
    };
  },
  methods:{
    getGoodsList(){
      this.$http.get('api/goodslist?page='+this.pageIndex).then(res=>{
        if(res.body.status===200){
          console.log(res.body.body)
          this.goodslist = this.goodslist.concat(res.body.body);
        }else{
          Toast('获取商品列表失败:'+res.body.msg);
        }
      })
    },
    loadMore(){
      this.pageIndex++;
      this.getGoodsList();
    }
  },
  created(){
    this.getGoodsList();
  }
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }

    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>