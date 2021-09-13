<template>
  <div>
    <column-list
      :card_data="card_data"
      :articles-data="articlesData"
      :articles-total="articlesTotal"
      :menu_id="menu_id"
    />
  </div>
</template>
<script>
import ColumnList from '~/components/list/ColumnList'
import { MENU_DETAIL, ARTICLE_LIST } from '~/api'

export default {
  components: {
    ColumnList
  },
  async asyncData ({ $axios, params }) {
    let cardData = []
    let articlesData = []
    let articlesTotal = 0
    let menu_id = ''
    const menu = await $axios.get(`${MENU_DETAIL}?en_name=${params.item}`)
    if (menu.error_code === 0) {
      const { data } = menu
      cardData = data
      menu_id = data.id.toString()
      const articles = await $axios.get(`${ARTICLE_LIST}?menu_id=${menu_id}`)
      if (articles.error_code === 0) {
        const { data } = articles
        articlesData = data.data
        articlesTotal = data.total
      }
    }
    return {
      card_data: cardData,
      articlesData,
      articlesTotal,
      menu_id
    }
  }
}
</script>
