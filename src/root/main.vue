

<template>

<!-- App -->
<div id="app" :dir="direction">
    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>
    <!-- Left Panel -->
    <f7-panel :side="sideBarPos" panel-reveal>
        <f7-view id="left-panel-view">
            <f7-pages :dir="direction">
                <f7-page :dir="direction">
                    <f7-block no-hairlines>
                        <f7-link v-if="!user" href="/login/" data-view="#main-view" class="close-panel"><i class="fa fa-user fa-2x"></i> &ensp; &ensp; {{ $t("home.sideBar.login") }}</f7-link>
                        <h3 v-if="user" class="close-panel">{{ $t("home.sideBar.greetings") }} {{user.firstname}}</h3>
                        <f7-button v-if="user" @click="logout()" round raised bg="red" color="white">{{ $t("home.sideBar.logout") }}</f7-button>
                    </f7-block>
                    <f7-list media-list style="margin:0">
                        <!--f7-list-group>
                            <f7-list-item :dir="direction">
                                <div slot="content-start">ENG</div>
                                <div slot="content" class="arabic-switch">عربي</div>
                                <div slot="inner" class="center">
                                    <f7-input type="switch" class='lang-switch' @change="changeLanguage" v-model="currentLanguage"></f7-input>
                                </div>
                            </f7-list-item>
                        </f7-list-group-->
                        <f7-list-group v-if="sideBarCategories.length">
                            <f7-list-item v-for="row in sideBarCategories" :key="row.id" link-view="#main-view" link-close-panel :link="row.link_id" :title="row.name[currentLanguageId]" :media="row.media_ios"></f7-list-item>
                        </f7-list-group>
                        <f7-list-group v-if="sideBarTools.length">
                            <f7-list-item link-view="#main-view" link-close-panel :link="row.link_id" v-for="row in sideBarTools" :key="row.id" :title="row.name[currentLanguageId]"></f7-list-item>
                        </f7-list-group>
                        <f7-list-group v-if="sideBarInfo.length">
                            <f7-list-item link-view="#main-view" link-close-panel :link="row.link_id" v-for="row in sideBarInfo" :key="row.id" :title="row.name[currentLanguageId]" :media="row.media_ios"></f7-list-item>
                        </f7-list-group>
                        <f7-list-group>
                            <f7-list-item class="external" link-close-panel :title="$t('home.sideBar.callus.title')" link-external link="tel:920003598" media="<i class='f7-icons'>phone_round_fill</i>"></f7-list-item>
                            <f7-list-item link="#" class="shareapp" link-close-panel :title="$t('home.sideBar.shareapp.title')" media="<i class='icon f7-icons'>share</i>"></f7-list-item>
                            <f7-list-item link="#" class="rate" link-close-panel :title="$t('home.sideBar.rateus.title')" media="<i class='icon f7-icons'>star_fill</i>"></f7-list-item>
                        </f7-list-group>
                    </f7-list>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-panel>

    <!-- Main Views -->
    <f7-views>
        <f7-view navbar-through id="main-view" class='view-main' :dynamic-navbar="true" main>
            <f7-toolbar tabbar labels id="mainToolbar">
                <a href="#home" class="tab-link active">
                    <i class="f7-icons">home</i>
                    <span class="tabbar-label">{{$t('tabbar.home.title')}}</span>
                </a>
                <a href="#search" class="tab-link">
                    <i class="f7-icons">search</i>
                    <span class="tabbar-label">{{$t('tabbar.search.title')}}</span>
                </a>
                <a href="#cart" class="tab-link">
                    <i class="icon f7-icons"><span v-if="cart.total_product_count" class="badge bg-red">{{cart.total_product_count}}</span>bag</i>
                    <span class="tabbar-label">{{$t('tabbar.cart.title')}}</span>
                </a>
                <a href="#settings" class="tab-link">
                    <i class="f7-icons">settings</i>
                    <span class="tabbar-label">{{$t('tabbar.settings.title')}}</span>
                </a>
            </f7-toolbar>
            <f7-navbar>
                <f7-nav-left sliding>
                    <f7-link open-panel="left">
                        <f7-icon f7="menu"></f7-icon>
                    </f7-link>
                </f7-nav-left>
                <f7-nav-center sliding class="nav-center-margin">
                    <img :src="logo" class="logo" />
                </f7-nav-center>
                <f7-nav-right sliding>
                </f7-nav-right>
            </f7-navbar>
            <f7-pages navbar-through toolbar-through>
                <f7-page name="home" tabs no-page-content navbar-through>
                    <f7-tabs animated>
                        <f7-page-content tab id="home" active>
                            <f7-block>
                                <f7-swiper v-if="sliderHome.length" :params="{preloadImages: false,lazy: true,loop:true,centeredSlides:true,autoplay:5000,pagination:'.swiper-slow .swiper-pagination'}">
                                    <f7-swiper-slide class="image-slider" v-for="row in sliderHome" :key="row.id">
                                        <f7-link :href="row.link_id">
                                            <span v-if="row.name" class="slider-title">{{row.name[currentLanguageId]}}</span>
                                            <img :src="getCMSImage(row.image[currentLanguageId].path)" class="slider lazy swiper-lazy">
                                        </f7-link>
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
                                    </f7-swiper-slide>
                                </f7-swiper>
                            </f7-block>

                            <f7-block>
                                <f7-swiper v-if="bannerHome.length" scrollbar :params="{preloadImages: false,lazy: true,freeMode: true,slidesPerView: 3,slidesPerColumn: 1,spaceBetween:10,pagination:'.swiper-slow .swiper-pagination'}" style="width:100%">
                                    <f7-swiper-slide v-for="row in bannerHome" class="image-slider" :key="row.id">
                                        <f7-link :href="row.link_id">
                                            <span class="banner-title">{{row.name[currentLanguageId]}}</span>
                                            <img :src="getCMSImage(row.image[currentLanguageId].path)" class="banner lazy swiper-lazy">
                                        </f7-link>
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
                                    </f7-swiper-slide>
                                </f7-swiper>
                            </f7-block>


                            <f7-block-title>{{$t("home.bestOffer")}}<span class="pull-right"><f7-link class="color-blue" href="/special">{{$t("home.seeAll")}}</f7-link></span></f7-block-title>
                            <f7-block>
                                <div class="swiper-container" id="special_carousel">
                                    <div class="swiper-wrapper" v-if="specialProducts.length == 0">
                                        <div class="swiper-slide" v-for="num in 1,6">
                                            <f7-card class="animated-background">
                                                <div class="background-masker header-top"></div>
                                                <div class="background-masker header-left"></div>
                                                <div class="background-masker header-right"></div>
                                                <div class="background-masker header-bottom"></div>
                                                <div class="background-masker content-top"></div>
                                            </f7-card>
                                        </div>
                                    </div>
                                    <div class="swiper-wrapper" v-else>
                                        <div class="swiper-slide" v-for="row in specialProducts" :key="row.id">
                                            <f7-card>
                                                <f7-card-header>
                                                    <a :href="'/product?product_id=' + row.product_id"><img :src="row.thumb" class="product-card-image"><span v-if="row.special" class="tag left-tag">{{getDiscount(row.special,row.price)}}%</span><span v-if="is_new(row.date_added)" class="tag right-tag">NEW</span></a>
                                                </f7-card-header>
                                                <f7-card-content>
                                                    <f7-link :href="'/product?product_id=' + row.product_id">
                                                        <span class="product-cart-title">{{row.name | andFilter}}</span>
                                                        <br/> <span v-if="row.special" class="old-price">{{row.price_formated}}</span>
                                                        <br/> <span v-if="row.special" class="price">{{row.special_formated}}</span> <span v-if="!row.special" class="price">{{row.price_formated}}</span>
                                                    </f7-link>
                                                </f7-card-content>
                                                <f7-card-footer>
                                                    <f7-grid class="full-width">
                                                        <f7-col class="auto-margin">
                                                            <f7-link class="product-card-footer-button" @click="shareProduct(row.name,row.thumb,row.product_id)">
                                                                <f7-icon style="margin: 0 auto" class="f7-icons">share</f7-icon>
                                                            </f7-link>
                                                        </f7-col>
                                                        <f7-col class="auto-margin">
                                                            <f7-link class="product-card-footer-button" @click="addToWishlist(row.product_id)" v-if="!is_favourite(row.product_id)">
                                                                <f7-icon style="margin: 0 auto" class="f7-icons">heart</f7-icon>
                                                            </f7-link>
                                                            <f7-link class="product-card-footer-button" @click="removeFromWishlist(row.product_id)" v-else-if="is_favourite(row.product_id)">
                                                                <f7-icon style="margin: 0 auto" class="f7-icons color-red">heart_fill</f7-icon>
                                                            </f7-link>
                                                        </f7-col>
                                                    </f7-grid>
                                                </f7-card-footer>
                                            </f7-card>
                                        </div>
                                    </div>
                                    <div class="swiper-pagination"></div>
                                </div>
                            </f7-block>

                            <f7-block-title>{{$t("home.latest")}}<span class="pull-right"><f7-link class="color-blue" href="/latest">{{$t("home.seeAll")}}</f7-link></span></f7-block-title>
                            <f7-block>
                                <div class="swiper-container" id="latest_carousel">
                                    <div v-if="latestProducts.length == 0" class="swiper-wrapper">
                                        <div class="swiper-slide" v-for="num in 1,6">
                                            <f7-card class="animated-background">
                                                <div class="background-masker header-top"></div>
                                                <div class="background-masker header-left"></div>
                                                <div class="background-masker header-right"></div>
                                                <div class="background-masker header-bottom"></div>
                                                <div class="background-masker content-top"></div>
                                            </f7-card>
                                        </div>
                                    </div>
                                    <div class="swiper-wrapper" v-else>
                                        <div class="swiper-slide" v-for="row in latestProducts" :key="row.id">
                                            <f7-card>
                                                <f7-card-header>
                                                    <a :href="'/product?product_id=' + row.product_id"><img :src="row.thumb" class="product-card-image"><span v-if="row.special" class="tag left-tag">{{getDiscount(row.special,row.price)}}%</span><span v-if="is_new(row.date_added)" class="tag right-tag">NEW</span></a>
                                                </f7-card-header>
                                                <f7-card-content>
                                                    <f7-link :href="'/product?product_id=' + row.product_id">
                                                        <span class="product-cart-title">{{row.name | andFilter}}</span>
                                                        <br/> <span v-if="row.special" class="old-price">{{row.price_formated}}</span>
                                                        <br/> <span v-if="row.special" class="price">{{row.special_formated}}</span> <span v-if="!row.special" class="price">{{row.price_formated}}</span>
                                                    </f7-link>
                                                </f7-card-content>
                                                <f7-card-footer>
                                                    <f7-grid class="full-width">
                                                        <f7-col class="auto-margin">
                                                            <f7-link class="product-card-footer-button" @click="shareProduct(row.name,row.thumb,row.product_id)">
                                                                <f7-icon style="margin: 0 auto" class="f7-icons">share</f7-icon>
                                                            </f7-link>
                                                        </f7-col>
                                                        <f7-col class="auto-margin">
                                                            <f7-link class="product-card-footer-button" @click="addToWishlist(row.product_id)" v-if="!is_favourite(row.product_id)">
                                                                <f7-icon style="margin: 0 auto" class="f7-icons">heart</f7-icon>
                                                            </f7-link>
                                                            <f7-link class="product-card-footer-button" @click="removeFromWishlist(row.product_id)" v-else-if="is_favourite(row.product_id)">
                                                                <f7-icon style="margin: 0 auto" class="f7-icons color-red">heart_fill</f7-icon>
                                                            </f7-link>
                                                        </f7-col>
                                                    </f7-grid>
                                                </f7-card-footer>
                                            </f7-card>
                                        </div>
                                    </div>
                                    <div class="swiper-pagination"></div>
                                </div>
                            </f7-block>
                        </f7-page-content>


                        <f7-page-content tab id="search">
                            <f7-subnavbar>
                                <f7-searchbar id="search" search-list="#search-list" :placeholder="$t('home.searchbar.placeholder')" :clear-button="true" customSearch v-model="searchTerm">
                                    <div slot="after-input">
                                        <f7-button @click="onSearch">
                                            <f7-icon style="top: 5px;font-size: 15px;" f7="search"></f7-icon>
                                        </f7-button>
                                    </div>
                                </f7-searchbar>
                            </f7-subnavbar>
                            <br/>
                            <f7-list class="searchbar-not-found">
                                <f7-list-item :title="$t('home.searchbar.noResult')"></f7-list-item>
                            </f7-list>
                            <f7-list class="searchbar-found" id="search-list">
                                <f7-list-item group-title :title="$t('search.recent')"></f7-list-item>
                                <f7-list-item :link="'/result/' + item" link-close-popup="#searchPopup" v-for="item in items" :title="item"></f7-list-item>
                            </f7-list>
                        </f7-page-content>


                        <f7-page-content tab id="cart">

                            <f7-toolbar>
                                <f7-link @click="empty()" color="red"><i class="f7-icons">trash_fill</i></f7-link>
                                <f7-link @click="refresh()" color="green"><i class="f7-icons">reload</i></f7-link>
                            </f7-toolbar>

                            <f7-card v-if="!cart.products" :content="$t('cart.empty')">
                            </f7-card>

                            <f7-card v-for="row in cart_error" :content="row" class="bg-red color-white"></f7-card>

                            <f7-list v-if="cart.total_product_count > 0" media-list>
                                <template v-for="row in cart.products">
                                    <f7-list-item :id="row.key" :after="getAfter(row.key)" swipeout :class="row.stock ? '' : 'color-red'" :title="(row.stock ? '':'***') + row.name | andFilter" :media='getImagefromSource(row.thumb)' :text="getProductInfo(row.quantity,row.price,row.total,row.option)"
                                    @swipeout:deleted="onSwipeoutDeleted">
                                        <f7-swipeout-actions :side="swipeoutSide">
                                            <f7-swipeout-button v-on:click="update(row.key)" class="update" color="green">{{$t('cart.item.update')}}</f7-swipeout-button>
                                            <f7-swipeout-button delete :data-confirm="$t('cart.item.delete.msg')" :data-confirm-title="$t('cart.item.delete.title')" data-close-on-cancel="true">{{$t('cart.item.delete')}}</f7-swipeout-button>
                                            <f7-swipeout-button close color="black">
                                                <f7-icon f7="close"></f7-icon>
                                            </f7-swipeout-button>
                                        </f7-swipeout-actions>
                                    </f7-list-item>
                                    <f7-list-item v-for="o in row.option" group-title>
                                        <i class="f7-icons color-green">check_round</i> &ensp; {{o.value}}
                                    </f7-list-item>
                                </template>
                                <f7-list-item id="coupon" v-if="cart.coupon != ''" after="<i class='f7-icons'>more</i>" swipeout title="Coupon" :text="'CODE : '+cart.coupon" @swipeout:deleted="onSwipeoutDeleted">
                                    <f7-swipeout-actions>
                                        <f7-swipeout-button delete :data-confirm="$t('cart.item.delete.msg')" :data-confirm-title="$t('cart.item.delete.title')" data-close-on-cancel="true">{{$t('cart.item.delete')}}</f7-swipeout-button>
                                        <f7-swipeout-button close color="black">
                                            <f7-icon f7="close"></f7-icon>
                                        </f7-swipeout-button>
                                    </f7-swipeout-actions>
                                </f7-list-item>
                                <f7-list-item id="voucher" v-if="cart.voucher != ''" after="<i class='f7-icons'>more</i>" swipeout title="Voucher" :text="'CODE : '+cart.voucher" @swipeout:deleted="onSwipeoutDeleted">
                                    <f7-swipeout-actions>
                                        <f7-swipeout-button delete :data-confirm="$t('cart.item.delete.msg')" :data-confirm-title="$t('cart.item.delete.title')" data-close-on-cancel="true">{{$t('cart.item.delete')}}</f7-swipeout-button>
                                        <f7-swipeout-button close color="black">
                                            <f7-icon f7="close"></f7-icon>
                                        </f7-swipeout-button>
                                    </f7-swipeout-actions>
                                </f7-list-item>
                            </f7-list>

                            <f7-card v-if="cart.total_product_count > 0">
                                <f7-card-header>{{$t('cart.code.title')}}</f7-card-header>
                                <f7-card-content>
                                    <f7-list id="total" form>
                                        <f7-list-item v-if="cart.coupon == ''">
                                            <f7-grid class="full-width">
                                                <f7-col width="70">
                                                    <f7-input name="coupon" type="text" :placeholder="$t('cart.coupon.placeholder')" /></f7-col>
                                                <f7-col width="30">
                                                    <f7-button big raised class="bg-green" color="white" @click="addCoupon">{{$t('cart.coupon.add')}}</f7-button>
                                                </f7-col>
                                            </f7-grid>
                                        </f7-list-item>
                                        <f7-list-item v-if="cart.voucher == ''">
                                            <f7-grid class="full-width">
                                                <f7-col width="70">
                                                    <f7-input name="voucher" type="text" :placeholder="$t('cart.voucher.placeholder')" /></f7-col>
                                                <f7-col width="30">
                                                    <f7-button big raised class="bg-green" color="white" @click="addVoucher">{{$t('cart.voucher.add')}}</f7-button>
                                                </f7-col>
                                            </f7-grid>
                                        </f7-list-item>
                                    </f7-list>
                                </f7-card-content>
                            </f7-card>

                            <!--f7-block-title v-if="cart.total_product_count > 0">Total</f7-block-title>
                          <f7-block inset>
                          <f7-card v-if="cart.total_product_count > 0" v-for="row in cart.totals">
                              <f7-card-content>
                                  <f7-grid>
                                    <f7-col auto>{{row.title}}</f7-col>
                                    <f7-col auto><span class="pull-right">{{row.text}}</span></f7-col>
                                  </f7-grid>
                              </f7-card-content>
                          </f7-card>
                          </f7-block-->

                            <f7-toolbar>
                                <f7-button v-if="cart.total_product_count > 0" :disabled="cart_error.length > 0" style="width:100%" href="/checkout" big raised fill class="bg-green">{{$t('cart.proceed')}}</f7-button>
                                <f7-button v-if="!cart.products" style="width:100%" big raised fill class="bg-green" tab-link="#home">{{$t('cart.continue')}}</f7-button>
                            </f7-toolbar>
                        </f7-page-content>


                        <f7-page-content tab id="settings">
                            <f7-list>
                                <f7-list-item>
                                    <f7-label>{{$t('settings.language.title')}}</f7-label>
                                    <f7-input type="select" @change="changeLanguage" v-model="currentLanguageId" input-value="currentLanguageId">
                                        <option value="1" :selected="currentLanguageId == 1">English</option>
                                        <option value="2" :selected="currentLanguageId == 2">عربي</option>
                                    </f7-input>
                                </f7-list-item>
                            </f7-list>
                        </f7-page-content>
                    </f7-tabs>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-views>

    <f7-popup id="welcomePopup" v-if="firstVisit === 'true'" opened>
        <f7-swiper scrollbar :params="{onlyExternal:true, pagination:'.swiper-slow .swiper-pagination'}" class="welcome-swiper">
            <f7-swiper-slide class="welcome-slider">
                <f7-grid>
                    <f7-col width="100">
                        <h1>{{$t('welcome.first.heading1.eng')}}</h1>
                    </f7-col>
                    <f7-col width="100">
                        <h1>{{$t('welcome.first.heading1.ar')}}</h1>
                    </f7-col>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <f7-col width="100">
                        <h3>{{$t('welcome.first.choose.lang.title.en')}}</h3>
                    </f7-col>
                    <f7-col width="100">
                        <h3>{{$t('welcome.first.choose.lang.title.ar')}}</h3>
                    </f7-col>
                    <f7-col width="100">
                        <f7-buttons style="padding : 2em">
                            <f7-button big round color="white" bg="black" text="English" @click="nextSlide()"></f7-button>
                            <f7-button big round color="white" bg="black" text="عربي" @click="changeToAr()"></f7-button>
                        </f7-buttons>
                    </f7-col>
                </f7-grid>
            </f7-swiper-slide>
            <f7-swiper-slide class="welcome-slider">
                <f7-grid>
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
                        <f7-button big round color="white" bg="black" :text="$t('welcome.last.shopnow.title')" close-popup="#welcomePopup" v-on:click="onExitWelcome"></f7-button>
                    </f7-col>
                </f7-grid>
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

