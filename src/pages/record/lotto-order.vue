<template>
  <div>
    <common-header
      :tittle="tittle"
      :showordermore="true"
      @ordermorechecked="changeOrderMore"
      style="z-index: 1000;"></common-header>
    <drawer :show="orderMore"
            pos="right"
            tran="overlay"
            @change-show="changeDrawerShow"
            @on-hide="onHide"
            @on-show="onShow">
    <div class="layout" slot="drawer" >
      <mt-datetime-picker
        ref="picker"
        type="date"
        v-model="pickerValue"
        :startDate="start_date"
      >
      </mt-datetime-picker>
      <div class="queryDateDiv" @click="openPicker">
        <p class="fl" style="margin-right: 0.2rem">日期</p>
        <input class="fl dateInput" style="height: 0.8rem;width: 3rem;" v-model="pickerDate"  disabled/>
      </div>
      <div class="queryStatusDiv">
          <p class="tit" style="">状态</p>
          <div>
            <ul>
              <li v-for="(item, index) in order_status_list" :key="index" style="float: left; width: 50%">
                <div class="statusCellDiv">
                  <div class="statusCell" :class="{'active':item.checked}" @click="checkStatus(item)">
                    {{item.name}}
                  </div>
                </div>
              </li>
            </ul>
          </div>
      </div>
      <div class="queryLottoDiv">
        <p class="tit" style="">彩票</p>
        <div class="aaa">
          <ul>
            <li v-for="(item,index) in codeLottoList" :key="index">
              <div class="statusCellDiv">
                <div class="statusCell" :class="{'active':item.checked}" @click="checkCodeLotto(item)">
                  {{item.name}}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="queryFoot">
        <div class="cellbasebet queryfootcancel fl"  v-on:click="cancelOrder1">取消</div>
        <div class="cellbasebet queryfootconfirm fl" v-on:click="queryOrder1">查询</div>
      </div>
    </div>
    <div>
      <scroller :on-infinite="infinite" ref="my_scroller" class="order-content">
        <div style="height: 1.3333333rem;"></div>
        <ul>
          <li v-for="(item, index) in order_list" :key="index" class="orderCell">
            <div @click="orderDetail(item.order_id)">
              <div class="cellInfo">
                <p class="fl" style="font-size: 0.4rem;color: black">{{item.lotto_name}}</p>
                <p class="fl" style="margin-left: 0.2rem;">第{{item.issue}}期</p>
                <p class="fl" style="float: right; color: #d43b3b; font-size: 0.6rem; font-family: arial; font-weight: 100">{{item.amount}}</p>
              </div>
              <div class="cellBetInfo">
                <p class="fl" style="">【{{item.method_name}}】</p>
                <p class="fl" style="">{{item.bet_content}}@{{item.odds}}</p>
                <p class="fr" style="" v-if="item.status === 0"> 未开奖 </p>
                <p class="fr" style="" v-if="item.status === 1"> <span style="color: red">赢</span><b>{{item.payout}}</b> </p>
                <p class="fr" style="" v-if="item.status === 2"> 未中奖 </p>
              </div>
              <div class="cellBetTime">
                <p class="fl">{{item.bet_time}}</p>
              </div>
            </div>
          </li>
        </ul>
      </scroller>
    </div>
    </drawer>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import commonHeader from '@/components/common-header'
import {findLottoOrder, findCodeLottoList} from '@/api/index'
import Drawer from '@/components/drawer'
import DatePicker from 'vue2-datepicker'
import { DatetimePicker } from 'mint-ui'
import {getBeforeDate} from '@/filter/index'

