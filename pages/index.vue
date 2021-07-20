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
import { ARTICLE_LIST, MENU_LIST } from '../api'
// import { desEncrypt, desDecrypt } from '~/utils/crypto'
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
  async fetch ({ app }) {
    const { data } = await app.$axios.get(MENU_LIST)
    await app.store.commit('ADD_MENUS', data)
  },
  async asyncData ({ $axios }) {
    const res = await $axios.get(ARTICLE_LIST)
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
  computed: {
    ...mapGetters([
      'menus',
      'isPC'
    ])
  },
  async mounted () {
    // const { data: key } = await this.$axios.get('v1/token/code')
    // const res = await this.$axios.post('v1/token/decode', {
    //   data: desEncrypt('哈哈 hehe hihi 哈喽', key)
    // })
    // console.log('加密结果：', desEncrypt(res.data.decode, key))
    // console.log('解密结果：', desDecrypt(res.data.raw, key))
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
