<template>
  <div>
    <common-header :tittle="title" :showhome="true" :showback="false"></common-header>
    <section class="page login-page">
      <section class="pwd-input__list">
        <section class="input-item">
          <section class="input-content">
            <input v-model="user.name" id="name" type="text" placeholder="请输入账号"/>
          </section>
        </section>
        <section class="input-item">
          <section class="input-content">
            <input v-model="user.password" id="pwd" type="password" placeholder="请输入密码"/>
          </section>
        </section>
        <section class="login-btn" @click="login">登录</section>
        <section class="link-box">
          <section class="link-a">
            <router-link to="/register">立即注册</router-link>
          </section>
          <section class="link-b">
            <p @click="guest_login" style="color: #26a2ff; float: right;">游客试玩</p>
          </section>
        </section>
      </section>
    </section>
  </div>
</template>
<script>
import commonHeader from '@/components/common-header'
import {login, guestLogin} from '@/api/index'
import { MessageBox } from 'mint-ui'

export default{
  data () {
    return {
      user: {
        name: '',
        password: ''
      },
      showAlert: false,
      alertText: '',
      title: '登录'
    }
  },
  components: {
    commonHeader
  },
  computed: {
  },
  methods: {
    login () {
      if (this.user.name === '') {
        MessageBox('提示', '请先输入账号')
        return
      }
      if (this.user.password === '') {
        MessageBox('提示', '密码不能为空')
        return
      }
      let params = {
        name: this.user.name,
        password: this.user.password
      }
      login(params).then(rsp => {
        if (rsp.status === 200) {
          if (rsp.data.msg !== '') {
            MessageBox('提示', rsp.data.msg)
          } else {
            localStorage.setItem('SID', rsp.data.data.SID)
            this.$router.push('/home')
          }
        } else {
          MessageBox('提示', '网络异常')
        }
      })
    },
    guest_login () {
      guestLogin().then(rsp => {
        localStorage.setItem('SID', rsp.data.data.SID)
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style scoped lang="less">
  @import "~@/styles/index.less";
  @import "~@/styles/variable.less";
  .page {
    height: calc(100% - 4.5rem);
    padding: 2.2rem 0;
    overflow-y: auto;
    font-size: .35rem
  }
  .login-page {
    padding-left: 1.25rem!important;
    padding-right: 1.25rem!important;
    background: white
  }

  .login-page .pwd-input__list {
    padding-top: 1.25rem
  }

  .login-page .pwd-input__list .input-item {
    height: 1rem;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-top: 0.3rem;
  }

  .input-content {
    position: relative;
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #d8d7d7;
  }
  .login-page .login-btn {
    height: 1rem;
    border-radius: 4px;
    color: #fff;
    background: @base-color;
    margin: 0.3rem auto 0;
    text-align: center;
    font-size: .4rem;
    line-height: 1rem
  }
  .link-box {
    height: 1rem;
    color: #fff;
    margin: 0.3rem auto 0;
    text-align: center;
    font-size: .4rem;
    line-height: 1rem;
    .link-a a {
      color: blue;
      float: left;
    }
    .link-b a p {
      color: #26a2ff;
      float: right;
    }
  }
  body input,body textarea {
    -webkit-user-select: auto!important;
    -moz-user-select: auto!important;
    -ms-user-select: auto!important;
    user-select: auto!important;
    -webkit-appearance: none;
    padding: 0;
    border: none;
    cursor: pointer
  }
  .login-page .pwd-input__list .input-item .input-content>input {
    display: block;
    width: 100%;
    height: 1rem;
    text-indent: .5rem;
    border: none;
    font-size: .35rem;
  }
  .img-code {
    line-height: normal;
    position: absolute;
    width: 3rem;
    height: 1.6rem;
    right: .25rem;
    top: .3rem
  }

</style>
