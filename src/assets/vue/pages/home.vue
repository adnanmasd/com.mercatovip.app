<template>
<f7-page name="home" tabs hide-toolbar-on-scroll :page-content="false">
    <f7-navbar :class="this.$theme.md ? 'color-white text-color-black': ''">
        <f7-nav-left>
            <f7-link :panel-open="sideBarPos" icon="fa fa-bars">
            </f7-link>
        </f7-nav-left>
        <f7-nav-title class="nav-center-margin">
            <img :src="logo" class="logo" />
        </f7-nav-title>
            <f7-nav-right>
                <f7-link icon-only @click="openChatWindow()"  icon="fa fa-comments-o">
                    <!-- href="/tag?tag_name=face-makeup" -->
                </f7-link>
            </f7-nav-right>
            <f7-subnavbar :inner="false">
                <f7-searchbar id="search" search-list="#search-list" :placeholder="$t('home.searchbar.placeholder')" :clear-button="true" customSearch v-model="searchTerm">
                </f7-searchbar>

            </f7-subnavbar>
    </f7-navbar>
    <f7-toolbar tabbar labels id="mainToolbar" :class="this.$theme.md ? 'color-black' : ''" bottom-md>
        <f7-link tab-link="#hometab" class="tab-link-active" icon="fa fa-home">
            <span class="tabbar-label">{{$t('tabbar.home.title')}}</span>
        </f7-link>
        <!--f7-link tab-link="#searchtab" icon="fa fa-search">
            <span class="tabbar-label">{{$t('tabbar.search.title')}}</span>
        </f7-link-->
        <f7-link tab-link="#carttab">
            <i class="icon fa fa-shopping-cart"><span v-if="cart.total_product_count" class="badge color-red">{{cart.total_product_count}}</span></i>
            <span class="tabbar-label">{{$t('tabbar.cart.title')}}</span>
        </f7-link>
        <f7-link tab-link="#profiletab" icon-if-md="material:account_box" icon-if-ios="f7:person">
            <span class="tabbar-label">{{$t('tabbar.profile.title')}}</span>
        </f7-link>
    </f7-toolbar>

    <f7-tabs>
        <f7-page-content tab tab-active id="hometab">
            <div class="list virtual-list media-list homeContentList no-margin">
                <ul>
                    <li v-for="(row, index) in vlData.items" :key="index" media-item :style="`top: ${vlData.topPosition}px`">
                        <template v-for="row2 in row['value']">
                            <template v-if="row2['_link'] == 'Sliders'">
                                <f7-row>
                                    <f7-col :width="row2.width">
                                        <f7-swiper v-if="row2.image.length" pagination :params="{preloadImages: true,spaceBetween: 10,loop:true,centeredSlides:true,autoplay:true}">
                                            <f7-swiper-slide class="image-slider" v-for="i in row2.image" :key="row.id">
                                                <span v-if="i.value['txt' + currentLanguageId]" class="slider-title">{{ i.value['txt' + currentLanguageId] }}</span>
                                                <img @click="navigate(i.value.link)" :src="getCMSImage(i.value['img' + currentLanguageId].path)" class="slider lazy swiper-lazy">
                                                <div class="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
                                            </f7-swiper-slide>
                                        </f7-swiper>
                                    </f7-col>
                                </f7-row>
                            </template>

                            <template v-if="row2['_link'] == 'Banners'">
                                <f7-block-title v-if="row2.name_as_heading && row2.show_name">{{row2.name[currentLanguageId]}}</f7-block-title>
                                <f7-block class="home-page-block" :style="row2.full_width ? 'padding : 0' : ''">
                                    <f7-row :class="row2['full_width'] ? row2['full_width'] : ''">
                                        <f7-col :width="row2['width']">
                                            <span class="banner-title" v-if="row2.name[currentLanguageId] && !row2.name_as_heading  && row2.show_name">{{row2.name[currentLanguageId]}}</span>
                                            <img @click="navigate(row2.link)" :src="getCMSImage(row2.image[currentLanguageId].path)" class="specialBanner">
                                </f7-col>
                                    </f7-row>
                                </f7-block>
                            </template>

                            <template v-if="row2['_link'] == 'CarouselBanner'">
                                <f7-block class="home-page-block" :style="row2.full_width ? 'padding : 0' : ''">
                                    <f7-swiper :pagination="row2.length > row2.show_per_row" :params="{preloadImages: false,lazy: true,freeMode: true,slidesPerView: row2.show_per_row,slidesPerColumn: 1,spaceBetween:10}" style="width:100%">
                                        <f7-swiper-slide v-for="i in row2.image" class="image-slider" :key="i.id">
                                            <span class="banner-title">{{i.value['txt' + currentLanguageId]}}</span>
                                            <img @click="navigate(i.value.link)" :src="getCMSImage(i.value['img' + currentLanguageId].path)" class="banner lazy swiper-lazy">
                                            <div class="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
                                        </f7-swiper-slide>
                                    </f7-swiper>
                                </f7-block>
                            </template>

                            <template v-if="row2['_link'] == 'CarouselProducts'">
                                <f7-block-title v-if="row2.title[currentLanguageId]">{{row2.title[currentLanguageId]}}</f7-block-title>
                                <f7-block :style="row2.full_width ? 'padding : 0' : ''" class="carouselHomePage home-page-block">
                                    <f7-swiper :params="{preloadImages: false,slidesPerView: 2.3, spaceBetween:1,loop: false,autoplay: true,freeMode: true,lazy: {loadPrevNext: true,loadPrevNextAmount: 3}}">
                                        <template v-for="id in row2.product_id">
                                            <product-card :product_id="id.value">
                                            </product-card>
                                        </template>
                                    </f7-swiper>
                                </f7-block>
                            </template>

                            <template v-if="row2['_link'] == 'CarouselCategory'">
                                <template v-for="cat in row2['category_id']">
                                    <f7-block-title v-if="cat.value['txt' + currentLanguageId]">{{cat.value['txt' + currentLanguageId]}}<span class="pull-right"><f7-link class="color-blue" :href="cat.value.link">{{$t("home.seeAll")}}</f7-link></span></f7-block-title>
                                    <f7-block :style="row2.full_width ? 'padding : 0' : ''" class="carouselHomePage home-page-block">
                                        <category-carousel :category_id="cat.value.id"></category-carousel>
                                    </f7-block>
                                </template>
                            </template>

                            <template v-if="row2['_link'] == 'CustomHTML'">
                                <div v-html="row2.html[currentLanguageId]"></div>
                            </template>
                        </template>
                    </li>
                </ul>
            </div>

        </f7-page-content>

        <f7-page-content tab id="carttab">
            <f7-card v-if="!cart.products" :content="$t('cart.empty')">
            </f7-card>

            <f7-card v-for="row in cart_error" :content="row" class="bg-color-red text-color-white"></f7-card>

            <f7-list v-if="cart.total_product_count > 0" media-list>
                <template v-for="row in cart.products">
                    <f7-list-item :id="row.key" :title="(row.stock ? '':'***') + row.name | andFilter" swipeout @swipeout:delete="onSwipeoutDeleted" :class="(row.stock ? '':'text-color-red')">
                        <div slot="media" v-html="getImagefromSource(row.thumb)"></div>
                        <span slot="after" v-html="getAfter(row.key)" swipeout :class="row.stock ? '' : 'color-red'"></span>
                        <div slot="inner" v-html="getProductInfo(row.quantity,row.price,row.total,row.option)"></div>
                        <div slot="inner">
                            <template v-for="o in row.option" group-title>
                                <i class="f7-icons text-color-green">check_round_fill</i> &ensp; {{o.value}}
                                <br/>
                            </template>
                        </div>
                        <f7-swipeout-actions :side="swipeoutSide">
                            <f7-swipeout-button v-on:click="update(row.key,row.quantity)" class="update" color="green">{{$t('cart.item.update')}}</f7-swipeout-button>
                            <f7-swipeout-button delete overswipe :confirm-text="$t('cart.item.delete.msg')" :data-confirm-title="$t('cart.item.delete.title')" data-close-on-cancel="true">{{$t('cart.item.delete')}}</f7-swipeout-button>
                            <!-- <f7-swipeout-button close color="black">
                                <f7-icon f7="close"></f7-icon>
                            </f7-swipeout-button> -->
                        </f7-swipeout-actions>
                    </f7-list-item>

                </template>
                <f7-list-item id="coupon" v-if="cart.coupon != ''" swipeout title="Coupon" :text="'CODE : '+cart.coupon" @swipeout:delete="onSwipeoutDeleted">
                    <span slot="after"><i class='f7-icons'>more</i></span>
                    <f7-swipeout-actions>
                        <f7-swipeout-button delete overswipe :confirm-text="$t('cart.item.delete.msg')" :data-confirm-title="$t('cart.item.delete.title')" data-close-on-cancel="true">{{$t('cart.item.delete')}}</f7-swipeout-button>
                        <!-- <f7-swipeout-button close color="black">
                            <f7-icon f7="close"></f7-icon>
                        </f7-swipeout-button> -->
                    </f7-swipeout-actions>
                </f7-list-item>
                <f7-list-item id="voucher" v-if="cart.voucher != ''" swipeout title="Voucher" :text="'CODE : '+cart.voucher" @swipeout:delete="onSwipeoutDeleted">
                    <span slot="after"><i class='f7-icons'>more</i></span>
                    <f7-swipeout-actions>
                        <f7-swipeout-button delete overswipe :confirm-text="$t('cart.item.delete.msg')" :data-confirm-title="$t('cart.item.delete.title')" data-close-on-cancel="true">{{$t('cart.item.delete')}}</f7-swipeout-button>
                        <!-- <f7-swipeout-button close color="black">
                            <f7-icon f7="close"></f7-icon>
                        </f7-swipeout-button> -->
                    </f7-swipeout-actions>
                </f7-list-item>
            </f7-list>

            <f7-card v-if="cart.total_product_count > 0">
                <f7-card-header>{{$t('cart.code.title')}}</f7-card-header>
                <f7-card-content>
                    <f7-list id="total" form>
                        <f7-list-item v-if="cart.coupon == ''">
                            <f7-row class="full-width">
                                <f7-col width="70">
                                    <f7-input name="coupon" type="text" :placeholder="$t('cart.coupon.placeholder')" />
                                </f7-col>
                                <f7-col width="30">
                                    <f7-button big raised fill color="green" @click="addCoupon">{{$t('cart.coupon.add')}}</f7-button>
                                </f7-col>
                            </f7-row>
                        </f7-list-item>
                        <f7-list-item v-if="cart.voucher == ''">
                            <f7-row class="full-width">
                                <f7-col width="70">
                                    <f7-input name="voucher" type="text" :placeholder="$t('cart.voucher.placeholder')" />
                                </f7-col>
                                <f7-col width="30">
                                    <f7-button big raised fill color="green" @click="addVoucher">{{$t('cart.voucher.add')}}</f7-button>
                                </f7-col>
                            </f7-row>
                        </f7-list-item>
                    </f7-list>
                </f7-card-content>
            </f7-card>

            <!--f7-block-title v-if="cart.total_product_count > 0">Total</f7-block-title>
                      <f7-block inset>
                      <f7-card v-if="cart.total_product_count > 0" v-for="row in cart.totals">
                          <f7-card-content>
                              <f7-row>
                                <f7-col auto>{{row.title}}</f7-col>
                                <f7-col auto><span class="pull-right">{{row.text}}</span></f7-col>
                              </f7-row>
                          </f7-card-content>
                      </f7-card>
                      </f7-block-->

            <f7-block>
                <h4 v-if="cart.total_product_count > 0" class='text-align-center'>{{$t('confirm.total.title')}} : {{cart.total}}</h4>
                <f7-button v-if="cart.total_product_count > 0" :disabled="cart_error.length > 0" style="width:100%" href="/checkout/" big raised fill color="green">{{$t('cart.proceed')}}</f7-button>
                <f7-button v-if="!cart.products" style="width:100%" big raised fill color="green" class="tab-link" data-tab="#hometab">{{$t('cart.continue')}}</f7-button>
            </f7-block>
        </f7-page-content>

        <f7-page-content tab id="profiletab">

            <f7-list>
                <f7-list-group>
                    <f7-list-item smart-select :smart-select-params="{ openIn: 'popover', closeOnSelect: true, formColorTheme: 'black' }" :title="$t('settings.language.title')">
                        <select name="langid" @change="changeLanguage" v-model="currentLanguageId">
                        <option value="1" :selected="currentLanguageId == 1">English</option>
                        <option value="2" :selected="currentLanguageId == 2">عربي</option>
                    </select>
                    </f7-list-item>
                    <f7-list-item>
                        {{$t('settings.push.title')}}
                        <f7-toggle id="push" :checked="push" v-on:change="pushChange()"></f7-toggle>
                    </f7-list-item>
                </f7-list-group>
            </f7-list>

            <f7-list>
                <f7-list-group v-if="user">
                    <f7-list-item link-view="#main-view" panel-close link="/profile" :title="$t('profile.title')">
                        <div slot="media" v-if="theme.ios"><i class='f7-icons'>person</i></div>
                        <div slot="media" v-if="theme.md"><i class='material-icons'>account_box</i></div>
                    </f7-list-item>
                    <f7-list-item link-view="#main-view" panel-close link="/myorders" :title="$t('order.title')">
                        <div slot="media" v-if="theme.ios"><i class='f7-icons'>box_fill</i></div>
                        <div slot="media" v-if="theme.md"><i class='material-icons'>inbox</i></div>
                    </f7-list-item>
                    <f7-list-item link-view="#main-view" panel-close link="/track" :title="$t('track.title')">
                        <div slot="media"><i class='material-icons'>local_shipping</i></div>
                    </f7-list-item>
                    <f7-list-item link-view="#main-view" panel-close link="/address" :title="$t('address.title')">
                        <div slot="media" v-if="theme.ios"><i class='f7-icons'>book_fill</i></div>
                        <div slot="media" v-if="theme.md"><i class='material-icons'>book</i></div>
                    </f7-list-item>
                    <f7-list-item link-view="#main-view" panel-close link="/wallet" :title="$t('wallet.title')">
                        <div slot="media" v-if="theme.ios"><i class='f7-icons'>card</i></div>
                        <div slot="media" v-if="theme.md"><i class='material-icons'>account_balance_wallet</i></div>
                    </f7-list-item>
                    <f7-list-item link-view="#main-view" panel-close link="/returns" :title="$t('returns.title')">
                        <div slot="media" v-if="theme.ios"><i class='f7-icons'>reply_fill</i></div>
                        <div slot="media" v-if="theme.md"><i class='material-icons'>reply</i></div>
                    </f7-list-item>
                    <f7-list-item link-view="#main-view" panel-close link="/wishlist" :title="$t('wishlist.title')">
                        <div slot="media" v-if="theme.ios"><i class='text-color-red f7-icons'>heart_fill</i></div>
                        <div slot="media" v-if="theme.md"><i class='text-color-red material-icons'>favorite</i></div>
                    </f7-list-item>
                    <f7-list-item v-if="user" @click="logout()" link="" :title="$t('home.sideBar.logout')">
                        <div slot="media"><i v-if="this.$theme.ios" class='f7-icons'>logout</i><i v-if="this.$theme.md" class='material-icons'>close</i></div>
                    </f7-list-item>
                </f7-list-group>
            </f7-list>

            <f7-list>
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
                        <div slot="media" v-if="theme.md"><i class='material-icons' style="color:green">phone</i></div>
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
            </f7-list>
            <f7-block inset v-html="'v' + this.$f7.version + ' ' + $t('settings.copyright.statement')" class="text-align-center">
            </f7-block>
        </f7-page-content>
    </f7-tabs>
