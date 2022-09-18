<script>
import InvoicesHeader from "../components/InvoicesHeader.vue";
import InvoicesCard from "../components/InvoicesCard.vue";

export default {
  components: {
    InvoicesHeader,
    InvoicesCard,
  },
  data() {
    return {};
  },
  computed: {
    invoices() {
      return this.$store.getters["invoices/filteredUserInvoices"];
    },
    invoiceNumber() {
      return this.invoices.length;
    },
  },
  methods: {
    calculateTotal(items) {
      if (!items) return 0;
      return items.reduce((total, item) => (total += +item.total), 0);
    },
  },
  created() {
    this.$store.dispatch("invoices/getInvoices");
  },
};
</script>
<template>
  <section class="invoice-page" :class="{'full-height':invoiceNumber == 0}">
    <InvoicesHeader :invoiceNumber="invoiceNumber"  />
    <section class="invoices"  v-if="invoiceNumber > 0" >
      <template v-for="invoice in invoices" :key="invoice.id">
        <InvoicesCard :invoice="invoice" />
      </template>
    </section>
    <div class="empty" v-else></div>
  </section>
</template>

<style lang="scss" scoped>
@import "../styles/base";

.invoice-page {
  @extend .page-padding;
  @extend .content-layout;
  height:auto;
  

  .invoices {
    margin-top: 5rem;
  }
}
.full-height{
    height:100%;

}
.empty {
  width: 100%;
  height: 100%;
  
  background: url(../assets/empty.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 40%;
  text-align: center;
}

</style>
