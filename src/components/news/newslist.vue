<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="news in newslist" :key="news.id">
					<router-link :to="'/home/newsinfo/'+news.id">
						<img class="mui-media-object mui-pull-left" :src="news.img">
						<div class="mui-media-body">
							<h1>{{news.title}}</h1>
							<p class="mui-ellipsis">
                                <span>发表时间:{{news.ctime | dateFormat}}</span>
                                <span>点击:{{news.click}}次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return { 
            newslist: []
        }
    },
    methods:{
        getNewsList(){
            this.$http.get('api/newslist').then(res=>{
                if(res.body.status === 200){
                    this.newslist = res.body.body;
                    
                    //Toast('获取新闻列表失败')
                }else{
                    Toast('获取新闻列表失败')
                }
            })
        }
    },
    created: function(){
        this.getNewsList();
    }
}
</script>
<style lang="scss" scoped>
    .mui-table-view{
        li{
            h1{
                font-size:14px;
            }
            .mui-ellipsis{
                font-size: 12px;
                color:#226aff;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>