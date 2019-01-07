<template>
    <div class="header-box">
      <div class="left-icon">
        <span v-if="showback" @click="back" class="icon-back"></span>
        <span v-if="showhome" @click="gohome" class="icon-home"></span>
      </div>
      <div class="header-tittle">
        <span v-if="headertype === 'cusinput'">
          <cus-input></cus-input>
        </span>
        <span v-if="headertype === 'methodgroup'">
          <lotto-method-group
            :lottoname="headerlottoname"
            :mglist="mglist"
            :currGroupInfo="currgroup"
            @currGroupInfoClicked="currGroupInfoClicked"
          ></lotto-method-group>
        </span>
        <span v-else>{{tittle}}</span>
      </div>
      <div class="right-icon">
        <span v-if="showmore" class="icon"></span>
        <span v-if="showordermore" @click="ordermorechecked">筛选</span>
        <span v-if="showbetmore" class="icon"  @click="changeBetMore">
          <div class="dropIncreaseIdBack positionFixed" v-if="betmorepopup === true"></div>
          <div class="dropDowmCls" v-if="betmorepopup === true">
            <ul>
              <li><a href="javascript:void(0)" @click="openFrm(1)"><p>投注记录</p></a></li>
              <li><a href="javascript:void(0)" @click="openFrm(2)"><p>玩法介绍</p></a></li>
              <li><a href="javascript:void(0)" @click="openFrm(3)"><p>充值</p></a></li>
              <li><a href="javascript:void(0)" @click="openFrm(4)"><p>提款</p></a></li>
            </ul>
          </div>
        </span>
      </div>
    </div>
</template>

<script>
import cusInput from '@/components/cus-input'
import lottoMethodGroup from '@/components/lotto-method-group'
export default {
  data () {
    return {
      betmorepopup: false
    }
  },
  props: {
    showright: {
      type: Boolean,
      default: false
    },
    showordermore: {
      type: Boolean,
      default: false
    },
    showbetmore: {
      type: Boolean,
      default: false
    },
    showleft: {
      type: Boolean,
      default: false
    },
    showhome: {
      type: Boolean,
      default: false
    },
    showinput: {
      type: Boolean,
      default: false
    },
    tittle: {
      type: String,
      default: '标题'
    },
    headertype: {
      type: String,
      default: 'title'
    },
    showback: {
      type: Boolean,
      default: true
    },
    showmore: {
      type: Boolean,
      default: false
    },
    headerlottoname: {
      type: String,
      default: '暂无玩法'
    },
    currgroup: {
      type: Object,
      default: function () {
        return {}
      }
    },
    mglist: {
      type: Array,
      default: function () {
        return []
      }
    },
    betlottoid: {
      type: String,
      default: ''
    }
  },
  methods: {
    back () {
      this.$router.goBack()
    },
    gohome () {
      this.$router.push('/home')
    },
    currGroupInfoClicked: function (currInfo) {
      this.$emit('currGroupInfoClicked', currInfo)
    },
    ordermorechecked: function () {
      console.log('eee')
      this.$emit('ordermorechecked', '')
    },
    changeBetMore () {
      this.betmorepopup = !this.betmorepopup
    },
    openFrm (id) {
      if (id === 1) {
        this.$router.push('/record/lotto/order?lotto_id=' + this.betlottoid)
      }
    }
  },
  mounted () {
  },
  components: {
    cusInput,
    lottoMethodGroup
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/index.less";
@import "~@/styles/variable.less";
.header-box{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  .h(100);
  .lh(100);
  background-color: @base-color;
  color: @base-header-color;
  .fs(@base-header-size);
  display: flex;
  .left-icon{
    position: relative;
    flex: 1;
    .icon-back{
      position: absolute;
      display: inline-block;
      .w(50);
      .h(50);
      .left(25);
      .top(25);
      background-image: url("../assets/imgs/w-back.svg");
      background-size: cover;
    }
    .icon-home{
      position: absolute;
      display: inline-block;
      .w(50);
      .h(50);
      .left(25);
      .top(25);
      background-image: url("../assets/imgs/home.svg");
      background-size: cover;
    }
  }
  .header-tittle{
    flex: 3;
  }
  .right-icon{
    position: relative;
    flex: 1;
    .icon{
      position: absolute;
      display: inline-block;
      .w(50);
      .h(50);
      .right(25);
      .top(25);
      background-image: url("../assets/imgs/more.svg");
      background-size: cover;
    }
  }
}

.dropDowmCls {
  position: fixed;
  top: 1.1rem;
  right: 0.3rem;
  background: white;
  width: 3.0rem;
  padding: 0.1rem;
  border: 1px solid rgba(0,0,0,.1);
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border-radius: 0.3rem;
  overflow: visible;
  z-index: 10;
  ul {
    li {
      border-bottom: 1px solid #dcdcdc;
      a {
        font-size: 0.4rem;
        color: black;
        display: block;
        line-height: 1.0rem;
        p {
          background: url('../assets/imgs/home.svg') left 0.2rem no-repeat;
          background-size: 0.3rem auto;
          padding-left: 0.2rem;
        }
      }
    }
  }
}

.dropDowmCls:after {
  content: '';
  display: block;
  width: 0;
  border: 10px solid #fff;
  border-right-color: transparent;
  border-left-color: transparent;
  border-top-color: transparent;
  position: absolute;
  top: -19px;
  right: 10px;
}
/*header 彈出框*/
.dropIncreaseIdBack {
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
}
.positionFixed {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
