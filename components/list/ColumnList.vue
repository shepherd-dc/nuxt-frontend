<template>
  <section>
    <div class="container">
      <div class="content">
        <el-row
          :gutter="isPC ? 10 : 0"
          type="flex"
        >
          <el-col :span="isPC ? 18 : 24">
            <template v-if="single">
              <col-card :column_data="column_data" />
            </template>

            <template v-else>
              <main-card :card_data="card_data" :islist="islist" />
            </template>

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
import ColCard from '~/components/card/ColCard'
import AsideCard from '~/components/card/AsideCard'
import ArticleList from '~/components/list/ArticleList'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  components: {
    MainCard,
    ColCard,
    AsideCard,
    ArticleList,
    Pagination
  },
  props: {
    card_data: {
      type: Object,
      default: () => ({})
    },
    articles_data: {
      type: Array,
      default: () => []
    },
    menu_id: {
      type: String,
      default: ''
    },
    single: {
      type: Boolean,
      default: false
    },
    column_id: {
      type: String,
      default: ''
    },
    column_data: {
      type: Object,
      default: () => ({})
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
        menu_id: '',
        column_id: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'isPC'
    ])
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      if (this.menu_id) {
        this.listQuery.menu_id = this.menu_id
      }
      if (this.column_id) {
        this.listQuery.column_id = this.column_id
      }
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
