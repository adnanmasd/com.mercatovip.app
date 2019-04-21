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

Vue.i18n.set("en-gb");

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


localStorage.setItem('isLoggedIn', false);
//localStorage.removeItem('session_id');
if (localStorage.getItem('session_id') == null || localStorage.getItem('session_id') == "") {
  Framework7.request({
        async: false,
        dataType : "json",
        contentType: "application/json",
        method: "GET",
        url: api.baseUrl + api.urls.getSession,
        headers: api.headers(localStorage.getItem('session_id')),
        success : function(e, status, xhr) {
          localStorage.setItem('session_id', e.data.session)
        }
  });
}

// Init F7 Vue Plugin
//Vue.use(Framework7Vue)
Vue.use(Framework7Vue, Framework7);

var firstVisit = true;
!localStorage.getItem('firstVisit') ? localStorage.setItem('firstVisit', true) : '';

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
    version : '2.2.1',
    theme : 'auto', // md or ios
    touch: {
      tapHold: true,
      fastClicks : true
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
      pushState: false,
      stackPages: false,
      iosPageLoadDelay : 300,
      materialPageLoadDelay : 300
    },
    navbar: {
      hideOnPageScroll: false,
      iosCenterTitle: false,
    },
  },
  routes,
});

export default appinstance;
