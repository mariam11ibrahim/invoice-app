<script>
export default {
  data() {
    return {
      inputValue: this.value,
      isValid: true,
    };
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
    },
    value: {},
    readonly: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
    noBorder: {
      type: Boolean,
      default: false,
    },
    // isSubmitButtonClicked: {
    //   type: Boolean,
    //   default: false,
    // },
    isWhiteInput: {
      type: Boolean,
      default: false,
    },
    errorMessage:{
      type:String,
    }
  },
  computed: {
    inputClasses() {
      let classes = {
        pointer: this.readonly,
        ["white-input"]: this.isWhiteInput,
      };
      if (this.noBorder) return { ...classes, noBorder: true };
      if (!this.noBorder && !this.isValid)
        return { ...classes, ["invalid-input"]: true };
      return classes;
    },
    numberProp() {
      if (this.type === "number") return {};
      return { min: 1, step: "any" };
    },
  },
  methods: {
    inputcheckValidity() {
      let input = this.$refs.input;
      if (this.type == "email") {
        this.isValid = input.checkValidity();
        return this.isValid;
      }
      if (this.type == "password") {
        this.isValid = this.inputValue.length > 6;
        return this.isValid;
      }
      if (this.type == "number") {
        this.isValid = this.inputValue > 0;
        return this.isValid;
      }
      if (this.type == "text") {
        this.isValid = this.inputValue != "";
        return this.isValid;
      }
    },

    inputChangeHandler() {
      let input = this.$refs.input;
      this.inputcheckValidity();
      this.$emit("get-value", {
        value: input.value,
        isValid: this.isValid,
      });
    },
  },

  watch: {
    value() {
      this.inputValue = this.value;
    },
    // isSubmitButtonClicked() {
    //   //change the validtity of input if the form is submitted before filling inputs
    //   this.isValid = this.inputcheckValidity() && this.isSubmitButtonClicked;
    //   if (this.isValid)
    //     this.$emit("get-value", {
    //       value: this.inputValue,
    //       isValid: this.isValid,
    //     });
    // },
  },

  emits: ["get-value"],
};
</script>
<template>
  <div class="base-input">
    <label :for="label" :class="{ 'color-red': !isValid }">{{ label }}</label>
    <input
      required
      ref="input"
      v-model.trim="inputValue"
      :type="type"
      :id="label"
      :placeholder="placeholder"
      :readonly="readonly"
      :class="inputClasses"
      @input="inputChangeHandler"
      @blur="inputcheckValidity"
      min="1"
      step="any"
    />

    <BaseIcon v-if="icon" :name="icon" size="medium" />
    <p v-if="errorMessage&&!isValid" class="error-message">{{errorMessage}}</p>
  </div>
</template>
<style lang="scss" scoped>
@import "../styles/base";
.base-input {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  position: relative;
  label {
    font-size: $caption;
    font-weight: $regular;
    display: block;
    color: var(--color-secondary-2);
    margin-bottom: 15px;
  }
  input {
    width: 100%;
    padding: 15px;
    padding-left: 15px;
    z-index: 2;
    font-family: inherit;
    border-radius: $small-radius;
    border: 1px solid rgba($color-purple-light, 0.3);
    background: rgba($color-gray-light, 0.05);

    font-size: $caption;
    font-weight: $bold;
    color: var(--color-primary-2);

    &:focus-visible {
      outline: 1px solid $color-purple;
    }

    &::placeholder {
      margin-left: 10px;
      font-weight: $semibold;
      color: var(--color-secondary-2);
    }
  }
  .base-icon {
    position: absolute;
    top: 42px;
    right: 10px;
    z-index: 0;
  }
  .pointer {
    cursor: pointer;
  }
  .noBorder {
    border: 0;
    &:focus-visible {
      outline: 0;
    }
  }
  .invalid-input {
    color: $color-red;
    border-color: $color-red !important;
    &:focus-visible {
      outline: $color-red !important;
    }
  }
  .color-red {
    color: $color-red;
  }
  .error-message{
    color:$color-red;
    font-size: $body;
    font-weight: $regular;
    margin:1rem;
  }
}

.white-input {
  background-color: var(--color-tertiray) !important;
}
</style>
