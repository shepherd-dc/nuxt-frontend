<template>
  <div class="login">
    <el-row>
      <el-col
        :span="isPC ? 6 : 24"
        :offset="isPC ? 9 : 0"
      >
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix login-head"
          >
            <span>登录</span>
          </div>
          <div class="item-body">
            <el-form
              ref="ruleForm2"
              :model="ruleForm2"
              :rules="rules2"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item
                label="用户名"
                prop="account"
              >
                <el-input
                  v-model="ruleForm2.account"
                  placeholder="请输入用户名或邮箱"
                />
              </el-form-item>
              <el-form-item
                label="密码"
                prop="secret"
              >
                <el-input
                  v-model="ruleForm2.secret"
                  type="password"
                  placeholder="请输入密码"
                  autocomplete="off"
                />
              </el-form-item>
              <!-- <el-form-item
                label="验证码"
                prop="vcode">
                <el-input
                  v-model="ruleForm2.vcode"
                  placeholder="请输入验证码"></el-input>
              </el-form-item> -->
              <el-form-item>
                <el-button
                  type="success"
                  @click="submitForm('ruleForm2')"
                >
                  提交
                </el-button>
                <el-button @click="resetForm('ruleForm2')">
                  重置
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
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
      ruleForm2: {
        secret: 'admin',
        account: ''
        // vcode: ''
      },
      rules2: {
        secret: [
          { validator: validatePass, trigger: 'blur' }
        ],
        account: [
          { validator: checkUser, trigger: 'blur' }
        ]
        // vcode: [
        //   { validator: validateCode, trigger: 'blur'}
        // ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'isPC'
    ])
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.ruleForm2.type = 100
          const { data } = await this.$axios.post('/token', this.ruleForm2)
          if (data.error_code === 0) {
            this.$store.dispatch('Login', data.data.token)
            // this.$store.dispatch('USER_INFO', data)
            this.$router.go(-1)
          } else if (data.error_code === 1002 || data.error_code === 1003) {
            alert(data.msg)
          }
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
  .login {
    padding-top: 60px;
    min-height: 92vh;
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
</style>
