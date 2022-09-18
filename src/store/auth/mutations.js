export default {
    
    setUser(state, payload) {
        state.isAuthenticated = payload.isAuthenticated;
        state.userId = payload.userId;
        state.idToken = payload.idToken;
    },


}