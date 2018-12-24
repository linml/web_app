<template>
  <div>
    <div>
      <common-header :tittle="tittle" :showback="false"></common-header>
    </div>
    <div class="page-content">
      <scroller class="page-content" :on-refresh="refresh" ref="scroller" >
        <ul style="padding: 0 0 1rem 0;">
          <li v-for="item in lottoInfoList" :key="item.lotto_id">
            <router-link tag="a" :to="/bet/+item.lotto_id">
              <div class="cell-container">
                <div class="leftbox">
                  <img :src="item.img_url">
                </div>
                <div class="midbox fl">
                  <p class="fontcolor1">{{item.name}} </p>
                  <p class="label" v-if="item.issue !== ''">第{{item.issue}}期</p>
                  <p class="label" v-else>暂无期号</p>
                </div>
                <div class="rightbox">
                  <i class="mint-cell-allow-right"></i>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </scroller>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapState} from 'vuex'
import commonHeader from '@/components/common-header'
import {findHallLotto} from '@/api/index'
export default {
  data () {
    return {
      tittle: '大厅',
      lottoInfoList: [],
      navList: [
        {
          'path': '/home',
          'name': '首页'
        },
        {
          'path': '/hall',
          'name': '大厅'
        },
        {
          'path': '/footprints',
          'name': '开奖'
        },
        {
          'path': '/me',
          'name': '我的'
        }
      ]
    }
  },
  created () {
    this.refreshHallLotto()
  },
  mounted () {
  },
  methods: {
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    mescrollInit (mescroll) {
    },
    todetail () {
      this.$router.togo('/Home/Detail')
    },
    refreshHallLotto () {
      let params = {}
      findHallLotto(params).then((res) => {
        let {data} = res
        if (data.code === 0) {
          this.lottoInfoList = data.data
        } else {
          console.log(data.msg)
        }
      }).catch(() => {
      })
    },
    refresh (done) {
      setTimeout(() => {
        this.refreshHallLotto()
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
    }),
    activeRoute () {
      return this.$route.path
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  @import "~@/styles/index.less";
  @import "~@/styles/variable.less";
  .cell-container {
    width: 100%;
    height: 2.2rem;
    background: @base-color-white;
    margin-bottom: 0.2rem;
    white-space: nowrap;
    position: relative;
    .leftbox {
      width: 30%;
      height: 100%;
      position: absolute;
      left: 0;
      img{
        margin: 0.2rem 0.2rem 0.2rem 0.4rem;
        width: 1.8rem;
        height: 1.8rem;
        float:left;
      }
    }
    .midbox {
      margin: 0 30%;
      height: 100%;
      width: 100%;
      position: relative;
      p{
        font-size: 0.5rem;
        text-align: left;
        margin-top: 0.2rem;
      }
      .label{
        font-size: 0.4rem;
        color:#9c9c9c;
        word-wrap:break-word;
      }
    }
    .rightbox {
      height: 100%;
      width: 100%;
      position: relative;
    }
  }
  .fl{
    float:left;
  }
  .fontcolor1{
    color: @base-font-color;
  }
</style>
