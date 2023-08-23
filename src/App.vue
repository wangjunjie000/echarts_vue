<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
   
  }
}
</script>

<style lang="scss">
@import '~@/common/scss/common.scss'; 

$no: 24;
// 用媒体查询约束rem的 最小和最大 值
@media screen and (max-width: 1024px) {
  html {
    font-size: 1024px / $no !important;
  }
}
@media screen and (min-width: 1920px) {
  html {
    font-size: 1920px / $no !important;
  }
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}
@font-face {
  font-family: electronicFont;
  src: url(/font/DS-DIGIT.TTF);
}
body {
  background-image: url(./assets/bg.jpg);
  background-repeat: no-repeat;
  background-position: top center;
  line-height: 1.15;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ol,
ul {
  list-style: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

button,
input {
  outline: none;
}

a {
  color: #000;
  text-decoration: none;
}

a:hover {
  color: #000;
  text-decoration: none;
}
</style>
