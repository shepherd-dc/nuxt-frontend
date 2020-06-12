<template>
  <div class="header">
    <nav>
      <a href="/">
        <div class="logo">
          <i><b>SN</b></i>
        </div>
      </a>
      <el-row
        v-if="width > 1080"
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
        v-if="width <= 1080 && !width == ''"
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
    <!-- <div class="login">
      <div v-if="!token && !SNtoken">
        <span @click="routerToLogin()">登录</span> | <span @click="routerToRegister()">注册</span>
      </div>
      <div v-if="token || SNtoken">
        <span
          class="publish-btn"
          @click="routerToPublish()">发帖</span>
        <span>{{ nickname || name }}</span> | <span @click="routerToLogout()">退出</span>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CommonNav from './CommonNav'
import URL from '~/globalurl'
import { getToken } from '~/utils/auth'
export default {
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
      'width',
      'SNtoken',
      'nickname'
    ])
  },
  async mounted () {
    if (getToken()) {
      this.token = getToken()
    }
    const Width = window.innerWidth
    this.$store.dispatch('SetWidth', Width)
    // this.token = localStorage.getItem('token')
    if (!this.SNtoken && this.token) {
      const { data } = await this.$axios.post(`${URL}/token/secret`, {
        token: this.token
      })
      this.$store.commit('SET_TOKEN', data.token)
      this.name = data.nickname
    }
    // console.log(this.SNtoken, this.nickname)
  },
  methods: {
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
      this.$store.dispatch('LogOut')
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
