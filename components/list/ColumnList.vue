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

            <article-list :articles-data="articlesData" :articles-total="articlesTotal" :menu_id="menu_id" :column_id="column_id" />
          </el-col>
          <el-col
            v-if="isPC"
            :span="6"
          >
            <aside-card
              :aside_title="asideTitle"
              :aside_data="articlesData"
            />
          </el-col>
        </el-row>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import MainCard from '~/components/card/MainCard'
import ColCard from '~/components/card/ColCard'
import AsideCard from '~/components/card/AsideCard'
import ArticleList from '~/components/list/ArticleList'

export default {
  components: {
    MainCard,
    ColCard,
    AsideCard,
    ArticleList
  },
  props: {
    card_data: {
      type: Object,
      default: () => ({})
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
      asideTitle: '最新'
    }
  },
  computed: {
    ...mapGetters([
      'isPC'
    ])
  }
}
</script>
