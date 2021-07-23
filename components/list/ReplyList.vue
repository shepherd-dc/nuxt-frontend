<template>
  <div class="reply-list">
    <ReplyItem v-for="reply in replies" :key="reply.id" :reply="reply" />
  </div>
</template>

<script>
import ReplyItem from '~/components/item/ReplyItem'

export default {
  components: {
    ReplyItem
  },
  props: {
    replies: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>

</style>
