
import { Header, Swipe, SwipeItem, Button } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)

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
Vue.http.options.root = 'http://127.0.0.1:3001';//设置请求的根路径

//导入时间插件
import moment from 'moment'
//定义全局的时间过滤器
Vue.filter('dateFormat', function(dataStr, pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern);
})

import router from './router'
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})