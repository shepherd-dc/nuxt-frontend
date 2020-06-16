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

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  overflow-x: hidden;
}

a {
  text-decoration: none;
  color: #fff;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.el-input__prefix, .el-input__suffix {
  color: #41b883;
}

.position-fixed {
  position: fixed;
  z-index: 999;
  background-color: #333;
  width: 100%;
}

.default-footer {
  bottom: 0;
  left: 0;
}

.default-content-container {
  padding: 60px 0;
}
</style>
