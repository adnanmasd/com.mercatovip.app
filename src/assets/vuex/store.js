import Vuex from 'vuex';
import Vue from 'vue';

import axios from 'axios'
import cms from 'cms.js'
import api from 'api.js'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    sideBarCategories : [],
    sideBarTools : [],
    sideBarInfo : [],
    sliderHome : [],
    bannerHome : [],
    specialBannersHome : [],
    homePageProducts : [],
    specialProducts : [],
    latestProducts : [],
    cart : [],
    cart_error : [],
    wishlist : [],
    user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  },
  mutations: {
    updateCategories (state, data) {
      state.sideBarCategories = data
    },
    updateTools (state, data) {
      state.sideBarTools = data
    },
    updateInfo (state, data) {
      state.sideBarInfo = data
    },
    updateSliderHome (state, data) {
      state.sliderHome = data
    },
    updateBannerHome (state, data) {
      state.bannerHome = data
    },
    updateSpecialBannersHome (state, data) {
      state.specialBannersHome = data
    },
    updateHomePageProducts (state, data) {
      state.homePageProducts = data
    },
    addHomePageProducts (state, data) {
      state.homePageProducts.push(data)
    },
    updateSpecialProducts (state, data) {
      state.specialProducts = data
    },
    updateLatestProducts (state, data) {
      state.latestProducts = data
    },
    updateCart(state, data, removed=false){
      state.cart = data;
    },
    updateCartError(state, data){
      state.cart_error = data;
    },
    updateWishlist(state, data){
      state.wishlist = data;
    },
    updateUser(state, data){
      state.user = data;
    },
    updateWishlist(state, data){
      state.user.wishlist = data;
    },
    removeUser(state){
      state.user = null;
      localStorage.removeItem('remember_me_key');
    }
  },
  actions: {
    fetchHomeData ({commit}) {
      axios.get(cms.baseUrl+cms.collectionPath+cms.sideBarCategories+cms.tokenVar).then(function (response){
        commit('updateCategories' , response.data.entries);
      });
      axios.get(cms.baseUrl+cms.collectionPath+cms.sideBarTools+cms.tokenVar).then(function (response){
        commit('updateTools' , response.data.entries);
      });
      axios.get(cms.baseUrl+cms.collectionPath+cms.sideBarInfo+cms.tokenVar).then(function (response){
        commit('updateInfo' , response.data.entries);
      });
      axios.get(cms.baseUrl+cms.collectionPath+cms.sliderHome+cms.tokenVar).then(function (response){
        commit('updateSliderHome' , response.data.entries);
      });
      axios.get(cms.baseUrl+cms.collectionPath+cms.bannerHome+cms.tokenVar).then(function (response){
        commit('updateBannerHome' , response.data.entries);
      });
      axios.get(cms.baseUrl+cms.collectionPath+cms.specialBannersHome+cms.tokenVar).then(function (response){
        commit('updateSpecialBannersHome' , response.data.entries);
      });
      axios.get(cms.baseUrl+cms.collectionPath+cms.homePageProducts+cms.tokenVar).then(function (response){
        if (response.data.total > 0){
        var i = 0;
        for (i in response.data.entries[0].product_ids) {
          var headers = api.headers;
          headers['X-Oc-Image-Dimension'] = "400x400";
          axios({
              method: "GET",
              url: api.baseUrl + api.urls.getProductById.replace("{id}", response.data.entries[0].product_ids[i].value),
              headers: headers
          }).then(function(response) {
            if (response.data.data != [])
              commit('addHomePageProducts', response.data.data)
          });
        }
      }
      });
      var headers = api.headers;
      headers['X-Oc-Image-Dimension'] = "400x400";
      axios({
          method : "GET",
          url: api.baseUrl+api.urls.getSpecialsLimit.replace("{limit}", 6),
          headers: headers
        }).then(function (response){
        commit('updateSpecialProducts' , response.data.data);
      });
      axios({
          method : "GET",
          url: api.baseUrl+api.urls.getLatestLimit.replace("{limit}", 6),
          headers: headers
        }).then(function (response){
        commit('updateLatestProducts' , response.data.data);
      });
    },
    fetchCart({commit}){
      var headers = api.headers;
      headers['X-Oc-Image-Dimension'] = "80x80";
      axios({
          method : "GET",
          url: api.baseUrl+api.urls.cart,
          headers: headers
        }).then(function (response){
          commit('updateCartError' , response.data.error);
          commit('updateCart' , response.data.data);
      });
    },
    saveUser({commit},user){
      axios({
          method : "GET",
          url: api.baseUrl+api.urls.getWishlist,
          headers: api.headers
        }).then(function (response){
          user.wishlist = response.data.data
          localStorage.setItem("user", JSON.stringify(user))
          localStorage.setItem("remember_me_key", user.remember_me_key)
          commit('updateUser' , user);
      });
    },
    removeUser({commit}){
      commit('removeUser');
    },
    fetchWishlist({commit}){
      var w_headers = api.headers;
      w_headers['X-Oc-Image-Dimension'] = "400x400";
      axios({
          method : "GET",
          url: api.baseUrl+api.urls.getWishlist,
          headers: w_headers
        }).then(function (response){
          commit('updateWishlist' , response.data.data);
          let user = JSON.parse(localStorage.getItem("user"))
          user.wishlist = response.data.data
          localStorage.setItem("user", JSON.stringify(user))
      });
    }
  },
  getters: {
    sideBarCategories : state =>{
      return state.sideBarCategories;
    },
    sideBarTools : state =>{
      return state.sideBarTools;
    },
    sideBarInfo : state =>{
      return state.sideBarInfo;
    },
    sliderHome : state =>{
      return state.sliderHome;
    },
    bannerHome : state =>{
      return state.bannerHome;
    },
    specialBannersHome : state =>{
      return state.specialBannersHome;
    },
    homePageProducts : state =>{
      return state.homePageProducts;
    },
    specialProducts : state =>{
      return state.specialProducts;
    },
    cart : state => {
      return state.cart
    },
    cartError : state => {
      return state.cart_error
    },
    wishlist : state => {
      return state.user !== null ? state.user.wishlist : null;
    },
    user : state => {
      return state.user
    }
  },
});

export default store;
