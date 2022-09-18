import { createStore } from 'vuex';

import getters from './getters';
import mutations from './mutations';
import actions from './actions';

import { authModule } from './auth';
import { invoicesModule } from './invoices';
import { HTTPRequestModule } from './HTTPRequest';

export default createStore({
  modules: {
    auth: authModule,
    invoices: invoicesModule,
    HTTPRequest: HTTPRequestModule,
  },
  state() {
    return {
      isFormInvoiceOpen: false,
      toEdit: false,
      isFilterListClosed: true,
      isBaseDialogClosed: true,
      baseDialogRole: null,
      theme: localStorage.getItem("theme")||'light',

    }
  },
  getters,
  mutations,
  actions,

})
