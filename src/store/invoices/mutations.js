export default {
    setInvoices(state, payload) {

        state.userInvoices = payload.invoices;
        state.filteredUserInvoices = payload.invoices;
    },
    setFilteredInvoiceById(state, payload) {
        state.filteredUserInvoiceById = payload.invoice

    },
    filterUserInvoiceByStatus(state, payload) {
        if (payload.status == "all") state.filteredUserInvoices = state.userInvoices;
        else state.filteredUserInvoices = state.userInvoices.filter(invoice => invoice.status == payload.status);

    },
    addInvoice(state, payload) {
        const registeredInvoices = state.userInvoices.find(invoice => invoice.id == payload.invoice.id)

        if (registeredInvoices) {
            const invoiceIndex = state.userInvoices.findIndex(invoice => invoice.id == payload.invoice.id)
            state.userInvoices[invoiceIndex] = { ...payload.invoice }
        }
        else {
            state.userInvoices.unshift(payload.invoice)
            
        }
    },
    markAsPaid(state) {
        state.filteredUserInvoiceById.status = 'paid'
    },

}