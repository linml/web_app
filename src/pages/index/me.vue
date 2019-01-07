
<template>
  <div style="overflow-y: scroll">
    <div class="account-head">
      <div class="me-info">
        <div class="me"></div>
        <div class="me-account">
          <p style="text-align: left"> <strong>{{user.name}}</strong></p>
          <p style="text-align: left;">ID: {{user.user_id}}</p>
        </div>
        <div>
          <img src="../../assets/imgs/settings.svg" style="height: 0.8rem; width: 0.8rem; vertical-align:middle;">
        </div>
      </div>
      <div class="balance-info">
        <div class="balance-l">
          <div class="dw-l">
            <span class="shop_icon"><img src="../../assets/imgs/coin.svg" style="height: 0.4rem; width: 0.4rem; vertical-align:middle;"></span>
            <span class="cy f3">余额</span>
          </div>
          <p class="cw f4">{{user.balance}}</p>
        </div>
        <div class="balance-r">
          <div class="dw-l">
            <span class="shop_icon"><img src="../../assets/imgs/coin.svg" style="height: 0.4rem; width: 0.4rem; vertical-align:middle;"></span>
            <span class="cy f3">积分</span>
          </div>
          <p class="cw f4">{{user.balance}}</p>
        </div>
      </div>
      <div class="deposit-withdraw">
        <div class="dw-l">
          <span class="shop_icon"><img src="../../assets/imgs/cunkuan.svg" style="height: 0.4rem; width: 0.4rem; vertical-align:middle;"></span>
          <span>充值</span>
        </div>
        <div class="dw-r">
          <span class="shop_icon"><img src="../../assets/imgs/withdraw.svg" style="height: 0.4rem; width: 0.4rem; vertical-align:middle;"></span>
          <span>提款</span>
        </div>
      </div>
    </div>
    <div class="account-body">
      <div>
        <ul class="ullist">
          <li v-for="(item, index) in bodylist" :key="index">
            <router-link tag="a" :to="item.path">
              <div class="my-cell">
                <div class="leftbox llll" :class="item.icon"></div>
                <!--<div class="leftbox"><img class="myimg" src="../../assets/imgs/tzjl.svg"></div>-->
                <div class="midbox"><p class="midtitle">{{item.title}}</p></div>
                <div class="rightbox">
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapState} from 'vuex'
import commonHeader from '@/components/common-header'
import Drawer from '@/components/drawer.vue'
import {infos} from '@/api/index'
import {CODE_OK, CODE_NOT_LOGIN, CODE_LOGIN_EXPIRED} from '@/apiconfig/index'
import { MessageBox } from 'mint-ui'

