<template>
  <div class="comment-list">
    <el-card class="box-card">
      <div class="comment-header">
        全部评论
        <span>（{{ comments.total }}）</span>
      </div>
      <div v-for="c in list" :key="c.id">
        <CommentItem :comment="c" :likes="cLikes" />
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
import { COMMENT_LIST } from '~/api'

export default {
  components: {
    CommentItem,
    Pagination
  },
  props: {
    comments: {
      type: Object,
      default: () => ({})
    },
    commentsLikes: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      total: this.comments.total,
      list: this.comments.data,
      listQuery: {
        page: 1,
        limit: 5
      },
      cLikes: this.commentsLikes
    }
  },
  computed: {
    articleId () {
      return this.$route.params.id
    }
  },
  watch: {
    comments (v) {
      this.total = v.total
      this.list = v.data
    },
    commentsLikes (v) {
      this.cLikes = v
    }
  },
  created () {
    this.$bus.$on('updateComments', () => {
      this.getList()
    })
  },
  methods: {
    async getList () {
      const res = await this.$axios.get(`${COMMENT_LIST}/${this.articleId}`, {
        params: { ...this.listQuery }
      })
      if (res.error_code === 0) {
        const { data } = res
        this.list = data.data
        this.total = data.total
        // this.getMediaData()
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
