<template>
  <div class="article-detail">
    <el-row
      :gutter="isPC ? 10 : 0"
      type="flex"
    >
      <el-col :span="isPC ? 18 : 24">
        <el-card class="box-card">
          <div
            slot="header"
            class="article-head"
          >
            <el-breadcrumb separator=">">
              <el-breadcrumb-item :to="{ path: '/' }">
                首页
              </el-breadcrumb-item>
              <el-breadcrumb-item><a @click.stop="routerBreadMenu">{{ menuBread }}</a></el-breadcrumb-item>
              <el-breadcrumb-item><a @click.stop="routerBreadSubmenu">{{ submenuBread | capitalize }}</a></el-breadcrumb-item>
              <el-breadcrumb-item>{{ article.title }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="article-content">
            <h2 class="article-title">
              {{ article.title }}
            </h2>
            <div class="article-author">
              <!-- <span>{{ article.author }} - {{ article.updatetime }}</span> -->
            </div>
            <div
              class="article"
              v-html="article.content"
            />
          </div>
        </el-card>
      </el-col>
      <el-col
        v-if="isPC"
        :span="6"
      >
        <aside-card
          :aside_title="title1"
          :aside_data="articles_data"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AsideCard from '~/components/card/AsideCard'
import { ARTICLE_LIST, ARTICLE_DETAIL } from '~/api'

export default {
  components: {
    AsideCard
  },
  async asyncData ({ $axios, params }) {
    let articleData = {}
    let articlesData = []
    const article = await $axios.get(`${ARTICLE_DETAIL}/${params.id}`)
    if (article.error_code === 0) {
      const { data } = article
      articleData = data
    }
    const articles = await $axios.get(ARTICLE_LIST)
    if (articles.error_code === 0) {
      const { data } = articles
      articlesData = data.data
    }
    return {
      article: articleData,
      menuBread: articleData.menu_name,
      submenuBread: articleData.column_name,
      menu: articleData.en_name,
      articles_data: articlesData
    }
  },
  data () {
    return {
      title1: '最新'
    }
  },
  computed: {
    ...mapGetters([
      'isPC'
    ])
  },
  mounted () {
    console.log(process.env.NODE_ENV, this.menu)
  },
  methods: {
    routerBreadMenu () {
      this.$router.push({
        path: `/column/${this.menu}`
      })
    },
    routerBreadSubmenu () {
      this.$router.push({
        path: `/column/${this.menu}/${this.submenuBread}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/styles/cover.less';
  .article-detail {
    padding-top: 80px;
    max-width: 1280px;
    margin: 0 auto;
  }
  .article-head {
    padding: 0 30px;
    font-size: 14px;
  }
  .article-title {
    text-align: center;
    line-height: 56px;
  }
  .article-author {
    text-align: center;
    line-height: 36px;
    margin-bottom: 40px;
  }
  .article-content {
    padding: 30px;
    p {
      // margin-bottom: 12px;
      font-family: "MicroSoft Yahei";
      line-height: 36px;
      text-indent: 2rem;
        img {
        display: block;
        margin: 0 auto;
        // width: 100%;
        max-width: 850px;
      }
    }
    h1, h2, h3, h4, h5, h6 {
      margin-bottom: 16px;
    }
    li {
      line-height: 36px;
    }
  }

</style>
