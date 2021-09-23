<template>
  <div class="user-home">
    <el-card class="box-card">
      <div class="user-info">
        <AuthorInfo :author-info="authorInfo" :avatar-size="80" avatar-src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
          <div class="user-data">
            <span class="user-data__item">文章<span class="user-data__item--number">{{ statistics.article_num }}</span></span>
            <span class="user-data__item">收藏<span class="user-data__item--number">{{ statistics.article_star_num }}</span></span>
            <span class="user-data__item">点赞<span class="user-data__item--number">{{ statistics.article_like_num }}</span></span>
          </div>
        </AuthorInfo>
        <div class="user-info__edit">
          <el-button type="success" icon="el-icon-edit">
            编辑资料
          </el-button>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <keep-alive>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="我的文章" name="1">
            <ArticleList
              v-if="activeName === '1'"
              :has-card="false"
              :articles-data="myArticlesData"
              :articles-total="myArticlesTotal"
              :list-api="api"
            />
          </el-tab-pane>
          <el-tab-pane label="我的收藏" name="2">
            <ArticleList
              v-if="activeName === '2'"
              :has-card="false"
              :articles-data="myArticlesData"
              :articles-total="myArticlesTotal"
              :list-api="api"
            />
          </el-tab-pane>
          <el-tab-pane label="我的点赞" name="3">
            <ArticleList
              v-if="activeName === '3'"
              :has-card="false"
              :articles-data="myArticlesData"
              :articles-total="myArticlesTotal"
              :list-api="api"
            />
          </el-tab-pane>
        </el-tabs>
      </keep-alive>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AuthorInfo from '~/components/AuthorInfo'
import ArticleList from '~/components/list/ArticleList'
import { MENU_LIST, USER_STATISTICS, MY_ARTICLES, MY_STARED_ARTICLES, MY_LIKED_ARTICLES } from '~/api'
import tokenMixin from '@/mixins/token'

export default {
  components: {
    AuthorInfo,
    ArticleList
  },
  mixins: [tokenMixin],
  async fetch ({ app }) {
    const { data } = await app.$axios.get(MENU_LIST)
    await app.store.commit('ADD_MENUS', data)
  },
  data () {
    return {
      activeName: '1',
      myArticlesData: [],
      myArticlesTotal: 0,
      statistics: {}
    }
  },
  computed: {
    ...mapGetters([
      'nickname'
    ]),
    authorInfo () {
      return {
        name: this.nickname
      }
    },
    api () {
      let api = MY_ARTICLES
      if (this.activeName === '2') {
        api = MY_STARED_ARTICLES
      } else if (this.activeName === '3') {
        api = MY_LIKED_ARTICLES
      }
      return api
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.checkToken(this.getUserStatistics)
    },
    async getUserStatistics () {
      const statistics = await this.$axios.get(USER_STATISTICS)
      if (statistics.error_code === 0) {
        const { data } = statistics
        this.statistics = data
      }
    },
    handleClick (tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>

<style lang="less" scoped>
.user-home {
  max-width: 1280px;
  margin: 0 auto;
}
.box-card {
  margin: 10px;
}
.user-info {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .user-avatar:hover {
    opacity: 0.7;
  }
  .user-data {
    display: flex;
    margin-top: 10px;
    &__item {
      margin-right: 10px;
      font-size: 14px;
      &--number {
        font-size: 20px;
        font-weight: bold;
        color: #333;
        padding-left: 5px;
      }
    }
  }
}
</style>
