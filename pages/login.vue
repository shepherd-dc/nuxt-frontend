<template>
  <div class="login">
    <el-card class="box-card" :class="isPC ? 'pc-login-box' : ''">
      <div
        slot="header"
        class="clearfix login-head"
      >
        <span>登录</span>
      </div>
      <div class="item-body">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="用户名"
            prop="account"
          >
            <el-input
              v-model="ruleForm.account"
              placeholder="请输入用户名或邮箱"
            />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="secret"
            class="margin-thin"
          >
            <el-input
              v-model="ruleForm.secret"
              type="password"
              placeholder="请输入密码"
              autocomplete="off"
            />
          </el-form-item>
          <!-- <el-form-item
                label="验证码"
                prop="vcode">
                <el-input
                  v-model="ruleForm.vcode"
                  placeholder="请输入验证码"></el-input>
              </el-form-item> -->
          <el-form-item class="margin-thin">
            <span>没有账号？</span>
            <span class="to-register" @click="toRegister">去注册</span>
          </el-form-item>
          <el-form-item>
            <el-button
              type="success"
              @click="submitForm('ruleForm')"
            >
              提交
            </el-button>
            <el-button @click="resetForm('ruleForm')">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { LOGIN_URL, MENU_LIST } from '../api'
import { desEncryptPlainObject } from '~/utils/crypto'

export default {
  async fetch ({ app }) {
    const { data } = await app.$axios.get(MENU_LIST)
    await app.store.commit('ADD_MENUS', data)
  },
  data () {
    const checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    // var validateCode = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('验证码不能为空'));
    //   } else {
    //     callback()
    //   }
    // }

    return {
      ruleForm: {
        account: '',
        secret: ''
        // vcode: ''
      },
      rules: {
        account: [
          { validator: checkUser, trigger: 'blur' }
        ],
        secret: [
          { validator: validatePass, trigger: 'blur' }
        ]
        // vcode: [
        //   { validator: validateCode, trigger: 'blur'}
        // ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'isPC',
      'key'
    ]),
    replacePath () {
      return this.$route.push === '/login' || this.$route.push === '/register'
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const formData = desEncryptPlainObject(this.ruleForm, this.key)
          formData.type = 100

          const res = await this.$axios.post(LOGIN_URL, formData)
          if (res.error_code === 0) {
            const { data } = res
            this.$store.dispatch('user/Login', data)
            if (this.replacePath) {
              this.$router.push('/')
            } else {
              this.$router.back()
            }
          } else if (res.error_code === 1002 || res.error_code === 1003) {
            this.$notify({
              title: res.msg,
              type: 'error'
            })
          }
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    toRegister () {
      this.$router.replace('/register')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/settings.scss';
  .login {
    padding: 60px 10px;
  }
  .pc-login-box {
    min-width: 360px;
    max-width: 400px;
    margin: 0 auto;
  }
  .box-card {
    margin-top: 60px;
    .login-head {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }
    .item-body {
      padding-right: 30px;
    }
  }
  .margin-thin {
    margin: 10px 0;
  }
  .to-register {
    color: $--color-primary;
    cursor: pointer;
  }
</style>
