<script>
import DetailsInvoiceAddressVue from "./DetailsInvoiceAddress.vue";
import DetailsDataCell from "./DetailsDataCell.vue";
import DetailsItemsTable from "./DetailsItemsTable.vue";
export default {
  components: {
    DetailsInvoiceAddressVue,
    DetailsDataCell,
    DetailsItemsTable,
  },
  props: {
    invoiceData: {
      required: true,
    },
  },
  computed: {
    createdAt() {
      return this.reformateDate(this.invoiceData.createdAt);
    },
    paymentDue() {
      return this.reformateDate(this.invoiceData.paymentDue);
    },
    id() {
      if (!this.invoiceData.id) return;
      return this.invoiceData.id.substring(0, 6);
    },
  },
  methods: {
    reformateDate(dataString) {
      if (!dataString) return;
      let dateArr = dataString.split(" ");
      return `${dateArr[0]} ${dateArr[1].substring(0, 3)} ${dateArr[2]}`;
    },
  },
};
</script>
<template>
  <div class="details-invoices">
    <!--the first part   -->
    <div class="sender-data">
      <div class="description">
        <DetailsDataCell
          :title="invoiceData.description"
          :data="id"
          :reverse="true"
        />
      </div>
      <DetailsInvoiceAddressVue :addressData="invoiceData.senderAddress" />
    </div>
    <!-- the middle -->
    <div class="client-data">
      <div class="date-data">
        <DetailsDataCell title="Invoice Date" :data="createdAt" />
        <DetailsDataCell title="Payment Due" :data="paymentDue" />
      </div>

      <div class="client-address">
        <DetailsDataCell title="Bill To" :data="invoiceData.clientName" />
        <DetailsInvoiceAddressVue :addressData="invoiceData.clientAddress" />
      </div>

      <div class="client-email">
        <DetailsDataCell title="Sent to" :data="invoiceData.clientEmail" />
      </div>
    </div>
    <!-- the last  -->
    <DetailsItemsTable :items="invoiceData.items" />
  </div>
</template>
<style lang="scss" scoped>
@import "../styles/base";
.details-invoices {
  @extend .card-style;
  .date-data {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (max-width: 769px) {
      justify-content: space-evenly;
    }
  }
  .sender-data {
    display: flex;
    justify-content: space-between;
    @media (max-width: 769px) {
      flex-direction: column;
    }
  }
  .client-data {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 50px 0;
  }
  .date-data,
  .client-address,
  .client-email {
    flex: 1;
    @media (max-width: 769px) {
      flex: initial;
      margin: 1rem 1rem 1rem 0;
    }
  }
  .items-data {
    @extend .card-style;
  }
}
</style>
