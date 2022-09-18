<script>
export default {
  props: {
    addressData: {
      required: true,
    },
  },
  methods: {
    key(data, index) {
      return data == "" ? `addressDataKey${index}` : data + index;
    },
  },
};
</script>
<template>
  <div class="address">
    <span v-for="(data, index) in addressData" :key="key(data, index)">
      {{ data }}</span
    >
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/base";
.address {
  span {
    font-size: $caption;
    font-weight: $light;
    display: block;
    color: var(--color-secondary-2);
    margin: 4px 0;
  }
  .left {
    text-align: left;
  }
  .right {
    text-align: right;
  }
}
</style>
