<script>
export default {
  props: {
    name: {
      type: String,
    },
    color: {
      type: String,
      required: true,
    },
    fullWidth: {
      type: Boolean,
      defualt: false,
    },
    type: {
      type: String,
      default: "button",
    },
    size: {
      type: String,
    },
    style: {
      type: String,
    },
  },
  computed: {
    buttonClasses() {
      let buttonClasses = `base-button--${this.color} ${
        this.size ? "base-button--" + this.size : ""
      }${this.style ? "base-button--" + this.style : ""}`;
      return buttonClasses;
    },
  },
};
</script>
<template>
  <button :type="type" class="base-button" :class="buttonClasses">
    <slot> </slot>
    <slot name="name">
      {{ name }}
    </slot>
  </button>
</template>
<style lang="scss" scoped>
@import "./../styles/base";

.base-button {


font-weight: $semibold;
font-size: $body;
min-width: 8rem;

  &:disabled {
    background-color: rgba($color-purple, 0.1);
  }
  padding: 1rem;
  margin: 0 5px;
  height: 5rem;
  border: 0;
  border-radius: 100px;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &--purple {
    background-color: $color-purple;
    &:hover {
      background-color: rgba($color-purple, 0.7);
    }
  }
  &--red {
    background-color: $color-red;

    &:hover {
      background-color: rgba($color-red, 0.7);
    }
  }
  &--dark {
    background-color: var(--color-secondary);
    &:hover {
      background-color: var(--color-tertiray-2);
    }
  }
  &--gray {
    background-color: rgba($color-purple-light, 0.05);
    color: $color-purple-light;
    &:hover {
      background-color: rgba($color-purple-light, 0.2);
    }
  }
  &--transparent {
    background: transparent !important;
    color: $color-purple ;
    &:hover {
      color: rgba($color-purple-light, 0.99);

    }
  }
  &--full-width {
    width: 100%;
    margin: 10px 0;
  }
  &--medium {
    width: 30rem;
    font-size: $title;
  }
}
</style>