import store from 'store.js'
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
                sideBarPos: (localStorage.getItem('language_id') == 1 ? "left" : "right"),
                logo: (localStorage.getItem('language_id') == 1 ? "static/img/logo-en.png" : "static/img/logo-ar.png"),
                searchTerm: "",
                swipeoutSide: (localStorage.getItem('language_id') == 1 ? "right" : "left")
            }
        },
        mounted: function() {
            self = this;
            store.dispatch('fetchHomeData');
            store.dispatch('fetchCart');

            var swiper1 = new Swiper('#special_carousel', {
                init: true,
                slidesPerView: 2,
                loop: false,
                autoplay: 5000,
            });
            var swiper2 = new Swiper('#latest_carousel', {
                init: true,
                slidesPerView: 2,
                loop: false,
                autoplay: 5000,
            });

            window.Dom7(document).on('click', '.shareapp', function(e) {
                self.shareapp();
            });

            window.Dom7(document).on('click', '.rate', function(e) {
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
                    //return "<i onClick='" + 'window.f7.swipeoutOpen(window.Dom7("#' + id + ' .swipeout"), '+ this.swipeoutSide +")" + "' class='f7-icons'>more</i>"
                    return '<i onClick="' + 'window.f7.swipeoutOpen(' + "window.Dom7('#"+ id +"'))" + '"' + ' class="f7-icons">more</i>'
                },
                getImagefromSource(src) {
                    return "<img src='" + src + "' width='80'/>";
                },
                getProductInfo(quantity, price_per_item, total, options) {
                    return total + "<br/>" + this.$t('cart.item.quantity') + quantity
                },
                refresh() {
                    window.f7.showPreloader();
                    store.dispatch("fetchCart");
                    setTimeout(function() {
                        window.f7.hidePreloader()
                    }, 3000)
                },
                onSwipeoutDeleted(event) {
                    window.f7.showPreloader();
                    let key = event.target.id;

                    if (key == "coupon") {
                        axios({
                            method: "DELETE",
                            url: api.baseUrl + api.urls.coupon,
                            headers: api.headers,
                        }).then(function(response) {
                            store.dispatch("fetchCart");
                            window.f7.hidePreloader()
                            window.f7.alert(self.$t('cart.coupon.delete'), self.$t("cart.coupon.delete.title"));
                        });
                    } else if (key == "voucher") {
                        axios({
                            method: "DELETE",
                            url: api.baseUrl + api.urls.voucher,
                            headers: api.headers,
                        }).then(function(response) {
                            store.dispatch("fetchCart");
                            window.f7.hidePreloader()
                            window.f7.alert(self.$t('cart.voucher.delete'), self.$t("cart.voucher.delete.title"));
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
                            window.f7.hidePreloader()
                            window.f7.alert(self.$t("cart.item.deleted"), self.$t("cart.item.deleted.title"));
                        });
                    }
                },
                empty() {
                    window.f7.confirm(self.$t('cart.emptyAll'), self.$t("cart.emptyAll.title"), function(value) {
                        window.f7.showPreloader();
                        axios({
                            method: "DELETE",
                            url: api.baseUrl + api.urls.emptyCart,
                            headers: api.headers,
                        }).then(function(response) {
                            store.dispatch("fetchCart");
                        });
                        setTimeout(function() {
                            window.f7.hidePreloader()
                        }, 3000)
                        window.f7.swipeoutClose(window.Dom7('li.swipeout'), function() {})
                    });
                },
                update(product_key) {
                    window.f7.prompt(self.$t('cart.item.update.quantity.msg'), self.$t('cart.item.update.quantity.title'), function(value) {
                        window.f7.showPreloader();
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
                            window.f7.hidePreloader()
                        }, 3000)
                        window.f7.swipeoutClose(window.Dom7('li.swipeout'), function() {})
                    });
                },
                addCoupon() {
                    window.f7.showPreloader();
                    let code = window.f7.formToData('#total')['coupon'];
                    axios({
                        method: "POST",
                        url: api.baseUrl + api.urls.coupon,
                        headers: api.headers,
                        data: {
                            "coupon": code
                        }
                    }).then(function(response) {
                        store.dispatch("fetchCart");
                        window.f7.hidePreloader()
                        window.f7.alert(self.$t("cart.coupon.add.msg"), self.$t("cart.coupon.add.title"));
                    }).catch(function(error) {
                        console.log(error);
                        window.f7.hidePreloader()
                        window.f7.alert(error.response.data.error, "Failed");
                    });
                },
                addVoucher() {
                    window.f7.showPreloader();
                    let code = window.f7.formToData('#total')['voucher'];
                    axios({
                        method: "POST",
                        url: api.baseUrl + api.urls.voucher,
                        headers: api.headers,
                        data: {
                            "voucher": code
                        }
                    }).then(function(response) {
                        store.dispatch("fetchCart");
                        window.f7.hidePreloader()
                        window.f7.alert(self.$t("cart.voucher.add.msg"), self.$t("cart.voucher.add.title"));
                    }).catch(function(error) {
                        console.log(error);
                        window.f7.hidePreloader()
                        window.f7.alert(error.response.data.error, "Failed");
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
                    window.plugins.socialsharing.share(this.$t('share.app.msg'), this.$t('share.app.title'), /*this.$t('share.app.image')*/ null, this.$t('share.app.link'))
                },
                shareProduct(pname, pimage, pid) {
                    let self = this;
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
                    window.f7.showPreloader();
                    axios({
                        method: "POST",
                        url: api.baseUrl + api.urls.wishlist.replace("{id}", product_id),
                        headers: api.headers,
                    }).then(function(response) {
                        if (response.status == 200) {
                            store.dispatch("fetchWishlist");
                        }
                    }).catch(function(error) {
                        window.f7.alert(error.response.data.error, 'Fialed');
                    });
                    window.f7.hidePreloader();
                },
                removeFromWishlist(product_id) {
                    window.f7.showPreloader();
                    axios({
                        method: "DELETE",
                        url: api.baseUrl + api.urls.wishlist.replace("{id}", product_id),
                        headers: api.headers,
                    }).then(function(response) {
                        if (response.status == 200) {
                            store.dispatch("fetchWishlist");
                        }
                    }).catch(function(error) {
                        window.f7.alert(error.response.data.error, 'Fialed');
                    });
                    window.f7.hidePreloader();
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
                    window.f7.pullToRefreshDone();
                    window.f7.showPreloader();
                    setTimeout(function() {
                        location.reload();
                    }, 500)
                },
                logout() {
                    window.f7.showPreloader();
                    axios({
                        method: "POST",
                        url: api.baseUrl + api.urls.logout,
                        headers: api.headers,
                    }).then(function(response) {
                        localStorage.removeItem('user');
                        store.dispatch("removeUser");
                        store.dispatch('fetchCart');
                        window.f7.hidePreloader();
                    }).catch(function(error) {
                        localStorage.removeItem('user');
                        store.dispatch("removeUser");
                        window.f7.alert(error.response.data.error, "Failed");
                    });
                    window.f7.hidePreloader();
                },
                onExitWelcome() {
                    localStorage.setItem('firstVisit', false);
                    location.reload();
                },
                getCMSImage(name) {
                    return "http://mercatovip.com/app/" + name;
                },
                onSearch: function(event) {
                    let $$ = window.Dom7;
                    let val = $$('form#search input').val();
                    console.log(val);
                    let obj = localStorage.getItem("recentSearch") == null ? [] : JSON.parse(localStorage.getItem("recentSearch"));
                    obj.push(val);
                    localStorage.setItem("recentSearch", JSON.stringify(obj))
                    this.items = JSON.parse(localStorage.getItem("recentSearch").split(","))
                    window.f7.mainView.router.loadPage("/result/" + val)
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
                    window.f7.showPreloader("Changing Language");
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
                    var mySwiper = window.Dom7('.welcome-swiper')[0].swiper;
                    mySwiper.slideNext();
                },
                nextSlide() {
                    var mySwiper = window.Dom7('.welcome-swiper')[0].swiper;
                    mySwiper.slideNext();
                },
        },

}

</script>