</f7-page>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";
import vuexI18n from "vuex-i18n";
import axios from "axios";
import ProductCard from "../CustomComponents/ProductCard.vue"
import CategoryCarousel from "../CustomComponents/CategoryCarousel.vue"
import RandomString from "randomString"

import Swiper from "framework7/dist/components/swiper/swiper-class/swiper.js";

import store from "src/assets/vuex/store.js";
import cms from "cms.js";
import api from "api.js";
import {
    log
} from "util";

let self;

export default {
    components: {
        ProductCard,
        CategoryCarousel
    },
    data() {
        return {
            firstVisit: localStorage.getItem("firstVisit"),
            items: localStorage.getItem("recentSearch") == null ? [] : JSON.parse(localStorage.getItem("recentSearch").split(",")),
            currentLanguageId: localStorage.getItem("language_id"),
            currentLanguage: localStorage.getItem("language_id") == 1 ? false : true,
            direction: localStorage.getItem("language_id") == 1 ? "ltr" : "rtl",
            sideBarPos: localStorage.getItem("language_id") === "1" ? "left" : "right",
            sideBarPos2: localStorage.getItem("language_id") === "1" ? "right" : "left",
            logo: localStorage.getItem("language_id") == 1 ?
                "static/img/logo-en.png" : "static/img/logo-ar.png",
            searchTerm: "",
            swipeoutSide: localStorage.getItem("language_id") == 1 ? "right" : "left",
            push: localStorage.getItem("push") == "false" ? false : true,
            homeProducts: [],
            vlData: {},
            theme: this.$theme,
            recentView: localStorage.getItem("recentView") == null ? [] : JSON.parse(localStorage.getItem("recentView").split(","))
        };
    },
    created() {
        self = this;
        self.homeProducts[0] = "0";

        axios.get(cms.baseUrl + cms.getReigion('home') + cms.tokenVar).then(function (response) {
            var virtualList = self.$f7.virtualList.create({
                // List Element
                el: '.homeContentList',
                createUl: false,
                height: function (item) {
                    var h = 80;
                    for (var i = 0; i < item.value.length; i++) {
                        h = item.value[i].height ? item.value[i].height : h;
                    }
                    return h;
                },
                // Pass array with items
                items: response.data.item,
                rowsAfter: 100,
                rowsBefore: 100,
                dynamicHeightBufferSize: 3,
                // List item Template7 template
                renderExternal: self.renderExternal,
            });
        });

    },
    mounted: function () {
        self = this;
        store.dispatch('fetchHomeData');

        let rmk = localStorage.getItem("remember_me_key");
        console.log(rmk);
        if (rmk != null) {
            self.$f7.request({
                async: false,
                method: "GET",
                content: "application/json",
                dataType: "json",
                url: api.baseUrl +
                    api.urls.loginRM +
                    "/" +
                    localStorage.getItem("remember_me_key"),
                headers: api.headers(sessionStorage.getItem("session_id")),
                success: function (response, status, xhr) {
                    if (response.data != null) {
                        localStorage.setItem("user", JSON.stringify(response.data));
                        localStorage.setItem("loggedIn", "true");
                        //localStorage.setItem('session_id', response.data.session)
                        let not = self.$f7.toast.create({
                            title: self.$t("login.notification.title"),
                            text: (self.currentLanguageId == 1 ? "Welcome " : "مرحبا ") +
                                response.data.firstname,
                            closeTimeout: 3000,
                            destroyOnClose: true,
                            cssClass: "toast-green",
                            position: "top"
                        });
                        not.open();
                        navigator.vibrate(80);
                    } else {
                        localStorage.setItem("loggedIn", null);
                        localStorage.setItem("user", null);
                        localStorage.setItem("remember_me_key", null);
                        let not = self.$f7.toast.create({
                            title: self.$t("login.notification.title"),
                            text: (self.currentLanguageId == 1 ? 'Session timed out, please login again' : 'تم تسجيل خروج المستخدم ، يرجى تسجيل الدخول مرة أخرى'),
                            closeTimeout: 3000,
                            destroyOnClose: true,
                            cssClass: "toast-red",
                            position: "top"
                        });
                        not.open();
                        navigator.vibrate(80, 80, 80);
                    }
                }
            });
        }

        store.dispatch("fetchCart");

        setInterval(function () {
            store.dispatch("fetchCart");
        }, 300000);

        self.Dom7(".carouselHomePage").removeClass("block");

        self.Dom7(document).on("click", ".shareapp", function (e) {
            self.shareapp();
        });

        self.Dom7(document).on("click", ".rate", function (e) {
            self.rate();
        });

        self.Dom7("#search").on("keyup", function (e) {
            console.log("here");
            if (e.which == 13) {

                self.onSearch(e);
            }
        });

        var autocompleteSearchbar = self.$f7.autocomplete.create({
            openIn: "dropdown",
            inputEl: '#search input[type="search"]',
            //dropdownPlaceholderText: 'Type "Apple"',
            source: function (query, render) {
                var results = [];
                if (query.length === 0) {
                    render(results);
                    return;
                }
                // Find matched items
                axios({
                    method: "GET",
                    url: api.suggestion.replace("{keyword}", query),
                    headers: api.headers(sessionStorage.getItem('session_id')),
                }).then(function (response) {
                    if (response.status !== 202 && response.data.data) {
                        for (var i = 0; i <= response.data.data.length; i++) {
                            results.push(response.data.data[i]);
                        }
                    }
                });
                for (var i = 0; i < self.items.length; i++) {
                    if (self.items[i].toLowerCase().indexOf(query.toLowerCase()) >= 0)
                        results.push(self.items[i]);
                }
                // Render items by passing array with result items
                render(results);
            },
            on: {
                change: function (autocomplete, value) {
                    self.onSearch();
                }
            }
        });
    },
    filters: {
        andFilter(val) {
            return val.replace(/&amp;/g, "&");
        }
    },
    computed: {
        sideBarCategories: {
            get: function () {
                return store.state.sideBarCategories
            }
        },
        sideBarCategories: {
            get: function () {
                return store.state.sideBarCategories;
            }
        },
        sideBarTools: {
            get: function () {
                return store.state.sideBarTools;
            }
        },
        sideBarInfo: {
            get: function () {
                return store.state.sideBarInfo;
            }
        },
        homePageContent: {
            get: function () {
                return store.state.homePageContent;
            }
        },
        cart: {
            get: function () {
                return store.state.cart;
            }
        },
        cart_error: {
            get: function () {
                return store.state.cart_error;
            }
        },
        user: {
            get: function () {
                return store.state.user;
            }
        }
    },
    methods: {
        renderExternal(vl, vlData) {
            this.vlData = vlData;
        },
        getAfter(id) {
            //return "<i onClick='" + 'self.$f7.swipeoutOpen(self.Dom7("#' + id + ' .swipeout"), '+ this.swipeoutSide +")" + "' class='f7-icons'>more</i>"
            return (
                '<i onClick="' +
                "self.$f7.swipeoutOpen(" +
                "self.Dom7('#" +
                id +
                "'))" +
                '"' +
                ' class="f7-icons">more</i>'
            );
        },
        getImagefromSource(src) {
            return "<img src='" + src + "'" + " width='80'/>";
        },
        getProductInfo(quantity, price_per_item, total, options) {
            return total + "<br/>" + this.$t("cart.item.quantity") + quantity;
        },
        refresh() {
            self.$f7.preloader.show();
            store.dispatch("fetchCart");
            self.$f7.preloader.hide();
        },
        onSwipeoutDeleted(event) {
            self.$f7.preloader.show();
            let key = event.target.id;

            if (key == "coupon") {
                axios({
                    method: "DELETE",
                    url: api.baseUrl + api.urls.coupon,
                    headers: api.headers(sessionStorage.getItem("session_id"))
                }).then(function (response) {
                    store.dispatch("fetchCart");
                    self.$f7.preloader.hide();
                    var t = self.$f7.toast.create({
                        text: self.$t("cart.coupon.delete"),
                        title: self.$t("cart.coupon.delete.title"),
                        closeTimeout: 5000,
                        destroyOnClose: true,
                        position: "top",
                        cssClass: "toast-green"
                    });
                    t.open();
                    navigator.vibrate(80);
                });
            } else if (key == "voucher") {
                axios({
                    method: "DELETE",
                    url: api.baseUrl + api.urls.voucher,
                    headers: api.headers(sessionStorage.getItem("session_id"))
                }).then(function (response) {
                    store.dispatch("fetchCart");
                    self.$f7.preloader.hide();
                    var t = self.$f7.toast.create({
                        text: self.$t("cart.voucher.delete"),
                        title: self.$t("cart.voucher.delete.title"),
                        closeTimeout: 5000,
                        destroyOnClose: true,
                        position: "top",
                        cssClass: "toast-red"
                    });
                    t.open();
                    navigator.vibrate(80);
                });
            } else {
                axios({
                    method: "DELETE",
                    url: api.baseUrl + api.urls.cart,
                    headers: api.headers(sessionStorage.getItem("session_id")),
                    data: {
                        key: key
                    }
                }).then(function (response) {
                    store.dispatch("fetchCart");
                    self.$f7.preloader.hide();
                    var t = self.$f7.toast.create({
                        text: self.$t("cart.item.deleted"),
                        title: self.$t("cart.item.deleted.title"),
                        closeTimeout: 5000,
                        destroyOnClose: true,
                        position: "top",
                        cssClass: "toast-green"
                    });
                    t.open();
                    navigator.vibrate(80);
                });
            }
        },
        empty() {
            self.$f7.dialog.confirm(
                self.$t("cart.emptyAll"),
                self.$t("cart.emptyAll.title"),
                function (value) {
                    self.$f7.preloader.show();
                    axios({
                        method: "DELETE",
                        url: api.baseUrl + api.urls.emptyCart,
                        headers: api.headers(sessionStorage.getItem("session_id"))
                    }).then(function (response) {
                        store.dispatch("fetchCart");
                    });
                    setTimeout(function () {
                        self.$f7.preloader.hide();
                    }, 3000);
                    self.$f7.swipeout.close(
                        self.Dom7("li.swipeout-opened"),
                        function () {}
                    );
                }
            );
        },
        update(product_key, quantity) {
            self.$f7.dialog.prompt(
                self.$t("cart.item.update.quantity.msg"),
                self.$t("cart.item.update.quantity.title"),
                function (value) {
                    if (value > 0) {
                        self.$f7.preloader.show();
                        axios({
                            method: "PUT",
                            url: api.baseUrl + api.urls.cart,
                            headers: api.headers(sessionStorage.getItem("session_id")),
                            data: {
                                key: product_key,
                                quantity: value
                            }
                        }).then(function (response) {
                            store.dispatch("fetchCart");
                        });
                        setTimeout(function () {
                            self.$f7.preloader.hide();
                        }, 3000);
                        self.$f7.swipeout.close(
                            self.Dom7("li.swipeout-opened"),
                            function () {}
                        );
                    }
                }
            );
        },
        addCoupon() {
            self.$f7.preloader.show();
            let code = self.$f7.form.convertToData("#total")["coupon"];
            axios({
                    method: "POST",
                    url: api.baseUrl + api.urls.coupon,
                    headers: api.headers(sessionStorage.getItem("session_id")),
                    data: {
                        coupon: code
                    }
                })
                .then(function (response) {
                    store.dispatch("fetchCart");
                    self.$f7.preloader.hide();
                    var t = self.$f7.toast.create({
                        text: self.$t("cart.coupon.add.msg"),
                        title: self.$t("cart.coupon.add.title"),
                        closeTimeout: 5000,
                        destroyOnClose: true,
                        position: "top",
                        cssClass: "toast-green"
                    });
                    t.open();
                    navigator.vibrate(80);
                })
                .catch(function (error) {
                    console.log(error);
                    self.$f7.preloader.hide();
                    var t = self.$f7.toast.create({
                        text: error.response.data.error,
                        closeTimeout: 5000,
                        destroyOnClose: true,
                        position: "top",
                        cssClass: "toast-red"
                    });
                    t.open();
                    navigator.vibrate([80, 80, 80]);
                });
        },
        addVoucher() {
            self.$f7.preloader.show();
            let code = self.$f7.form.convertToData("#total")["voucher"];
            axios({
                    method: "POST",
                    url: api.baseUrl + api.urls.voucher,
                    headers: api.headers(sessionStorage.getItem("session_id")),
                    data: {
                        voucher: code
                    }
                })
                .then(function (response) {
                    store.dispatch("fetchCart");
                    self.$f7.preloader.hide();
                    var t = self.$f7.toast.create({
                        text: self.$t("cart.voucher.add.msg"),
                        title: self.$t("cart.voucher.add.title"),
                        closeTimeout: 5000,
                        destroyOnClose: true,
                        position: "top",
                        cssClass: "toast-green"
                    });
                    t.open();
                    navigator.vibrate(80);
                })
                .catch(function (error) {
                    console.log(error);
                    self.$f7.preloader.hide();
                    var t = self.$f7.toast.create({
                        text: error.response.data.error,
                        closeTimeout: 5000,
                        destroyOnClose: true,
                        position: "top",
                        cssClass: "toast-red"
                    });
                    t.open();
                    navigator.vibrate([80, 80, 80]);
                });
        },
        rate() {
            if (LaunchReview.isRatingSupported()) {
                LaunchReview.rating();
            } else {
                LaunchReview.launch();
            }
        },
        shareapp() {
            window.plugins.socialsharing.share(
                self.$t("share.app.msg"),
                self.$t("share.app.title"),
                /*self.$t('share.app.image')*/
                null,
                self.$t("share.app.link")
            );
        },
        shareProduct(pname, pimage, pid) {
            let self = self;
            axios({
                method: "GET",
                url: api.baseUrl + api.urls.producturl.replace("{id}", pid),
                headers: api.headers(sessionStorage.getItem("session_id"))
            }).then(function (response) {
                console.log(response);
                window.plugins.socialsharing.share(
                    self.$t("share.product.msg"),
                    pname,
                    /*pimage*/
                    null,
                    self.$t("share.product.url") + response.data.data.keyword
                );
            });
        },
        onRefresh() {
            //store.dispatch('fetchHomeData');
            self.$f7.pullToRefreshDone();
            self.$f7.preloader.show();
            setTimeout(function () {
                location.reload();
            }, 500);
        },
        onExitWelcome() {
            localStorage.setItem("firstVisit", false);
            location.reload();
        },
        getCMSImage(name) {
            if (name.indexOf("http") == -1) {
                return "https://mercatovip.com/app/" + name;
            } else {
                return name;
            }
        },
        onSearch: function (event) {
            let $ = self.Dom7;
            let val = $("form#search input").val();
            console.log(val);
            let obj =
                localStorage.getItem("recentSearch") == null ? [] :
                JSON.parse(localStorage.getItem("recentSearch"));
            if (obj.indexOf(val) === -1) {
                obj.push(val);
            }
            localStorage.setItem("recentSearch", JSON.stringify(obj));
            self.items = JSON.parse(localStorage.getItem("recentSearch").split(","));
            $("#search input").blur();
            self.$f7.searchbar.toggle("#search");
            self.$f7router.navigate("/result/" + val);
        },
        changeLanguage: function (event) {
            let lang = event.target.value;
            let locale = "";
            if (lang === "2") {
                locale = "ar";
                localStorage.setItem("language_id", "2");
                localStorage.setItem("language_code", "ar");
            } else {
                locale = "en-gb";
                localStorage.setItem("language_id", "1");
                localStorage.setItem("language_code", "en-gb");
            }
            let url = "./static/lang/locale-" + locale + ".json";

            // check if the locale has already been loaded
            if (Vue.i18n.localeExists(locale)) {
                Vue.i18n.set(locale);
            }
            // load the specified locale from the server
            axios
                .get(url)
                .then(response => {
                    Vue.i18n.add(locale, response.data);
                    Vue.i18n.set(locale);
                })
                .catch(error => {
                    alert("could not fetch locale translations");
                });
            self.$f7.preloader.show();
            setTimeout(function () {
                window.location.reload();
            }, 1000);
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
            axios
                .get(url)
                .then(response => {
                    Vue.i18n.add(locale, response.data);
                    Vue.i18n.set(locale);
                })
                .catch(error => {
                    alert("could not fetch locale translations");
                });
            var mySwiper = self.Dom7(".welcome-swiper")[0].swiper;
            mySwiper.slideNext();
        },
        nextSlide() {
            var mySwiper = self.Dom7(".welcome-swiper")[0].swiper;
            mySwiper.slideNext();
        },
        pushChange() {
            var toggle = self.$f7.toggle.get("#push");
            if (toggle.checked) {
                window.pushOn();
            } else {
                window.pushOff();
            }
        },
        navigate(link) {
            this.$f7router.navigate(link);
        },
        rate() {
            let appId, platform = device.platform.toLowerCase();
            switch (platform) {
                case "ios":
                    appId = "1375500175";
                    break;
                case "android":
                    appId = "com.mercatovip.app";
                    break;
            }
            /*if (LaunchReview.isRatingSupported()) {
                LaunchReview.rating();
            } else {
                LaunchReview.launch();
            }*/
            LaunchReview.launch(function () {
                console.log("Successfully launched store app");
            }, function (err) {
                console.log("Error launching store app: " + err);
            }, appId);
        },
        shareapp() {
            window.plugins.socialsharing.share(this.$t('share.app.msg'), this.$t('share.app.title'), /*this.$t('share.app.image')*/ null, this.$t('share.app.link'))
        },
        logout() {
            self.$f7.preloader.show();
            axios({
                method: "POST",
                url: api.baseUrl + api.urls.logout,
                headers: api.headers(sessionStorage.getItem('session_id')),
                data: {
                    "remember_me_key": localStorage.getItem('remember_me_key')
                }
            }).then(function (response) {
                localStorage.removeItem('user');
                store.dispatch("removeUser");
                store.dispatch('fetchCart');
            }).catch(function (error) {
                var t = self.$f7.toast.create({
                    text: error.response.data.error,
                    closeTimeout: 5000,
                    destroyOnClose: true,
                    position: 'top',
                    cssClass: 'toast-red'
                });
                t.open();
                navigator.vibrate([80, 80, 80])
                localStorage.removeItem("user");
                localStorage.removeItem("remember_me_key");
                localStorage.removeItem("loggedIn");
            });
            self.$f7.preloader.hide();
        },
        openChatWindow() {
            var chatObject = {
                'appId' : '2G02fGId4z71tZlwW7OGo9mlZrPs2DO1',
                'groupName' : 'My Support group', 
                'withPreChat' : true,
                'isUnique' : true,
                'agentIds' : ['adnan@mercatovip.com', 'agent2']
            }
            kommunicate.startSingleChat(conversationObject, (response) => {
                console.log("Test Success response : " + response);
            }, (response) =>{
                console.log("Test Failure response : " + response);
            });
            //this.loginUser(user, userList);
        },
        loginUser(user, userList) {
                kommunicate.isLoggedIn(function (response) {
                    if (response === "true") {
                        this.launchChat(userList);
                    } else {
                        kommunicate.login(user, (loginResponse) => {
                            this.launchChat(userList);
                        }, (loginError) => {
                            console.log("User login failed : " + JSON.stringify(loginError));
                        });
                    }
                });
            },

            launchChat(userList) {
                /*kommunicate.startOrGetConversation(userList, (createResponse) => {
                    var grpy = {
                        'clientChannelKey': createResponse,
                        'takeOrder': true
                    };
                    kommunicate.launchParticularConversation(grpy, (launchResponse) => {}, (launchError) => {});
                }, (createError) => {
                    console.log("Unable to create chat : " + JSON.stringify(createError));
                });*/
            }
    }
};
</script>
