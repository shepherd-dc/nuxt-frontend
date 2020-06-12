<template>
  <section>
    <div class="container">
      <div class="content">
        <el-row
          :gutter="width > 1080 ? 10 : 0"
          type="flex"
        >
          <el-col :span="width > 1080 ? 18 : 24">
            <main-card
              :card_data="card_data"
              :islist="islist"
            />
            <article-list :articles_data="list" />
            <pagination
              v-show="total>10"
              :total="total"
              :page.sync="listQuery.page"
              :limit.sync="listQuery.limit"
              @pagination="getList"
            />
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
    </div>
  </section>
</template>

<script>
import URL from '~/globalurl'
import MainCard from '~/components/MainCard'
import AsideCard from '~/components/AsideCard'
import ArticleList from '~/components/ArticleList'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  components: {
    MainCard,
    AsideCard,
    ArticleList,
    Pagination
  },
  props: {
    card_data: {
      type: Object,
      default: () => {}
    },
    articles_data: {
      type: Array,
      default: () => {}
    },
    menu_id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      islist: false,
      title1: '最新',
      total: 10,
      list: [],
      listQuery: {
        page: 1,
        limit: 10,
        menu_id: this.menu_id
      }
    }
  },
  computed: {
    width () {
      return this.$store.state.width
    }
  },
  created () {
    // this.list = [...this.articles_data]
    this.getList()
  },
  methods: {
    async getList () {
      const { data } = await this.$axios.get(`${URL}/article`, {
        params: { ...this.listQuery }
      })
      this.list = data.data.data
      this.total = data.data.total
    }
  }
}
</script>

<style>
  .container {
    padding-top: 60px;
  }
  .content {
    max-width: 1280px;
    margin: 10px auto;
    padding-top: 10px;
  }
  .page-container {
    margin: 0 auto;
  }
</style>
