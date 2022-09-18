export default {
  openFormInvoice(context, payload) {
    context.commit('openFormInvoice', payload);
  },
  closeFormInvoice(context) {
    context.commit('closeFormInvoice');
  },

  closeFilterList(context, payload) {
    context.commit("closeFilterList", payload)
  },
  closeBaseDialog(context,payload){
    context.commit("closeBaseDialog", payload)
  }
  ,
  toggleTheme(context){
    context.commit("toggleTheme")
  }


}