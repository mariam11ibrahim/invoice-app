<script>
import { v4 as uuidv4 } from "uuid";

import TheDateInput from "./TheDateInput.vue";
import FormInvoiceItems from "./FormInvoiceItems.vue";
import { months } from "../config/months";
import { validateInputs } from "../config/formUtils";

export default {
  components: {
    TheDateInput,
    FormInvoiceItems,
  },
  data() {
    return {
      clickedElement: null,

      formData: {
        senderAddress: { street: "", city: "", postCode: "", country: "" },
        paymentTerms: 1,
        clientName: "",
        clientEmail: "",
        clientAddress: { street: "", city: "", postCode: "", country: "" },
        createdAt: "",
        description: "",
        items: [],
        status: "pending",
      },
      isSubmitButtonClicked: false,
      filteredUserInvoiceById: null,
      toEdit: false,
      isFormValid: false,
      flag: false,
      inputvalidationMap: {
        senderAddress_street: false,
        senderAddress_city: false,
        senderAddress_postCode: false,
        senderAddress_country: false,
        clientName: false,
        clientEmail: false,
        clientAddress_street: false,
        clientAddress_city: false,
        clientAddress_postCode: false,
        clientAddress_country: false,
        createdAt: false,
        description: false,
        items: [],
      },
    };
  },
  watch: {
    $route() {
      this.closeForm();
    },
  },

  methods: {
    closeForm() {
      this.$store.dispatch("closeFormInvoice");
    },
    getClickedElement(event) {
      //to handle closing both date picker & list
      this.clickedElement = event.target;
    },
    handleSubmitButtonClick() {
      //needed for input validating as a flag
      // this.isSubmitButtonClicked = true;
    },
    handleinputvalidationMap(keys, isValid) {
      let validationKey = keys.join("_");
      this.inputvalidationMap[validationKey] = isValid;
    },

    getInputValue(keys, inputData) {
      this.handleinputvalidationMap(keys, inputData.isValid);

      let lastkey = keys.pop();
      let lastObj = keys.reduce(
        (obj, key) => (obj[key] = obj[key] || {}),
        this.formData
      );
      lastObj[lastkey] = inputData.value;
    },
    calcPaymentDue() {
      let [year, month, day] = this.formData["createdAt"].split(" ");

      let duration = this.formData["paymentTerms"];

      let monthIdx = months.indexOf(month);

      let maxDays = new Date(year, monthIdx + 1, 0).getDate();

      let expectedDay = +day + +duration;

      let dayExceed = expectedDay > maxDays;

      let dueDate = dayExceed ? expectedDay - maxDays + 0 : expectedDay;

      monthIdx = dayExceed ? monthIdx + 1 : monthIdx;

      let dueYear = monthIdx > 11 ? +year + 1 : year;

      monthIdx = monthIdx > 11 ? 0 : monthIdx;
      //prettier-ignore
      let dateValue=`${dueYear} ${months[monthIdx].substring(0, 3)} ${dueDate}`;

      return dateValue;
    },
    getItemsData(itemsData) {
      this.formData = { ...this.formData, items: itemsData.value };
      this.inputvalidationMap["items"] = itemsData.isValid;
    },
    isRegisteredInvoice(formData) {
      return !!formData.id;
    },
    saveInvoice(status, e) {
      e.preventDefault();

      this.checkIsFormValid();
      const id = this.toEdit ? this.formData.id : uuidv4();
      const payload = {
        invoice: {
          ...this.formData,
          id,
          status:
            this.toEdit && this.formData.status == "draft" ? status : status,
        },
        toEdit: this.toEdit,
      };
      this.$store.dispatch("invoices/postInvoice", payload);
      this.$store.dispatch("invoices/addInvoice", payload);
      this.closeForm();
    },
    toBeEditedValue(...keys) {
      if (!this.toEdit) return;

      let inputValue = keys.reduce(
        (value, key) => (value = value[key]),
        this.filteredUserInvoiceById
      );
      this.handleinputvalidationMap(keys, !!inputValue);
      return inputValue;
    },
    settingDataForEditing() {
      if (this.$store.getters.toEdit) {
        this.toEdit = this.$store.getters.toEdit;
        this.filteredUserInvoiceById = JSON.parse(
          JSON.stringify(
            this.$store.getters["invoices/filteredUserInvoiceById"]
          )
        );
        this.formData = JSON.parse(
          JSON.stringify(this.filteredUserInvoiceById)
        );
        let items = this.filteredUserInvoiceById.items.slice();
        let areItemsValid = items.length > 0 && validateInputs(items);
        this.getItemsData({ value: items, isValid: areItemsValid });
      }
    },
    checkIsFormValid() {
      return validateInputs(this.inputvalidationMap);
    },
  },
  created() {
    this.settingDataForEditing();
  },
  mounted() {
    this.formData["paymentDue"] = this.calcPaymentDue();
  },
  updated() {
    this.formData["paymentDue"] = this.calcPaymentDue();
  },
};
</script>

