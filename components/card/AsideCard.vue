<template>
  <el-card class="box-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>{{ aside_title }}</span>
      <router-link to="/article">
        <el-button
          v-if="show_more"
          style="float: right; padding: 3px 0"
          type="text"
        >
          更多
        </el-button>
      </router-link>
    </div>
    <div
      v-for="data in aside_data"
      :key="data.id"
      class="text item"
      @click="routerToDetail(data.id)"
    >
      {{ data.title }}
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    aside_title: {
      type: String,
      default: ''
    },
    aside_data: {
      type: Array,
      default: () => {}
    },
    show_more: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    routerToDetail (id) {
      this.$router.push({
        path: `/article/${id}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  width: 100%;
  margin-bottom: 10px;
}
</style>
