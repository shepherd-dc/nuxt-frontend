<template>
  <div class="user-home">
    <el-card class="box-card">
      <div class="user-info">
        <AuthorInfo :author-info="authorInfo" :avatar-size="80" avatar-src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
          <div class="user-data">
            <span class="user-data__item">文章<span class="user-data__item--number">5</span></span>
            <span class="user-data__item">收藏<span class="user-data__item--number">10</span></span>
            <span class="user-data__item">点赞<span class="user-data__item--number">100</span></span>
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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的文章" name="1">
          <ArticleList :has-card="false" />
        </el-tab-pane>
        <el-tab-pane label="我的收藏" name="2">
          <ArticleList :has-card="false" :articles-data="articlesData" :articles-total="articlesTotal" />
        </el-tab-pane>
        <el-tab-pane label="我的点赞" name="3">
          <ArticleList :has-card="false" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import AuthorInfo from '~/components/AuthorInfo'
import ArticleList from '~/components/list/ArticleList'
import { ARTICLE_LIST } from '~/api'
import tokenMixin from '@/mixins/token'

export default {
  components: {
    AuthorInfo,
    ArticleList
  },
  mixins: [tokenMixin],
  async asyncData ({ $axios, params, app }) {
    let articlesData = []
    let articlesTotal = 0
    const articles = await $axios.get(ARTICLE_LIST)
    if (articles.error_code === 0) {
      const { data } = articles
      articlesData = data.data
      articlesTotal = data.total
    }
    return {
      articlesData,
      articlesTotal
    }
  },
  data () {
    return {
      authorInfo: {
        name: '昵称'
      },
      activeName: '2'
    }
  },
  mounted () {
    console.log('articlesData:', this.articlesData)
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
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
