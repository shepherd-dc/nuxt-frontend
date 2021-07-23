<template>
  <div class="comment-textarea">
    <el-avatar :size="avatarSize" icon="el-icon-user-solid" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <div class="comment-textarea__right">
      <div class="align-box">
        <el-input
          ref="inputTextarea"
          v-model="textarea"
          type="textarea"
          placeholder="请输入评论"
          resize="none"
          :autosize="{ minRows: 2}"
          @focus="onFocus"
        />
        <div v-show="showButtons" class="button-group">
          <el-button
            size="small"
            @click="onCancel"
          >
            取消
          </el-button>
          <el-button
            size="small"
            type="success"
            @click="onSubmit"
          >
            发表
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    avatarSize: {
      type: Number,
      default: 50
    },
    authorInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      textarea: '',
      showButtons: false
    }
  },
  methods: {
    onFocus () {
      this.$emit('focus')
      this.showButtons = true
    },
    onCancel () {
      this.showButtons = false
    },
    onSubmit () {
      this.$emit('submit', this.textarea)
    },
    clear () {
      this.textarea = ''
      this.showButtons = false
    },
    focus () {
      this.$refs.inputTextarea.focus()
    }
  }
}
</script>

<style lang="less" scoped>
  .comment-textarea {
    margin-top: 10px;
    display: flex;
    &__right {
      flex: 1;
      display: flex;
      align-items: center;
      text-align: left;
      line-height: 1.5;
      margin-left: 10px;
      .align-box {
        width: 100%;
        min-width: 750px;
      }
    }
  }
  .button-group {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
</style>
