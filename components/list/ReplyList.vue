<template>
  <div class="reply-list">
    <ReplyItem v-for="reply in showList" :key="reply.id" :reply="reply" />
    <div class="show-more">
      <span v-show="!showMore && replyList.length > 3 " @click="unfold">查看更多回复 <i class="el-icon-d-arrow-right" /></span>
      <span v-show="showMore" @click="packUp">收起 <i class="el-icon-arrow-up" /></span>
    </div>
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
  },
  data () {
    return {
      replyList: this.replies,
      showMore: false
    }
  },
  computed: {
    first3list () {
      return this.replyList.length > 3 ? this.replyList.slice(0, 3) : this.replyList
    },
    showList () {
      return this.showMore ? this.replyList : this.first3list
    }
  },
  watch: {
    replies (v) {
      this.replyList = v
    }
  },
  methods: {
    unfold () {
      this.showMore = true
    },
    packUp () {
      this.showMore = false
    },
    update () {
      this.showMore = true
    }
  }
}
</script>

<style lang="less" scoped>
.show-more {
  padding-top: 4px;
  padding-left: 10px;
  color: #41b883;
  font-size: 15px;
  cursor: pointer;
}
</style>
