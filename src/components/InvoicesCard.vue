<script>
export default {
  props: {
    invoice: {},
  },
  computed: {
    total() {
      if (!this.invoice.items) return 0;
      return this.invoice.items.reduce(
        (total, item) => (total += +item.total),
        0
      );
    },
    paymentDate() {
      let dateArr = this.invoice.paymentDue.split(" ");
      return `${dateArr[0]} ${dateArr[1].substring(0, 3)} ${dateArr[2]}`;
    },
  },
  methods: {
    navigateToInoviceDetailsPage() {
      this.$router.push(`/invoice/${this.invoice.id}`);
    },
  },
};
</script>
<template>
  <div class="card" @click="navigateToInoviceDetailsPage()">
    <div class="left">
      <span class="id">
        <span class="hash">#</span>{{ invoice.id.substring(0, 6) }}
      </span>

      <span class="date">Due {{ paymentDate }}</span>
      <span class="total"> ${{ total }} </span>
    </div>

    <div class="client-name">
      <span class="client-name"> {{ invoice.clientName }} </span>
    </div>

    <div class="right">
      <span class="total"> ${{ total }} </span>
      <span class="client-name"> {{ invoice.clientName }} </span>
      <BaseStatusBadge :status="invoice.status" />
    </div>
    <div class="chevron-icon">
      <BaseIcon name="chevron"/>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../styles/base";
.card {
  @extend .card-style;
  @extend .card-shadow;
  border: 1px solid var(--color-tertiray);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  

  .total {
    font-size: $body;
    font-weight: $bold;
    font-size: 17px;
    width: 100px;
    color: var(--color-primary-2);
  }
  &:hover {
    border-color: $color-purple;
  }
  .left {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    .id {
      font-size: $caption;
      font-weight: $bold;
      color: var(--color-primary-2);
    }
    .hash {
      color:$color-purple-light;
    }
    .date {
      font-size: $caption;
      font-weight: $light;
      color: var(--color-secondary-2);
    }
    .total {
      display: none;
    }
  }
  .client-name {
    flex: 1;
    font-size: $body;
    font-weight: $light;
    .client-name {
      color: var(--color-secondary-2);
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex: 1;
    .total {
      width: 100px;
    }
    
    .client-name {
      color: var(--color-secondary-2);
      display: none;
      font-size: $body;
      font-weight: $light;
    }
  }
  .base-icon {
      transform: rotate(-90deg);
    }

}
@media (max-width: 1250px) {
  .card {
    padding: 2rem;

    .left {
      align-items: flex-start;
      flex-direction: column;
      .date {
        margin: 0.5rem 0;
      }
      .total {
        display: block;
      }
    }

    .right {
      flex-direction: column;
      justify-content: center;
      align-content: center;
      text-align: center;
      align-items: end;
      flex: 1;
      .total {
        display: none;
      }

      .client-name {
        color: var(--color-secondary-2);
        display: block;
        flex: 1;
        margin: 1rem 0;
      }
    }
    .chevron-icon {
      display: none;
    }
    .client-name {
      display: none;
      font-size: $caption;
      flex: 1;
    }
  }
}
</style>
