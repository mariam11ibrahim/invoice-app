export default {
  async postInvoice(context, payload) {
    const invoiceId = payload.invoice.id;
    const reqOptions = {
      method: 'PUT',
      body: JSON.stringify(payload.invoice)

    }
    const message = payload.toEdit ? `invoice # ${payload.invoice.id.substring(0,6)} has been edited`
      : 'an invoice has been added';

    await context.dispatch('sendRequest', { reqOptions, path: invoiceId, message });

  }
  ,
  async patchInvoice(context, payload) {
    const invoiceId = context.rootState.invoices.filteredUserInvoiceById.id;
    const reqOptions = {
      method: 'PATCH',
      body: JSON.stringify(payload)
    }
    const message = "Invoice status has been updated";
    await context.dispatch('sendRequest', { reqOptions, path: invoiceId, message });

  }
  ,
  async getInvoices(context) {

    const reqOptions = { method: 'GET', }

    const data = await context.dispatch('sendRequest', { reqOptions })

    const invoices = [];

    for (const key in data) {
      let invoice = !data[key].items ? { ...data[key], items: [] } : data[key];
      invoices.push(invoice);
    }

    context.commit('setInvoices', { invoices })
  }
  ,
  async getInvoiceById(context, payload) {

    const reqOptions = { method: 'GET' }
    const path = payload.id;
    const data = await context.dispatch('sendRequest', { reqOptions, path });

    if (!data) {
      context.commit('setFilteredInvoiceById', { invoice: null });
      return
    }

    let invoice = !data.items ? { ...data, items: [] } : data;

    context.commit('setFilteredInvoiceById', { invoice })

  }
  ,
  async deleteInvoice(context, payload) {

    const reqOptions = { method: 'DELETE' }

    const path = payload.id;

    const message = `Invoice #${path.substring(0, 6)} has been deleted`;

    await context.dispatch('sendRequest', { reqOptions, path, message });

  },
  async sendRequest(context, { path, message, reqOptions }) {

    const userId = context.rootState.auth.userId;
    const idToken = context.rootState.auth.idToken;
    const dataPath = path ? `${userId}/${path}` : userId;

    const url = `${process.env.VUE_APP_FIREBASE_URI}/${dataPath}.json?auth=${idToken}`;

    return await context.dispatch(
      'HTTPRequest/sendRequest',
      { url, message, reqOptions },
      { root: true });
  },
  filterUserInvoiceById(context, payload) {
    context.commit('setFilterUserInvoiceById', payload)
  },
  filterUserInvoiceByStatus(context, payload) {
    context.commit("filterUserInvoiceByStatus", payload)
  },
  addInvoice(context, payload) {
    context.commit('addInvoice', { invoice: payload.invoice })
    if (payload.toEdit) {
      context.commit("setFilteredInvoiceById", payload)
    }
  }
  ,

}
