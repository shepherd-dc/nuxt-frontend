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
            <span>注册</span>
          </div>
          <div class="item-body">
            <el-form
              ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
              status-icon
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item
                prop="nickname"
                label="昵称"
              >
                <el-input
                  v-model="ruleForm.nickname"
                  placeholder="请输入昵称"
                  type="text"
                />
              </el-form-item>
              <el-form-item
                prop="account"
                label="邮箱"
              >
                <el-input
                  v-model="ruleForm.account"
                  placeholder="请输入邮箱"
                  type="email"
                />
              </el-form-item>
              <el-form-item
                label="密码"
                prop="secret"
              >
                <el-input
                  v-model="ruleForm.secret"
                  placeholder="请输入密码"
                  type="password"
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item
                label="确认密码"
                prop="checkPass"
              >
                <el-input
                  v-model="ruleForm.checkPass"
                  placeholder="请确认密码"
                  type="password"
                  autocomplete="off"
                />
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    const checkUser = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('昵称不能为空'))
      } else {
        const { data } = await this.$axios.post('/user/nickname', {
          nickname: this.ruleForm.nickname
        })
        if (data.error_code === 0) {
          callback()
        } else if (data.error_code === 101) {
          return callback(new Error('昵称已注册'))
        }
      }
    }
    const checkEmail = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      } else {
        const { data } = await this.$axios.post('/user/email', {
          email: this.ruleForm.account
        })
        if (data.error_code === 0) {
          callback()
        } else if (data.error_code === 100) {
          return callback(new Error('邮箱已注册'))
        }
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.secret) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      width: '',
      ruleForm: {
        secret: '',
        checkPass: '',
        nickname: '',
        account: ''
      },
      rules: {
        secret: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        nickname: [
          { required: true, validator: checkUser, trigger: 'blur' }
        ],
        account: [
          { required: true, validator: checkEmail, trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
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
          delete this.ruleForm.checkPass
          this.ruleForm.type = 100
          const { data } = await this.$axios.post('/client/register', this.ruleForm)
          if (data.error_code === 0) {
            this.$router.replace('/login')
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
