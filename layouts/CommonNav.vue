<template>
  <el-menu
    :default-active="activeIndex"
    :mode="mymode"
    class="el-menu-demo"
    background-color="#333"
    text-color="#fff"
    active-text-color="#41b883"
  >
    <el-menu-item index="0">
      <nuxt-link
        class="homepage"
        to="/"
      >
        首页
      </nuxt-link>
    </el-menu-item>
    <el-submenu
      v-for="(menu, index) in menus"
      :key="index"
      :index="(index+1).toString()"
    >
      <template slot="title">
        {{ menu.menu_name }}
      </template>
      <el-menu-item
        v-for="(subcol, subindex) in menu.submenu"
        :key="subindex"
        :index="(index+1)+'-'+(subindex+1)"
        @click="routerTo(subcol.path, subcol.name_en)"
      >
        {{ subcol.name_zh }}
      </el-menu-item>
    </el-submenu>
    <!-- <el-submenu index="2">
      <template slot="title">前端</template>
      <el-menu-item index="2-1">Vue</el-menu-item>
      <el-menu-item index="2-2">React</el-menu-item>
      <el-menu-item index="2-3">Angular</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">后端</template>
      <el-menu-item index="3-1">Python</el-menu-item>
      <el-menu-item index="3-2">PHP</el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">Node</template>
      <el-menu-item index="4-1">Koa</el-menu-item>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">数据库</template>
      <el-menu-item index="5-1">MySQL</el-menu-item>
      <el-menu-item index="5-2">MongoDB</el-menu-item>
      <el-menu-item index="5-3">Redis</el-menu-item>
    </el-submenu>
    <el-menu-item index="6">部署运维</el-menu-item>
    <el-submenu index="7">
      <template slot="title">UI库</template>
      <el-menu-item index="7-1">Element-ui</el-menu-item>
      <el-menu-item index="7-2">iView</el-menu-item>
      <el-menu-item index="7-3">Vux</el-menu-item>
    </el-submenu>
    <el-submenu index="8">
      <template slot="title">UI设计</template>
      <el-menu-item index="8-1">Photoshop</el-menu-item>
      <el-menu-item index="8-2">Illustrator</el-menu-item>
      <el-menu-item index="8-3">Axure</el-menu-item>
    </el-submenu>-->
  </el-menu>
</template>

<script>
export default {
  name: 'CommonNav',
  props: {
    mymode: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      activeIndex: '0'
    }
  },
  computed: {
    menus () {
      return this.$store.state.menus
    }
  },
  methods: {
    routerTo (path, name) {
      const menu = path.split('/')[0]
      this.$router.push({
        path: `/column/${menu}/${name}`
      })
    }
  }
}
</script>

<style>
.el-menu.el-menu--horizontal {
  border-bottom: none !important;
}
.homepage {
  display:block;
  line-height: 60px;
}
</style>
