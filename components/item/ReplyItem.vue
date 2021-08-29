<template>
  <div class="reply-item">
    <div class="reply-author-info">
      <div class="reply-author-info__avatar">
        <el-avatar :size="44" icon="el-icon-user-solid" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </div>
      <div class="reply-author-info__right">
        <div class="align-box">
          <div class="name">
            <span>{{ replyDetail.from_name }}</span>
            <span class="reply-object">回复</span>
            <span>{{ replyDetail.to_name }}</span>
          </div>
          <div class="desc">
            <span class="date">{{ replyDetail.create_time }}</span>
          </div>
          <div class="reply">
            <p class="reply-content" v-html="replyDetail.content" />
          </div>
          <MediaOperation :media-info="mediaInfo" is-reply @on-reply="handleReply" @on-like="handleLikeCallback" />
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
import { REPLY_SUBMIT, REPLY_LIKE, REPLY_DETAIL } from '~/api'

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
      replyDetail: this.reply,
      showTextarea: false,
      isLiked: 0
    }
  },
  computed: {
    ...mapGetters([
      'SNtoken'
    ]),
    mediaInfo () {
      return {
        likes: this.replyDetail.likes,
        type: 'reply',
        type_id: this.replyDetail.id,
        isLiked: this.isLiked
      }
    }
  },
  watch: {
    reply (v) {
      this.replyDetail = v
    }
  },
  mounted () {
    if (this.SNtoken) {
      this.getLike()
    }
  },
  methods: {
    handleReply () {
      this.showTextarea = !this.showTextarea
      this.$nextTick(() => {
        this.$refs.commentTextarea.focus()
      })
    },
    async replyReply (content) {
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
      formData.reply_type = 'reply'
      formData.topic_id = this.replyDetail.topic_id
      formData.topic_type = this.replyDetail.topic_type
      formData.content = content
      formData.comment_id = this.replyDetail.comment_id
      formData.reply_id = this.replyDetail.id
      formData.to_uid = this.replyDetail.from_uid
      formData.to_name = this.replyDetail.from_name
      console.log(formData)
      const res = await this.$axios.post(REPLY_SUBMIT, formData)
      if (res.error_code === 0) {
        this.$refs.commentTextarea.clear()
        this.showTextarea = false
        this.$bus.$emit('updateComments')
      }
    },
    async getReply () {
      const replyRes = await this.$axios.get(`${REPLY_DETAIL}/${this.replyDetail.id}`)
      if (replyRes.error_code === 0) {
        const { data } = replyRes
        this.replyDetail = data
      }
    },
    async getLike () {
      const likeRes = await this.$axios.get(`${REPLY_LIKE}/${this.replyDetail.id}`)
      if (likeRes.error_code === 0) {
        const { data } = likeRes
        this.isLiked = data.is_liked
      }
    },
    handleLikeCallback () {
      this.getReply()
      this.getLike()
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
