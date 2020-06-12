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
import URL from '~/globalurl'
export default {
  components: {
    list
  },
  async asyncData (context) {
    const menu = await context.$axios.get(`${URL}/menu/detail?en_name=node`)
    const menu_id = menu.data.data.id
    const { data } = await context.$axios.get(`${URL}/article?menu_id=${menu_id}`)
    // console.log(data)
    return {
      card_data: menu.data.data,
      articles_data: data.data.data,
      menu_id: menu_id.toString()
    }
  }
}
</script>
