<template>
  <div>
    <scroller :on-refresh="refresh" ref="scroller" >
        <swipe class="swipe-wrapper" :auto="5000" v-show="banner_list.length >0 ">
          <swipe-item v-for="(item, k) in banner_list" :key="k" >
            <img :src="item" style="width: 100%;height: 5rem;">
          </swipe-item>
        </swipe>
      <div class="menu">
        <ul>
          <router-link to='/Home/Detail'>
            <li>
              <span><img src="../../assets/imgs/deposit.svg"></span>
              <span>存取款</span>
            </li>
          </router-link>
          <router-link to='/Home/Detail'>
            <li>
              <span><img src="../../assets/imgs/youhui.svg"></span>
              <span>优惠活动</span>
            </li>
          </router-link>
          <router-link to='/Home/Detail'>
            <li>
              <span><img src="../../assets/imgs/zoushi.svg"></span>
              <span>走势</span>
            </li>
          </router-link >
          <router-link to='/Home/Detail'>
            <li>
              <span><img src="../../assets/imgs/wenti.svg"></span>
              <span>常见问题</span>
            </li>
          </router-link>
        </ul>
      </div>
      <div class="shop_container">
        <header class="shop_header">
          <span class="shop_icon"><img src="../../assets/imgs/shop.svg"></span>
          <span class="shop_header_title">彩种</span>
        </header>
      </div>
      <div class="shop_lotto">
        <ul>
          <li class="cellCate fl" v-for="item in lotto_info_list" :key="item.lotto_id">
            <router-link tag="a" :to="/bet/+item.lotto_id">
              <div class="cateImg"><img :src="item.img_url"></div>
              <div class="midbox">
                <p>{{item.name}}</p>
                <p class="label" >{{item.name}}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div>
        -
      </div>
    </scroller>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapState} from 'vuex'
import commonHeader from '@/components/common-header'
import {homeInit} from '@/api/index'
import 'vue-swipe/dist/vue-swipe.css'
// import * as homeApi from 'api/home-api'
// import { ERR_OK } from 'config/index'
export default {
  data () {
    return {
      lotto_info_list: [],
      banner_list: [],
      num: 0
    }
  },
  created () {
    this.refreshHomeInit()
  },
  methods: {
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    todetail () {
      this.$router.togo('/Home/Detail')
    },
    // login() {
    //   let params = {
    //     password: 'gs123456',
    //     storeNo: '',
    //     userName: '17326015487'
    //   }
    //   homeApi.loginUserNo(params).then((res) => {
    //     let {data} = res
    //     if (data.success === ERR_OK) {
    //       alert(data.value.token)
    //     } else {
    //     }
    //   }).catch(() => {
    //   })
    // }
    refreshHomeInit () {
      let params = {}
      homeInit(params).then((res) => {
        let {data} = res
        if (data.code === 0) {
          this.lotto_info_list = data.data.lotto_list
          this.banner_list = data.data.banner_list
        } else {
        }
      }).catch(() => {
      })
    },
    refresh (done) {
      setTimeout(() => {
        this.refreshHomeInit()
        done()
      }, 1000)
    }
  },
  components: {
    commonHeader
  },
  computed: {
    ...mapGetters([
      'number'
    ]),
    ...mapState({
      number: state => state.home.number
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~@/styles/index.less";
@import "~@/styles/variable.less";
.swipe-wrapper {
  width: 100%;
  height: 5rem;
}
.menu{
  width:100%;
  height:1.3rem;
  background:#fff;
  padding:0.2rem 0 0.2rem 0;
}
.menu ul{
  width:100%;
  height:1.3rem;
  font-size:0.35rem;
  transition: .3s linear;
}
.menu li{
  width:25%;
  text-align:center;
  display:inline-block;
  float:left;
}
.menu li span{
  width: 100%;
  height: auto;
  display: block;
  background-repeat: no-repeat;
  background-position: center;
  color: @base-font-color;
}
.menu img{
  width: 0.7rem;
  height: 0.7rem;
}

.shop_container{
  width: 100%;
  height: auto;
  margin-top: 0.2rem;
  background-color: white;
  border-bottom: solid @base-color-gray 0.01rem;
  .shop_header{
    width: 100%;
    height: 0.7rem;
    display:flex;
    align-items:center;
    .shop_icon{
      float:left;
      vertical-align: middle;
      img {
        width: 0.45rem;
        height: 0.45rem;
        vertical-align: middle;
      }
    }
    .shop_header_title{
      /*border: 0.01rem solid red;*/
      margin: 0 0 0 0.1rem;
      float: left;
      vertical-align: middle;
    }
  }
}

.shop_lotto{
  li{
    width: 50%;
    height: 2rem;
    background: white;
    border-bottom: solid @base-color-gray 1px;
    border-right:1px solid #00000;
    display:flex;
    align-items:center;
  }
  .cellCate{
    a{
      /*border: 0.01rem solid green;*/
      width: 100%;
      height: 100%;
      .cateImg{
        width: 40%;
        height: 100%;
        float: left;
        text-align:center;
        display:table-cell;
        vertical-align:middle;
        img{
          /*border: 0.01rem solid red;*/
          /*margin-left: 0.2rem;*/
          width: 1.5rem;
          height: 1.5rem;
          margin-top: 0.25rem;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .midbox{
        height: 100%;
        width: 60%;
        float:left;
        p{
          font-size: 0.4rem;
          text-align: left;
          margin-top: 0.4rem;
          color: @base-font-color;
        }
        .label{
          margin-top: 0.05rem;
          font-size: 0.35rem;
          color:#9c9c9c;
          word-wrap:break-word;
        }
      }
    }
  }
}
.fl{
  float: left;
}
</style>
