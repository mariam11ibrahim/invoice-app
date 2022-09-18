<script>
export default {
  emits: ["get-value"],

  props: {
    type: {
      type: String, //filter // list
      default: "list",
    },
    hidden: {
      type: Boolean,
      default: true,
    },
    list: {
      type: Object,
    },
    stylingClass: {
      type: String,
    },
    defualtFilter: {
      type: String,
    },
  },

  data() {
    return {
      isListHidden: true,
      currentFilter: "",
      filterValue: this.defualtFilter,
    };
  },
  computed: {
    listClass() {
      return `base-list base-list--${this.type}`;
    },
  },
  watch: {
    hidden() {
      this.isListHidden = this.hidden;
    },
  },

  methods: {
    getValue(value) {
      // this.$emit("get-value", value);
      this.$emit("get-value", { value, isValid: !!value });
    },
    filterInovicesByStatus(e) {
      this.getValue(e.target.value);
      this.$store.dispatch("invoices/filterUserInvoiceByStatus", {
        status: e.target.value.toLowerCase(),
      });
    },
  },
};
</script>
<template>
  <ul :class="listClass" v-if="type == 'list'">
    <li
      class="base-list__item"
      v-for="item of list"
      :key="item"
      @click="getValue(item)"
    >
      <input
        type="radio"
        :id="item"
        name="list"
        class="list"
        v-if="type == 'list'"
      />
      <label :for="item">Net {{ item }} {{ item == 1 ? "Day" : "Days" }}</label>
    </li>
  </ul>

  <ul :class="listClass" v-if="type == 'filter'">
    <li class="base-list__item" v-for="item of list" :key="item">
      <input
        type="radio"
        class="filter"
        :value="item"
        :id="item"
        v-model="filterValue"
        @click="filterInovicesByStatus"
      />
      <label :for="item">
        <span
          class="custom-box"
          :class="{ 'custom-box--active': filterValue == item }"
        >
        </span>
        <BaseIcon name="check" size="small" /> {{ item }}
      </label>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import "../styles/base";

.base-list {
  @extend .card-style;
  @extend .card-shadow;
  font-size: $caption;
  font-weight: $semibold;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  padding: 0;
  margin: 0;
  margin-top: 10px;
  position: absolute;
  width: 100%;
  z-index: 100;

  color: var(--color-primary-2);
  label {
    cursor: pointer;
  }
  &__item {
    font-weight: $semibold;
    list-style: none;
    cursor: pointer;
    padding: 10px 25px;
    border-bottom: 1px solid rgba($color-purple-light, 0.1);
    display: flex;
    align-items: center;
    &:last-child {
      border: 0;
    }
    &:hover {
      color: $color-purple;
    }
    .list {
      display: none;
    }
    .filter {
      accent-color: $color-purple;
      display: none;
    }
  }
  &--filter {
    @media (max-width: 769px) {
      width: auto;
    }

    label {
      display: flex;
      font-weight: $semibold;
    }

    .custom-box {
      content: " ";

      display: inline-block;
      width: 15px;
      height: 15px;

      background-color: rgba($color-purple-light, 0.1);
      border: 1px solid rgba($color-purple-light, 0.1);

      border-radius: 2px;
      z-index: 100;
      right: 0;
      margin-right: 30px;
      transition: all 0.2s ease;
    }

    .base-icon {
      position: absolute;
      padding: 7px;
      visibility: hidden;
      z-index: 10000;
    }
  }

  &__item:hover .custom-box {
    border-color: $color-purple;
  }

  .custom-box--active {
    background-color: $color-purple;
  }
  .custom-box--active + .base-icon {
    visibility: visible;
  }
}
</style>
