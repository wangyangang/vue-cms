<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入要评论的内容" maxlength="120" v-model="comment"></textarea>

    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in commentlist" :key="item.id">
        <div
          class="cmt-title"
        >第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.username === null ? "匿名用户" : item.username }}&nbsp;&nbsp;发表时间：{{ item.ctime | dateFormat }}</div>
        <div class="cmt-body">{{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      page: 1,
      commentlist: [],
      comment: ""
    };
  },
  methods: {
    getComments() {
      this.$http
        .get("api/comments/" + this.$route.params.id + "?page="+this.page)
        .then(res => {
          if (res.body.status === 200) {
            this.commentlist = this.commentlist.concat(res.body.body)
          } else {
            Toast("获取评论失败:" + res.body.msg);
          }
        });
    },
    postComment() {
      this.$http
        .post("api/comment/" + this.$route.params.id, {
          content: this.comment.trim()
        })
        .then(res => {
          if (res.body.status === 200) {
            this.commentlist.unshift(res.body.body[0]);
          } else {
            Toast("发布失败");
          }
        });
    },
    loadMore(){
      this.page = this.page + 1
      this.getComments()
    }
  },
  created() {
    this.getComments();
  },
  props: ["article_id"]
};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>