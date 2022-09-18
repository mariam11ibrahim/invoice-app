<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
    reverse: {
      type: Boolean,
      default: false,
    }, 
  },
};
</script>
<template>
  <div class="data-cell" :class="{ 'reverse-order': reverse }">
    <span class="title">{{ title }}</span>
    <span class="data" v-if="!reverse">{{ data }}</span>
    <span class="data" v-if="reverse"
      ><span class="hash">#</span>{{ data }}</span
    >
  </div>
</template>
<style lang="scss" scoped>
@import "../styles/base";
.data-cell {
  text-transform: capitalize;
  display: flex;
  flex-direction: column;
  span {
    display: block;
  }
  .title {
    font-size: $caption;
    font-weight: $light;
    color: var(--color-secondary-2);
    margin: 5px 0;
  }
  .data {
    font-size: $title;
    font-weight: $bold;
    color: var(--color-primary-2);
  }
}
.reverse-order {
  flex-direction: column-reverse !important;
  .data {
    font-size: $title;
    font-weight: $bold;
    display: inline-block;
    text-transform: uppercase;

    .hash {
      color: $color-purple-light !important;
      display: inline;
    }
  }
}
</style>
