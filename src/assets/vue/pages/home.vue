

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
            <f7-link :panel-open="sideBarPos2" icon="fa fa-bell">
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
        <f7-link tab-link="#settingstab" icon="fa fa-gear">
            <span class="tabbar-label">{{$t('tabbar.settings.title')}}</span>
        </f7-link>
    </f7-toolbar>

    <f7-tabs>
        <f7-page-content tab tab-active id="hometab">
            <f7-block>
                <f7-swiper v-if="sliderHome.length" pagination :params="{preloadImages: true,spaceBetween: 10,loop:true,centeredSlides:true,autoplay:true}">
                    <f7-swiper-slide class="image-slider" v-for="row in sliderHome" :key="row.id">
                        <span v-if="row.name" class="slider-title">{{row.name[currentLanguageId]}}</span>
                        <img @click="navigate(row.link_id)" :src="getCMSImage(row.image[currentLanguageId].path)" class="slider lazy swiper-lazy">
                        <div class="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
                    </f7-swiper-slide>
                </f7-swiper>
            </f7-block>

            <f7-block v-if="specialBannersHome.length">
                <f7-row class="full-width">
                    <f7-col width="33" v-for="row in specialBannersHome">
                        <span class="banner-title">{{row.name[currentLanguageId]}}</span>
                        <img @click="navigate(row.link_id)" :src="getCMSImage(row.image[currentLanguageId].path)" class="specialBanner">
                    </f7-col>
                </f7-row>
            </f7-block>

            <f7-block>
                <f7-swiper class="pagination-below" v-if="bannerHome.length" pagination :params="{preloadImages: false,lazy: true,freeMode: true,slidesPerView: 3,slidesPerColumn: 2,spaceBetween:10}" style="width:100%">
                    <f7-swiper-slide v-for="row in bannerHome" class="image-slider" :key="row.id">
                        <span class="banner-title">{{row.name[currentLanguageId]}}</span>
                        <img @click="navigate(row.link_id)" :src="getCMSImage(row.image[currentLanguageId].path)" class="banner lazy swiper-lazy">
                        <div class="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
                    </f7-swiper-slide>
                </f7-swiper>
            </f7-block>


            <f7-block-title v-if="specialProducts.length > 0">{{$t("home.bestOffer")}}<span class="pull-right"><f7-link class="color-blue" href="/special">{{$t("home.seeAll")}}</f7-link></span></f7-block-title>
            <f7-block v-if="specialProducts.length > 0" class="carouselHomePage">
                <f7-swiper v-if="specialProducts.length == 0" class="pagination-below" pagination :params="{slidesPerView: 2,loop: false,autoplay: false}">
                    <f7-swiper-slide v-for="num in 1,3">
                        <f7-card class="animated-background">
                            <div class="background-masker header-top"></div>
                            <div class="background-masker header-left"></div>
                            <div class="background-masker header-right"></div>
                            <div class="background-masker header-bottom"></div>
                            <div class="background-masker content-top"></div>
                        </f7-card>
                    </f7-swiper-slide>
                </f7-swiper>

                <f7-swiper v-else class="pagination-below" pagination :params="{slidesPerView: 2,loop: false,autoplay: true}">
                    <f7-swiper-slide v-for="row in specialProducts" :key="row.id">
                        <f7-card>
                            <f7-card-header>
                                <div @click='navigate("/product?product_id=" + row.product_id)'><img :src="row.thumb" class="product-card-image"><span v-if="row.special" class="tag left-tag">{{getDiscount(row.special,row.price)}}%</span><span v-if="is_new(row.date_added)" class="tag right-tag">NEW</span></div>
                            </f7-card-header>
                            <f7-card-content>
                                <div @click='navigate("/product?product_id=" + row.product_id)' class="color-black">
                                    <!-- <span class="product-cart-title">{{row.name | andFilter}}</span>
                                    <br/> <span v-if="row.special" class="old-price">{{row.price_formated}}</span> -->
                                    <br/> <span v-if="row.special" class="price">{{row.special_formated}}</span> <span v-if="!row.special" class="price">{{row.price_formated}}</span>
                                </div>
                            </f7-card-content>
                            <!-- <f7-card-footer>
                                <f7-segmented style="width:100%" v-if="theme.ios">
                                    <f7-button class="product-card-footer-button" color="white" @click="shareProduct(row.name,row.thumb,row.product_id)" icon-f7="share"></f7-button>
                                    <template v-if="!is_favourite(row.product_id)">
                                        <f7-button class="product-card-footer-button" color="white" @click="addToWishlist(row.product_id)" icon-f7="heart"></f7-button>
                                    </template>
                                    <template v-else-if="is_favourite(row.product_id)">
                                        <f7-button class="product-card-footer-button" color="white" @click="removeFromWishlist(row.product_id)" icon-f7="heart_fill" icon-color="red"></f7-button>
                                    </template>
                                </f7-segmented>
                                <f7-segmented style="width:100%" v-if="theme.md">
                                    <f7-button class="product-card-footer-button" color="black" @click="shareProduct(row.name,row.thumb,row.product_id)" icon-material="share"></f7-button>
                                    <template v-if="!is_favourite(row.product_id)">
                                        <f7-button class="product-card-footer-button" color="black" @click="addToWishlist(row.product_id)" icon-material="favorite_border"></f7-button>
                                    </template>
                                    <template v-else-if="is_favourite(row.product_id)">
                                        <f7-button class="product-card-footer-button" color="black" @click="removeFromWishlist(row.product_id)" icon-material="favorite" icon-color="red"></f7-button>
                                    </template>
                                </f7-segmented>
                            </f7-card-footer> -->
                        </f7-card>
                    </f7-swiper-slide>
                </f7-swiper>
            </f7-block>

            <f7-block-title>{{$t("home.latest")}}<span class="pull-right"><f7-link class="color-blue" href="/latest">{{$t("home.seeAll")}}</f7-link></span></f7-block-title>
            <f7-block class="carouselHomePage">
                <f7-swiper v-if="latestProducts.length == 0" class="pagination-below" pagination :params="{slidesPerView: 2,loop: false,autoplay: false}">
                    <f7-swiper-slide v-for="num in 1,3">
                        <f7-card class="animated-background">
                            <div class="background-masker header-top"></div>
                            <div class="background-masker header-left"></div>
                            <div class="background-masker header-right"></div>
                            <div class="background-masker header-bottom"></div>
                            <div class="background-masker content-top"></div>
                        </f7-card>
                    </f7-swiper-slide>
                </f7-swiper>

                <f7-swiper v-else class="pagination-below" pagination :params="{slidesPerView: 2,loop: false,autoplay: true}">
                    <f7-swiper-slide v-for="row in latestProducts" :key="row.id">
                        <f7-card>
                            <f7-card-header>
                                <div @click='navigate("/product?product_id=" + row.product_id)'><img :src="row.thumb" class="product-card-image"><span v-if="row.special" class="tag left-tag">{{getDiscount(row.special,row.price)}}%</span><span v-if="is_new(row.date_added)" class="tag right-tag">NEW</span></div>
                            </f7-card-header>
                            <f7-card-content>
                                <div @click='navigate("/product?product_id=" + row.product_id)' class="color-black">
                                    <!-- <span class="product-cart-title">{{row.name | andFilter}}</span>
                                    <br/> <span v-if="row.special" class="old-price">{{row.price_formated}}</span> -->
                                    <br/> <span v-if="row.special" class="price">{{row.special_formated}}</span> <span v-if="!row.special" class="price">{{row.price_formated}}</span>
                                </div>
                            </f7-card-content>
                            <!-- <f7-card-footer>
                                <f7-segmented style="width:100%" v-if="theme.ios">
                                    <f7-button class="product-card-footer-button" color="white" @click="shareProduct(row.name,row.thumb,row.product_id)" icon-f7="share"></f7-button>
                                    <template v-if="!is_favourite(row.product_id)">
                                        <f7-button class="product-card-footer-button" color="white" @click="addToWishlist(row.product_id)" icon-f7="heart"></f7-button>
                                    </template>
                                    <template v-else-if="is_favourite(row.product_id)">
                                        <f7-button class="product-card-footer-button" color="white" @click="removeFromWishlist(row.product_id)" icon-f7="heart_fill" icon-color="red"></f7-button>
                                    </template>
                                </f7-segmented>
                                <f7-segmented style="width:100%" v-if="theme.md">
                                    <f7-button class="product-card-footer-button" color="black" @click="shareProduct(row.name,row.thumb,row.product_id)" icon-material="share"></f7-button>
                                    <template v-if="!is_favourite(row.product_id)">
                                        <f7-button class="product-card-footer-button" color="black" @click="addToWishlist(row.product_id)" icon-material="favorite_border"></f7-button>
                                    </template>
                                    <template v-else-if="is_favourite(row.product_id)">
                                        <f7-button class="product-card-footer-button" color="black" @click="removeFromWishlist(row.product_id)" icon-material="favorite" icon-color="red"></f7-button>
                                    </template>
                                </f7-segmented>
                            </f7-card-footer> -->
                        </f7-card>
                    </f7-swiper-slide>
                </f7-swiper>
            </f7-block>

            <f7-block-title>{{$t("home.featured")}}</f7-block-title>

            <template v-if="homePageProducts.length == 0" media-list id="home-products-list" class="result">
                <f7-row no-gap>
                    <f7-col v-for="row in 1,2" width="50">
                        <f7-card class="animated-background">
                            <div class="background-masker header-top"></div>
                            <div class="background-masker header-left"></div>
                            <div class="background-masker header-right"></div>
                            <div class="background-masker header-bottom"></div>
                            <div class="background-masker content-top"></div>
                        </f7-card>
                    </f7-col>
                </f7-row>
            </template>
            <template v-else id="home-products-list" class="result">
                <f7-row no-gap>
                    <template v-for="row in homePageProducts">
                        <f7-col width="50">
                            <f7-card>
                                <f7-card-header>
                                    <div @click='navigate("/product?product_id=" + row.id)'><img :src="row.image" class="product-card-image"><span v-if="row.special" class="tag left-tag">{{getDiscount(row.special,row.price)}}%</span><span v-if="is_new(row.date_added)" class="tag right-tag">NEW</span>
                                        <span v-if="!row.quantity" class="tag out-of-stock-tag">{{row.stock_status}}</span>
                                    </div>
                                </f7-card-header>
                                <f7-card-content>
                                    <div @click='navigate("/product?product_id=" + row.id)' class="color-black">
                                        <!-- <span class="product-cart-title">{{row.name | andFilter}}</span> <br/> -->
                                        <span v-if="row.special" class="old-price">{{row.price_formated}}</span>
                                        <br/> <span v-if="row.special" class="price">{{row.special_formated}}</span> <span v-if="!row.special" class="price">{{row.price_formated}}</span>
                                    </div>
                                </f7-card-content>
                                <!-- <f7-card-footer>
                                        <f7-segmented style="width:100%" v-if="theme.ios">
                                            <f7-button class="product-card-footer-button" color="white" @click="shareProduct(row.name,row.thumb,row.id)" icon-f7="share"></f7-button>
                                            <template v-if="!is_favourite(row.id)">
                                                <f7-button class="product-card-footer-button" color="white" @click="addToWishlist(row.id)" icon-f7="heart"></f7-button>
                                            </template>
                                            <template v-else-if="is_favourite(row.id)">
                                                <f7-button class="product-card-footer-button" color="white" @click="removeFromWishlist(row.id)" icon-f7="heart_fill" icon-color="red"></f7-button>
                                            </template>
                                        </f7-segmented>
                                        <f7-segmented style="width:100%" v-if="theme.md">
                                            <f7-button class="product-card-footer-button" color="black" @click="shareProduct(row.name,row.thumb,row.id)" icon-material="share"></f7-button>
                                            <template v-if="!is_favourite(row.id)">
                                                <f7-button class="product-card-footer-button" color="black" @click="addToWishlist(row.id)" icon-material="favorite_border"></f7-button>
                                            </template>
                                            <template v-else-if="is_favourite(row.id)">
                                                <f7-button class="product-card-footer-button" color="black" @click="removeFromWishlist(row.id)" icon-material="favorite" icon-color="red"></f7-button>
                                            </template>
                                        </f7-segmented>
                                    </f7-card-footer> -->
                            </f7-card>
                        </f7-col>
                    </template>
                </f7-row>
            </template>
        </f7-page-content>


        <!--f7-page-content tab id="searchtab">

            <f7-list class="searchbar-not-found">
                <f7-list-item :title="$t('home.searchbar.noResult')"></f7-list-item>
            </f7-list>
            <f7-list class="searchbar-found" id="search-list">
                <f7-list-item group-title :title="$t('search.recent')"></f7-list-item>
                <f7-list-item :link="'/result/' + item" link-close-popup="#searchPopup" v-for="item in items" :title="item"></f7-list-item>
            </f7-list>
        </f7-page-content-->


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
                                    <f7-input name="coupon" type="text" :placeholder="$t('cart.coupon.placeholder')" /></f7-col>
                                <f7-col width="30">
                                    <f7-button big raised fill color="green" @click="addCoupon">{{$t('cart.coupon.add')}}</f7-button>
                                </f7-col>
                            </f7-row>
                        </f7-list-item>
                        <f7-list-item v-if="cart.voucher == ''">
                            <f7-row class="full-width">
                                <f7-col width="70">
                                    <f7-input name="voucher" type="text" :placeholder="$t('cart.voucher.placeholder')" /></f7-col>
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
                <f7-button v-if="!cart.products" style="width:100%" big raised fill color="green" tab-link="#home">{{$t('cart.continue')}}</f7-button>
            </f7-block>
        </f7-page-content>


        <f7-page-content tab id="settingstab">
            <f7-list>
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
            </f7-list>
            <f7-block inset v-html="'v' + this.$f7.version + ' ' + $t('settings.copyright.statement')" class="text-align-center">
            </f7-block>
        </f7-page-content>
    </f7-tabs>
