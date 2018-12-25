<template>
  <div>
    <div class="input-box" v-on:click="method_group_click">
      <div class="method-cell">
        <span class="cell-txs">{{gname}}<img src="../assets/imgs/pulldown.svg"/></span>
      </div>
    </div>
    <lotto-popup
      :showpopup="showp"
      :methodGroupList="mglist"
      @currGroupInfoClicked="currGroupInfoHasClick"
      v-on:click="changeStatus"></lotto-popup>
  </div>
</template>
<script>
import lottoPopup from '@/components/lotto-popup'
export default {
  data () {
    return {
      showp: false
    }
  },
  props: {
    lottoname: {
      type: String,
      default: '彩票'
    },
    currGroupInfo: {
      type: Object,
      default: function () {
        return {}
      }
    },
    showmore: {
      type: Boolean,
      default: false
    },
    mglist: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    method_group_click: function () {
      this.showp = !this.showp
    },
    currGroupInfoHasClick: function (currInfo) {
      this.showp = !this.showp
      this.$emit('currGroupInfoClicked', currInfo)
    },
    changeStatus: function () {
      this.showp = !this.showp
    }
  },
  computed: {
    gname: function () {
      return this.currGroupInfo.group_name
    }
  },
  components: {
    lottoPopup
  }
}
</script>
<style lang="less" scoped>
@import "~@/styles/index.less";
@import "~@/styles/variable.less";
.input-box{
  position: relative;
  font-size: 0.4rem;
  .method-cell{
    border: solid @base-color-white 0.02rem;
    /*line-height: 30px;*/
    .h(60);
    .lh(60);
    width: auto;
    text-align:center;
    border-radius: 5px;
    display: inline-block;
    vertical-align: middle;
    /*display: block;*/
    img{
      .h(60);
      .w(60);
      vertical-align:middle;
      display: inline-block;
      margin-bottom: 0.15rem;
    }
    .cell-txs{
      margin-left: 0.2rem;
      height:100%;
      vertical-align:middle;
      text-align:center;
    }
  }
}
</style>
