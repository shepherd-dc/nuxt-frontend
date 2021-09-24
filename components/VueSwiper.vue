<template>
  <div
    ref="swiperBox"
    v-swiper:swiper="swiperOption"
    class="swiper swiperBox"
    @mouseenter="stopSwiper"
    @mouseleave="startSwiper"
  >
    <div class="swiper-wrapper">
      <div
        v-for="(banner,i) in banners"
        :key="i"
        class="swiper-slide"
      >
        <img :src="banner">
      </div>
    </div>
    <div
      slot="pagination"
      class="swiper-pagination"
    />
    <div
      slot="button-prev"
      class="swiper-button-prev swiper-button-white"
    />
    <div
      slot="button-next"
      class="swiper-button-next swiper-button-white"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      banners: [
        '1.jpg',
        '2.jpg'
      ],
      // 所有配置均为可选（同Swiper配置）
      swiperOption: {
        loop: true,
        speed: 500,
        height: 100,
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          slideChange () {
            // console.log('onSlideChangeEnd', this);
          },
          tap () {
            // console.log('onTap', this);
          }
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        autoplayDisableOnInteraction: false,
        // effect:'cube',
        mousewheel: true,
        preloadImages: false,
        lazy: true
      }
    }
  },
  swiper () {
    // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
    return this.$refs.swiperBox.swiper
  },
  methods: {
    stopSwiper () {
      this.swiper.autoplay.stop()
    },
    startSwiper () {
      this.swiper.autoplay.start()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/settings.scss';

  .swiper-pagination-bullet-active {
    background-color: $--color-primary!important;
  }
  .swiper-wrapper {
    img {
      margin-left: 50%;
      transform: translate(-50%)
    }
  }
  .swiper-button-next,
  .swiper-button-prev {
    background-size: 20px 20px;
  }

</style>
