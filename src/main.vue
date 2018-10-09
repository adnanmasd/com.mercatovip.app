

<template>

<!-- App -->
<div id="app" :dir="direction">
    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>
    <!-- Left Panel -->
    <f7-panel :side="sideBarPos" reveal>
        <f7-view url="/panel-left/" links-view=".view-main" />
    </f7-panel>

    <f7-panel :side="sideBar2Pos" reveal>
        <f7-view url="/panel-right/" links-view=".view-main" />
    </f7-panel>

    <f7-view url="/" :main="true" id="main-view" class="ios-edges">

    </f7-view>

    <f7-popup id="welcomePopup" v-if="firstVisit === 'true'" opened>
        <f7-swiper :params="{allowTouchMove:false,effect:'slide',watchSlidesProgress: true}" class="welcome-swiper">
            <f7-swiper-slide class="welcome-slider">
                <f7-block class="text-color-black">
                    <f7-row>
                        <f7-col width="100">
                            <h1>{{$t('welcome.first.heading1.eng')}}</h1>
                        </f7-col>
                        <f7-col width="100">
                            <h1>{{$t('welcome.first.heading1.ar')}}</h1>
                        </f7-col>

                        <f7-col width="100">
                            <h3>{{$t('welcome.first.choose.lang.title.en')}}</h3>
                        </f7-col>
                        <f7-col width="100">
                            <h3>{{$t('welcome.first.choose.lang.title.ar')}}</h3>
                        </f7-col>
                        <f7-col width="100">
                            <f7-list>
                                <f7-list-item radio title="English" @click="nextSlide()">
                                </f7-list-item>
                                <f7-list-item radio title="عربي" @click="changeToAr()">
                                </f7-list-item>
                            </f7-list>
                        </f7-col>
                    </f7-row>
                </f7-block>
            </f7-swiper-slide>
            <f7-swiper-slide class="welcome-slider">
                <f7-block class="text-color-black">
                    <f7-row>
                        <f7-col width="100" style="text-transform:uppercase">
                            <h1>{{$t('welcome.second.heading1')}}</h1>
                        </f7-col>
                        <f7-col width="100" style="padding:0 2em">
                            <h3>{{$t('welcome.second.para')}}</h3>
                        </f7-col>
                        <f7-col width="100">
                            <h1><strong>"SAVE10"</strong></h1>
                        </f7-col>
                        <f7-col width="100" style="padding : 2em">
                            <f7-button big round color="black" fill :text="$t('welcome.last.shopnow.title')" close-popup="#welcomePopup" v-on:click="onExitWelcome"></f7-button>
                        </f7-col>
                    </f7-row>
                </f7-block>
            </f7-swiper-slide>
        </f7-swiper>
    </f7-popup>

</div>

</template>

<script>

import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import axios from 'axios'

import store from 'src/assets/vuex/store.js'
import cms_config from 'cms.js'
import api from 'api.js'

let self;

export default {
    data() {
            return {
                firstVisit: localStorage.getItem('firstVisit'),
                currentLanguageId: (localStorage.getItem('language_id')),
                currentLanguage: (localStorage.getItem('language_id') == 1 ? false : true),
                direction: (localStorage.getItem('language_id') == '1' ? "ltr" : "rtl"),
                sideBarPos: (localStorage.getItem('language_id') === '1' ? "left" : "right"),
                sideBar2Pos: (localStorage.getItem('language_id') === '1' ? "right" : "left"),
                logo: (localStorage.getItem('language_id') == 1 ? "static/img/logo-en.png" : "static/img/logo-ar.png"),
                searchTerm: "",
                swipeoutSide: (localStorage.getItem('language_id') == 1 ? "right" : "left")
            }
        },
        mounted: function(){
            let self = this;

        },
        filters: {

        },
        computed: {

        },
        methods: {
            onExitWelcome() {
                    localStorage.setItem('firstVisit', false);
                    location.reload();
                },
                changeToAr() {
                    let locale = "ar";
                    localStorage.setItem("language_id", "2");
                    localStorage.setItem("language_code", "ar");
                    let url = "./static/lang/locale-" + locale + ".json";

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
                    var mySwiper = this.Dom7('.welcome-swiper')[0].swiper;
                    mySwiper.slideNext();
                },
                nextSlide() {
                    let locale = "en-gb";
                    localStorage.setItem("language_id", "1");
                    localStorage.setItem("language_code", "en-gb");
                    let url = "./static/lang/locale-" + locale + ".json";

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
                    var mySwiper = this.Dom7('.welcome-swiper')[0].swiper;
                    mySwiper.slideNext();
                },
        },

}

</script>
