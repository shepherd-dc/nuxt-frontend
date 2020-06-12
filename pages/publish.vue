<template>
  <div class="publish">
    <el-row>
      <el-col
        :span="width > 1080 ? 18 : 24"
        :offset="width > 1080 ? 3 : 0"
      >
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix publish-head"
          >
            <span>发表文章</span>
          </div>
          <div class="item-body">
            <el-form
              ref="form"
              :model="form"
              label-width="80px"
            >
              <el-form-item label="文章标题">
                <el-input v-model="form.title" />
              </el-form-item>
              <el-form-item label="文章内容">
                <quill-editor @deliverContent="handleContent" />
                <!-- <el-input
                  v-model="form.desc"
                  type="textarea"></el-input> -->
              </el-form-item>
              <el-form-item label="版块栏目">
                <el-select
                  v-model="form.column_id"
                  placeholder="请选择"
                  clearable
                >
                  <el-option-group
                    v-for="group in menus"
                    :key="group.id"
                    :label="group.menu_name"
                  >
                    <el-option
                      v-for="item in group.submenu"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id+'-'+item.path"
                    />
                  </el-option-group>
                </el-select>
              </el-form-item>

              <!-- <el-form-item label="活动性质">
                <el-checkbox-group v-model="form.type">
                  <el-checkbox
                    label="美食/餐厅线上活动"
                    name="type"></el-checkbox>
                  <el-checkbox
                    label="地推活动"
                    name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="特殊资源">
                <el-radio-group v-model="form.resource">
                  <el-radio label="线上品牌商赞助"></el-radio>
                  <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
              </el-form-item> -->

              <el-form-item>
                <el-button
                  type="success"
                  @click="onSubmit"
                >
                  发表
                </el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import URL from '~/globalurl'
import QuillEditor from '~/components/QuillEditor'

export default {
  components: {
    QuillEditor
  },
  data () {
    return {
      form: {
        title: '',
        column_id: '',
        content: ''
      }
    }
  },
  // async fetch ({ app }) {
  //   let { data } = await app.$axios.get(`${URL}/menu`)
  //   await app.store.commit('ADD_MENUS', data)
  // },
  computed: {
    ...mapGetters([
      'menus',
      'width'
    ])
  },
  methods: {
    async onSubmit () {
      const formData = this.form
      const column = formData.column_id.split('-')
      formData.column_id = column[0]
      const routePath = column[1]
      const { data } = await this.$axios.post(`${URL}/article/publish`, formData)
      // console.log(data)
      if (data.error_code === 0) {
        this.$router.replace({
          path: `/${routePath}`
        })
      }
    },
    handleContent (html) {
      // console.log(html)
      this.form.content = html
    }
  }
}
</script>

<style lang="less" scoped>
  .publish {
    padding-top: 60px;
    min-height: 92vh;
  }
  .box-card {
    margin-top: 30px;
    .publish-head {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }
    .item-body {
      padding-right: 30px;
    }
  }
</style>
