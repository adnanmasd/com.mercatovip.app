<template>
<f7-page :dir="direction">
    <f7-block class="side-menu-profile" strong>
        <f7-link v-if="!user" href="/login/" data-view="#main-view" class="panel-close" icon-if-ios="f7:login" icon-if-md="material:account_circle" icon-size="1em"> &ensp; &ensp; {{ $t("home.sideBar.login") }}</f7-link>
        <h2 v-if="user" class="panel-close">{{ $t("home.sideBar.greetings") }} {{user.firstname}}</h2>
        <!-- <f7-button v-if="user" @click="logout()" round raised>{{ $t("home.sideBar.logout") }}</f7-button> -->
    </f7-block>
    <f7-list style="margin:0">
        <!--f7-list-group v-if="sideBarCategories.length">
            <f7-list-item v-for="row in sideBarCategories" :key="row.id" link-view="#main-view" class="panel-close" :link="row.link_id" :title="row.name[currentLanguageId]">
            </f7-list-item>
        </f7-list-group-->
        <ul>
            <template v-for="row in c">
                <div v-if="row.categories.length < 1">
                    <li class="accordion-item">
                        <a link-view="#main-view" :href="'/category?category_id='+ row.category_id" class="panel-close item-content item-link">
                            <div class="item-inner">
                                <div class="item-title"><a class="text-color-black">{{row.name | andFilter}}</a></div>
                            </div>
                        </a>
                    </li>
                </div>

                <div v-else>
                    <li class="accordion-item">
                        <a  href="#" class="item-content item-link">
                            <div class="item-inner">
                                <div class="item-title"><a link-view="#main-view" :href="'/category?category_id='+ row.category_id" class="panel-close text-color-black">{{row.name | andFilter}}</a></div>
                            </div>
                        </a>
                        <div class="accordion-item-content">
                            <template v-for="row2 in row.categories">
                                <div v-if="row2.categories.length > 1">
                                    <li class="accordion-item">
                                        <a href="#" class="item-content item-link">
                                            <div class="item-inner">
                                                <div class="item-title"><a link-view="#main-view" class="panel-close" :href="'/category?category_id='+ row2.category_id">{{row2.name | andFilter}}</a></div>
                                            </div>
                                        </a>
                                        <div class="accordion-item-content">
                                            <template v-for="row3 in row2.categories">
                                                <li class="accordion-item">
                                                    <a link-view="#main-view" :href="'/category?category_id='+ row3.category_id" class="panel-close item-content item-link">
                                                        <div class="item-inner">
                                                            <div class="item-title"><a>{{row3.name | andFilter}}</a></div>
                                                        </div>
                                                    </a>
                                                </li>
                                            </template>
                                        </div>
                                    </li>
                                </div>
                                <div v-else>
                                    <li class="accordion-item">
                                        <a link-view="#main-view" :href="'/category?category_id='+ row2.category_id" class="panel-close item-content item-link">
                                            <div class="item-inner">
                                                <div class="item-title"><a>{{row2.name | andFilter}}</a></div>
                                            </div>
                                        </a>
                                    </li>
                                </div>
                            </template>
                        </div>
                    </li>
                </div>
            </template>
        </ul>
    </f7-list>
</f7-page>
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
            currentLanguageId: (localStorage.getItem('language_id')),
            currentLanguage: (localStorage.getItem('language_id') == 1 ? false : true),
            direction: (localStorage.getItem('language_id') == 1 ? "ltr" : "rtl"),
            sideBarPos: (localStorage.getItem('language_id') == 1 ? "left" : "right"),
            swipeoutSide: (localStorage.getItem('language_id') == 1 ? "right" : "left"),
            theme: this.$theme,
            c: [],
            sub_categories: []
        }
    },
    mounted: function () {
        self = this;
        self.$f7.preloader.show();
        var headers = api.headers(localStorage.getItem('session_id'));
        headers['X-Oc-Image-Dimension'] = "200x200";
        axios({
            method: "GET",
            url: api.baseUrl + api.urls.getCategoriesByLevel.replace("{level}", "4"),
            headers: headers,
            transformResponse: function (req) {
                var newReq = req.replace(/[\r\n|\n\r]/g, '');
                return JSON.parse(newReq)
            }
        }).then(function (response) {
            if (response.status !== 202 && response.data.data) {
                self.c = response.data.data;
            }
            self.$f7.preloader.hide();
        });
    },
    filters: {
        andFilter(val) {
            return val.replace(/&amp;/g, '&');
        }
    },
    computed: {
        user: {
            get: function () {
                return store.state.user;
            }
        }
    },
    methods: {
        getSubCategories() {

        },
        getImagefromSource(src) {
            return "<img src='" + src + "'" + " width='20'/>";
        },
    },
};
</script>
