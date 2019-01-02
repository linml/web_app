
<template>
  <div>
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
          <p class="cy f3">可用余额</p>
          <p class="cw f4">{{user.balance}}</p>
        </div>
        <div class="balance-r">
          <p class="cy f3">当前积分</p>
          <p class="cw f4">{{user.balance}}</p>
        </div>
      </div>
      <div class="deposit-withdraw">
        <div class="dw-l">
          <span class="shop_icon"><img src="../../assets/imgs/deposit.svg" style="height: 0.4rem; width: 0.4rem; vertical-align:middle;"></span>
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
          <li  v-for="(item,index) in bodylist" :key="index">
            <div class="liimg fl" v-bind:style="{backgroundImage:'url(require(\'' + item.icon + '\'))', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}"></div>
            <p>{{item.title}}</p>
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
import {CODE_OK} from '@/apiconfig/index'

export default {
  data () {
    return {
      tittle: '我的',
      bodylist: [
        {
          title: '投注记录',
          icon: '../../assets/imgs/note-noselect.svg',
          path: ''
        },
        {
          title: '中奖记录',
          icon: '../assets/imgs/note-noselect.svg',
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
  created () {},
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
    .ullist{
      li {
        height: 1.0rem;
        padding: 0 .3rem;
        .liimg{
          margin: 0.1rem;
          width: .8rem;
          height: .8rem;
          float:left;
        }
      }
    }
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
</style>
