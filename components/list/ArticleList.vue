<template>
  <el-card class="box-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>文章列表</span>
    </div>
    <div
      v-for="article in articles_data"
      :key="article.id"
      class="text item list"
      @click="routerToDetail(article.id)"
    >
      <h4>{{ article.title }}</h4>
      <span class="time">{{ article.create_time }}</span>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    articles_data: {
      type: Array,
      default: () => {}
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
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  cursor: pointer;
  &:hover {
    color: #41b883;
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}

.list {
  display: flex;
  justify-content: space-between;
  h4 {
    font-weight: normal;
  }
  .time {
    color: #999;
  }
}

</style>
