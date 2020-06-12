<template>
  <div>
    <single-column
      :column_data="column_data"
      :articles_data="articles_data"
      :column_id="column_id"
    />
  </div>
</template>
<script>
import URL from '~/globalurl'
import SingleColumn from '~/components/SingleColumn'
export default {
  components: {
    SingleColumn
  },
  async asyncData (context) {
    const column = await context.$axios.get(`${URL}/menu/submenu/${context.params.item}`)
    const column_id = column.data.data.id
    const { data } = await context.$axios.get(`${URL}/article?column_id=${column_id}`)
    return {
      column_data: column.data.data,
      articles_data: data.data.data,
      column_id: column_id.toString()
    }
  }
}
</script>
