<template>
  <div class="comment-list">
    <el-card class="box-card">
      <div class="comment-header">
        全部评论<span>（{{ comments.total }}）</span>
      </div>
      <div v-for="c in comments.data" :key="c.id" class="text item">
        <CommentItem :comment="c" />
      </div>
    </el-card>
  </div>
</template>

<script>
import CommentItem from '~/components/CommentItem'
export default {
  components: {
    CommentItem
  },
  props: {
    comments: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="less" scoped>
  .box-card {
    margin: 10px 0;
  }
  .comment-header {
    padding-bottom: 6px;
    border-bottom: 1px solid #f3f3f3;
  }
</style>
