import axios from "axios";

const apiCall = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',

});

export default {
    getProds(pathprods) {
        return apiCall.get(`${pathprods}/`)
    },
    getSingleProd(prod_slug) {
        return apiCall.get(`products/${prod_slug}/`)
    },
    getCatProds(cat_slug){
        return apiCall.get(`${cat_slug}`)
    }
}


