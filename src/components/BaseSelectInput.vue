<script>
export default {
  emits: ["get-selected-value"],
  props: {
    clickedElement: {
      type: Object,
      default: null,
    },
    value: {},
  },
  data() {
    return {
      listValue: "Net 1 Day",
      isListHidden: true,
      list: [1, 7, 14, 30],
    };
  },
  methods: {
    getListValue(inputData) {
      this.listValue = `Net ${inputData.value} ${
        inputData.value == 1 ? "Day" : "Days"
      }`;

      this.$emit("get-selected-value", {
        value: inputData.value,
        isValid: !!inputData.value,
      });
    },
    openList() {
      this.isListHidden = false;
    },
    hideList() {
      if (this.clickedElement.id == "Payment Terms" && !this.isListHidden)
        return;
      this.isListHidden = true;
    },
  },
  watch: {
    clickedElement() {
      this.hideList();
    },
  },
  mounted() {
    if (!this.value) return;
    this.listValue = `Net ${this.value} ${this.value == 1 ? "Day" : "Days"}`;
  },
};
</script>
<template>
  <div class="base-select-input">
    <BaseInput
      type="text"
      label="Payment Terms"
      icon="chevron"
      :readonly="true"
      :value="listValue"
      @click="openList"
    />
    <BaseList @get-value="getListValue" v-if="!isListHidden" :list="list" />
  </div>
</template>
<style lang="scss" scoped>
.base-select-input {
  flex: 1;
  position: relative;
}
</style>
