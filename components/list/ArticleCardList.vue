<template>
  <div class="article-card-list">
    <div
      v-for="article in articlesData"
      :key="article.id"
      class="text item list"
      @click="routerToDetail(article.id)"
    >
      <div class="article-card-item">
        <AuthorInfo :author-info="{name: article.author || '佚名', date: article.create_time}" :author-bold="false" :show-view="false" :avatar-size="40" avatar-src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <div class="article-item">
          <h4 class="title">
            {{ article.title }}
          </h4>
          <p v-html="article.content" />
          <MediaOperation :media-info="mediaInfo" @on-reply="handleReply" @on-like="handleLikeCallback" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthorInfo from '~/components/AuthorInfo'
import MediaOperation from '~/components/MediaOperation'
import { ARTICLE_VIEW } from '~/api'
export default {
  components: {
    AuthorInfo,
    MediaOperation
  },
  props: {
    articlesData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      mediaInfo: {}
    }
  },
  methods: {
    routerToDetail (id) {
      this.$axios.get(`${ARTICLE_VIEW}/${id}`)
      this.$router.push({
        path: `/article/${id}`
      })
    },
    handleReply () {},
    handleLikeCallback () {}
  }
}
</script>

<style lang="less" scoped>
.el-tabs__header.is-top {
  margin: 0;
}
.article-card-list .list.item {
  margin: 0!important;
  padding: 10px 0;
  border-bottom: 1px solid #f3f3f3;
  &:hover {
    color: #333!important;
  }
}
.article-card-item {
  padding: 10px;
  &:hover {
    background-color: #f3f3f3;
  }
}
.article-item {
  margin-top: 10px;
  .title {
    font-size: 16px;
    margin-bottom: 8px;
  }

}
</style>
