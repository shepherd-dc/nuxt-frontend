<template>
  <div class="media-operation">
    <span class="operation-icon thumb"><i class="el-icon-thumb" /> 点赞</span>
    <span v-if="!isReply" class="operation-icon star"><i class="el-icon-star-off" /> 收藏</span>
    <span v-if="!isReply" class="operation-icon share"><i class="el-icon-position" /> 转发</span>
    <span class="operation-icon comment" @click="onComment"><i class="el-icon-chat-line-square" /> {{ isReply ? '回复' : '评论' }}</span>
  </div>
</template>

<script>
export default {
  props: {
    isReply: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onComment () {
      const eventName = this.isReply ? 'on-reply' : 'on-comment'
      this.$emit(eventName)
    }
  }
}
</script>

<style lang="less" scoped>
  .media-operation {
    margin-top: 10px;
    .operation-icon {
      color: #888;
      margin-right: 10px;
      cursor: pointer;
      &:hover {
        color: #41b883;
      }
    }
  }
</style>
