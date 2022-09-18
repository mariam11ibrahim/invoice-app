<script>
import { mapActions } from "vuex";
export default {
  props: {
    status: {
      type: String,
      required: true,
    },
    invoiceId: { type: String },
  },
  computed: {
    dialogMessage() {
      return `Are you sure you want to delete invoice 
      #${this.invoiceId.substring(0, 6)}? This action cannot be undone.`;
    },
    isBaseDialogClosed() {
      return this.$store.getters.isBaseDialogClosed;
    },
    baseDialogRole() {
      return this.$store.getters.baseDialogRole;
    },
  },
  methods: {
    ...mapActions(["openFormInvoice"]),
    markInvoiceAsPaid() {
      this.$store.getters["invoices/filteredUserInvoiceById"].status = "paid";
      this.$store.dispatch("invoices/patchInvoice", { status: "paid" });
    },
    deleteInvoice() {
      this.$store.dispatch("closeBaseDialog", {
        isClosed: true,
        dialogRole: null,
      });

      setTimeout(() => this.$router.push("/invoices"), 1000);

      this.$store.dispatch("invoices/deleteInvoice", { id: this.invoiceId });
    },
    showBaseDialog() {
      this.$store.dispatch("closeBaseDialog", {
        isClosed: false,
        dialogRole: "delete",
      });
    },
  },
};
</script>
<template>
  <div class="details-controls">
    <div class="controls">
      <BaseButton
        name="Edit"
        color="gray"
        @click="openFormInvoice({ toEdit: true })"
      />

      <BaseButton name="Delete" color="red" @click="showBaseDialog" />

      <BaseButton
        v-if="status == 'pending'"
        name="Mark As Paid"
        color="purple"
        @click="markInvoiceAsPaid"
      />
    </div>
    <teleport to="body">
      <BaseDialog
        key="delete"
        title="Confirm Delete"
        :message="dialogMessage"
        v-if="baseDialogRole == 'delete'"
      >
        <template #action>
          <BaseButton name="Delete" color="red" @click="deleteInvoice" />
        </template>
      </BaseDialog>
    </teleport>
  </div>
</template>
<style lang="scss" scoped>
@import "../styles/base";
.details-controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;

  .controls {
    display: flex;
    justify-content: space-between;
    .base-button {
      margin: 0px 5px;
    }
  }
}
</style>
