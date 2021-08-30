<template>
  <section>
    <div class="container">
      <slogan />
      <!-- <vue-swiper/> -->
      <div class="content">
        <main-card
          v-for="(item, index) in menus"
          :key="index"
          :card_data="item"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { MENU_LIST } from '@/api'
import Slogan from '~/components/Slogan'
// import VueSwiper from '~/components/VueSwiper'
import MainCard from '~/components/card/MainCard'

export default {
  components: {
    Slogan,
    // VueSwiper,
    MainCard
  },
  async fetch ({ app }) {
    const { data } = await app.$axios.get(MENU_LIST)
    await app.store.commit('ADD_MENUS', data)
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'menus'
    ])
  },
  mounted () {
    // console.log(this.menus)
  }
}
</script>

<style lang='less' scoped>
  .content {
    max-width: 1280px;
    margin: 10px auto;
    padding-top: 10px;
  }
</style>
