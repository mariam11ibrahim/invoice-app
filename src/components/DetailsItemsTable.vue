<script>
export default {
  props: {
    items: {
      default: [],
    },
  },
  computed: {
    total() {
      return this.items.reduce((total, item) => (total += +item.total), 0);
    },
  },
};
</script>
<template>
  <div class="items-table">
    <table>
      <thead>
        <tr class="hidden-small-screen">
          <th>Item Name</th>
          <th>QTY.</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.name">
          <td>
            {{ item.name }}<br class="hidden-bigger-screen" />
            <span class="gray-text hidden-bigger-screen"
              >{{ item.quantity }} x ${{ item.price }}
            </span>
          </td>
          <td class="gray-text hidden-small-screen">{{ item.quantity }}</td>
          <td class="gray-text hidden-small-screen">${{ item.price }}</td>
          <td>${{ item.total }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          <td class="hidden-small-screen"></td>
          <td class="hidden-small-screen"></td>
          <td class="value">${{ total }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<style lang="scss" scoped>
@import "../styles/base";

.items-table {
  color: var(--color-primary-2);
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
  table {
    border-collapse: collapse;
    width: -webkit-fill-available;
    width: -moz-available;
    border-radius: $small-radius;
    overflow: hidden;
    background-color: rgba(var(--color-primary-rgb), 0.4);
  }

  th {
    font-size: $caption;
    font-weight: $light;
    color: var(--color-secondary-2);
  }
  td {
    font-size: $caption;
    font-weight: $bold;
    color: var(--color-primary-2);
  }
  td,
  th {
    text-align: left;
    padding: 2rem 0;
    padding-left: 5rem;
  }

  .gray-text {
    color: $color-purple-light !important;
  }
  tfoot {
    background: var(--color-tertiray-3) !important;
    font-weight: $bold;
    .value {
      font-size: $header;
      font-weight: $bold;
      color: white;
    }
  
  }
  .hidden-bigger-screen {
      display: none;
    }
  // TODO: FONT SIZE
  @media (max-width: 769px) {
    td,
    th {
      padding-left: 2rem;
    }
    .hidden-small-screen {
      display: none;
    }
    .hidden-bigger-screen {
      display: inline-block;
    }
  }
}
</style>
