export default {

    openFormInvoice(state, payload) {
        state.isFormInvoiceOpen = true;
        state.toEdit = payload ? payload.toEdit : false;
    },
    closeFormInvoice(state) {
        state.isFormInvoiceOpen = false;
    },
    closeFilterList(state, payload) {
        state.isFilterListClosed = payload.isClosed;
    },
    closeBaseDialog(state, payload) {
        state.isBaseDialogClosed = payload.isClosed;
        state.baseDialogRole = payload.dialogRole;
    },
    toggleTheme(state) {
        let theme = state.theme == "light" ? "dark" : "light";
        state.theme = theme;
        localStorage.setItem("theme", theme);
    }

}