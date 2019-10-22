
import { Header, Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import 'mint-ui/lib/style.css'


import app from './App.vue'
import Vue from 'vue'

// 路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//view-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

import router from './router'
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})