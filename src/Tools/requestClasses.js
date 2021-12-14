import Constants from '../components/Constants.json';

import  jwt  from 'jsonwebtoken';

const axios = require('axios').default;


class Request {
    baseUrl;
    decoder;
    stateVar;
    stateVarFnc;

    constructor(stateVar = false, stateVarFnc = false) {
        if (this.constructor == Request) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        this.baseUrl = Constants.API_ADDRESS;
        this.decoder = jwt;
        this.stateVar = stateVar;
        this.stateVarFnc = stateVarFnc;
    }

    getHeaders(codedJWT) {
        let axiosHeaders;

        if (this.decoder.decode(codedJWT) == null) axiosHeaders = null;
        else axiosHeaders = {'headers': {'Authorization': 'Bearer ' + codedJWT}};

        return axiosHeaders;
    }

    request() {
        /**
         * must implement request function
         */

        throw new Error("Method 'get()' must be implemented.");
    }

    getStateVar() {
        return this.stateVar;
    }

    setStateVar(stateVar) {
        this.stateVar = stateVar;
    }

    getStateVarFnc() {
        return this.stateVarFnc;
    }

    setStateVarFnc(stateVarFnc) {
        this.stateVarFnc = stateVarFnc;
    }
}

class RequestGet extends Request {

    request(codedJWT, apiRoute) {
        /**
         * perform axios get request
         */

        axios.get(this.baseUrl + apiRoute, this.getHeaders(codedJWT))
            .then((response) => {
                console.log('RequestGet: ', response.data);
                if (this.stateVarFnc != false) this.stateVarFnc(response.data);
                else this.stateVar = response.data;
            })
            .catch((error) => {
                console.log('RequestGet: ', error);
            })
            .then(() => {
                console.log('RequestGet: ' + this.baseUrl + apiRoute);
            });
    }
}

class RequestGetRestaurants extends RequestGet {

    getRestaurantsApiRoute(codedJWT) {
        let restaurantsUrl;
        let decoded = this.decoder.decode(codedJWT);

        if (decoded == null) {
            restaurantsUrl = '/public/restaurants';
        } else if (decoded.role === 'CUSTOMER') {
            restaurantsUrl = '/public/restaurants';
        } else if (decoded.role === 'MANAGER') {
            restaurantsUrl = '/manager/restaurants';
        }

        return restaurantsUrl;
    }

    request(codedJWT) {
        super.request(codedJWT, this.getRestaurantsApiRoute(codedJWT));
    }
}

class RequestPost extends Request {

    request(codedJWT, apiRoute, sendData) {
        /**
         * perform axios post request
         */

        console.log('RequestPost data', sendData);

        axios.post(this.baseUrl + apiRoute, sendData, this.getHeaders(codedJWT))
            .then((response) => {
                console.log('RequestPost: ', response.data);
                if (this.stateVarFnc != false) this.stateVarFnc(response.data);
            })
            .catch((error) => {
                console.log('RequestPost: ', error);
            })
            .then(() => {
                console.log('RequestPost: ' + this.baseUrl + apiRoute);
            })
    }
}

class RequestPut extends Request {

    request(codedJWT, apiRoute, sendData) {
        /**
         * perform axios post request
         */

        console.log('RequestPost data', sendData);

        axios.put(this.baseUrl + apiRoute, sendData, this.getHeaders(codedJWT))
            .then((response) => {
                console.log('RequestPut: ', response.data);
                if (this.stateVarFnc != false) this.stateVarFnc(response.data);
            })
            .catch((error) => {
                console.log('RequestPut: ', error);
            })
            .then(() => {
                console.log('RequestPut: ' + this.baseUrl + apiRoute);
            })
    }
}


export {
    RequestGet,
    RequestGetRestaurants,
    RequestPost,
    RequestPut
}