<template>
  <div class="detail">
    <el-row
      :gutter="isPC ? 10 : 0"
      type="flex"
    >
      <el-col :span="isPC ? 18 : 24">
        <el-card class="box-card">
          <div
            slot="header"
            class="head"
          >
            <el-breadcrumb separator=">">
              <el-breadcrumb-item :to="{ path: '/' }">
                首页
              </el-breadcrumb-item>
              <el-breadcrumb-item>全部文章</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="content">
            <div
              v-for="data in list"
              :key="data.id"
              class="text item list"
              @click="routerToDetail(data.id)"
            >
              <h4>
                {{ data.title }}
                <el-tag
                  :type="type[data.en_name]"
                  class="tag"
                  size="mini"
                >
                  {{ data.column_name | capitalize }}
                </el-tag>
              </h4>
              <span class="time">{{ data.create_time }}</span>
            </div>
          </div>
        </el-card>
        <pagination
          v-show="total > 0"
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
          :show_more="false"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AsideCard from '~/components/AsideCard'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  components: {
    AsideCard,
    Pagination
  },
  async asyncData ({ $axios }) {
    const listQuery = {
      page: 1,
      limit: 10,
      menu_id: undefined,
      column_id: undefined
    }
    const articles = await $axios.get('/article', {
      params: { ...listQuery }
    })

    if (articles.error_code === 0) {
      const { data } = articles
      return {
        articles_data: data.data,
        total: data.total
      }
    }
  },
  data () {
    return {
      title: '全部文章',
      title1: '推荐',
      type: {
        frontend: 'success',
        backend: 'danger',
        database: 'primary',
        deploy: 'warning'
      },
      total: 10,
      list: [],
      listQuery: {
        page: 1,
        limit: 10,
        menu_id: undefined,
        column_id: undefined
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
    // 翻页请求接口
    async getList () {
      const res = await this.$axios.get('/article', {
        params: { ...this.listQuery }
      })
      if (res.error_code === 0) {
        const { data } = res
        this.list = data.data
        this.total = data.total
      }
    },
    routerToDetail (id) {
      this.$router.push({
        path: `/article/${id}`
      })
    }
  }
}
</script>

<style lang="less">
  .detail {
    padding-top: 80px;
    max-width: 1280px;
    margin: 0 auto;
  }
  .head {
    padding: 0 30px;
    font-size: 14px;
  }
  .title {
    text-align: center;
    line-height: 56px;
  }
  .author {
    text-align: center;
    line-height: 36px;
    margin-bottom: 40px;
  }
  .content {
    padding: 0 30px;
    .list {
      display: flex;
      justify-content: space-between;
      h4 {
        font-weight: 600;
        .tag {
          font-weight: normal;
          margin-left: 10px;
        }
      }
      .time {
        color: #999;
      }
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
