<template>
  <div class="popup-box" v-if="showpopup===true">
    <div class="popup_upMian">
      <ul>
        <li v-for="(item,index) in methodGroupList" :key="item.id"  @click="eventOpt(index,item)">
          {{item.group_name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currGroupInfo: {}
    }
  },
  props: {
    showpopup: {
      type: Boolean,
      default: false
    },
    methodGroupList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  mounted () {
  },
  methods: {
    eventOpt: function (index, c) {
      this.currGroupInfo = c
      this.$emit('currGroupInfoClicked', this.currGroupInfo)
    }
  }
}
</script>

<style lang="less" scoped>
  @import "~@/styles/index.less";
  @import "~@/styles/variable.less";
  /*列表弹框*/
  .popup-box {
    .mt(100);
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
  }

  .popup_upMian {
    width: 100%;
    border: rem(1) solid #F0DDAE;
    padding: rem(15);
    background: @base-color-gray;
    box-shadow: inset 0 rem(-2) rem(3) 0 rgba(0, 0, 0, 0.50);
    border-radius: rem(6);
    text-align: center;
    position: relative;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    ul {
      width: 100%;
      height: auto;
      overflow: hidden;
    }
    ul li {
      width: 100%;
      height: 1.1rem;
      line-height: 1.1rem;
      float: left;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      font-size: 0.35rem;
      color: @base-font-color;
      background: @base-color-white;
      border-bottom: solid @base-color-gray 1px;
    }
    ul li:nth-child(odd) {
      margin-right: 4%;
    }
    ul li.on {
      background-image: linear-gradient(left, #F0DDAE 0%, #DCB976 100%);
      background-image: -webkit-linear-gradient(left, #F0DDAE 0%, #DCB976 100%);
      color: #2F2122;
    }
  }
</style>
