<template>
  <div class="media-operation">
    <span class="operation-icon thumb" :class="liked ? 'active' : ''" @click="like">
      <i class="el-icon-thumb" /> 点赞 {{ mediaInfo.likes }}
    </span>
    <span v-if="!isReply" class="operation-icon star" :class="stared ? 'active' : ''" @click="star">
      <i :class="stared ? 'el-icon-star-on' : 'el-icon-star-off'" /> 收藏 {{ mediaInfo.stars }}
    </span>
    <span class="operation-icon comment" @click="onComment"><i class="el-icon-chat-line-square" /> {{ isReply ? `回复 ${replies}` : `评论 ${mediaInfo.comments}` }}</span>
    <!-- <span v-if="!isReply" class="operation-icon share"><i class="el-icon-position" /> 转发</span> -->
  </div>
</template>

<script>
import { throttle } from 'lodash'
import { mapGetters } from 'vuex'
import { ARTICLE_LIKE, COMMENT_LIKE, REPLY_LIKE, ARTICLE_STAR } from '~/api'

export default {
  props: {
    isReply: {
      type: Boolean,
      default: false
    },
    mediaInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      liked: 0,
      stared: 0
    }
  },
  computed: {
    ...mapGetters([
      'SNtoken'
    ]),
    replies () {
      if (this.mediaInfo.replies === undefined) { return '' }
      return this.mediaInfo.replies
    },
    likeApi () {
      let api
      switch (this.mediaInfo.type) {
        case 'article':
          api = ARTICLE_LIKE
          break
        case 'comment':
          api = COMMENT_LIKE
          break
        case 'reply':
          api = REPLY_LIKE
          break
        default:
          break
      }
      return api
    }
  },
  watch: {
    mediaInfo: {
      deep: true,
      handler (v) {
        this.liked = v.isLiked
        this.stared = v.isStared
      }
    }
  },
  methods: {
    onComment () {
      const eventName = this.isReply ? 'on-reply' : 'on-comment'
      this.$emit(eventName)
    },
    async like () {
      if (!this.SNtoken) {
        this.$message({
          showClose: true,
          message: '请登录后操作',
          type: 'warning'
        })
        return
      }
      if (this.liked) {
        this.$message({
          showClose: true,
          message: '您已经点过赞了',
          type: 'success'
        })
        return
      }
      await this.likeRequest()
      this.$emit('on-like')
    },
    async likeRequest () {
      const formData = {
        type_id: this.mediaInfo.type_id
      }
      const res = await this.$axios.post(this.likeApi, formData)
      if (res.error_code === 0) {
        this.liked = 1
      }
    },
    star: throttle(async function () {
      await this.starRequest()
      this.$emit('on-star')
      const message = this.stared ? '收藏成功' : '取消收藏成功'
      const type = this.stared ? 'success' : 'info'
      this.$message({
        showClose: true,
        message,
        type
      })
    }, 1000),
    async starRequest () {
      const formData = {
        type_id: this.mediaInfo.type_id
      }
      let res
      if (this.stared) {
        res = await this.$axios.delete(ARTICLE_STAR, { data: formData })
        if (res.error_code === 0) {
          this.stared = 0
        }
      } else {
        res = await this.$axios.post(ARTICLE_STAR, formData)
        if (res.error_code === 0) {
          this.stared = 1
        }
      }
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
      &.active {
        color: #41b883;
      }
    }
  }
</style>
