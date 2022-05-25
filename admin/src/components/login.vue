<template>
  <div class="login_container">
    <div class="login_box">
      <div class='form'>
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">

          <el-form-item class='top'>
            <a href="">
              <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="">
              <span>Ant Design</span>
            </a>

            <p>
              Ant Design 是西湖区最具影响力的 Web 设计规范
            </p>
          </el-form-item>

          <el-form-item class='login_method'>
            <el-tabs v-model="activeName" @tab-click="handleClick_tabs" stretch>
              <el-tab-pane label="登 录" name="first">

              </el-tab-pane>
              <el-tab-pane label="注 册" name="second">

              </el-tab-pane>
            </el-tabs>
          </el-form-item>

          <div v-if='!register_form' class='login_'>

            <el-form-item prop="username">
              <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="账户:admin">
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock" placeholder="请输入密码">
              </el-input>
            </el-form-item>
            <el-form-item class="login_button">
              <el-checkbox v-model="is_auto_login">自动登录</el-checkbox>

              <span style="float:right;">
                <el-link type="primary" :underline="false">忘记密码</el-link>
              </span>
            </el-form-item>

            <el-form-item class="login_button">
              <el-button type="primary" @click="login()">登 录</el-button>
            </el-form-item>

            <el-form-item class="login_button">
              其他方式登录
              <span style="float:right;">
                <el-link type="primary" :underline="false">注册账户</el-link>
              </span>
            </el-form-item>
          </div>

          <div v-if='register_form' class='register_'>
            <el-form-item prop="username">
              <el-input v-model="registerForm.username" prefix-icon="el-icon-user" placeholder="请输入要注册用户名">
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input v-model="registerForm.password" type="password" prefix-icon="el-icon-lock" placeholder="请输入密码">
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input v-model="registerForm.check_password" type="password" prefix-icon="el-icon-lock" placeholder="请输入确认密码">
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input v-model="registerForm.email" prefix-icon="el-icon-message" placeholder="请输入邮箱">
                <el-button slot="append" @click="send_verification_code()">获取验证码</el-button>
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input v-model="registerForm.verify_code" prefix-icon="el-icon-message" placeholder="请输入验证码">
              </el-input>
            </el-form-item>

            <el-form-item class="login_button">
              <el-button type="primary" @click="register()">确认注册</el-button>
            </el-form-item>

            <el-form-item class="login_button">

            </el-form-item>
            <el-form-item class="login_button">

            </el-form-item>
          </div>

        </el-form>
      </div>

      <div class='footer'>

        <div class='footer_text_first'>
          <span>
            <el-link :underline="false" type="info">帮助</el-link>
          </span>
          <span>
            <el-link :underline="false" type="info">隐私</el-link>
          </span>
          <span>
            <el-link :underline="false" type="info">条款</el-link>
          </span>
        </div>

        <div class='footer_text_second'>
          Copyright © 2018 vueComponent
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "@/network/request.js";

export default {
  data() {
    return {
      register_form: false,
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      registerForm: {
        username: '',
        password: '',
      },
      isLogin: true,
      // 表单验证
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      },
      is_auto_login: false,
      activeName: 'first',
    }
  },
  methods: {
    async register() {
      let res = await request({
        url: '/client/user/register',
        method: 'post',
        data: this.registerForm
      })

      // this.$message.error('禁止注册')

      if (res.data.code == 0) {
        this.activeName = 'first'
        this.register_form = false
        this.loginForm = this.registerForm
      }
    },
    async login() {
      // 表单预验证
      // valid：bool类型
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return false
        // this.$http.post('login', this.loginForm): 返回值为promise
        // 返回值为promise，可加await简化操作 相应的也要加async
        let res = await request({
          url: '/client/user/login',
          data: this.loginForm,
        })
        // const { data: res } = await request.post('login', this.loginForm)
        if (res.data.code !== 0) return
        // this.$message.success(res.data.msg)
        // 1、将登陆成功之后的token, 保存到客户端的sessionStorage中; localStorage中是持久化的保存
        //   1.1 项目中出现了登录之外的其他API接口，必须在登陆之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        window.sessionStorage.setItem('token', res.data.token)
        this.$store.state.onLogin = true
        // 2、通过编程式导航跳转到后台主页, 路由地址为：/home

        this.$router.push('/')
        this.$get_summary()
      })
    },
    handleClick_tabs(tab) {
      if (tab.name === 'second') {
        this.register_form = true
      }
      if (tab.name === 'first') {
        this.register_form = false
      }

    },
    async send_verification_code() {
      let res = await request({
        url: '/client/user/verification_code',
        method: 'get',
        params: {
          to: this.registerForm.email,
          subject: '注册账号',
        }
      })
      if (res.data.code == 0) {
        this.$message.success('验证码发送成功')
      }
    },
  }
}
</script>

<style lang="less" scoped>
/* // lang="less" 支持less格式
// scoped vue的指令，只在当前组件生效 */
.login_container {
  background-color: rgb(241, 241, 241);
  height: 100%;
  color: var(--second_font_color);
  background-image: url("./background.jpg");
}
.login_box {
  margin: 0px auto;
  // padding-top: 25px;
}
.phone .login_box {
  padding-top: 10%;
}
.login_form {
  position: absolute;
  bottom: 60px;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: center;
}

.hello {
  padding: 40px;
  font-size: 40px;
}

.form {
  background-color: white;
  padding: 0px 20px;
  width: 308px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  min-width: 260px;
  margin: 0 auto;

  .top {
    padding-top: 40px;
    text-align: center;
    p {
      color: var(--second_font_color);
      margin: 10px 0px;
    }
    a {
      img {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
        border-style: none;
      }
      span {
        font-size: 30px;
        font-weight: 600;
        color: var(--first_font_color);
      }
    }
  }
  .login_button button {
    width: 100%;
  }
  .login_method {
    margin-right: 20px;
    margin-left: 20px;
  }
}

.footer {
  text-align: center;
  margin: 30px auto;
  color: var(--third_font_color);
  font-size: 14px;
  line-height: 40px;
  .footer_text_first span {
    margin: 0px 15px;
  }
}
</style>