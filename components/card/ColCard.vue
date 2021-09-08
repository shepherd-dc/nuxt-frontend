<template>
  <el-card class="box-card">
    <div
      slot="header"
      class="clearfix"
    >
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item><a @click.stop="routerBread">{{ column_data.menu_name }}</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ column_data.name_zh }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="text">
      <el-row type="flex">
        <el-col :span="isPC ? 8 : 24">
          <a
            :href="column_data.official_doc"
            target="_blank"
          >
            <div class="image">
              <img :src="column_data.pic">
            </div>
          </a>
        </el-col>
        <el-col :span="isPC ? 16 : 24">
          <div class="text-info">
            <h4 class="detail-title">
              {{ column_data.name_zh | capitalize }}
              <a
                :href="column_data.official_doc"
                target="_blank"
              >
                <el-button
                  style="float: right; padding: 5px 0"
                  type="text"
                >官方文档</el-button>
              </a>
            </h4>
            <div class="clearfix">
              <p class="description">
                {{ column_data.description }}
                <a
                  :href="column_data.official_doc"
                  target="_blank"
                >
                  <el-button
                    style="float: right; padding: 5px 0"
                    type="text"
                  > 更多 >></el-button>
                </a>
              </p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    column_data: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters([
      'isPC'
    ])
  },
  methods: {
    routerBread () {
      this.$router.push({
        path: `/column/${this.column_data.path.split('/')[0]}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin-bottom: 10px;
}

.text-info {
  padding: 0 0 0 20px;
}
.detail-title {
  font-size: 18px;
}

.description {
  font-size: 14px;
  color: #999;
  line-height: 28px;
  margin: 16px 0;
}

.image {
  height: 150px;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
  }
}

</style>
