<template>
  <div class="comment-list">
    <el-card class="box-card">
      <div class="comment-header">
        全部评论
        <span>（{{ comments.total }}）</span>
      </div>
      <div v-for="c in list" :key="c.id">
        <CommentItem :comment="c" :likes="commentsLikes" />
      </div>
      <pagination
        v-show="total > 5"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </el-card>
  </div>
</template>

<script>
import CommentItem from '~/components/item/CommentItem'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { COMMENT_LIST, COMMENTS_LIKES, REPLIES_LIKES } from '~/api'

export default {
  components: {
    CommentItem,
    Pagination
  },
  inject: {
    tokenInfo: {
      default: () => ({})
    }
  },
  props: {
    comments: {
      type: Object,
      default: () => ({})
    }
  },
  provide () {
    return {
      repliesLikes: this.repliesLikes
    }
  },
  data () {
    return {
      total: this.comments.total,
      list: this.comments.data.sort((a, b) => b.likes - a.likes),
      listQuery: {
        page: 1,
        limit: 5
      },
      valid: this.tokenInfo.valid,
      commentsLikes: [],
      repliesLikes: {
        likes: []
      }
    }
  },
  computed: {
    articleId () {
      return this.$route.params.id
    },
    commentsIdList () {
      const ids = []
      this.list.forEach((comment) => {
        ids.push(comment.id)
      })
      return btoa(ids.join(','))
    },
    repliesIdList () {
      const ids = []
      this.list.forEach((comment) => {
        for (const reply of comment.replies) {
          ids.push(reply.id)
        }
      })
      return btoa(ids.join(','))
    }
  },
  watch: {
    comments (v) {
      this.total = v.total
      this.list = v.data
    },
    tokenInfo: {
      deep: true,
      handler (v) {
        this.valid = v.valid
        this.init()
      }
    }
  },
  created () {
    this.$bus.$on('updateComments', () => {
      this.getList()
    })
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.valid) {
        this.getCommentsLikes()
        this.getRepliesLikes()
      }
    },
    async getList () {
      const res = await this.$axios.get(`${COMMENT_LIST}/${this.articleId}`, {
        params: { ...this.listQuery }
      })
      if (res.error_code === 0) {
        const { data } = res
        this.list = data.data
        this.total = data.total
        this.init()
      }
    },
    async getCommentsLikes () {
      const likeRes = await this.$axios.get(`${COMMENTS_LIKES}?list=${this.commentsIdList}`)
      if (likeRes.error_code === 0) {
        const { data } = likeRes
        this.commentsLikes = data
      }
    },
    async getRepliesLikes () {
      const likeRes = await this.$axios.get(`${REPLIES_LIKES}?list=${this.repliesIdList}`)
      if (likeRes.error_code === 0) {
        const { data } = likeRes
        this.repliesLikes.likes = data
      }
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
