
<template>
  <section class="notfound-page">
  </section>
</template>
<style lang="scss" scoped>
@import "../styles/base";
.notfound-page {
  width: 100%;
  height: 100%;
  background-image: url(../assets/undraw_page_not_found.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 40%;
  text-align: center;
 position: relative;
 p{
    color: var( --color-secondary);
    font-size: $title;
    position: absolute;
    top: 1rem;
    left: 50%;
    transform:translateX(-50%);
    

  }
}
</style>
