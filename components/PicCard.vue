<template>
  <el-row>
    <el-col>
      <el-card
        :body-style="{ padding: '0px' }"
        shadow="hover"
      >
        <img
          :src="sub_data.pic"
          class="image"
          @click="routerTo(sub_data.path, sub_data.name_en)"
        >
        <div class="text-info">
          <h4
            class="detail-title"
            @click="routerTo(sub_data.path, sub_data.name_en)"
          >
            {{ sub_data.name_zh | capitalize }}
          </h4>
          <div class="bottom clearfix">
            <time class="time">{{ sub_data.description | strSlice(16) }}</time>
            <el-button
              v-if="issublist"
              type="text"
              class="button"
              @click="routerTo(sub_data.path, sub_data.name_en)"
            >
              更多
            </el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    issublist: {
      type: Boolean,
      default: true
    },
    sub_data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    routerTo (path, name) {
      const menu = path.split('/')[0]
      this.$router.push({
        path: `/column/${menu}/${name}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .text-info {
    padding: 14px;
  }
  .detail-title {
    cursor: pointer;
    &:hover {
      color: #41b883;
    }
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
    cursor: pointer;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
