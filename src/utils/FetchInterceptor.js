import fetchIntercept from 'fetch-intercept';

const FetchInterceptor = () => {
    fetchIntercept.register({
        request: function (url, config) {
            const headers = {
                'Content-type': 'application/json',
            };

            const newConfig = {
                ...config,
                mode: 'cors',
                headers: headers,
            };

            console.log(newConfig);
            return [url, newConfig];
        },

        requestError: function (error) {
            return Promise.reject(error);
        },

        response: function (response) {
            return response;
        },

        responseError: function (error) {
            return Promise.reject(error);
        },
    });
};

export default FetchInterceptor;