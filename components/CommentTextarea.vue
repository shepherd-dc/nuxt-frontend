<template>
  <div class="comment-textarea">
    <div class="comment-textarea__avatar" :style="{width: avatarSize + 'px'}">
      <el-avatar :size="avatarSize" icon="el-icon-user-solid" :src="avatar" />
    </div>
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
import { mapGetters } from 'vuex'
import { loginRequired } from '@/utils/auth'
export default {
  inject: {
    tokenInfo: {
      default: () => ({})
    }
  },
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
      showButtons: false,
      valid: this.tokenInfo.valid
    }
  },
  computed: {
    ...mapGetters([
      'avatar'
    ])
  },
  watch: {
    tokenInfo: {
      deep: true,
      handler (v) {
        this.valid = v.valid
      }
    }
  },
  methods: {
    onFocus () {
      this.$emit('focus')
      this.showButtons = true
    },
    onCancel () {
      this.$emit('cancel')
      this.showButtons = false
    },
    onSubmit () {
      if (!loginRequired(this)) { return }
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
      }
    }
  }
  .button-group {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
</style>
