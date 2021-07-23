<template>
  <div class="reply-item">
    <div class="author-info">
      <el-avatar :size="44" icon="el-icon-user-solid" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <div class="author-info__right">
        <div class="align-box">
          <div class="name">
            {{ reply.from_name || '昵称' }}
          </div>
          <div class="desc">
            <span class="date">{{ reply.create_time }}</span>
          </div>
          <div class="reply">
            <p class="reply-content" v-html="reply.content" />
          </div>
          <MediaOperation is-reply @on-reply="handleReply" />
          {{ reply }}
          <CommentTextarea v-show="showTextarea" ref="commentTextarea" :avatar-size="40" @submit="replyReply" />
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
      console.log(formData)
      formData.reply_id = this.reply.id
      formData.to_uid = this.reply.from_uid
      formData.to_name = this.reply.from_name
      // console.log(formData)
      const res = await this.$axios.post(REPLY_SUBMIT, formData)
      if (res.error_code === 0) {
        this.$refs.commentTextarea.clear()
        // TODO: updateComment
        console.log('updateComment', res)
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
  .author-info {
    display: flex;
    &__right {
      flex: 1;
      display: flex;
      align-items: center;
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
    &-content {
      white-space: pre-line;
    }
  }
</style>
