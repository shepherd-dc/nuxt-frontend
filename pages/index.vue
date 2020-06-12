<template>
  <section>
    <div class="container">
      <slogan />
      <!-- <vue-swiper/> -->
      <div class="content">
        <el-row
          :gutter="width > 1080 ? 10 : 0"
          type="flex"
        >
          <el-col :span="width > 1080 ? 18 : 24">
            <main-card
              v-for="(item, index) in menus"
              :key="index"
              :card_data="item"
            />
          </el-col>
          <el-col
            v-if="width > 1080"
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
import URL from '~/globalurl'
import Slogan from '~/components/Slogan'
// import VueSwiper from '~/components/VueSwiper'
import MainCard from '~/components/MainCard'
import AsideCard from '~/components/AsideCard'

export default {
  components: {
    Slogan,
    // VueSwiper,
    MainCard,
    AsideCard
  },
  async asyncData ({ app }) {
    const { data } = await app.$axios.get(`${URL}/article`)
    return {
      articles_data: data.data.data
    }
  },
  data () {
    return {
      title1: '最新'
    }
  },
  // async fetch ({ app }) {
  //   let { data } = await app.$axios.get(`${URL}/menu`)
  //   await app.store.commit('ADD_MENUS', data)
  // },
  computed: {
    ...mapGetters([
      'menus',
      'width'
    ])
  },
  mounted () {
    // console.log(this.menus)
  }
}
</script>

<style>
  .container {
    padding-top: 60px;
  }
  .content {
    max-width: 1280px;
    margin: 10px auto;
    padding-top: 10px;
  }
  .el-button--text {
    color: #41b883;
  }
</style>
