import axios from "axios";

const apiCall = axios.create({
    //baseURL: 'https://youvprog.pythonanywhere.com/api/v1/',
    baseURL: 'https://youvprog.pythonanywhere.com/api/v1/',

});

export default {
    getProds(page) {
        return apiCall.get(`products?page=${page}`)
    },
    getLatestProd(){
        return apiCall.get('latest-products/')
    },
    getSingleProd(prod_slug) {
        return apiCall.get(`products/${prod_slug}/`)
    },
    getCatProds(cat_slug){
        return apiCall.get(`${cat_slug}`)
    }
}


