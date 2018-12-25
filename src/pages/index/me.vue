
<template>
  <div>
    <drawer :show="drawerShow"
            :pos="pos"
            :tran="tran"
            @change-show="changeDrawerShow"
            @on-hide="onHide"
            @on-show="onShow">
      <div class="layout" slot="drawer" >
        <div>走势图</div>
        <div>数据</div>
      </div>
      <div class="page-content">
        <button v-on:click="drawerToggle">toggle</button>
      </div>
    </drawer>
    <div class="page-content">
      <button v-on:click="drawerToggle">toggl33e</button>
    </div>
    <!--<common-header :tittle="tittle" :showback="false"></common-header>-->
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
      num: 0,
      pos: 'left',
      tran: 'overlay',
      drawerShow: false,
      navItems: [
        'decide the width u like',
        'Item2',
        'Item3',
        'Item4',
        'Item5'
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

.layout{
  width: 7rem;
}
button, input[type="button"], a.button {
  color: #fff;
  background-color: #3779d0;
  border: 0;
  font-size: 14px;
  border-radius: 4px;
  padding: 0px 8px;
  height: 40px;
  min-width: 40px;
  line-height: 40px;
  overflow: hidden;
  display: inline-block;
  outline: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  -webkit-transition: all;
  -moz-transition: all;
  transition: all;
  -webkit-transition-timing-function: linear;
  -moz-transition-timing-function: linear;
  transition-timing-function: linear;
  -webkit-transition-duration: .2s;
  -moz-transition-duration: .2s;
  transition-duration: .2s;
}
button:active{
  color: #fff;
  background-color: #377000;
}
</style>
