<script>
import { validateInputs } from "@/config/formUtils";
import { v4 as uuidv4 } from "uuid";
export default {
  props: ["isSubmitButtonClicked", "dataFormItems", "toEdit"],

  data() {
    return {
      itemList: [{ id: uuidv4(), name: "", quantity: "", price: "", total: 0 }],
      itemsValidation: [],
    };
  },

  methods: {
    validateItemData(index, item) {
      this.itemsValidation[index] = item.name && +item.total ? true : false;
    },
    validateAndEmmitChanges() {
      let areItemsValid;
      if (this.itemsValidation.length == 0) areItemsValid = false;
      else areItemsValid = validateInputs(this.itemsValidation);

      this.$emit("get-items", {
        value: this.itemList,
        isValid: areItemsValid,
      });
    },
    getItemDataValue(inputName, index, inputData) {
      let items = this.itemList;

      if (!items[index]) this.addNewItem();

      let item = items[index];
      item[inputName] = inputData.value;
      items[index] = item;
      this.handleItemDataTotalValue(item, inputName);
      this.validateItemData(index, item);
      this.validateAndEmmitChanges();
    },

    handleItemDataTotalValue(item, inputName) {
      if (inputName == "name") return;
      let price = !item[`price`] ? 0 : item[`price`];
      let quantity = !item[`quantity`] ? 0 : item[`quantity`];
      let total = +price * +quantity;
      item[`total`] = `${total}`;
    },

    addNewItem() {
      let newItem = {
        id: uuidv4(),
        name: "",
        quantity: "",
        price: "",
        total: "",
      };
      this.itemList.push(newItem);
      let newItemIndex = this.itemList.length - 1;
      this.validateItemData(newItemIndex, newItem);
      this.validateAndEmmitChanges();
    },

    deletItem(id, index) {
      this.itemList = this.itemList.filter((item) => item.id != id);
      this.itemsValidation.splice(index, 1);
      this.validateAndEmmitChanges();
    },

    toBeEditedValue(index, id, key) {
      if (!this.toEdit) return;
      if (!this.isRegisteredItem(id)) return;
      let item = this.dataFormItems[index];

      return `${item[key] ? item[key] : ""}`;
    },
    isRegisteredItem(id) {
      if (this.dataFormItems.length == 0) return;
      return !!this.dataFormItems.find((item) => item.id == id);
    },
    settingItemsDataForEditing() {
      if (this.dataFormItems.length == 0) return;
      this.itemList = this.dataFormItems.slice();
    },
  },

  created() {
    if (this.toEdit) {
      this.settingItemsDataForEditing();
    }
  },
};
</script>

<template>
  <div class="form__group">
    <h2>Items List</h2>
    <div
      class="form__group--inline items-list"
      v-for="(item, index) in itemList"
      :key="item.id"
    >
      <BaseInput
        type="text"
        label="Item Name"
        @get-value="getItemDataValue('name', index, $event)"
        :isSubmitButtonClicked="isSubmitButtonClicked"
        :value="toBeEditedValue(index, item.id, 'name')"
      />

      <BaseInput
        type="number"
        label="Qty."
        @get-value="getItemDataValue('quantity', index, $event)"
        :isSubmitButtonClicked="isSubmitButtonClicked"
        :value="toBeEditedValue(index, item.id, 'quantity')"
      />
      <BaseInput
        type="number"
        label="Price"
        @get-value="getItemDataValue('price', index, $event)"
        :isSubmitButtonClicked="isSubmitButtonClicked"
        :value="toBeEditedValue(index, item.id, 'price')"
      />
      <BaseInput
        type="number"
        label="Total"
        :readonly="true"
        :noBorder="true"
        :value="
          itemList[index].total || toBeEditedValue(index, item.id, 'total') || 0
        "
        :isSubmitButtonClicked="isSubmitButtonClicked"
      />

      <BaseIcon
        type="button"
        name="delete"
        @click="deletItem(item.id, index)"
      />
    </div>
    <BaseButton
      type="button"
      name="Add New Item"
      color="gray"
      :fullWidth="true"
      @click.prevent="addNewItem"
      size="full-width"
    >
      <BaseIcon name="plus" size="small"
    /></BaseButton>
  </div>
</template>

<!-- styles -->

<style lang="scss" scoped>
@import "../styles/base";

.form {
  .base-input {
    flex: 1;
  }

  &__action {
    padding-top: 30px;
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
      margin: 30px 0px;
    }
    h2 {
      font-weight: $bold;
      font-size: title;
      color: $color-purple-light;
      margin: 30px 0px;
    }

    &--inline {
      position: relative;
      display: grid;
      grid-auto-flow: column;
      gap: 10px;
    }
    .items-list {
      max-width: 100%;
      grid-template-columns: repeat(10, 1fr);
      .base-icon {
        display: block;
        margin-top: 5rem;
        &:hover {
          background: $color-red;
        }
      }
    }
    .items-list > div:first-child {
      grid-column: 1 / 4;
    }
    .items-list > div:nth-child(2) {
      grid-column: 4/6;
    }
    .items-list > div:nth-child(3) {
      grid-column: 6/8;
    }
    .items-list > div:nth-child(4) {
      grid-column: 8/10;
    }
    .items-list > div:nth-child(5) {
      grid-column: 10/-1;
    }
    @media (max-width: 769px) {
      grid-template-rows: repeat(2, 1fr);
      .items-list > div:first-child {
        grid-row: 1 / 2;
        grid-column: 1 / -1;
      }
      .items-list > div:nth-child(2) {
        grid-column: 1/4;
      }
      .items-list > div:nth-child(3) {
        grid-column: 4/7;
      }
      .items-list > div:nth-child(4) {
        grid-column: 7/10;
      }
      .items-list > div:nth-child(5) {
        grid-column: 10/-1;
      }
    }
  }
  .hidden {
    display: none;
  }
}
</style>