</f7-page>

</template>

<script>

import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import axios from 'axios'

import Swiper from 'framework7/dist/components/swiper/swiper-class/swiper.js'

import store from 'src/assets/vuex/store.js'
import cms_config from 'cms.js'
import api from 'api.js'

let self;

export default {
    data() {
            return {
                firstVisit: localStorage.getItem('firstVisit'),
                items: localStorage.getItem("recentSearch") == null ? [] : JSON.parse(localStorage.getItem("recentSearch").split(",")),
                currentLanguageId: (localStorage.getItem('language_id')),
                currentLanguage: (localStorage.getItem('language_id') == 1 ? false : true),
                direction: (localStorage.getItem('language_id') == 1 ? "ltr" : "rtl"),
                sideBarPos: (localStorage.getItem('language_id') === '1' ? "left" : "right"),
                sideBarPos2: (localStorage.getItem('language_id') === '1' ? "right" : "left"),
                logo: (localStorage.getItem('language_id') == 1 ? "static/img/logo-en.png" : "static/img/logo-ar.png"),
                searchTerm: "",
                swipeoutSide: (localStorage.getItem('language_id') == 1 ? "right" : "left"),
                push: localStorage.getItem('push') == "false" ? false : true,
                homeProducts: [],
                theme: this.$theme
            }
        },
        mounted: function() {
            self = this;
            let rmk = localStorage.getItem('remember_me_key')
            if ( rmk  !== "null" && localStorage.getItem('loggedIn') == "false") {
                self.$f7.request({
                    async: false,
                    method: 'GET',
                    content: 'application/json',
                    dataType: 'json',
                    url: api.baseUrl + api.urls.loginRM + '/' + localStorage.getItem('remember_me_key'),
                    headers: api.headers,
                    success: function(response, status, xhr) {
                        if (response.data != null) {
                            let user = JSON.parse(localStorage.getItem('user'))
                            localStorage.setItem('loggedIn', "true")
                            let not = self.$f7.toast.create({
                                title: self.$t('login.notification.title'),
                                text: self.$t('login.notification.welcome') + user.firstname,
                                closeTimeout: 3000,
                                destroyOnClose: true,
                                cssClass: 'toast-green',
                                position: 'top'
                            });
                            not.open();
                            navigator.vibrate(80);
                        } else {
                          localStorage.setItem('loggedIn', null)
                          localStorage.setItem('user', null)
                          localStorage.setItem('remember_me_key', null)
                          let not = self.$f7.toast.create({
                              title: self.$t('login.notification.title'),
                              text: self.$t('login.notification.notLoggedIn'),
                              closeTimeout: 3000,
                              destroyOnClose: true,
                              cssClass: 'toast-red',
                              position: 'top'
                          });
                          not.open();
                          navigator.vibrate(80,80,80);
                        }
                    }
                });
            }

            store.dispatch("fetchCart");
            setInterval(function() {
                store.dispatch("fetchCart");
            }, 300000)

            self.Dom7('.carouselHomePage').removeClass('block')

            self.Dom7(document).on('click', '.shareapp', function(e) {
                self.shareapp();
            });

            self.Dom7(document).on('click', '.rate', function(e) {
                self.rate();
            });

            self.Dom7('#search').on('keyup', function(e) {
                if (e.which == 13) {
                    self.onSearch(e);
                }
            })

            var autocompleteSearchbar = self.$f7.autocomplete.create({
                openIn: 'dropdown',
                inputEl: '#search input[type="search"]',
                //dropdownPlaceholderText: 'Type "Apple"',
                source: function(query, render) {
                    var results = [];
                    if (query.length === 0) {
                        render(results);
                        return;
                    }
                    // Find matched items
                    for (var i = 0; i < self.items.length; i++) {
                        if (self.items[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(self.items[i]);
                    }
                    // Render items by passing array with result items
                    render(results);
                },
                on: {
                    change: function(autocomplete, value) {
                        self.onSearch();
                    }
                }
            })

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
            sliderHome: {
                get: function() {
                    return store.state.sliderHome
                }
            },
            bannerHome: {
                get: function() {
                    return store.state.bannerHome
                }
            },
            specialBannersHome: {
                get: function() {
                    return store.state.specialBannersHome
                }
            },
            homePageProducts: {
                get: function() {
                    return store.state.homePageProducts
                }
            },
            specialProducts: {
                get: function() {
                    return store.state.specialProducts
                }
            },
            latestProducts: {
                get: function() {
                    return store.state.latestProducts
                }
            },
            cart: {
                get: function() {
                    return store.state.cart
                }
            },
            cart_error: {
                get: function() {
                    return store.state.cart_error
                }
            },
            user: {
                get: function() {
                    return store.state.user
                }
            },
        },
        methods: {
            getAfter(id) {
                    //return "<i onClick='" + 'self.$f7.swipeoutOpen(self.Dom7("#' + id + ' .swipeout"), '+ this.swipeoutSide +")" + "' class='f7-icons'>more</i>"
                    return '<i onClick="' + 'self.$f7.swipeoutOpen(' + "self.Dom7('#" + id + "'))" + '"' + ' class="f7-icons">more</i>'
                },
                getImagefromSource(src) {
                    return "<img src='" + src + "'" + " width='80'/>";
                },
                getProductInfo(quantity, price_per_item, total, options) {
                    return total + "<br/>" + this.$t('cart.item.quantity') + quantity
                },
                refresh() {
                    self.$f7.preloader.show();
                    store.dispatch("fetchCart");
                    self.$f7.preloader.hide()
                },
                onSwipeoutDeleted(event) {
                    self.$f7.preloader.show();
                    let key = event.target.id;

                    if (key == "coupon") {
                        axios({
                            method: "DELETE",
                            url: api.baseUrl + api.urls.coupon,
                            headers: api.headers,
                        }).then(function(response) {
                            store.dispatch("fetchCart");
                            self.$f7.preloader.hide();
                            var t = self.$f7.toast.create({
                                text: self.$t('cart.coupon.delete'),
                                title: self.$t("cart.coupon.delete.title"),
                                closeTimeout: 5000,
                                destroyOnClose: true,
                                position: 'top',
                                cssClass: 'toast-green'
                            });
                            t.open();
                            navigator.vibrate(80)
                        });
                    } else if (key == "voucher") {
                        axios({
                            method: "DELETE",
                            url: api.baseUrl + api.urls.voucher,
                            headers: api.headers,
                        }).then(function(response) {
                            store.dispatch("fetchCart");
                            self.$f7.preloader.hide();
                            var t = self.$f7.toast.create({
                                text: self.$t('cart.voucher.delete'),
                                title: self.$t("cart.voucher.delete.title"),
                                closeTimeout: 5000,
                                destroyOnClose: true,
                                position: 'top',
                                cssClass: 'toast-red'
                            });
                            t.open();
                            navigator.vibrate(80)
                        });
                    } else {
                        axios({
                            method: "DELETE",
                            url: api.baseUrl + api.urls.cart,
                            headers: api.headers,
                            data: {
                                "key": key
                            }
                        }).then(function(response) {
                            store.dispatch("fetchCart");
                            self.$f7.preloader.hide();
                            var t = self.$f7.toast.create({
                                text: self.$t("cart.item.deleted"),
                                title: self.$t("cart.item.deleted.title"),
                                closeTimeout: 5000,
                                destroyOnClose: true,
                                position: 'top',
                                cssClass: 'toast-green'
                            });
                            t.open();
                            navigator.vibrate(80)
                        });
                    }
                },
                empty() {
                    self.$f7.dialog.confirm(self.$t('cart.emptyAll'), self.$t("cart.emptyAll.title"), function(value) {
                        self.$f7.preloader.show();
                        axios({
                            method: "DELETE",
                            url: api.baseUrl + api.urls.emptyCart,
                            headers: api.headers,
                        }).then(function(response) {
                            store.dispatch("fetchCart");
                        });
                        setTimeout(function() {
                            self.$f7.preloader.hide();
                        }, 3000)
                        self.$f7.swipeout.close(self.Dom7('li.swipeout-opened'), function() {})
                    });
                },
                update(product_key, quantity) {
                    self.$f7.dialog.prompt(self.$t('cart.item.update.quantity.msg'), self.$t('cart.item.update.quantity.title'), function(value) {
                        self.$f7.preloader.show();
                        axios({
                            method: "PUT",
                            url: api.baseUrl + api.urls.cart,
                            headers: api.headers,
                            data: {
                                "key": product_key,
                                "quantity": value
                            }
                        }).then(function(response) {
                            store.dispatch("fetchCart");
                        });
                        setTimeout(function() {
                            self.$f7.preloader.hide();
                        }, 3000)
                        self.$f7.swipeout.close(self.Dom7('li.swipeout-opened'), function() {})
                    });
                },
                addCoupon() {
                    self.$f7.preloader.show();
                    let code = self.$f7.form.convertToData('#total')['coupon'];
                    axios({
                        method: "POST",
                        url: api.baseUrl + api.urls.coupon,
                        headers: api.headers,
                        data: {
                            "coupon": code
                        }
                    }).then(function(response) {
                        store.dispatch("fetchCart");
                        self.$f7.preloader.hide();
                        var t = self.$f7.toast.create({
                            text: self.$t("cart.coupon.add.msg"),
                            title: self.$t("cart.coupon.add.title"),
                            closeTimeout: 5000,
                            destroyOnClose: true,
                            position: 'top',
                            cssClass: 'toast-green'
                        });
                        t.open();
                        navigator.vibrate(80)
                    }).catch(function(error) {
                        console.log(error);
                        self.$f7.preloader.hide();
                        var t = self.$f7.toast.create({
                            text: error.response.data.error,
                            closeTimeout: 5000,
                            destroyOnClose: true,
                            position: 'top',
                            cssClass: 'toast-red'
                        });
                        t.open();
                        navigator.vibrate([80, 80, 80])
                    });
                },
                addVoucher() {
                    self.$f7.preloader.show();
                    let code = self.$f7.form.convertToData('#total')['voucher'];
                    axios({
                        method: "POST",
                        url: api.baseUrl + api.urls.voucher,
                        headers: api.headers,
                        data: {
                            "voucher": code
                        }
                    }).then(function(response) {
                        store.dispatch("fetchCart");
                        self.$f7.preloader.hide();
                        var t = self.$f7.toast.create({
                            text: self.$t("cart.voucher.add.msg"),
                            title: self.$t("cart.voucher.add.title"),
                            closeTimeout: 5000,
                            destroyOnClose: true,
                            position: 'top',
                            cssClass: 'toast-green'
                        });
                        t.open();
                        navigator.vibrate(80)
                    }).catch(function(error) {
                        console.log(error);
                        self.$f7.preloader.hide();
                        var t = self.$f7.toast.create({
                            text: error.response.data.error,
                            closeTimeout: 5000,
                            destroyOnClose: true,
                            position: 'top',
                            cssClass: 'toast-red'
                        });
                        t.open();
                        navigator.vibrate([80, 80, 80])
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
                    window.plugins.socialsharing.share(self.$t('share.app.msg'), self.$t('share.app.title'), /*self.$t('share.app.image')*/ null, self.$t('share.app.link'))
                },
                shareProduct(pname, pimage, pid) {
                    let self = self;
                    axios({
                        method: "GET",
                        url: api.baseUrl + api.urls.producturl.replace("{id}", pid),
                        headers: api.headers
                    }).then(function(response) {
                        console.log(response);
                        window.plugins.socialsharing.share(self.$t('share.product.msg'), pname, /*pimage*/ null, self.$t('share.product.url') + response.data.data.keyword)
                    });
                },
                is_favourite(pid) {
                    let wishlist = store.state.user ? store.state.user.wishlist : []
                    for (let j in wishlist) {
                        if (wishlist[j].product_id == pid)
                            return true
                    }
                    return false
                },
                addToWishlist(product_id) {
                    self.$f7.preloader.show();
                    axios({
                        method: "POST",
                        url: api.baseUrl + api.urls.wishlist.replace("{id}", product_id),
                        headers: api.headers,
                    }).then(function(response) {
                        if (response.status == 200) {
                            store.dispatch("fetchWishlist");
                        }
                    }).catch(function(error) {
                        var t = self.$f7.toast.create({
                            text: error.response.data.error,
                            closeTimeout: 5000,
                            destroyOnClose: true,
                            position: 'top',
                            cssClass: 'toast-red'
                        });
                        t.open();
                        navigator.vibrate([80, 80, 80])
                    });
                    self.$f7.preloader.hide();;
                },
                removeFromWishlist(product_id) {
                    self.$f7.preloader.show();
                    axios({
                        method: "DELETE",
                        url: api.baseUrl + api.urls.wishlist.replace("{id}", product_id),
                        headers: api.headers,
                    }).then(function(response) {
                        if (response.status == 200) {
                            store.dispatch("fetchWishlist");
                        }
                    }).catch(function(error) {
                        var t = self.$f7.toast.create({
                            text: error.response.data.error,
                            closeTimeout: 5000,
                            destroyOnClose: true,
                            position: 'top',
                            cssClass: 'toast-red'
                        });
                        t.open();
                        navigator.vibrate([80, 80, 80])
                    });
                    self.$f7.preloader.hide();;
                },
                is_new(date) {
                    var d = Date.parse(date);
                    var t = new Date();
                    return Math.round((t - d) / (1000 * 60 * 60 * 24)) <= 30
                },
                getDiscount(discount, price) {
                    let val = 1 - (discount / price);
                    return Math.floor(val * 100);
                },
                onRefresh() {
                    //store.dispatch('fetchHomeData');
                    self.$f7.pullToRefreshDone();
                    self.$f7.preloader.show();
                    setTimeout(function() {
                        location.reload();
                    }, 500)
                },
                onExitWelcome() {
                    localStorage.setItem('firstVisit', false);
                    location.reload();
                },
                getCMSImage(name) {
                    if (name.indexOf("http") == -1) {
                        return "http://mercatovip.com/app/" + name;
                    } else {
                        return name;
                    }
                },
                onSearch: function(event) {
                    let $$ = self.Dom7;
                    let val = $$('form#search input').val();
                    console.log(val);
                    let obj = localStorage.getItem("recentSearch") == null ? [] : JSON.parse(localStorage.getItem("recentSearch"));
                    if (obj.indexOf(val) === -1) {
                        obj.push(val)
                    }
                    localStorage.setItem("recentSearch", JSON.stringify(obj))
                    self.items = JSON.parse(localStorage.getItem("recentSearch").split(","))
                    $$("#search input").blur();
                    self.$f7.searchbar.toggle("#search")
                    self.$f7router.navigate("/result/" + val)
                },
                changeLanguage: function(event) {
                    let lang = event.target.value;
                    let locale = "";
                    if (lang === '2') {
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
                    axios.get(url).then((response) => {
                        Vue.i18n.add(locale, response.data);
                        Vue.i18n.set(locale);
                    }).catch((error) => {
                        alert('could not fetch locale translations');
                    });
                    self.$f7.preloader.show();
                    setTimeout(function() {
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
                    axios.get(url).then((response) => {
                        Vue.i18n.add(locale, response.data);
                        Vue.i18n.set(locale);
                    }).catch((error) => {
                        alert('could not fetch locale translations');
                    });
                    var mySwiper = self.Dom7('.welcome-swiper')[0].swiper;
                    mySwiper.slideNext();
                },
                nextSlide() {
                    var mySwiper = self.Dom7('.welcome-swiper')[0].swiper;
                    mySwiper.slideNext();
                },
                pushChange() {
                    var toggle = self.$f7.toggle.get('#push');
                    if (toggle.checked) {
                        window.pushOn();
                    } else {
                        window.pushOff();
                    }
                },
                navigate(link) {
                    this.$f7router.navigate(link);
                }
        },
};

</script>
