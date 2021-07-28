<template>
  <div class="comment-item">
    <div class="author-info">
      <div class="author-info__avatar">
        <el-avatar class="author-info__avatar" :size="44" icon="el-icon-user-solid" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </div>
      <div class="author-info__right">
        <div class="align-box">
          <div class="name">
            {{ comment.from_name }}
          </div>
          <div class="desc">
            <span class="date">{{ comment.create_time }}</span>
          </div>
          <div class="comment">
            <p class="comment-content" v-html="comment.content" />
          </div>
          <MediaOperation is-reply @on-reply="handleReply" />
          <CommentTextarea v-show="showTextarea" ref="commentTextarea" :avatar-size="40" @submit="replyComment" @cancel="showTextarea=false" />
        </div>
        <div v-if="comment.replies.length" class="replies-container">
          <ReplyList :replies="comment.replies" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MediaOperation from '~/components/MediaOperation'
import CommentTextarea from '~/components/CommentTextarea'
import ReplyList from '~/components/list/ReplyList'
import { REPLY_SUBMIT } from '~/api'

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
    }
  },
  data () {
    return {
      showTextarea: false
    }
  },
  computed: {
    ...mapGetters([
      'SNtoken'
    ])
  },
  methods: {
    handleReply () {
      this.showTextarea = !this.showTextarea
      this.$nextTick(() => {
        this.$refs.commentTextarea.focus()
      })
    },
    async replyComment (content) {
      // console.log('this.SNtoken', this.SNtoken)
      if (!this.SNtoken) {
        this.$message({
          showClose: true,
          message: '请登录后操作',
          type: 'warning'
        })
        return
      }
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
      formData.topic_id = this.comment.topic_id
      formData.topic_type = this.comment.topic_type
      formData.content = content
      formData.comment_id = this.comment.id
      formData.to_uid = this.comment.from_uid
      formData.to_name = this.comment.from_name
      // console.log(formData)
      const res = await this.$axios.post(REPLY_SUBMIT, formData)
      if (res.error_code === 0) {
        this.$refs.commentTextarea.clear()
        this.showTextarea = false
        this.$bus.$emit('updateComments')
      }
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
