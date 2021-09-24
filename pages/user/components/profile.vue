<template>
  <el-dialog title="编辑资料" :visible.sync="dialogVisible" @close="handleClose">
    <el-form :model="form">
      <el-form-item label="头像" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          action="#"
          list-type="picture-card"
          :limit="1"
          :on-exceed="handleExceed"
          :on-success="handleAvatarSuccess"
          :on-remove="handleRemove"
          :before-upload="beforeAvatarUpload"
        >
          <i class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input v-model="nickname" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hide">
        取 消
      </el-button>
      <el-button type="primary" @click="handleConfirm">
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { EDIT_USER_INFO } from '@/api'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      dialogVisible: this.visible,
      nickname: this.userInfo.nickname,
      form: {
        email: this.userInfo.email
      },
      formLabelWidth: '60px'
    }
  },
  watch: {
    visible (v) {
      this.dialogVisible = v
    },
    userInfo (v) {
      this.nickname = v.nickname
      this.form.email = v.email
    }
  },
  methods: {
    async handleConfirm () {
      await this.save()
      this.hide()
    },
    handleClose () {
      this.hide()
    },
    hide () {
      this.$emit('update:visible', false)
    },
    async save () {
      const formData = this.form
      const res = await this.$axios.put(EDIT_USER_INFO, formData)
      if (res.error_code === 0) {
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success'
        })
      }
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB')
      }
      return isLt2M
    },
    handleExceed (files, fileList) {
      this.$message.warning('只能上传1张头像，请删除当前头像后再试')
    },
    handleAvatarSuccess (res, file) {
      console.log(res, file)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/settings.scss';

.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: $--color-primary;;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
</style>
