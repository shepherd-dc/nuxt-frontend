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
      <div v-if="!SNToken">
        <span @click="routerToLogin()">登录</span> |
        <span @click="routerToRegister()">注册</span>
      </div>
      <div v-else class="has-login">
        <span
          class="publish-btn"
          @click="routerToPublish()"
        >
          发帖
        </span>
        <div class="user-info" @click="routerToUserCenter">
          <el-avatar class="user-avatar" :size="30" icon="el-icon-user-solid" :src="avatar" />
          <span class="text-margin">{{ nickname }}</span>
        </div> |
        <span class="text-margin" @click="routerToLogout()">退出</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CommonNav from './CommonNav'
import { isMobile } from '~/utils'
import { getStorage } from '~/utils/auth'
export default {
  name: 'CommonHeader',
  components: {
    CommonNav
  },
  computed: {
    ...mapGetters([
      'isPC',
      'SNToken',
      'nickname',
      'avatar'
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
      if (!this.SNToken) {
        const token = getStorage('SN-Token')
        if (token) {
          this.$store.commit('user/SET_TOKEN', token)
        }
      }
      if (!this.nickname) {
        const nickname = getStorage('SN-Nickname')
        if (nickname) {
          this.$store.commit('user/SET_NICKNAME', nickname)
        }
      }
      if (!this.avatar) {
        const avatar = getStorage('SN-Avatar')
        if (avatar) {
          this.$store.commit('user/SET_AVATAR', avatar)
        }
      }
    },
    initDevice () {
      const device = isMobile()
      this.$store.commit('SET_DEVICE', !device)
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
      location = '/'
    },
    routerToPublish () {
      this.$router.push({
        path: '/publish'
      })
    },
    routerToUserCenter () {
      this.$router.push({
        path: '/user/home'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/settings.scss';

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
          color: $--color-primary
        }
      }
      .publish-btn {
        border: 1px solid #fff;
        border-radius: 24px;
        margin-right: 10px;
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        &:hover {
          border-color: $--color-primary
        }
      }
    }
  }
  .has-login {
    display: flex;
    align-items: center;
    .user-info {
      display: flex;
      align-items: center;
      .user-avatar:hover {
        opacity: 0.7;
      }
    }
    .text-margin {
      margin: 0 5px;
    }
  }
</style>