export default {
  data () {
    return {
      tittle: '我的',
      bodylist: [
        {
          title: '投注记录',
          icon: 'tzjl',
          path: '/record/lotto/order'
        },
        {
          title: '中奖记录',
          icon: 'zjjl',
          path: 'record/lotto/order?status=1'
        },
        {
          title: '充值记录',
          icon: 'czjl',
          path: ''
        },
        {
          title: '取款记录',
          icon: 'qkjl',
          path: ''
        },
        {
          title: '客服',
          icon: 'kf',
          path: ''
        },
        {
          title: '分享',
          icon: 'fx',
          path: ''
        },
        {
          title: '更多',
          icon: 'gd',
          path: ''
        }
      ],
      user: {
        name: '--',
        id: '--',
        balance: '--'
      }
    }
  },
  created () {
    this.refreshInfos()
  },
  mounted () {
    this.refreshInfos()
  },
  methods: {
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    todetail () {
      this.$router.togo('/Home/Detail')
    },
    directionFlip () {
      this.pos = this.pos === 'left' ? 'right' : 'left'
      setTimeout(() => {
        this.drawerToggle()
      }, 500)
    },
    tranFlip () {
      this.tran = this.tran === 'overlay' ? 'push' : 'overlay'
      setTimeout(() => {
        this.drawerToggle()
      }, 0)
    },
    drawerToggle () {
      this.drawerShow = !this.drawerShow
    },
    onHide () {
      console.log('hide')
    },
    changeDrawerShow (state) {
      this.drawerShow = state
      console.log('drawer was changed from components')
    },
    onShow () {
      console.log('show')
    },
    refreshInfos () {
      infos().then(rsp => {
        if (rsp.status === 200) {
          if (rsp.data.code === CODE_OK) {
            this.user = rsp.data.data
          } else if (rsp.data.code === CODE_NOT_LOGIN) {
            // MessageBox.alert('请先登录')
            this.$router.push('/login')
          } else if (rsp.data.code === CODE_LOGIN_EXPIRED) {
            // MessageBox.alert('请重新登录')
            this.$router.push('/login')
          } else {
            MessageBox.alert(rsp.data.msg || '请求失败')
          }
        } else {}
      })
    }
  },
  components: {
    commonHeader,
    Drawer
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

.account-head{
  width: 100%;
  height: 5rem;
  background: @base-color;
}
  .account-body{
    width: 100%;
    height: 100%;
    background: white;
    margin-top: 0.1rem;
  }
  .me-info{
    /*width: 100%;*/
    height: 1.4rem;
    padding: 0.3rem;
    align-items:center;
    display:flex;
    border-bottom: solid brown 0.01rem;
    .me{
      /*width: 30%;*/
      width: 1.2rem;
      height: 1.2rem;
      display: inline-block;
      background-size: cover;
      float: left;
      vertical-align: middle;
      background-image: url("../../assets/imgs/me.svg");
    }
    .me-account {
      width: 80%;
      margin-left: 0.2rem;
      color: white;
      font-size: 0.4rem;
      float: left;
    }
  }
  .balance-info {
    height: 1.2rem;
    padding: 0.2rem;
    align-items:center;
    display:flex;
    /*border-bottom: solid brown 0.01rem;*/
    .balance-l {
      width: 50%;
    }
    .balance-r {
      width: 50%;
    }
  }
  .cy{
    color: yellow;
  }
  .cw{
    color: white;
  }
  .f3{
    font-size: 0.3rem;
  }
.f4{
  font-size: 0.4rem;
}
  .coin{
    width: 0.4rem;
    height: 0.5rem;
    background-size: cover;
    background-image: url("../../assets/imgs/coin.svg");
  }
  .deposit-withdraw{
    height: 1.0rem;
    padding: 0.2rem;
    align-items:center;
    display:flex;
    background: #de0909;
    .dw-l {
      width: 50%;
      color: white;
    }
    .dw-r {
      width: 50%;
      color: white;
    }
  }
.ullist{
  li {
    height: 1.1rem;
    padding: 0 .3rem;
    /*border: 0.01rem solid green;*/
    align-items:center;
    border-bottom: solid #ededed 1px;
  }
  .my-cell{
    height: 1.1rem;
    line-height: 1.1rem;
    /*border: 0.01rem solid red;*/
    text-align: center;
    .leftbox {
      width: 1rem;
      height: 1.1rem;
      line-height: 1.1rem;
      float: left;
      text-align: center;
      .myimg {
        /*line-height: 1.0rem;*/
        height: 0.6rem;
        width: 0.6rem;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .midbox {
      width: 60%;
      float: left;
      margin-left: 0.3rem;
      .midtitle {
        float: left;
        font-size: 0.39rem;
        color: black;
      }
    }
    .rightbox {
      width: 10%;
      float: left;
      .arrow-icon{
        background-image: url("../../assets/imgs/tzjl.svg");
      }
    }
  }
}

.llll{
  height: 1.1rem;
  line-height: 1.1rem;
  display: inline-block;
  vertical-align: middle;
  background-size: 0.6rem;
  background-repeat: no-repeat;
  background-position: center;
}

.tzjl{
  background-image: url("../../assets/imgs/tzjl.svg");
}
.zjjl{
  background-image: url("../../assets/imgs/zjjl.svg");
}
.czjl{
  background-image: url("../../assets/imgs/czjl.svg");
}
.qkjl{
  background-image: url("../../assets/imgs/qkjl.svg");
}
.kf{
  background-image: url("../../assets/imgs/kf.svg");
}
.fx{
  background-image: url("../../assets/imgs/share.svg");
}
.gd{
  background-image: url("../../assets/imgs/gd.svg");
}
</style>
