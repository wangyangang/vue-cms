import VueRouter from 'vue-router'

import homecontainer from './components/tabbar/homecontainer.vue'
import searchcontainer from './components/tabbar/searchcontainer.vue'
import shopcartcontainer from './components/tabbar/shopcartcontainer.vue'
import membercontainer from './components/tabbar/membercontainer.vue'

import newslist from './components/news/newslist.vue'
import newsinfo from './components/news/newsinfo.vue'

import photolist from './components/photolist/photolist.vue'
import photoinfo from './components/photolist/photoinfo.vue'

import goodslist from './components/goods/goodslist.vue'
import goodsinfo from './components/goods/goodsinfo.vue'
import goodsdesc from './components/goods/goodsdesc.vue'
import goodscomment from './components/goods/goodscomment.vue'

var router = new VueRouter({
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: homecontainer},
        {path: '/search', component: searchcontainer},
        {path: '/member', component: membercontainer},
        {path: '/shopcart', component: shopcartcontainer},
        {path: '/home/newslist', component: newslist},
        {path: '/home/newsinfo/:id', component: newsinfo},
        {path: '/home/photolist', component: photolist},
        {path: '/home/photoinfo/:id', component: photoinfo},
        {path: '/home/goodslist', component: goodslist},
        {path: '/home/goodsinfo/:id', component: goodsinfo},
        {path: '/home/goodsdesc/:id', component: goodsdesc, name:'goodsdesc'},
        {path: '/home/goodscomment/:id', component: goodscomment, name:'goodscomment'},
    ],
    linkActiveClass: "mui-active" //覆盖路由高亮的类
})

export default router