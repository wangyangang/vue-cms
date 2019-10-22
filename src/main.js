
import { Header } from 'mint-ui'
import './lib/mui/css/mui.min.css'
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header)

import app from './App.vue'
import Vue from 'vue'


var vm = new Vue({
    el: '#app',
    render: c=>c(app)
})