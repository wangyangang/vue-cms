<template>
  <div class="newsinfo-container">
    <h1 class="newsinfo-title">新闻详情--{{article_id}}</h1>
    <p class="newsinfo-subtitle">
      <span>发表日期:{{ctime | dateFormat}}</span>
      <span>点击:{{click}}次</span>
    </p>
    <hr>
    <div class="newsinfo-content" v-html="content"></div>

    <!--评论子组件-->
    <commentbox :article_id="this.article_id"></commentbox>
  </div>

  
</template>

<script>
import { Toast } from "mint-ui";
import commentComponent from '../subcomponents/comment.vue'

export default {
  data() {
    return {
      article_id: this.$route.params.id,
      title: "",
      ctime: null,
      click: 0,
      content: ""
    };
  },
  methods: {
    getNewsInfo(news_id) {
      this.$http.get("api/newsinfo/" + news_id).then(res => {
        
        if (res.body.status === 200) {
          this.title = res.body.body[0].title;
          this.ctime = res.body.body[0].ctime;
          this.click = res.body.body[0].click;
          this.content = res.body.body[0].content;
          Toast("获取文章详情成功");
        } else {
          Toast("获取文章详情失败");
        }
      });
    }
  },
  created() {
    this.getNewsInfo(this.article_id);
  },
  components:{
      'commentbox': commentComponent
  }
};
</script>

<style lang="scss" scoped>
.newsinfo-container {
    padding: 0 10px;

  .newsinfo-title {
    color: red;
    text-align: center;
  }
  .newsinfo-subtitle {
    display: flex;
    justify-content: space-between;
  }
  .newsinfo-content{
      text-align: justify;
  }
}
</style>