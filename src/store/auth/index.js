import getters from './getters';
import mutations from './mutations';
import actions from './actions';
export const authModule = {
    namespaced: true,
    state() {
        return {
            idToken: null,
            isAuthenticated: false,
            userId:'',
        }
    }
    ,
    getters,
    mutations,
    actions
} 