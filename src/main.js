// Import Vue
import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import babelPolyfill from 'babel-polyfill'

//import store from 'store.js'
import axios from 'axios'

// Import F7
//import Framework7 from 'framework7'
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';
//import Framework7Vue from 'framework7-vue'
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js';

//import Framework7CSS from 'framework7/dist/css/framework7.css'
import Framework7Icons from 'framework7-icons/css/framework7-icons.css'
import FontAwesome from 'font-awesome/css/font-awesome.css'
import AppStyles from './assets/sass/main.scss'
import routes from './routes.js'
import app from './main.vue'
import api from 'api.js'


const store = new Vuex.Store();
Vue.use(vuexI18n.plugin, store, {
  onTranslationNotFound: function(locale, key) {
    console.warn(`vuex-i18n :: Key '${key}' not found for locale '${locale}'`);
  }
});

let language_code = localStorage.getItem('language_code')
if (language_code == null){
localStorage.setItem("language_id", "1");
localStorage.setItem("language_code", "en-gb");
}
let locale = language_code ? localStorage.getItem('language_code') : "en-gb"
let url = "./static/lang/locale-"+ locale +".json";

// check if the locale has already been loaded
if (Vue.i18n.localeExists(locale)) {
  Vue.i18n.set(locale);
}

// load the specified locale from the server
axios.get(url).then((response) => {
  Vue.i18n.add(locale, response.data);
  Vue.i18n.set(locale);

  }).catch((error) => {
    alert('could not fetch locale translations');
});


setTimeout(function(){

},3000)
// Init F7 Vue Plugin
//Vue.use(Framework7Vue)
Vue.use(Framework7Vue, Framework7);

var firstVisit = true;
!localStorage.getItem('firstVisit') ? localStorage.setItem('firstVisit', true) : '';

/* Init App
const app = new Vue({
  el: '#app',
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    dynamicNavbar: true,
    pushState:true,
    domCache: true,
    swipePanel: localStorage.getItem('language_id') == 1 ? 'left' : 'right',
    hideNavbarOnPageScroll : true,
    allowDuplicateUrls : true,
    notificationTitle : localStorage.getItem('language_id') == 1 ? 'MercatoVIP' : 'ميركاتوVIP',
    routes : Routes,
    preroute: function (view, options) {
      let loggedIn = localStorage.getItem("user") == null;
      if (options.url && options.url.includes('/wishlist') && loggedIn) {
        view.router.load({url: '/login?url='+ encodeURIComponent('/wishlist')});
      }
      if (options.url && options.url.includes('/checkout') && loggedIn) {
        view.router.load({url: '/login?url='+ encodeURIComponent('/checkout')});
      }
      if (options.url && options.url.includes('/myorders') && loggedIn) {
        view.router.load({url: '/login?url='+ encodeURIComponent('/myorders')});
      }
      if (options.url && options.url.includes('/review') && loggedIn) {
        view.router.load({url: '/login?url='+ encodeURIComponent('/review')});
      }
      return true;
    },
  },
  // Register App Component
  components: {
    app: App
  },
})*/

let appinstance = new Vue({
  // Root Element
  el: '#app',
  store,
  render: c => c('app'),
  components: {
    app,
  },
  framework7: {
    id: 'com.mercatovip.app',
    name: 'MercatoVIP',
    version : '2.0.4',
    theme : 'auto', // md or ios
    touch: {
      tapHold: true,
    },
    statusbar: {
      iosOverlaysWebview: true,
    },
    panel: {
      swipe: localStorage.getItem('language_id') == 1 ? 'left' : 'right',
      leftBreakpoint: 768,
      rightBreakpoint: 1024,
    },
    view: {
      iosDynamicNavbar: true,
    },
    navbar: {
      hideOnPageScroll: false,
      iosCenterTitle: false,
    },
  },
  routes,
});

localStorage.setItem('loggedIn', false);
appinstance.$f7.request({
    async: false,
    content: "application/json",
    dataType: "json",
    method : 'GET',
    url: api.baseUrl+api.urls.getSession,headers:api.headers,
    success : function(response,status,xhr) {
        localStorage.setItem('session_id', response.data.session);
    }
});

export default appinstance;
