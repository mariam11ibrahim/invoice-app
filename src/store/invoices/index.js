import getters from './getters';
import mutations from './mutations';
import actions from './actions';
export const invoicesModule = {
    namespaced: true,
    state() {
        return {
            userInvoices: [],
            filteredUserInvoices:[],
            filteredUserInvoiceById:null,
            hasError:false
        }
    }
    ,
    getters,
    mutations,
    actions
} 