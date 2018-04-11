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
      return state.user.wishlist
    },
    user : state => {
      return state.user
    }
  },
});

export default store;