<template>
  <section class="form-invoice" @click="getClickedElement($event)">
    <form class="form" ref="form" @submit="saveInvoice('pending', $event)">
      <header class="form__header">
        <h1>Create Invoice</h1>
      </header>
      <!-- body -->
      <div class="form__body">
        <!-- group 1 -->
        <div class="form__group">
          <h3>Bill Form</h3>
          <BaseInput
            v-once
            type="text"
            label="Street Address"
            @get-value="getInputValue(['senderAddress', 'street'], $event)"
            :value="toBeEditedValue('senderAddress', 'street')"
          />

          <div class="form__group--inline">
            <BaseInput
              v-once
              type="text"
              label="City"
              @get-value="getInputValue(['senderAddress', 'city'], $event)"
              :value="toBeEditedValue('senderAddress', 'city')"
            />

            <BaseInput
              v-once
              type="text"
              label="Post Code"
              @get-value="getInputValue(['senderAddress', 'postCode'], $event)"
              :value="toBeEditedValue('senderAddress', 'postCode')"
            />

            <BaseInput
              v-once
              type="text"
              label="Country"
              @get-value="getInputValue(['senderAddress', 'country'], $event)"
              :value="toBeEditedValue('senderAddress', 'country')"
            />
          </div>
        </div>
        <!-- group 2 -->
        <div class="form__group">
          <h3>Bill To</h3>
          <BaseInput
            v-once
            type="text"
            label="Client's Name"
            @get-value="getInputValue(['clientName'], $event)"
            :value="toBeEditedValue('clientName')"
          />
          <BaseInput
            v-once
            type="email"
            label="Client's Email"
            placeholder="e.g. email@example.com"
            @get-value="getInputValue(['clientEmail'], $event)"
            :value="toBeEditedValue('clientEmail')"
          />
          <BaseInput
            v-once
            type="text"
            label="Street Address"
            @get-value="getInputValue(['clientAddress', 'street'], $event)"
            :value="toBeEditedValue('clientAddress', 'street')"
          />

          <div class="form__group--inline">
            <BaseInput
              v-once
              type="text"
              label="City"
              @get-value="getInputValue(['clientAddress', 'city'], $event)"
              :value="toBeEditedValue('clientAddress', 'city')"
            />
            <BaseInput
              v-once
              type="text"
              label="Post Code"
              @get-value="getInputValue(['clientAddress', 'postCode'], $event)"
              :value="toBeEditedValue('clientAddress', 'postCode')"
            />

            <BaseInput
              v-once
              type="text"
              label="Country"
              @get-value="getInputValue(['clientAddress', 'country'], $event)"
              :value="toBeEditedValue('clientAddress', 'country')"
            />
          </div>
          <div class="form__group--inline">
            <TheDateInput
              :clickedElement="clickedElement"
              @get-date-value="getInputValue(['createdAt'], $event)"
              :value="toBeEditedValue('createdAt')"
            />
            <BaseSelectInput
              :clickedElement="clickedElement"
              @get-selected-value="getInputValue(['paymentTerms'], $event)"
              :value="toBeEditedValue('paymentTerms')"
            />
          </div>

          <BaseInput
            v-once
            type="text"
            label="Description"
            placeholder="e.g. Graphic Service"
            @get-value="getInputValue(['description'], $event)"
            :value="toBeEditedValue('description')"
          />
        </div>

        <FormInvoiceItems
          :dataFormItems="formData.items"
          @get-items="getItemsData"
          :toEdit="toEdit"
        />
      </div>

      <div class="form__action">
        <BaseButton
          type="button"
          name="Discard"
          color="gray"
          @click="closeForm"
        />
        <div>
          <BaseButton
            v-if="!toEdit"
            type="button"
            name="Save as Draft"
            color="dark"
            @click="saveInvoice('draft', $event)"
          />
          <BaseButton
            type="submit"
            name="Save & Send"
            color="purple"
            :disabled="!checkIsFormValid()"
            @click="handleSubmitButtonClick()"
          />
        </div>
      </div>
    </form>
  </section>
</template>

<!-- styles -->

<style lang="scss" scoped>
@import "../styles/base";
.form-invoice {
  background-color: var(--color-primary) !important;
  z-index: 100;
  @extend .card-style;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  position: fixed;
  margin: 0;
  padding-left: 12rem;

  top: 0;
  height: 100%;
  overflow: hidden;
  border-radius: $medium-radius;
  width: 60vw;

  @media (max-width: 1000px) {
    top: 9rem;
    padding-left: 5rem;
    width: 70vw;
  }
  @media (max-width: 769px) {
    padding-left: 3rem;
    border-radius: 0 !important;
    width: 100%;
  }
}
.form {
  @media (max-width: 769px) {
    width: 100%;
  }

  .base-input {
    flex: 1;
  }

  &__body {
    background-color: var(--color-primary) !important;

    // height: calc(100vh - 190px);
    //NOTE:x= 60px header + 80 actions +50 section=190px
    --x: 19rem;
    height: calc(100vh - var(--x));
    overflow-y: scroll;

    padding-right: 4rem;
    padding-left: 1rem;
    @extend .custom-scroll;
    //NOTE: y + 100px sidebar height in mid screen
    @media (max-width: 1000px) {
      --y: 29rem;
      height: calc(100vh - var(--y));
    }
  }
  &__header {
    background-color: var(--color-primary) !important;
    padding-top: 1rem;
    padding-bottom: 2.5rem;

    h1 {
      color: var(--color-primary-2);
      font-size: $header;
      font-weight: $bold;
    }
  }
  &__action {
    padding-top: 3rem;
    padding-bottom: 0;
    display: flex;
    justify-content: space-between;
    & > div:last-child {
      display: flex;
    }
  }
  &__group {
    h3 {
      font-size: $body;
      font-weight: $bold;
      color: $color-purple;
      margin: 3rem 0px;
    }
    h2 {
      font-size: $title;
      font-weight: $bold;
      color: $color-purple-light;
      margin: 3rem 0px;
    }

    &--inline {
      position: relative;
      display: grid;
      grid-auto-flow: column;
      gap: 1rem;
      @media (max-width: 769px) {
        grid-auto-flow: row;
      }
    }
  }
  .hidden {
    display: none;
  }
}
</style>
