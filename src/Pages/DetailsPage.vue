<script>
import DetailsInvoice from "../components/DetailsInvoice.vue";
import DetailsControls from "../components/DetailsControls.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import NotFoundPage from "./NotFoundPage.vue";
export default {
  props: {
    id: {
      required: true,
    },
  },
  components: {
    DetailsInvoice,
    DetailsControls,
    BaseIcon,
    NotFoundPage,
  },
  methods: {
    navigateBack() {
      if (this.invoice) this.$router.go(-1);
      else this.$router.replace("/invoices");
    },
  },
  computed: {
    invoice() {
      return this.$store.getters["invoices/filteredUserInvoiceById"];
    },
  },

  beforeCreate() {
    this.$store.dispatch("invoices/getInvoiceById", { id: this.id });
  },
};
</script>
<template>
  <div class="details-page">
    <nav class="nav-back" @click="navigateBack()">
      <BaseIcon name="chevron" />
      <span class="nav-back__text">Go back</span>
    </nav>

    <section class="details-page__content" v-if="invoice">
      <div class="status">
        <span> Status </span>
        <BaseStatusBadge :status="invoice.status" />
      </div>
      <DetailsControls :status="invoice.status" :invoiceId="id" />

      <DetailsInvoice :invoiceData="invoice" />
    </section>

    <NotFoundPage v-else />
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/base";
.details-page {
  @extend .page-padding;
  @extend .content-layout;

  height: 100%;
  .status {
    display: flex;
    align-items: center;
    span {
      font-size: $caption;
      font-weight: $light;
      color: var(--color-secondary-2);
      margin-right: 10px;
    }
  }
  &__content {
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-template-columns: repeat(2, 1fr);
    @media (max-width: 769px) {
      grid-template-rows: repeat(3, auto);
    }
    .status {
      border-right: 0;
      @media (max-width: 769px) {
        justify-content: space-between;

        grid-row: 1/2;
        grid-column: 1/3;
      }
      @media (min-width: 769px) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    .details-controls {
      border-left: 0;
      @media (max-width: 769px) {
        justify-content: space-evenly;
        grid-row: 3/4;
        grid-column: 1/3;
        
        position:sticky;
        width:100%;
        bottom:0;
        margin-bottom:-5rem;
        
      }
      @media (min-width: 769px) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    .status,
    .details-controls {
      @extend .card-style;
      @extend .card-shadow;
     
    }
    .details-invoices {
      @extend .card-shadow;
      grid-column: 1/3;
    }
  }
}
.nav-back {
  cursor: pointer;
  display: inline-block;

  .base-icon {
    transform: rotate(90deg);
    background: $color-purple;
    vertical-align: middle;
  }
  &__text {
    font-size: $caption;
    font-weight: $semibold;
    color: var(--color-primary-2);
    display: inline-block;
    vertical-align: middle;
  }
}
@media (max-width: 769px) {
  .details-page {
    flex-direction: column;
  }
}
</style>
