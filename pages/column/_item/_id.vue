<template>
  <div>
    <column-list
      single
      :column_data="column_data"
      :articles_data="articles_data"
      :column_id="column_id"
    />
  </div>
</template>
<script>
import ColumnList from '~/components/list/ColumnList'
import { MENU_SUBMENU, ARTICLE_LIST } from '~/api'
export default {
  components: {
    ColumnList
  },
  async asyncData ({ $axios, params }) {
    let columnData = {}
    let articlesData = []
    let column_id = ''
    const column = await $axios.get(`${MENU_SUBMENU}/${params.id}`)
    if (column.error_code === 0) {
      const { data } = column
      columnData = data
      column_id = columnData.id.toString()
      const articles = await $axios.get(`${ARTICLE_LIST}?column_id=${column_id}`)
      if (articles.error_code === 0) {
        const { data } = articles
        articlesData = data.data
      }
    }
    return {
      column_data: columnData,
      articles_data: articlesData,
      column_id
    }
  }
}
</script>
