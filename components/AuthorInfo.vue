<template>
  <div class="author-info">
    <el-avatar :size="avatarSize" icon="el-icon-user-solid" :src="avatarSrc || authorInfo.avatar" />
    <div class="author-info__right">
      <div class="align-box">
        <div class="name" :style="authorBold ? {fontWeight: 'bold'} : ''">
          {{ authorInfo.name }}
        </div>
        <div class="desc">
          <slot>
            <span class="date">{{ authorInfo.date }}</span>
            <span v-if="showView"><i class="el-icon-view" /><span class="view-num">{{ authorInfo.views }}</span></span>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    authorInfo: {
      type: Object,
      default: () => ({})
    },
    avatarSize: {
      type: Number,
      default: 50
    },
    avatarSrc: {
      type: String,
      default: ''
      // default: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    },
    authorBold: {
      type: Boolean,
      default: true
    },
    showView: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
  .author-info {
    display: flex;
    &__right {
      flex: 1;
      display: flex;
      align-items: center;
      text-align: left;
      line-height: 1.5;
      margin-left: 10px;
      .name {
        color: #333;
      }
      .desc {
        color: #999;
        .date {
          margin-right: 10px;
        }
        .view-num {
          margin-left: 4px;
          &::after {
            content: '浏览';
            margin-left: 4px;
          }
        }
      }
    }
  }
</style>
