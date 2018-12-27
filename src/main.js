// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*eslint-disable*/
import Vue from 'vue'
import App from './App'
// import Vuex from 'vuex'
import store from './store'
import router from './router'
import * as filters from './filter/index'
// import {Button, Swipe, SwipeItem} from 'mint-ui'
import { Swipe, SwipeItem } from 'vue-swipe';
// import 'mint-ui/lib/style.css'
import FastClick from 'fastclick'
import '../static/js/flexible.js'
import VueScroller from 'vue-scroller'

/**
*监听浏览器点击返回前进操作动画
*浏览器端使用需要注意路由path的创建，二级应该在一级的基础上添加
*如一级/Home，则二级为/Home/Detail，依次往后加，如果是app的话可忽略以下代码
*/
let init = 0
window.addEventListener('popstate', function(e) {
  init++
  if (init < 2) {
    router.beforeEach((to, from, next) => {
      let arr1 = to.path.split('/')
      let arr2 = from.path.split('/')
      if (arr1.length === 2) {
        if (arr1[1].length === 0) {
          arr1.splice(1, 1)
        }
      }
      if (arr2.length === 2) {
        if (arr2[1].length === 0) {
          arr2.splice(1, 1)
        }
      }
      if (arr1.length < arr2.length) {
        router.togoback()
      } else {
        router.togoin()
      }
      next()
    })
  }
}, false)


// Vue.use(Vuex)
Vue.use(VueScroller)

Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});


Vue.config.productionTip = false
FastClick.attach(document.body)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

