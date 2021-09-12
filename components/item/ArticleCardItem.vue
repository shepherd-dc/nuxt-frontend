<template>
  <div class="article-card-item" @click="routerToDetail(article.id)">
    <AuthorInfo :author-info="authorInfo" :author-bold="false" :show-view="false" :avatar-size="40" avatar-src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <div class="article-item">
      <h4 class="title">
        {{ article.title }}
      </h4>
      <p v-html="content" />
      <MediaOperation :media-info="mediaInfo" @on-like="handleLikeCallback" @on-star="handleStarCallback" @on-comment="handleCommentClick" />
    </div>
  </div>
</template>

<script>
import AuthorInfo from '~/components/AuthorInfo'
import MediaOperation from '~/components/MediaOperation'
import { ARTICLE_VIEW, ARTICLE_DETAIL, ARTICLE_LIKE, ARTICLE_STAR } from '~/api'

export default {
  components: {
    AuthorInfo,
    MediaOperation
  },
  inject: {
    tokenInfo: {
      default: () => ({})
    }
  },
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      likes: this.article.likes,
      stars: this.article.stars,
      isLiked: 0,
      isStared: 0,
      valid: this.tokenInfo.valid
    }
  },
  computed: {
    content () {
      const content = this.article.content.replace(/<\/?.+?>/g, '').substr(0, 280)
      return content.length < 280 ? content : content + '...'
    },
    authorInfo () {
      return {
        name: this.article.author || this.article.user_name || '佚名',
        date: this.article.create_time
      }
    },
    mediaInfo () {
      return {
        likes: this.likes,
        stars: this.stars,
        comments: this.article.comments.length,
        type: 'article',
        type_id: this.article.id,
        isLiked: this.isLiked,
        isStared: this.isStared
      }
    }
  },
  watch: {
    tokenInfo: {
      deep: true,
      handler (v) {
        this.valid = v.valid
        if (this.valid) {
          this.getLike()
          this.getStar()
        }
      }
    }
  },
  mounted () {
    if (this.valid) {
      this.getLike()
      this.getStar()
    }
  },
  methods: {
    async getActicle (id) {
      const articleRes = await this.$axios.get(`${ARTICLE_DETAIL}/${this.article.id}`)
      if (articleRes.error_code === 0) {
        const { data } = articleRes
        this.likes = data.likes
        this.stars = data.stars
      }
    },
    async getLike () {
      const likeRes = await this.$axios.get(`${ARTICLE_LIKE}/${this.article.id}`)
      if (likeRes.error_code === 0) {
        const { data } = likeRes
        this.isLiked = data.is_liked
      }
    },
    async getStar () {
      const starRes = await this.$axios.get(`${ARTICLE_STAR}/${this.article.id}`)
      if (starRes.error_code === 0) {
        const { data } = starRes
        this.isStared = data.is_stared
      }
    },
    routerToDetail (id) {
      this.$axios.get(`${ARTICLE_VIEW}/${id}`)
      this.$router.push({
        path: `/article/${id}`
      })
    },
    handleLikeCallback () {
      this.getActicle()
      this.getLike()
    },
    handleStarCallback () {
      this.getActicle()
      this.getStar()
    },
    handleCommentClick () {}
  }
}
</script>

<style lang="less" scoped>
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
