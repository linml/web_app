<template>
  <div>
    <common-header :tittle="tittle" :showmore="true" style="z-index: 1000;"></common-header>
    <div>
      <scroller :on-infinite="infinite" ref="my_scroller" class="order-content">
        <div style="height: 1.3333333rem;"></div>
        <ul>
          <li v-for="(item, index) in order_list" :key="index" class="orderCell">
            <router-link tag="a" to='33'>
              <div class="cellInfo">
                <p class="fl" style="font-size: 0.4rem;color: black">{{item.lotto_name}}</p>
                <p class="fl" style="margin-left: 0.2rem;">第{{item.issue}}期</p>
                <p class="fl" style="float: right; color: #d43b3b; font-size: 0.6rem; font-family: arial; font-weight: 100">{{item.amount}}</p>
              </div>
              <div class="cellBetInfo">
                <p class="fl" style="">【{{item.method_name}}】</p>
                <p class="fl" style="">{{item.bet_content}}@{{item.odds}}</p>
                <p class="fr" style="" v-if="item.status === 0"> 未开奖 </p>
                <p class="fr" style="" v-if="item.status === 1"> <span style="color: red">赢</span>{{item.payout}} </p>
                <p class="fr" style="" v-if="item.status === 2"> 未中奖 </p>
              </div>
              <div class="cellBetTime">
                <p class="fl">{{item.bet_time}}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </scroller>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import commonHeader from '@/components/common-header'
import {findLottoOrder} from '@/api/index'
export default {
  data () {
    return {
      query_lotto_id: '',
      query_data: '',
      tittle: '投注记录',
      items: [],
      order_list: []
    }
  },
  components: {
    commonHeader,
    NavBar
  },
  mounted () {
    this.initData()
    for (let i = 1; i <= 20; i++) {
      this.items.push(i + ' - keep walking, be 2 with you.')
    }
    this.top = 1
    this.bottom = 20
    this.queryOrder()
  },
  computed: {
    newdata: function () {
      return this.data + 1
    }
  },
  methods: {
    initData () {
      this.query_lotto_id = this.$route.query.id
    },
    queryOrder () {
      findLottoOrder().then(rsp => {
        console.log(rsp.status)
        if (rsp.status === 200) {
          console.log(rsp.data.data.record_data)
          if (rsp.data.code === 0) {
            this.order_list = rsp.data.data.record_data
          }
        }
      })
    },
    infinite (done) {
      if (this.bottom >= 30) {
        setTimeout(() => {
          done(true)
        }, 1500)
        return
      }

      setTimeout(() => {
        let start = this.bottom + 1
        for (let i = start; i < start + 10; i++) {
          this.items.push(i + ' - keep walking, be 2 with you.')
        }
        this.bottom = this.bottom + 10
        setTimeout(() => {
          done()
        })
      }, 1500)
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
</style>
