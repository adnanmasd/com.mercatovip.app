

<template>

<f7-page :dir="direction">
    <f7-block class="side-menu-profile" strong>
        <f7-link v-if="!user" href="/login/" data-view="#main-view" class="panel-close" icon-if-ios="f7:login" icon-if-md="material:account_circle" icon-size="1em"> &ensp; &ensp; {{ $t("home.sideBar.login") }}</f7-link>
        <h2 v-if="user" class="panel-close">{{ $t("home.sideBar.greetings") }} {{user.firstname}}</h2>
        <!-- <f7-button v-if="user" @click="logout()" round raised>{{ $t("home.sideBar.logout") }}</f7-button> -->
    </f7-block>
    <f7-list style="margin:0">
        <f7-list-group v-if="sideBarCategories.length">
            <f7-list-item v-for="row in sideBarCategories" :key="row.id" link-view="#main-view" panel-close :link="row.link_id" :title="row.name[currentLanguageId]">
              <div slot="media" v-if="theme.ios" v-html="row.media_ios"></div>
              <div slot="media" v-if="theme.md" v-html="row.media"></div>
            </f7-list-item>
        </f7-list-group>
        <f7-list-group v-if="sideBarTools.length">
            <f7-list-item link-view="#main-view" panel-close :link="row.link_id" v-for="row in sideBarTools" :key="row.id" :title="row.name[currentLanguageId]">
              <div slot="media" v-html="row.media"></div>
            </f7-list-item>
        </f7-list-group>
        <f7-list-group v-if="sideBarInfo.length">
            <f7-list-item link-view="#main-view" panel-close :link="row.link_id" v-for="row in sideBarInfo" :key="row.id" :title="row.name[currentLanguageId]">
                <div slot="media" v-if="theme.ios" v-html="row.media_ios"></div>
                <div slot="media" v-if="theme.md" v-html="row.media"></div>
            </f7-list-item>
        </f7-list-group>
        <f7-list-group>
            <f7-list-item class="external" panel-close :title="$t('home.sideBar.callus.title')" external link="tel:920003598">
                <div slot="media" v-if="theme.ios"><i class='f7-icons'>phone_round_fill</i></div>
                <div slot="media" v-if="theme.md"><i class='material-icons'  style="color:green">phone</i></div>
            </f7-list-item>
            <f7-list-item link="#" class="shareapp" panel-close :title="$t('home.sideBar.shareapp.title')">
                <div slot="media" v-if="theme.ios"><i class='icon f7-icons'>share</i></div>
                <div slot="media" v-if="theme.md"><i class='icon material-icons'>share</i></div>
            </f7-list-item>
            <f7-list-item link="#" class="rate" panel-close :title="$t('home.sideBar.rateus.title')">
                <div slot="media" v-if="theme.ios"><i class='icon f7-icons' style="color:orange">star_fill</i></div>
                <div slot="media" v-if="theme.md"><i class='icon material-icons' style="color:orange">star_fill</i></div>
            </f7-list-item>
        </f7-list-group>
        <f7-list-group>
            <f7-list-item v-if="user" @click="logout()" link="" :title="$t('home.sideBar.logout')">
                <div slot="media"><i v-if="this.$theme.ios" class='f7-icons'>logout</i><i v-if="this.$theme.md" class='material-icons'>close</i></div>
            </f7-list-item>
        </f7-list-group>
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
                theme: this.$theme
            }
        },
        mounted: function() {
            self = this;
            store.dispatch('fetchHomeData');

            self.Dom7(document).on('click', '.shareapp', function(e) {
                self.shareapp();
            });

            self.Dom7(document).on('click', '.rate', function(e) {
                self.rate();
            });

            setInterval(function() {
                store.dispatch("fetchCart");
            }, 300000)
        },
        filters: {
            andFilter(val) {
                return val.replace(/&amp;/g, '&');
            }
        },
        computed: {
            sideBarCategories: {
                get: function() {
                    return store.state.sideBarCategories
                }
            },
            sideBarTools: {
                get: function() {
                    return store.state.sideBarTools
                }
            },
            sideBarInfo: {
                get: function() {
                    return store.state.sideBarInfo
                }
            },
            user: {
                get: function() {
                    return store.state.user
                }
            },
        },
        methods: {
            rate() {
                    if (LaunchReview.isRatingSupported()) {
                        LaunchReview.rating();
                    } else {
                        LaunchReview.launch();
                    }
                },
                shareapp() {
                    window.plugins.socialsharing.share(this.$t('share.app.msg'), this.$t('share.app.title'), /*this.$t('share.app.image')*/ null, this.$t('share.app.link'))
                },
                logout() {
                    self.$f7.preloader.show();
                    axios({
                        method: "POST",
                        url: api.baseUrl + api.urls.logout,
                        headers: api.headers,
                        data: {
                            "remember_me_key": localStorage.getItem('remember_me_key')
                        }
                    }).then(function(response) {
                        localStorage.removeItem('user');
                        store.dispatch("removeUser");
                        store.dispatch('fetchCart');
                    }).catch(function(error) {
                        var t = self.$f7.toast.create({
                            text: error.response.data.error,
                            closeTimeout: 5000,
                            destroyOnClose: true
                        });
                        t.open();
                    });
                    self.$f7.preloader.hide();
                },
        },
};

</script>
