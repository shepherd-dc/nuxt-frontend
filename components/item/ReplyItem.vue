<template>
  <div class="reply-item">
    <div class="reply-author-info">
      <div class="reply-author-info__avatar">
        <el-avatar :size="44" icon="el-icon-user-solid" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </div>
      <div class="reply-author-info__right">
        <div class="align-box">
          <div class="name">
            <span>{{ reply.from_name }}</span>
            <span class="reply-object">回复</span>
            <span>{{ reply.to_name }}</span>
          </div>
          <div class="desc">
            <span class="date">{{ reply.create_time }}</span>
          </div>
          <div class="reply">
            <p class="reply-content" v-html="reply.content" />
          </div>
          <MediaOperation is-reply @on-reply="handleReply" />
          <CommentTextarea v-show="showTextarea" ref="commentTextarea" :avatar-size="40" @submit="replyReply" @cancel="showTextarea=false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MediaOperation from '~/components/MediaOperation'
import CommentTextarea from '~/components/CommentTextarea'
import { REPLY_SUBMIT } from '~/api'

export default {
  components: {
    MediaOperation,
    CommentTextarea
  },
  props: {
    reply: {
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
    async replyReply (content) {
      console.log('this.SNtoken', this.SNtoken)
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
      formData.reply_type = 'reply'
      formData.topic_id = this.reply.topic_id
      formData.topic_type = this.reply.topic_type
      formData.content = content
      formData.comment_id = this.reply.comment_id
      formData.reply_id = this.reply.id
      formData.to_uid = this.reply.from_uid
      formData.to_name = this.reply.from_name
      console.log(formData)
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
  .reply-item {
    padding: 10px 0;
    border-top: 1px solid #f3f3f3;
  }
  .reply-author-info {
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
  .reply {
    margin-top: 10px;
    color: #333;
    line-height: 1.5;
    &-object {
      color: #41b883;
    }
    &-content {
      white-space: pre-line;
    }
  }
</style>
