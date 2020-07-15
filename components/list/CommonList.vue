<template>
  <section>
    <div class="container">
      <div class="content">
        <el-row
          :gutter="isPC ? 10 : 0"
          type="flex"
        >
          <el-col :span="isPC ? 18 : 24">
            <main-card
              :card_data="card_data"
              :islist="islist"
            />
            <article-list :articles_data="list" />
            <pagination
              v-show="total > 10"
              :total="total"
              :page.sync="listQuery.page"
              :limit.sync="listQuery.limit"
              @pagination="getList"
            />
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
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { ARTICLE_LIST } from '~/api'
import MainCard from '~/components/card/MainCard'
import AsideCard from '~/components/card/AsideCard'
import ArticleList from '~/components/list/ArticleList'
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
    ...mapGetters([
      'isPC'
    ])
  },
  created () {
    // this.list = [...this.articles_data]
    this.getList()
  },
  methods: {
    async getList () {
      const res = await this.$axios.get(ARTICLE_LIST, {
        params: { ...this.listQuery }
      })
      if (res.error_code === 0) {
        const { data } = res
        this.list = data.data
        this.total = data.total
      }
    }
  }
}
</script>
