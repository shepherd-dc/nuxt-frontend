<template>
  <div>
    <common-header class="position-fixed" />
    <nuxt class="default-content-container" />
    <common-footer class="default-footer position-fixed" />
  </div>
</template>

<script>
import CommonHeader from './CommonHeader'
import CommonFooter from './CommonFooter'
export default {
  components: {
    CommonHeader,
    CommonFooter
  }
}
</script>

<style lang="scss">
@import '../assets/styles/reset.scss';
@import '../assets/styles/cover.scss';
</style>