export default {
  data () {
    return {
      pickerValue: new Date(),
      start_date: getBeforeDate(60),
      value1: '',
      query_lotto_id: '',
      query_data: '',
      tittle: '投注记录',
      items: [],
      order_list: [],
      orderMore: false,
      codeLottoList: [],
      order_status: '',
      order_status_list: [
        {
          name: '全部',
          value: '',
          checked: true
        },
        {
          name: '未开奖',
          value: '0',
          checked: false
        },
        {
          name: '中奖',
          value: '1',
          checked: false
        },
        {
          name: '未中奖',
          value: '2',
          checked: false
        }
      ],
      pageQueryOrder: {
        curr_page: 0
      }
    }
  },
  components: {
    commonHeader,
    NavBar,
    Drawer,
    DatePicker,
    DatetimePicker
  },
  mounted () {
    this.initData()
    // this.queryOrder()
    this.refreshCodeLottoList()
  },
  computed: {
    newdata: function () {
      return this.data + 1
    },
    pickerDate: function () {
      let date = this.pickerValue
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let s = year + '/' + (month < 10 ? ('0' + month) : month) + '/' + (day < 10 ? ('0' + day) : day)
      return s
    },
    gBetDate: function () {
      let date = this.pickerValue
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let s = year + '' + (month < 10 ? ('0' + month) : month) + '' + (day < 10 ? ('0' + day) : day)
      return s
    }
  },
  methods: {
    initData () {
      this.query_lotto_id = this.$route.query.lotto_id
      this.order_status = this.$route.query.status
    },
    refreshCodeLottoList () {
      findCodeLottoList().then(rsp => {
        this.codeLottoList = rsp.data.data
      })
    },
    orderDetail (orderId) {
      this.$router.push('/record/lotto/order/detail?order_id=' + orderId)
    },
    queryOrder1 () {
      this.orderMore = false
      this.order_list = []
      this.pageQueryOrder.curr_page = 0
      this.infinite(false)
    },
    checkStatus (item) {
      for (var i = 0; i < this.order_status_list.length; i++) {
        this.order_status_list[i].checked = false
      }
      item.checked = !item.checked
      this.order_status = item.value
    },
    checkCodeLotto (item) {
      if (item.checked === true) {
        item.checked = !item.checked
        this.query_lotto_id = ''
        return
      }
      for (var i = 0; i < this.codeLottoList.length; i++) {
        if (typeof this.codeLottoList[i].checked === 'undefined') {
          this.$set(this.codeLottoList[i], 'checked', false)
        }
        this.codeLottoList[i].checked = false
      }
      item.checked = !item.checked
      this.query_lotto_id = item.lotto_id
    },
    cancelOrder1 () {
      this.orderMore = false
    },
    onHide () {
      console.log('hide')
    },
    changeDrawerShow (state) {
      this.orderMore = state
      console.log('drawer was changed from components')
    },
    onShow () {
      console.log('show')
    },
    changeOrderMore () {
      this.orderMore = !this.orderMore
    },
    openPicker () {
      this.$refs.picker.open()
    },
    queryOrder () {
      let params = {}
      params.bet_date = this.gBetDate
      if (this.order_status !== '') {
        params.status = this.order_status
      }
      if (this.query_lotto_id !== '') {
        params.lotto_id = this.query_lotto_id
      }
      findLottoOrder(params).then(rsp => {
        if (rsp.status === 200) {
          console.log(rsp.data.data.record_data)
          if (rsp.data.code === 0) {
            this.order_list = rsp.data.data.record_data
          }
        }
      })
    },
    infinite (done) {
      console.log('333333')
      let params = {}
      params.bet_date = this.gBetDate
      if (this.order_status !== '') {
        params.status = this.order_status
      }
      if (this.query_lotto_id !== '') {
        params.lotto_id = this.query_lotto_id
      }
      params.curr_page = this.pageQueryOrder.curr_page + 1
      findLottoOrder(params).then(rsp => {
        if (rsp.status === 200) {
          if (rsp.data.code === 0) {
            for (var i = 0; i < rsp.data.data.record_data.length; i++) {
              this.order_list.push(rsp.data.data.record_data[i])
            }
            // this.order_list.concat(rsp.data.data.record_data)
            this.pageQueryOrder.curr_page = rsp.data.data.current_page
            if (rsp.data.data.page_row > rsp.data.data.page_count || rsp.data.data.page_count === 0) {
              done(true)
            } else {
              done()
            }
          }
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "~@/styles/index.less";
  @import "~@/styles/variable.less";
  .order-content {
    background-color: @base-color-white;
    /*height: 90%;*/
  }
  .orderCell {
    display: block;
    padding: 0.2rem 0.3rem;
    height: 2.0rem;
    line-height: 2.0rem;
    border-bottom: .02069rem solid #eee;
    background-color: @base-color-white;
    .cellInfo {
      height: 0.7rem;
      width: 100%;
      p {
        height: 0.7rem;
        line-height: 0.7rem;
      }
    }
    .cellBetInfo {
      height: 0.7rem;
      width: 100%;
      p {
        height: 0.7rem;
        line-height: 0.7rem;
      }
    }
    .cellBetTime {
      height: 0.7rem;
      width: 100%;
      p {
        height: 0.7rem;
        line-height: 0.7rem;
      }
    }
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .layout{
    width: 6rem;
    .mt(100)
  }
  .queryDateDiv {
    height: 1rem;
    padding: 0.2rem;
    line-height: 1rem;
    text-align: center;
    .dateInput {
      border: solid black 0.02rem;
      height: 0.8rem;
      line-height: 1rem;
      width: auto;
      text-align: center;
      border-radius: 5px;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .queryStatusDiv {
    height: 3rem;
    padding: 0.2rem;
    text-align: center;
  }
  .queryLottoDiv {
    padding: 0.2rem;
    text-align: center;
    .aaa {
      overflow: hidden;
      /*max-height: calc(100% - 10.2rem);*/
      /*max-height: -webkit-calc(100% - 10.2rem);*/
      max-height: 9rem;
      display: inline-block;
      width: 100%;
      min-height: .6rem;
      overflow-y: scroll;
    }
  }
  .queryFoot {
    position: fixed;
    left: 0.0rem;
    bottom: 0.0rem;
    width: 100%;
    height: 1.3rem;
    background: @tab-general-bg-color;
    border-top: solid @base-color-gray 0.01rem;
    display: block;
  }
  .queryfootconfirm {
    width: 50%;
    background: @base-color;
    color: @base-color-white;
  }
  .queryfootcancel {
    width: 50%;
  }
  .cellbasebet{
    height: 100%;
    float: left;
    line-height: 1.3rem;
    text-align: center;
    border-right: solid @base-color-gray 1px;
    box-sizing: border-box;
    font-size: 0.4rem;
  }
  .tit {
    text-align: left;
    margin-right: 0.2rem;
    line-height: 0.8rem;
    height: 0.8rem;
  }
  .statusCellDiv {
    height: 0.8rem;
    padding: 0.1rem;
    line-height: 0.8rem;
    width: 95%;
    float: left;
  }
  .statusCell {
    border: solid #ededed 1px;
  }
  .active{
    border: solid red 1px !important;
  }
</style>
