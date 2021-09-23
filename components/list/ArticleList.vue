<template>
  <div class="article-card-list" :class="total > 10 ? '' : 'no-pager'">
    <el-card v-if="hasCard" class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>文章列表</span>
      </div>
      <div
        v-for="article in list"
        :key="article.id"
        class="text item list"
      >
        <ArticleCardItem :article="article" :my-likes="articlesLikes" :my-stars="articlesStars" />
      </div>
    </el-card>
    <template v-else>
      <div
        v-for="article in list"
        :key="article.id"
        class="text item list"
      >
        <ArticleCardItem :article="article" :my-likes="articlesLikes" :my-stars="articlesStars" />
      </div>
    </template>
    <pagination
      v-show="total > 10"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import ArticleCardItem from '@/components/item/ArticleCardItem.vue'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { ARTICLE_LIST, ARTICLES_LIKES, ARTICLES_STARS } from '~/api'
import tokenMixin from '@/mixins/token'

export default {
  components: {
    ArticleCardItem,
    Pagination
  },
  mixins: [tokenMixin],
  props: {
    hasCard: {
      type: Boolean,
      default: true
    },
    listApi: {
      type: String,
      default: ''
    },
    articlesData: {
      type: Array,
      default: () => []
    },
    articlesTotal: {
      type: Number,
      default: 0
    },
    menu_id: {
      type: String,
      default: ''
    },
    column_id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      total: this.articlesTotal,
      list: this.articlesData,
      listQuery: {
        page: 1,
        limit: 10,
        menu_id: '',
        column_id: ''
      },
      articlesLikes: [],
      articlesStars: []
    }
  },
  computed: {
    idList () {
      const ids = []
      this.list.forEach((article) => {
        ids.push(article.id)
      })
      return btoa(ids.join(','))
    }
  },
  watch: {
    articlesData (v) {
      this.list = v
      this.init()
    },
    articlesTotal (v) {
      this.total = v
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.listApi) {
        this.checkToken(this.getList)
        return
      }
      if (this.idList) {
        this.checkToken(this.getMediaData)
      }
    },
    getMediaData () {
      this.getArticlesLikes()
      this.getArticlesStars()
    },
    async getList () {
      let api = ARTICLE_LIST
      if (this.listApi) {
        api = this.listApi
      }
      if (this.menu_id) {
        this.listQuery.menu_id = this.menu_id
      }
      if (this.column_id) {
        this.listQuery.column_id = this.column_id
      }
      const res = await this.$axios.get(api, {
        params: { ...this.listQuery }
      })
      if (res.error_code === 0) {
        const { data } = res
        this.list = data.data
        this.total = data.total
        this.getMediaData()
      }
    },
    async getArticlesLikes () {
      const likeRes = await this.$axios.get(`${ARTICLES_LIKES}?list=${this.idList}`)
      if (likeRes.error_code === 0) {
        const { data } = likeRes
        this.articlesLikes = data
      }
    },
    async getArticlesStars () {
      const starRes = await this.$axios.get(`${ARTICLES_STARS}?list=${this.idList}`)
      if (starRes.error_code === 0) {
        const { data } = starRes
        this.articlesStars = data
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-card__body {
  padding: 0 20px;
}

.article-card-list {
  &.no-pager {
    margin-bottom: 10px;
  }
  .list.item {
    margin: 0!important;
    padding: 10px 0;
    border-bottom: 1px solid #f3f3f3;
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      color: #333!important;
    }
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

</style>
