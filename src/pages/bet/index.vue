<template>
  <div>
    <common-header :tittle="tittle" :showmore="true"></common-header>
    <div class="page-content">
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
      <div class="content"></div>
      <div class="bet_area_info">
          <div class="cellbasebet qingkongx">清空选项</div>
          <div class="cellbasebet zoushi">走势</div>
          <div class="cellbasebet lengre">冷热排行</div>
          <div class="cellbasebet xiazhu">下注</div>
      </div>
    </div>
  </div>
</template>

<script>
import commonHeader from '@/components/common-header'
import {getBetPlayInfo, getCurrIssue} from '@/api/index'
import {str2fromttime} from '@/filter/index'
export default {
  data () {
    return {
      tittle: '下单',
      curr_issue_info: {},
      last_issue_info: {},
      lotto_info: {},
      lotto_id: 0,
      common_count_down: {
        hr: 0,
        min: 0,
        sec: 0
      },
      cdTimer: null
    }
  },
  created () {
  },
  components: {
    commonHeader
  },
  mounted: function () {
    this.lotto_id = this.$route.params.id
    console.log(this.lotto_id)
    this.refreshBetPlayInfo(this.run_stop_time_count_down)
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
      const end = Date.parse(new Date(tf))
      const now = Date.parse(new Date())
      const msec = end - now
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
    display: block;
    .cellbasebet{
      height: 100%;
      float: left;
      line-height: 1.3rem;
      text-align: center;
      border-right: solid @base-color-gray 0.01rem;
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
</style>
