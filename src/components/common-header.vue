<template>
    <div class="header-box">
      <div class="left-icon">
        <span v-if="showback" @click="back" class="icon-back"></span>
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
      </div>
    </div>
</template>

<script>
import cusInput from '@/components/cus-input'
import lottoMethodGroup from '@/components/lotto-method-group'
export default {
  data () {
    return {
      aaa: ''
      // currgroup: {}
    }
  },
  props: {
    showright: {
      type: Boolean,
      default: false
    },
    showleft: {
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
    }
  },
  methods: {
    back () {
      this.$router.goBack()
    },
    currGroupInfoClicked: function (currInfo) {
      this.$emit('currGroupInfoClicked', currInfo)
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
</style>
