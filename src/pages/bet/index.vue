<template>
  <div>
    <drawer :show="drawerShow"
            pos="left"
            tran="overlay"
            @change-show="changeDrawerShow"
            @on-hide="onHide"
            @on-show="onShow">
      <div class="layout" slot="drawer" >
        <div>走势</div>
        <div>图</div>
      </div>
    <div class="this-page">
      <common-header headertype="methodgroup"
                     :showmore="true"
                     :mglist="methodGroupList"
                     :currgroup="currMethodGroup"
                     :aaa="33334444"
                     @currGroupInfoClicked="currGroupInfoClicked"></common-header>
      <div class="issue_info">
        <div class="info">
          <div class="iline">
            <p class="fztitle">{{lotto_info.name}}</p>
            <p class="fzlabel">{{curr_issue_info.issue}}期</p>
          </div>
          <div class="iline">
            <p class="fzlabel">今日输赢:0</p>
            <p class="fzlabel">开奖时间:{{result_time}}</p>
          </div>
        </div>
        <div class="countdown">
          <div class="fzlabel">距截止下注</div>
          <div class="ct">
            <div class="col3 hour">{{ common_count_down.hr }}</div>
            <div class="ml">:</div>
            <div class="col3 minute">{{ common_count_down.min }}</div>
            <div class="ml">:</div>
            <div class="col3 second">{{ common_count_down.sec }}</div>
          </div>
        </div>
      </div>
      <div class="result_info">
        <div class="result_title fzlabel" v-if="last_issue_info.issue">{{last_issue_info.issue}}期开奖</div>
        <div class="result_title fzlabel" v-else>暂无开奖</div>
        <div class="result_number" v-if="last_issue_info.num">
          <span class="prizenum" v-for="(item,k) in last_issue_info.num" :key="k">
            {{item}}
          </span>
        </div>
        <div v-else></div>
      </div>
      <div class="play_area">
        <div style="margin-bottom: 6rem">
          <div class="method_item" v-for="(playInfo,index) in curr_method_group_play.method_items" :key="index">
            <div class="method_tile" >
              {{playInfo.method_name}}
            </div>
            <div class="method_content">
              <ul>
                <li @click="playactive(oddsInfo)"
                    v-for="(oddsInfo, jk) in playInfo.play_items"
                    :key="jk">
                  <div class="odds_content" :class="{'active':oddsInfo.checked}">
                    <p>{{oddsInfo.play_name}}</p>
                    <p style="color: red">{{oddsInfo.odds}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>end</div>
      <div class="bet_area_info">
          <div class="cellbasebet qingkongx" v-on:click="cleanAll">清空选项</div>
          <div class="cellbasebet zoushi"  v-on:click="drawerToggle">走势</div>
          <div class="cellbasebet lengre"  v-on:click="drawerToggle">冷热排行</div>
          <div class="cellbasebet xiazhu" v-on:click="bet">下注</div>
      </div>
    </div>
    <div class="bet_confirm_box" v-if="show_bet_confirm">
      <div class="bet_confirm_main">
        <div class="bet_confirm_header">下注订单</div>
        <div style="margin-top: 1.0rem; background-color: red; color: white">
          <ul>
            <li class="bet_li">
              <p class="li_p_1 fl">【玩法】</p>
              <p class="li_p_2 fl">赔率</p>
              <p class="li_p_3 fl">金额</p>
            </li>
          </ul>
        </div>
        <div class="bet_confirm_content">
          <div style="margin-bottom: 1rem;margin-top: 0.1rem">
            <ul>
              <li class="bet_li" v-for="(item,index) in bet_confirm_data" :key="index">
                <p class="li_p_1 fl">【{{item.method_name}}-{{item.play_name}}】</p>
                <p class="li_p_2 fl">{{item.play_code}}@<strong style="color: red">{{item.odds}}</strong></p>
                <p class="li_p_3 fl"><input class="p_3_input" v-model="item.amount" /></p>
              </li>
            </ul>
          </div>
        </div>
        <div class="bet_confirm_footer">
          <div class="bet_confirm_cancel" v-on:click="close_bet_confirm">取消</div>
          <div class="bet_confirm_ok" v-on:click="bet_confirm">确认</div>
        </div>
      </div>
     </div>
    </drawer>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import commonHeader from '@/components/common-header'
import {getBetPlayInfo, getCurrIssue, betConfirm} from '@/api/index'
import {str2fromttime} from '@/filter/index'
import Drawer from '@/components/drawer'
import { CODE_NOT_LOGIN, CODE_LOGIN_EXPIRED } from '@/apiconfig/index'
export default {
  data () {
    return {
      tittle: '',
      curr_issue_info: {},
      last_issue_info: {},
      lotto_info: {},
      lotto_id: 0,
      common_count_down: {
        hr: 0,
        min: 0,
        sec: 0
      },
      cdTimer: null,
      drawerShow: false,
      currMethodGroup: {
        group_name: '暂无数据'
      },
      methodGroupList: [],
      method_group_play_list: [],
      curr_method_group_play: {}, // 当前玩法组玩法
      show_bet_confirm: false, // 是否显示提交订单
      bet_confirm_data: [] // 选中订单
    }
  },
  created () {
    this.lotto_id = this.$route.params.id
    console.log(this.lotto_id)
    this.refreshBetPlayInfo(this.run_stop_time_count_down)
  },
  components: {
    commonHeader,
    Drawer
  },
  mounted: function () {
  },
  beforeDestroy () {
    clearTimeout(this.cdTimer)
  },
  computed: {
    result_time: function () {
      let that = this
      if (!that.curr_issue_info.result_time) return ''
      let h = that.curr_issue_info.result_time.substring(8, 10)
      let m = that.curr_issue_info.result_time.substring(10, 12)
      let s = that.curr_issue_info.result_time.substring(12, 14)
      return h + ':' + m + ':' + s
    }
  },
  methods: {
    close_bet_confirm: function () {
      this.show_bet_confirm = false
    },
    playactive: function (item) {
      if (typeof item.checked === 'undefined') {
        this.$set(item, 'checked', true)
      } else {
        item.checked = !item.checked
      }
    },
    currGroupInfoClicked: function (currInfo) {
      this.currMethodGroup = currInfo
    },
    run_stop_time_count_down () {
      let endTime = this.curr_issue_info.stop_time
      this.countdown(endTime, this.run_close_time_count_down)
    },
    run_close_time_count_down () {
      let endTime = this.curr_issue_info.result_time
      this.countdown(endTime, this.run_get_curr_issue_info)
    },
    run_get_curr_issue_info () {
      getCurrIssue({lotto_id: this.lotto_id}).then((res) => {
        let {data} = res
        if (data.code === 0) {
          this.curr_issue_info = data.data
          this.run_stop_time_count_down()
        } else {
          console.log(data.msg)
        }
      }).catch(() => {
      })
    },
    refreshBetPlayInfo (callback) {
      getBetPlayInfo({lotto_id: this.lotto_id}).then((res) => {
        let {data} = res
        if (data.code === 0) {
          this.lotto_info = data.data.lotto_info
          this.curr_issue_info = data.data.curr_issue
          this.last_issue_info = data.data.last_issue
          this.methodGroupList = data.data.method_group
          if (this.methodGroupList) {
            this.currMethodGroup = this.methodGroupList[0]
          }
          this.method_group_play_list = data.data.method_group_play
          if (typeof callback === 'function') {
            callback()
          }
        } else {
          console.log(data.msg)
        }
      }).catch(() => {
      })
    },
    countdown: function (endTime, callback) {
      let tf = str2fromttime(endTime)
      // MessageBox('Notice', tf)
      const end = Date.parse(new Date(tf))
      const now = Date.parse(new Date())
      const msec = end - now
      // MessageBox('Notice', end + '-' + now)
      // if (msec > 0) {
      //   MessageBox('Notice', end)
      // }
      // let day = parseInt(msec / 1000 / 60 / 60 / 24)
      // console.log(end, now)
      let hr = parseInt(msec / 1000 / 60 / 60)
      let min = parseInt(msec / 1000 / 60 % 60)
      let sec = parseInt(msec / 1000 % 60)
      // this.day = day
      this.hr = hr > 9 ? hr : '0' + hr
      this.min = min > 9 ? min : '0' + min
      this.sec = sec > 9 ? sec : '0' + sec
      this.common_count_down.hr = this.hr
      this.common_count_down.min = this.min
      this.common_count_down.sec = this.sec
      if (msec <= 0) {
        clearTimeout(this.cdTimer)
        if (typeof callback === 'function') {
          callback()
        }
        console.log('结束')
        return
      }
      let that = this
      this.cdTimer = setTimeout(function () {
        that.countdown(endTime, callback)
      }, 1000)
    },
    refresh_curr_issue: function (callback) {
      getCurrIssue({lotto_id: this.lotto_id}).then((res) => {
        let {data} = res
        if (data.code === 0) {
          this.curr_issue_info = data.data
          if (typeof callback === 'function') {
            callback()
          }
        } else {
          console.log(data.msg)
        }
      }).catch(() => {
      })
    },
    drawerToggle () {
      this.drawerShow = !this.drawerShow
    },
    bet () {
      this.show_bet_confirm = true
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
    cleanAll () {
      for (var i = 0; i < this.curr_method_group_play.method_items.length; i++) {
        for (var j = 0; j < this.curr_method_group_play.method_items[i].play_items.length; j++) {
          this.$set(this.curr_method_group_play.method_items[i].play_items[j], 'checked', false)
        }
      }
    },
    bet_confirm () {
      var params = {
        lotto_id: this.lotto_id,
        issue: this.curr_issue_info.issue
      }
      var bets = []
      for (var i = 0; i < this.bet_confirm_data.length; i++) {
        bets.push({
          method_code: this.bet_confirm_data[i].method_code,
          play_code: this.bet_confirm_data[i].play_code,
          bet_content: this.bet_confirm_data[i].play_code,
          amount: this.bet_confirm_data[i].amount
        })
      }
      params.bets = JSON.stringify(bets)
      betConfirm(params).then(rsp => {
        if (rsp.status === 200) {
          if (rsp.data.code === 0) {
            MessageBox('提示', rsp.data.msg || '下单成功')
            this.show_bet_confirm = false
          } else if (rsp.data.code === CODE_NOT_LOGIN || rsp.data.code === CODE_LOGIN_EXPIRED) {
            MessageBox.confirm(rsp.data.msg || '登录', '登录', {confirmButtonText: '去登录'}).then(action => {
              this.$router.push('/login')
            })
          } else {
            MessageBox('提示', rsp.data.msg || '网络异常')
          }
        } else {
          MessageBox('提示', '网络异常')
        }
      }).catch((error) => { console.log(error) })
    }
  },
  watch: {
    currMethodGroup: function () {
      if (this.method_group_play_list.length > 0) {
        for (var i = 0; i < this.method_group_play_list.length; i++) {
          if (this.method_group_play_list[i].group_id === this.currMethodGroup.group_id) {
            this.curr_method_group_play = this.method_group_play_list[i]
          }
        }
      }
    },
    show_bet_confirm: function () {
      this.bet_confirm_data = []
      for (var i = 0; i < this.curr_method_group_play.method_items.length; i++) {
        for (var j = 0; j < this.curr_method_group_play.method_items[i].play_items.length; j++) {
          if (this.curr_method_group_play.method_items[i].play_items[j].checked === true) {
            this.$set(this.curr_method_group_play.method_items[i].play_items[j], 'amount', 1)
            this.bet_confirm_data.push(this.curr_method_group_play.method_items[i].play_items[j])
          }
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "~@/styles/index.less";
  @import "~@/styles/variable.less";
  .issue_info{
    width: 100%;
    height: 1.5rem;
    background: @base-color-white;
    font-size: 0.4rem;
    border-bottom: solid @base-color-gray 0.01rem;
    .info{
      padding: 0.2rem;
      float: left;
      height: 1.1rem;
      width: 62%;
      border-right: solid @base-color-gray 0.01rem;
      /*border: 0.01rem solid red;*/
      .iline{
        height: 50%;
        width: 100%;
        vertical-align:middle;
        margin-bottom:0.1rem;
        p{
          height: 100%;
          width: 50%;
          float: left;
          text-align: left;
          color: @base-font-color;
          display: table-cell;
          vertical-align: middle;
        }
      }
    }
    .countdown{
      float: right;
      height: 100%;
      width: 33.5%;
      /*border: 0.01rem solid red;*/
      .ctitle{
        width: 100%;
        height: 0.5rem;
      }
      .ct{
        margin-left: 0.4rem;
        margin-top: 0.1rem;
        width: 100%;
        height: 1.0rem;
        float: left;
        display: block;
        .col3 {
          float: left;
          width: 0.7rem;
          height: 0.7rem;
          background: #222;
          background-image: -webkit-linear-gradient(top, #222, #333, #333, #333);
          /*background-image: linear-gradient(top, #222, #333, #333, #222);*/
          border-radius: 5px;
          font-size: 0.5rem;
          color: #fff;
          line-height: 0.7rem;
          text-align: center;
        }
        .ml{
          float: left;
          margin-left: 1%;
          margin-right: 1%;
          text-align: center;
        }
      }
    }
  }
  .result_info{
    /*border: 0.01rem solid green;*/
    width: 100%;
    height: 1.8rem;
    background: @base-color-white;
    border-bottom: solid @base-color-gray 0.01rem;
    .result_title{
      margin-left: 0.2rem;
      margin-top: 0.15rem;
      /*border: 0.01rem solid green;*/
      width: 100%;
      height: 0.5rem;
      float: left;
      text-align: left;
      color: @base-font-color;
    }
    .result_number{
      width: 100%;
      height: 1.0rem;
      margin-left: 0.2rem;
      margin-top: 0.15rem;
      float: left;
      text-align: left;
      .prizenum{
        display: block;
        border-radius: 50%;
        width: 0.7rem;
        height: 0.7rem;
        background: @base-color;
        color: @base-color-white;
        line-height: 0.7rem;
        text-align: center;
        float: left;
        margin-right: 0.1rem;
        font-size: 0.4rem;
      }
    }
  }
  .bet_area_info{
    /*border: 0.01rem solid red;*/
    position: fixed;
    left: 0.0rem;
    bottom: 0.0rem;
    width: 100%;
    height: 1.3rem;
    background: @tab-general-bg-color;
    border-top: solid @base-color-gray 0.01rem;
    display: block;
    .cellbasebet{
      height: 100%;
      float: left;
      line-height: 1.3rem;
      text-align: center;
      border-right: solid @base-color-gray 1px;
      box-sizing: border-box;
      font-size: 0.4rem;
    }
    .qingkongx{
      width: 25%;
    }
    .zoushi{
      width: 20%;
    }
    .lengre{
      width: 25%;
    }
    .xiazhu{
      width: 30%;
      border-right: solid @base-color-gray 0.0rem;
      background: @base-color;
      color: @base-color-white;
    }
  }
  .fzlabel{
    font-size: 0.32rem;
  }
  .fztitle{
    font-size: 0.43rem;
  }
  .layout{
    width: 8rem;
  }
  .play_area{
    /*border: 0.01rem solid red;*/
    width: 100%;
    height: 100%;
    /*margin-bottom: 6rem;*/
    overflow-y: scroll;

    .method_item{
      width: 100%;
      /*overflow-y: scroll;*/
      .method_tile{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-size: 0.4rem;
        background: @base-color-white;
        background-image: -webkit-linear-gradient(top,#FFF,#F2F2F2);
        border-top: solid #ededed 1px;
        border-bottom: solid #dedede 1px;
      }
      .method_content{
        width: 100%;
        background: #fff;
        margin: 0;
        padding: 0;
        display: block;
        overflow:hidden;
        li{
          float: left;
          width: 20%;
          margin-top: 0.2rem;
          margin-bottom: 0.2rem;
          height: 1.1rem;
          line-height: 0.55rem;
          font-size: 0.32rem;
          margin-left: 4%;
        }
        .active{
          border: solid red 1px !important;
        }
        .odds_content{
          width: 100%;
          height: 100%;
          text-align: center;
          border: solid #ededed 1px;
        }
      }

    }
  }
  .this-page{
    width: 100%;
    height: 100%;
    .mt(100);
    /*overflow-x: hidden;*/
    /*overflow-y: scroll;*/
  }
  .bet_confirm_box {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    /*color: #fff;*/
    box-sizing: border-box;
    text-align: center;
    z-index: 9999;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0.04rem 0.3rem;
    font-size: 0.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bet_confirm_main {
    /*height: 100%;*/
    width: 100%;
    min-height: 10rem;
    max-height: 10rem;
    /*padding: 0 0.2rem;*/
    color: @base-font-color;
    background: @base-color-white;
    transform: translate3d(0,0,0);
    border-radius: 5px;
    .bet_confirm_header{
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      font-size: .45rem;
      text-align: center;
      /*padding: .2rem;*/
      position: fixed;
      border-bottom: 1px solid #dcdcdc;
    }
    .bet_confirm_content{
      /*margin-top: 1.2rem;*/
      margin-bottom: 1.2rem;
      width: 100%;
      /*height: 100%;*/
      height: 8rem;
      /*margin-top: 1rem;*/
      overflow-y: scroll;
    }
    .bet_confirm_footer{
      width: 100%;
      height: 1rem;
      font-size: .45rem;
      text-align: center;
      left: 0.0rem;
      bottom: 0.0rem;
      display: block;
      position: fixed;
      /*padding: .2rem;*/
      border-top: 1px solid #dcdcdc;
      .bet_confirm_cancel{
        line-height: 1rem;
        width: 50%;
        height: 100%;
        float: left;
        background: white;
        border-bottom-left-radius: 5px;
      }
      .bet_confirm_ok{
        line-height: 1rem;
        width: 50%;
        height: 100%;
        float: right;
        color: white;
        background: @base-color;
        border-bottom-right-radius: 5px;
      }
    }
  }
  .bet_li{
    margin: 0 0.4rem;
    /*width: 100%;*/
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    border-bottom: 1px solid #dcdcdc;
    .li_p_1{
      height: 100%;
      width: 40%;
    }
    .li_p_2{
      height: 100%;
      width: 20%;
    }
    .li_p_3{
      height: 100%;
      width: 30%;
      .p_3_input{
        width: 80%;
        height: 80%;
        text-align: center;
        background: #fff;
        color: #333;
        border: 1px solid #686868;
      }
    }
  }
  .fl{
    float: left;
  }
</style>
