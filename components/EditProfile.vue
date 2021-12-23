<template>
  <el-dialog title="编辑资料" :visible.sync="dialogVisible" @close="hide">
    <el-form :model="form">
      <el-form-item label="头像" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          :action="imageApi"
          list-type="picture-card"
          :file-list="fileList"
          :limit="1"
          :accept="accept"
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
import { EDIT_USER_INFO, UPLOAD_IMAGE } from '@/api'
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
        email: this.userInfo.email,
        avatar: this.userInfo.avatar
      },
      formLabelWidth: '60px',
      accept: '.jpg,.jpeg,.png,.gif',
      fileList: []
    }
  },
  computed: {
    imageApi () {
      const host = process.env.BASE_URL
      return process.env.NODE_ENV === 'production' ? UPLOAD_IMAGE : host + UPLOAD_IMAGE
    }
  },
  watch: {
    visible (v) {
      this.dialogVisible = v
    },
    userInfo (v) {
      this.nickname = v.nickname
      this.form.email = v.email
      this.form.avatar = v.avatar
      const filename = v.avatar.split('/')
      const name = filename[filename.length - 1]
      this.fileList = [{
        name,
        url: v.avatar
      }]
    }
  },
  methods: {
    async handleConfirm () {
      await this.save()
      this.hide()
    },
    hide () {
      this.dialogVisible = false
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
        this.$store.commit('user/SET_AVATAR', formData.avatar)
      }
    },
    beforeAvatarUpload (file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf('.'))
      const whiteList = this.accept.split(',')
      if (!whiteList.includes(fileSuffix)) {
        this.$message.error(`上传文件只能是${whiteList.join(', ')}格式`)
        return false
      }

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
      if (res.error_code === 0) {
        const { filename: name, path } = res.data
        const url = process.env.NODE_ENV === 'production' ? path : process.env.BASE_URL + path
        const fileItem = { name, url }
        this.fileList = [fileItem]
        this.form.avatar = url
      }
    },
    async handleRemove (file, fileList) {
      await this.$axios.delete(`${UPLOAD_IMAGE}/${file.name}`)
      this.fileList = []
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
