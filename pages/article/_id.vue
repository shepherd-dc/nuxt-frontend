<template>
  <div class="article-detail">
    <el-row
      :gutter="width > 1080 ? 10 : 0"
      type="flex"
    >
      <el-col :span="width > 1080 ? 18 : 24">
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
        v-if="width > 1080"
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
import AsideCard from '~/components/AsideCard'
import URL from '~/globalurl'

export default {
  components: {
    AsideCard
  },
  async asyncData (context) {
    const { data } = await context.$axios.get(`${URL}/article/${context.params.id}`)
    // console.log(data)
    const articles = await context.$axios.get(`${URL}/article`)
    return {
      article: data.data,
      menuBread: data.data.menu_name,
      submenuBread: data.data.column_name,
      menu: data.data.en_name,
      articles_data: articles.data.data.data
    }
  },
  data () {
    return {
      title1: '最新'
    }
  },
  computed: {
    width () {
      return this.$store.state.width
    }
  },
  methods: {
    routerBreadMenu () {
      this.$router.push({
        path: `/${this.menu}`
      })
    },
    routerBreadSubmenu () {
      this.$router.push({
        path: `/${this.menu}/${this.submenuBread}`
      })
    }
  }
}
</script>

<style lang="less">
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
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .el-breadcrumb {
    line-height: 22px;
  }
  .el-button--text {
    color:#41b883;
  }
  .item {
  cursor: pointer;
  &:hover {
    color: #41b883;
  }
}

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  pre.ql-syntax {
    // background-color: #f6f8fa;
    background-color: #23241f;
    color: #e2edf8;
    font-family: "Consolas, Courier New, monospace, MicroSoft Yahei";
    line-height: 30px;
    padding: 16px;
    margin: 14px 0;
    overflow: auto;
  }
  blockquote {
    border-left: 4px solid #ccc;
    margin-bottom: 5px;
    margin-top: 5px;
    padding-left: 16px;
  }

</style>
