const API_KEY = process.env.VUE_APP_API_KEY;
let logoutTimer;
export default {
    async authenticate(context, payload) {
        let url;
        if (payload.type == 'signup') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY;
        }
        else {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=` + API_KEY;
        }
        const reqOptions = {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        }

        const data = await context.dispatch(
            'HTTPRequest/sendRequest',
            { url, reqOptions },
            { root: true });

        if (!data) return

        localStorage.setItem('idToken', data.idToken);
        localStorage.setItem('userId', data.localId);
        let expiresIn = +data.expiresIn * 1000;

        let expireationTime = new Date().getTime() + expiresIn;
        localStorage.setItem('expireationTime', expireationTime);

        context.commit('setUser',
            {
                idToken: data.idToken,
                userId: data.localId,
                isAuthenticated: !!data.idToken
            });

        logoutTimer = setTimeout(() => {
            context.dispatch('logout')
        }, expiresIn);

    },
    async signup(context, payload) {
        context.dispatch('authenticate', { ...payload, type: 'signup' })

    },
    async login(context, payload) {
        context.dispatch('authenticate', { ...payload, type: 'login' })

    },
    tryLogin(context) {
        let expireationTime = localStorage.getItem('expireationTime');
        let expirationRemainingTime = expireationTime - new Date().getTime();

        if (expirationRemainingTime < 10) return;

        logoutTimer = setTimeout(() => {
            context.dispatch('logout')

        }, expirationRemainingTime);


        let idToken = localStorage.getItem('idToken');
        let userId = localStorage.getItem('userId');


        if (idToken) {
            context.commit('setUser', {
                userId,
                idToken,
                isAuthenticated: !!idToken,

            })
        }

    },
    logout(context) {

        localStorage.removeItem('idToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('expireationTime');

        clearTimeout(logoutTimer);

        context.commit('setUser', {
            userId: null,
            idToken: null,
            isAuthenticated: false,
        });

    },



}