
function isRequestFailed(reqMethod, resData, resOk) {
    const reqWithoutResData = ['DELETE'];
    return !resOk || (!reqWithoutResData.includes(reqMethod) && !resData);

}
export const HTTPRequestModule = {
    namespaced: true,

    state() {
        return {
            message: null,
            showRequestStateMessage: false,
            requestStateMessageType: null,
            isLoading: false,
        }
    },
    getters: {
        showRequestStateMessage(state) {
            return state.showRequestStateMessage;
        },
        message(state) {
            return state.message;
        },
        requestStateMessageType(state) {
            return state.requestStateMessageType;
        },
        isLoading(state) {
            return state.isLoading;
        },
    },
    mutations: {
        setRequestState(state, payload) {
            state.showRequestStateMessage = payload.showRequestStateMessage;
            state.requestStateMessageType = payload.requestStateMessageType;
            state.message = payload.message

        },
        setIsLoading(state, payload) {
            state.isLoading = payload.isLoading;
        }
    },
    actions: {
        async sendRequest(context, { url, reqOptions, message }) {

            let response;
            let data;
            context.commit('setIsLoading', { isLoading: false })
            try {
                context.commit('setIsLoading', { isLoading: true })
                response = await fetch(url, {
                    ...reqOptions,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                data = await response.json();

                const authMessage = (data&&data.error) ? data.error.message:"";

                if (isRequestFailed(reqOptions.method, data, response.ok))
                    throw new Error(message || authMessage);
                context.commit('setIsLoading', { isLoading: false })

                context.commit('setRequestState',
                    {
                        showRequestStateMessage: !!message,
                        requestStateMessageType: 'success',
                        message
                    })

            }
            catch (e) {
                context.commit('setIsLoading', { isLoading: false })

                context.commit('setRequestState',
                    {
                        showRequestStateMessage: true,
                        requestStateMessageType: 'error',
                        message: e.message
                    })
                return;
            }

            return data;

        },
        setRequestState(context, payload) {
            context.commit('setRequestState', payload)
        }
    }
}