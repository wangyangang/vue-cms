
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import 'mint-ui/lib/style.css'


import app from './App.vue'
import Vue from 'vue'

// 路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import {Toast} from 'mint-ui'
//view-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
//Vue.http.options.root = 'http://127.0.0.1:3001';//设置请求的根路径
//Vue.http.options.root = 'http://127.0.0.1:8000';//设置请求的根路径
Vue.http.options.root = 'http://172.16.0.47:8000';//设置请求的根路径
// 设置全局pst的时候表单数据的组织形式为application/x-www-form-urlencode MIME格式
Vue.http.options.emulateJSON = true 

//导入时间插件
import moment from 'moment'
//定义全局的时间过滤器
Vue.filter('dateFormat', function(dataStr, pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern);
})

import router from './router'
import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vuex.Store({
    state:{
        cart:[]
    },
    mutations:{
        addToCart(state, goodsItem){
            var isInCart = false //商品是否存在购物车中:存在的话，count相加；不存在push进去
            state.cart.some(item=>{
                if(item.id == goodsItem.id){
                    item.count += parseInt(goodsItem.count)
                    isInCart = true
                    return true
                }
            })
            if(!isInCart){
                state.cart.push(goodsItem);
            }
        },
        updateCart(state, goodsItem){
            state.cart.some(item=>{
                if(item.id == goodsItem.id){
                    item.count = goodsItem.count
                    return true
                }
            })
        },
        removeFormCar(state, id){
            state.cart.some((item, i)=>{
                if(item.id == id){
                    state.cart.splice(i, 1)
                    return true
                }
            })
            
        },
        updateGoodsSelected(state, o){
           
            state.cart.some(el=>{
                if(o.id == el.id){
                    el.selected = o.selected;
                    
                    return true
                }
            })
        }
    },
    getters:{
        getCartCount(state){
            var count = 0
            state.cart.forEach(item=>{
                count += item.count;
            })
            return count
        },
        getCountAndAmount(state){
            var o = {count:0,amount:0}
            state.cart.forEach(el=>{
                if(el.selected){
                    o.count += el.count;
                    o.amount += el.count * el.price;
                }
            })
            return o;
        }
    }
})


var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
})