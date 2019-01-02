<template>
  <div>
    <common-header :tittle="title" :showback="true"></common-header>
    <section class="page login-page">
      <section class="pwd-input__list">
        <section class="input-item">
          <section class="input-content">
            <input v-model="user.name" id="name" type="text" placeholder="请输入账号"/>
          </section>
        </section>
        <section class="input-item">
          <section class="input-content">
            <input v-model="user.password" id="password" type="password" placeholder="请输入密码"/>
          </section>
        </section>
        <section class="input-item">
          <section class="input-content">
            <input v-model="user.confirm_password" id="confirm_password" type="password" placeholder="请再次输入密码"/>
          </section>
        </section>
        <section class="input-item">
          <section class="input-content">
            <input v-model="user.code" id="code" type="text" placeholder="验证码"/>
            <img :src="captcha" class="img-code" @click="refresh_img">
          </section>
        </section>
        <section class="login-btn" @click="register_account">注册</section>
        <section class="link-box">
          <section class="link-a">
            <router-link to="/login">已经账户去登录</router-link>
          </section>
        </section>
      </section>
    </section>
  </div>
</template>
<script>
import commonHeader from '@/components/common-header'
import {register1, getCaptchaUrl} from '@/api/index'
import { MessageBox } from 'mint-ui'
import { CODE_OK } from '@/apiconfig/index'

export default{
  data () {
    return {
      user: {
        name: '',
        password: '',
        confirm_password: '',
        code: ''
      },
      showAlert: false,
      alertText: '',
      title: '注册',
      captcha: ''
    }
  },
  components: {
    commonHeader
  },
  mounted () {
    this.refresh_img()
  },
  computed: {
  },
  methods: {
    register_account () {
      if (this.user.name === '') {
        MessageBox('提示', '请先输入账号')
        return
      }
      if (this.user.password === '') {
        MessageBox('提示', '密码不能为空')
        return
      }
      if (this.user.confirm_password === '') {
        MessageBox('提示', '请再次确认密码')
        return
      }
      if (this.user.confirm_password !== this.user.password) {
        MessageBox('提示', '两次输入密码不相同')
        return
      }
      let params = {
        name: this.user.name,
        password: this.user.password,
        code: this.user.code
      }
      register1(params).then(rsp => {
        if (rsp.status === 200) {
          console.log(rsp.code)
          console.log(CODE_OK)
          if (rsp.data.code === CODE_OK) {
            // localStorage.setItem('SID', rsp.data.data.SID)
            MessageBox('提示', rsp.data.msg || '注册成功')
            this.$router.push('/login')
          } else {
            MessageBox('提示', rsp.data.msg || '注册失败')
            this.refresh_img()
          }
        } else {
          MessageBox('提示', '网络异常')
        }
      })
    },
    refresh_img () {
      this.captcha = getCaptchaUrl() + '?_t=' + parseInt((+new Date()) / 1000)
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
    .link-b a {
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
    height: 0.9rem;
    right: .2rem;
    top: 0.05rem
  }

</style>
