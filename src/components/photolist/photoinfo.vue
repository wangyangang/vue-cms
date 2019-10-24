<template>
    <div class="photo-container">
        <h3>{{photo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{photo.ctime|dateFormat}}</span>
            <span>点击:{{photo.click}}次</span>
        </p>
        <hr>
        <!--图片预览-->
        <!-- <img class="preview-img" v-for="(item, index) in list" :src="item.src" 
        height="100" @click="$preview.open(index,list)" :key="item.id"> -->

        <div class="content" v-html="photo.content"></div>
        
        <hr>
        <div class="thumbs">
            <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
        </div>
        
        <cmt-box :article_id="photo_id"></cmt-box>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
import comment from '../subcomponents/comment.vue'

export default {
    data(){
        return {
            photo_id:this.$route.params.id,
            photo: {},
            list: [],
            slide1:[]
        }
    },
    methods:{
        getPhotoInfo(){
            this.$http.get('api/photoinfo/'+this.photo_id).then(res=>{
                if(res.body.status === 200){
                    this.photo = res.body.body;
                }else{
                    Toast('获取图片出错:'+res.body.msg);
                }
            })
        },
        getThumbs(){
            this.$http.get('api/thumbs/'+this.photo_id).then(res=>{
                if(res.body.status === 200){
                    res.body.body.forEach(element => {
                        element.w = 600;
                        element.h = 400;
                    });
                    this.list = res.body.body;
                }
            })
        },
        getThumbs2(){
            this.$http.get('api/thumbs/'+this.photo_id).then(res=>{
                if(res.body.status === 200){
                    res.body.body.forEach(element => {
                        element.w = 600;
                        element.h = 400;
                        element.title = element.src,
                        element.alt = element.src,
                        element.msrc = element.src
                    });
                    this.slide1 = res.body.body;
                }
            })
        },
        handleClose(){
            console.log('close')
        }
    },
    created(){
        this.getPhotoInfo();
        //this.getThumbs();
        this.getThumbs2();
    },
    components:{
        'cmt-box': comment
    }
}
</script>

<style lang="scss" scoped>
    .photo-container{
        padding: 3px;
        h3{
            color:#26a2ff;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;

        }
        .subtitle{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
        .content{
            font-size: 13px;
            line-height: 30px;
        }

        .thumbs {
            /deep/ .my-gallery{   //deep深层作用选择器
                display: flex;
                flex-wrap:wrap;//默认换行
                figure{
                    width: 30%;
                    margin: 5px;
                    img{
                        width: 100%;
                        box-shadow: 0 0 8px #999;
                        border-radius: 5px;
                    }
                }
            }
        }
    }
</style>