<template>
  <div class="footer">
    <p>
      <span>Copyright © 2020 shepherdnet.top</span>
      <a class="link" target="_blank" href="https://beian.miit.gov.cn/">鄂ICP备2020019254号-1</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'CommonFooter'
}
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/settings.scss';

  .footer {
    background-color: #333;
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: #fff;
    margin-top: 20px;
    .link {
      &:hover {
        color: $--color-primary;
        text-decoration: underline;
      }
    }
  }
</style>
