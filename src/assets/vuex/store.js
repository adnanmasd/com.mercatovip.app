import Vuex from 'vuex';
import Vue from 'vue';

import axios from 'axios'
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';
import cms from 'cms.js'
import api from 'api.js'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    sideBarCategories: [],
    sideBarTools: [],
    sideBarInfo: [],
    homePageContent : [],
    cart: [],
    cart_error: [],
    wishlist: [],
    notifications: [],
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  },
  mutations: {
    updateCategories(state, data) {
      state.sideBarCategories = data
    },
    updateTools(state, data) {
      state.sideBarTools = data
    },
    updateInfo(state, data) {
      state.sideBarInfo = data
    },
    updateHomePageContent(state, data) {
      state.homePageContent = data
    },
    updateCart(state, data, removed = false) {
      state.cart = data;
    },
    updateCartError(state, data) {
      state.cart_error = data;
    },
    updateWishlist(state, data) {
      state.wishlist = data;
    },
    updateUser(state, data) {
      state.user = data;
    },
    updateWishlist(state, data) {
      state.user.wishlist = data;
    },
    updateNotifications(state, data) {
      state.notifications = data
    },
    removeUser(state) {
      state.user = null;
      localStorage.removeItem('remember_me_key');
    }
  },
  actions: {
    fetchHomeData({ commit }) {
      // axios.get(cms.baseUrl+cms.collectionPath+cms.sideBarCategories+cms.tokenVar).then(function (response){
      //   commit('updateCategories' , response.data.entries);
      // });
      axios.get(cms.baseUrl+cms.collectionPath+cms.sideBarTools+cms.tokenVar).then(function (response){
        commit('updateTools' , response.data.entries);
      });
      axios.get(cms.baseUrl+cms.collectionPath+cms.sideBarInfo+cms.tokenVar).then(function (response){
        commit('updateInfo' , response.data.entries);
      });
      // axios.get(cms.baseUrl + cms.getReigion('home') + cms.tokenVar).then(function (response) {
      //   commit('updateHomePageContent', response.data.item);
      // });
    },
    fetchCart({ commit }) {
      var headers = api.headers(localStorage.getItem('session_id'));
      headers['X-Oc-Image-Dimension'] = "80x80";
      axios({
        method: "GET",
        url: api.baseUrl + api.urls.cart,
        headers: headers
      }).then(function (response) {
        commit('updateCartError', response.data.error);
        commit('updateCart', response.data.data);
      });
    },
    saveUser({ commit }, user) {
      axios({
        method: "GET",
        url: api.baseUrl + api.urls.getWishlist,
        headers: api.headers(localStorage.getItem('session_id'))
      }).then(function (response) {
        user.wishlist = response.data.data
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("remember_me_key", user.remember_me_key)
        commit('updateUser', user);
      });
    },
    removeUser({ commit }) {
      commit('removeUser');
    },
    notifications({ commit }) {
      commit('updateNotifications', JSON.parse(localStorage.getItem("notifications")));
    },
    fetchWishlist({ commit }) {
      var w_headers = api.headers(localStorage.getItem('session_id'));
      w_headers['X-Oc-Image-Dimension'] = "400x400";
      axios({
        method: "GET",
        url: api.baseUrl + api.urls.getWishlist,
        headers: w_headers
      }).then(function (response) {
        commit('updateWishlist', response.data.data);
        let user = JSON.parse(localStorage.getItem("user"))
        user.wishlist = response.data.data
        localStorage.setItem("user", JSON.stringify(user))
      });
    }
  },
  getters: {
    sideBarCategories: state => {
      return state.sideBarCategories;
    },
    sideBarTools: state => {
      return state.sideBarTools;
    },
    sideBarInfo: state => {
      return state.sideBarInfo;
    },
    sliderHome: state => {
      return state.sliderHome;
    },
    bannerHome: state => {
      return state.bannerHome;
    },
    specialBannersHome: state => {
      return state.specialBannersHome;
    },
    homePageProducts: state => {
      return state.homePageProducts;
    },
    specialProducts: state => {
      return state.specialProducts;
    },
    cart: state => {
      return state.cart
    },
    cartError: state => {
      return state.cart_error
    },
    wishlist: state => {
      return state.user !== null ? state.user.wishlist : null;
    },
    notifications: state => {
      return state.notifications !== null ? state.user.notifications : null;
    },
    user: state => {
      return state.user
    }
  },
});

export default store;
