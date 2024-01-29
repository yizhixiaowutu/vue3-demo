<template>
  <div id="blog-page">
    <div class="blog-header">header</div>
    <div class="blog-body"></div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
#blog-page {
  width: 100%;
  height: 100%;
  position: relative;
  background: #bdc3c7; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2c3e50,
    #bdc3c7
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2c3e50,
    #bdc3c7
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  .blog-header {
    width: 100%;
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
    background: #c6ffdd; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #f7797d,
      #fbd786,
      #c6ffdd
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #f7797d,
      #fbd786,
      #c6ffdd
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
}
</style>
