<template>
  <div class="header">
    <nav>
      <a href="/">
        <div class="logo">
          <i><b>SN</b></i>
        </div>
      </a>
      <el-row
        v-if="isPC"
        :gutter="10"
      >
        <el-col
          :xs="12"
          :sm="20"
          :md="24"
          :lg="24"
          :xl="24"
        >
          <common-nav mymode="horizontal" />
        </el-col>
      </el-row>
      <el-row
        v-else
        :gutter="10"
      >
        <el-col>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link menu">
              <i class="el-icon-menu" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <common-nav />
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </nav>
    <div class="login">
      <div v-if="!SNtoken">
        <span @click="routerToLogin()">登录</span> |
        <span @click="routerToRegister()">注册</span>
      </div>
      <div v-else>
        <span
          class="publish-btn"
          @click="routerToPublish()"
        >发帖</span>
        <span>{{ nickname }}</span> |
        <span @click="routerToLogout()">退出</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CommonNav from './CommonNav'
import { isMobile } from '~/utils'
import { getToken } from '~/utils/auth'
export default {
  name: 'CommonHeader',
  components: {
    CommonNav
  },
  data () {
    return {
      activeIndex: '1',
      isfold: false,
      token: '',
      name: ''
    }
  },
  computed: {
    ...mapGetters([
      'isPC',
      'SNtoken',
      'nickname'
    ])
  },
  created () {
    this.initUserInfo()
  },
  mounted () {
    this.initDevice()
  },
  methods: {
    initUserInfo () {
      if (!this.SNtoken) {
        let cookie = getToken()
        if (cookie) {
          cookie = JSON.parse(cookie)
          this.$store.commit('user/SET_TOKEN', cookie)
        }
      }
    },
    initDevice () {
      const device = isMobile()
      this.$store.commit('SET_DEVICE', !device)
    },
    mouseenterHandler () {
      this.isfold = true
    },
    mouseleaveHandler () {
      this.isfold = false
    },
    routerToLogin () {
      this.$router.push({
        path: '/login'
      })
    },
    routerToRegister () {
      this.$router.push({
        path: '/register'
      })
    },
    routerToLogout () {
      this.$store.dispatch('user/LogOut')
      this.token = ''
      location = '/'
    },
    routerToPublish () {
      this.$router.push({
        path: '/publish'
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .header {
    background-color: #333;
    color:#fff;
    height: 60px;
    display:flex;
    .logo {
      // border-right:1px #fff solid;
      padding: 0 20px;
      line-height: 60px;
    }
    nav {
      flex:1;
      display: flex;
      // justify-content: flex-end;
      position:relative;
      .menu {
        font-size:30px;
        color: #fff;
        line-height: 60px;
        padding-right: 20px;
        cursor: pointer;
      }
    }
    .login {
      font-size: 14px;
      padding: 0 20px;
      line-height: 60px;
      span {
        cursor: pointer;
        &:hover {
          color: #41b883
        }
      }
      .publish-btn {
        padding: 4px 16px 6px;
        border: 1px solid #fff;
        border-radius: 24px;
        margin-right: 10px;
        &:hover {
          border-color: #41b883
        }
      }
    }
  }
</style>
