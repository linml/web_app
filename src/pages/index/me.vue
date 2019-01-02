
<template>
  <div>
    <div class="account-head">
      <div class="me-info">
        <div>头像</div>
        <div>账户</div>
        <div>设置icon</div>
      </div>
      <div>
        <div>可用余额</div>
        <div>可提余额</div>
      </div>
      <div>
        <div>充值</div>
        <div>提款</div>
      </div>
    </div>
    <div class="account-body">
      <div style="height: 5rem">
        <ul>
          <li  v-for="(item,index) in bodylist" :key="index">
            <img slot="icon" :src="item.icon" width="24" height="24">
            {{item.title}}
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
export default {
  data () {
    return {
      tittle: '我的',
      bodylist: [
        {
          title: '投注记录',
          icon: '../assets/imgs/index-noselect.svg',
          path: ''
        },
        {
          title: '中奖记录',
          icon: '../../assets/imgs/index-noselect.svg',
          path: ''
        }
      ]
    }
  },
  created () {},
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
    width: 100%;
    height: 2rem;
  }
</style>
