<script>
export default {
  props: {
    title: { type: String },
    message: { type: String },
  },
  computed: {
    themeId() {
      return this.$store.getters.theme;
    },
  },

  methods: {
    closeBaseDialog() {
      this.$store.dispatch("closeBaseDialog", {
        isClosed: true,
        dialogRole: null,
      });
    },
    handleDialogAction() {
      this.$emit("dialog-action");
    },
  },
};
</script>
<template>
  <dialog :id="themeId" class="base-dialog" open>
    <header class="base-dialog__header">
      <h1>{{ title }}</h1>
    </header>
    <div class="base-dialog__body">
      <p>{{ message }}</p>
    </div>
    <div class="base-dialog__actions">
      <BaseButton name="cancel" color="gray" @click="closeBaseDialog" />
      <slot name="action"></slot>
    </div>
  </dialog>
</template>
<style lang="scss" scoped>
@import "../styles/base";
.base-dialog {
  position: absolute;
  width: 40rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 3rem 5rem;
  border: 0;
  color: var(--color-primary-2);
  z-index: 990000;
  @extend .card-style;
  @media (max-width: 400px) {
    width: 30rem;
  }
  &__body {
    margin: 1.5rem 0;
    font-size: $body;
    font-weight: $light;
    color: var(--color-secondary-2);
  }
  &__actions {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
