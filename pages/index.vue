<template>
  <section>
    <div class="container">
      <slogan />
      <!-- <vue-swiper/> -->
      <div class="content">
        <el-row
          :gutter="isPC ? 10 : 0"
          type="flex"
        >
          <el-col :span="isPC ? 18 : 24">
            <main-card
              v-for="(item, index) in menus"
              :key="index"
              :card_data="item"
            />
          </el-col>
          <el-col
            v-if="isPC"
            :span="6"
          >
            <aside-card
              :aside_title="title1"
              :aside_data="articles_data"
            />
          </el-col>
        </el-row>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Slogan from '~/components/Slogan'
// import VueSwiper from '~/components/VueSwiper'
import MainCard from '~/components/card/MainCard'
import AsideCard from '~/components/card/AsideCard'

export default {
  components: {
    Slogan,
    // VueSwiper,
    MainCard,
    AsideCard
  },
  async asyncData ({ $axios }) {
    const res = await $axios.get('/article')
    if (res.error_code === 0) {
      const { data } = res
      return {
        articles_data: data.data
      }
    }
  },
  data () {
    return {
      title1: '最新'
    }
  },
  // async fetch ({ app }) {
  //   let { data } = await app.$axios.get(`/menu`)
  //   await app.store.commit('ADD_MENUS', data)
  // },
  computed: {
    ...mapGetters([
      'menus',
      'isPC'
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
