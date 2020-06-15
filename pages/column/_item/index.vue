<template>
  <div>
    <list
      :card_data="card_data"
      :articles_data="articles_data"
      :menu_id="menu_id"
    />
  </div>
</template>
<script>
import list from '~/components/CommonList'
export default {
  components: {
    list
  },
  async asyncData ({ $axios, params }) {
    let cardData = []
    let articlesData = []
    let menu_id = ''
    const menu = await $axios.get(`/menu/detail?en_name=${params.item}`)
    if (menu.error_code === 0) {
      const { data } = menu
      cardData = data
      menu_id = data.id.toString()
      const articles = await $axios.get(`/article?menu_id=${menu_id}`)
      if (articles.error_code === 0) {
        const { data } = articles
        articlesData = data.data
      }
    }
    return {
      card_data: cardData,
      articles_data: articlesData,
      menu_id
    }
  }
}
</script>
