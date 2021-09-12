<template>
  <div class="comment-item">
    <div class="author-info">
      <div class="author-info__avatar">
        <el-avatar class="author-info__avatar" :size="44" icon="el-icon-user-solid" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </div>
      <div class="author-info__right">
        <div class="align-box">
          <div class="name">
            {{ commentDetail.from_name }}
          </div>
          <div class="desc">
            <span class="date">{{ commentDetail.create_time }}</span>
          </div>
          <div class="comment">
            <p class="comment-content" v-html="commentDetail.content" />
          </div>
          <MediaOperation :media-info="mediaInfo" is-reply @on-reply="handleReply" @on-like="handleLikeCallback" />
          <CommentTextarea v-show="showTextarea" ref="commentTextarea" :avatar-size="40" @submit="replyComment" @cancel="showTextarea=false" />
        </div>
        <div v-if="commentDetail.replies.length" class="replies-container">
          <ReplyList :replies="commentDetail.replies" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MediaOperation from '~/components/MediaOperation'
import CommentTextarea from '~/components/CommentTextarea'
import ReplyList from '~/components/list/ReplyList'
import { REPLY_SUBMIT, COMMENT_LIKE, COMMENT_DETAIL } from '~/api'

export default {
  components: {
    MediaOperation,
    CommentTextarea,
    ReplyList
  },
  props: {
    comment: {
      type: Object,
      default: () => ({})
    },
    likes: {
      type: Array,
      default: () => ({})
    }
  },
  data () {
    return {
      commentDetail: this.comment,
      showTextarea: false,
      isLiked: 0
    }
  },
  computed: {
    mediaInfo () {
      return {
        likes: this.commentDetail.likes,
        replies: this.commentDetail.replies.length,
        type: 'comment',
        type_id: this.commentDetail.id,
        isLiked: this.isLiked
      }
    }
  },
  watch: {
    comment (v) {
      this.commentDetail = v
    },
    likes: {
      handler (likes) {
        const ids = []
        likes.forEach((like) => {
          ids.push(like.type_id)
        })
        if (ids.includes(this.commentDetail.id)) {
          this.isLiked = 1
        }
      }
    }
  },
  methods: {
    handleReply () {
      this.showTextarea = !this.showTextarea
      this.$nextTick(() => {
        this.$refs.commentTextarea.focus()
      })
    },
    async replyComment (content) {
      if (!content) {
        this.$message({
          showClose: true,
          message: '请填写回复内容',
          type: 'warning'
        })
        return
      }
      const formData = {}
      formData.reply_type = 'comment'
      formData.topic_id = this.commentDetail.topic_id
      formData.topic_type = this.commentDetail.topic_type
      formData.content = content
      formData.comment_id = this.commentDetail.id
      formData.to_uid = this.commentDetail.from_uid
      formData.to_name = this.commentDetail.from_name
      // console.log(formData)
      const res = await this.$axios.post(REPLY_SUBMIT, formData)
      if (res.error_code === 0) {
        this.$refs.commentTextarea.clear()
        this.showTextarea = false
        this.$bus.$emit('updateComments')
      }
    },
    async getComment () {
      const commentRes = await this.$axios.get(`${COMMENT_DETAIL}/${this.commentDetail.id}`)
      if (commentRes.error_code === 0) {
        const { data } = commentRes
        this.commentDetail = data
      }
    },
    async getLike () {
      const likeRes = await this.$axios.get(`${COMMENT_LIKE}/${this.commentDetail.id}`)
      if (likeRes.error_code === 0) {
        const { data } = likeRes
        this.isLiked = data.is_liked
      }
    },
    handleLikeCallback () {
      this.getComment()
      this.getLike()
    }
  }
}
</script>

<style lang="less" scoped>
  .comment-item {
    padding: 15px 0;
    border-bottom: 1px solid #f3f3f3;
  }
  .author-info {
    display: flex;
    &__avatar {
      width: 44px;
    }
    &__right {
      flex: 1;
      text-align: left;
      line-height: 1.5;
      margin-left: 10px;
      .name {
        color: #333;
      }
      .desc {
        color: #999;
        .date {
          margin-right: 10px;
        }
      }
    }
  }
  .comment {
    margin-top: 10px;
    color: #333;
    line-height: 1.5;
    &-content {
      white-space: pre-line;
    }
  }
  .replies-container {
    margin-top: 10px;
  }
</style>
