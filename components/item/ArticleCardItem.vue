<template>
  <div class="article-card-item" @click="routerToDetail(article.id)">
    <AuthorInfo :author-info="authorInfo" :author-bold="false" :show-view="false" :avatar-size="40" :avatar-src="article.user_avatar" />
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
  props: {
    article: {
      type: Object,
      default: () => ({})
    },
    myLikes: {
      type: Array,
      default: () => []
    },
    myStars: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      likes: this.article.likes,
      stars: this.article.stars,
      comments: this.article.comments_num,
      isLiked: 0,
      isStared: 0
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
        comments: this.comments,
        type: 'article',
        type_id: this.article.id,
        isLiked: this.isLiked,
        isStared: this.isStared
      }
    }
  },
  watch: {
    myLikes: {
      handler (likes) {
        const ids = []
        likes.forEach((like) => {
          ids.push(like.type_id)
        })
        if (ids.includes(this.article.id)) {
          this.isLiked = 1
        }
      }
    },
    myStars: {
      handler (stars) {
        const ids = []
        stars.forEach((star) => {
          ids.push(star.type_id)
        })
        if (ids.includes(this.article.id)) {
          this.isStared = 1
        }
      }
    }
  },
  methods: {
    async getActicle () {
      const articleRes = await this.$axios.get(`${ARTICLE_DETAIL}/${this.article.id}`)
      if (articleRes.error_code === 0) {
        const { data } = articleRes
        this.likes = data.likes
        this.stars = data.stars
        this.comments = data.comments_num
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
