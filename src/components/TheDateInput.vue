<script>
import TheDatePicker from "./TheDatePicker.vue";
export default {
  components: { TheDatePicker },
  props: {
    clickedElement: { type: Object },
    value: { type: String },
  },
  data() {
    return {
      invoiceDate: "",
      isDatepickerHidden: false,
      dueDate: "",
    };
  },
  watch: {
    clickedElement() {
      this.hideDatePicker();
    },
  },
  methods: {
    openDatePicker() {
      this.isDatepickerHidden = false;
    },
    getDateValue(date) {
      this.invoiceDate = date;
      this.isDatepickerHidden = true;
      this.$emit(`get-date-value`, {value:date,isValid:!!date});
    },
    hideDatePicker() {
      if (
        (this.clickedElement.closest(".date-picker") &&
          !this.clickedElement.classList.contains("day")) ||
        this.clickedElement.id == "Invoice Date"
      ) {
        return;
      }
      this.isDatepickerHidden = true;
    },

    reformatDate() {
      if (!this.value) return;
      this.invoiceDate = this.value;
      const date = this.value.split(" ");
      this.invoiceDate = `${date[2]} ${date[1]} ${date[0]}`;
    },
  },
 
  mounted() {
    this.reformatDate();
    // this.$emit(`get-date-value`, this.invoiceDate);
    this.$emit(`get-date-value`, {value:this.invoiceDate,isValid:!!this.invoiceDate});
  },
};
</script>
<template>
  <div class="the-date-input">
    <BaseInput
      type="text"
      label="Invoice Date"
      icon="calendar"
      :readonly="true"
      :value="invoiceDate"
      :placeholder="invoiceDate"
      @click="openDatePicker"
    />
    <TheDatePicker
      @on-get-date-value="getDateValue"
      :hidden="isDatepickerHidden"
    />
  </div>
</template>

<style lang="scss" scoped>
.the-date-input {
  position: relative;
  flex: 1;
}
</style>
