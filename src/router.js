import VueRouter from 'vue-router'

import homecontainer from './components/tabbar/homecontainer.vue'
import searchcontainer from './components/tabbar/searchcontainer.vue'
import shopcartcontainer from './components/tabbar/shopcartcontainer.vue'
import membercontainer from './components/tabbar/membercontainer.vue'

var router = new VueRouter({
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: homecontainer},
        {path: '/search', component: searchcontainer},
        {path: '/member', component: membercontainer},
        {path: '/shopcart', component: shopcartcontainer},
    ],
    linkActiveClass: "mui-active" //覆盖路由高亮的类
})

export default router