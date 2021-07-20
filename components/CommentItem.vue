<template>
  <div class="comment-item">
    <div class="author-info">
      <el-avatar :size="44" icon="el-icon-user-solid" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <div class="author-info__right">
        <div class="align-box">
          <div class="name">
            {{ comment.from_name }}
          </div>
          <div class="desc">
            <span class="date">{{ comment.create_time }}</span>
          </div>
          <div class="comment">
            <p class="comment-content" v-html="comment.content" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="less" scoped>
  .comment-item {
    padding: 15px 0;
    border-bottom: 1px solid #f3f3f3;
  }
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
      }
    }
  }
  .comment {
    margin-top: 10px;
    color: #333;
    line-height: 1.5;
    &-content {
      white-space: pre-line;
    }
  }
</style>
