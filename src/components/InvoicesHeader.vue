<script>
import { mapActions } from "vuex";

export default {
  props: {
    invoiceNumber: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      list: ["Paid", "Pending", "Draft", "All"],
      statusfilterValue: "All",
    };
  },
  computed: {
    isFilterListClosed() {
      return this.$store.getters.isFilterListClosed;
    },
  },
  methods: {
    ...mapActions(["openFormInvoice"]),
    toggleList() {
      if (this.isFilterListClosed)
        this.$store.dispatch("closeFilterList", { isClosed: false });
      else this.$store.dispatch("closeFilterList", { isClosed: true });
    },
    getStatusFilterValue(filterStatusData) {
      this.statusfilterValue = filterStatusData.value;
    },
  },
};
</script>

<template>
  <section class="base-header">
    <header class="header">
      <h1>Invoices</h1>
      <small>There are {{ invoiceNumber }} total invoices</small>
    </header>

    <div class="base-header__controls">
      <div class="filter">
        <input
          type="checkbox"
          name="toggle-filter-list"
          @click.stop="toggleList"
          id="toggle-list"
          :checked="!isFilterListClosed"
        />
        <label class="filter__label" for="toggle-list">
          <small> Filter <span> by stauts</span> </small>

          <BaseIcon name="chevron" size="small" />
        </label>
        <BaseList
          v-if="!isFilterListClosed"
          type="filter"
          :list="list"
          :defualtFilter="statusfilterValue"
          @get-value="getStatusFilterValue($event)"
        />
      </div>
      <BaseButton color="purple" @click="openFormInvoice">
        <BaseIcon name="add" size="big" />
        <template #name>
          <span class="button-name">New <span>Invoice</span></span>
        </template>
      </BaseButton>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "./../styles/base";
.base-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header {
    flex: 1;
    color: var(--color-primary-2);

    small {
      color: var(--color-secondary-2);
      font-size: $caption;
      font-weight: $regular;
    }
    h1 {
      font-size: $header;
      font-weight: $bold;
    }
  }
  .base-button {
    display: flex;
    align-items: center;

    .button-name {
      @media (max-width: 769px) {
        margin-left: 0.5rem;
        span {
          display: none;
        }
      }
    }
  }
  &__controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    .icon {
      margin: -2px;
    }
    .filter {
      position: relative;
      width: 20rem;
      color: var(--color-primary-2);
      @media (max-width: 769px) {
        width: 10rem;
      }

      &__label {
        cursor: pointer;
        width: 100%;
        text-align: center;
        display: flex;
        align-items: center;

        @media (max-width: 400px) {
          display: inline-block;
        }
        small {
          font-size: $body;
          font-weight: $bold;
        }
        @media (max-width: 769px) {
          small > span {
            display: none;
          }
        }
        .base-icon {
          margin-left: 1rem;
        }
      }

      input {
        display: none;
      }
      input:checked + label > .base-icon {
        transform: rotate(-180deg);
      }
      .base-icon {
        transition: transform 0.5s ease;
        background-color: $color-purple;
        padding-bottom: 1px;
      }
    }
  }
}
</style>
