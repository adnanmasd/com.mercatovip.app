

<template>

<f7-page :name="'search'+term" infinite @infinite="onInfinite" no-tabbar>
    <f7-navbar sliding :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left sliding>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title>
            {{$t('search.result.title') + term}}
        </f7-nav-title>
        <f7-nav-right sliding>
            <f7-link popup-open="#filter" icon-only>
                <f7-icon fa="filter">
                </f7-icon>
            </f7-link>
        </f7-nav-right>
        <f7-subnavbar :inner="false">
            <f7-searchbar id="search_s" search-list="#search-list" :placeholder="$t('home.searchbar.placeholder')" :clear-button="true" customSearch v-model="searchTerm">
            </f7-searchbar>

        </f7-subnavbar>
    </f7-navbar>

    <f7-popup id="filter" v-if="products.length > 0" style="overflow-y:auto">
        <f7-navbar sliding :class="this.$theme.md ? 'color-black' : ''">
            <f7-nav-left>
                <f7-link popup-close icon-only>
                    <f7-icon icon="fa fa-times"></f7-icon>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title class="nav-center-margin">
                {{$t('category.filter.title')}}
            </f7-nav-title>
            <f7-nav-right class="nav-right-margin">
                <f7-link class="color-blue" icon-only popup-close @click="filter()">
                    {{$t('category.filter.apply')}}
                </f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-list id="filter" style="margin-top:0">
            <f7-list-item v-if="filterData.price" :title="$t('category.filter.price.title')" group-title></f7-list-item>
            <f7-list-item>
                <f7-row class="full-width">
                    <f7-col width="20" class="text-align-center">
                        <span id="minPriceLabel">{{minPrice}}</span>
                    </f7-col>
                    <f7-col width="60">
                        <f7-range id="price-filter" :min="minPrice" :max="maxPrice" :step="1" :value="[minPrice, maxPrice]" :dual="true" :label="true" color="green" @range:change="onRangeChange"></f7-range>
                    </f7-col>
                    <f7-col width="20" class="text-align-center">
                        <span id="maxPriceLabel">{{maxPrice}}</span>
                    </f7-col>
                </f7-row>
            </f7-list-item>

            <f7-list-item v-if="filterData.manufacturers" :title="$t('category.filters.manufacturers')" group-title></f7-list-item>
            <f7-list-item v-for="row in filterData.manufacturers" checkbox name="manufacturer" :value="row.manufacturer_id" :input-value="row.manufacturer_id" :title="row.name | andFilter"></f7-list-item>

            <template v-for="(row,key) in filterData.options">
                <template v-if="!display_mode('options',key)">
                    <f7-list-item :title="row.option_name | andFilter" group-title></f7-list-item>
                    <f7-list-item v-for="innerrow in row.values" checkbox :name="'option[' + row.option_id + ']'" :value="innerrow.option_value_id" :input-value="innerrow.option_value_id" :title="innerrow.option_value_name | andFilter"></f7-list-item>
                </template>
            </template>

            <template v-for="(row,key) in filterData.attributes">
                <template v-if="!display_mode('attributes',key)">
                    <f7-list-item :title="row.attribute_name | andFilter" group-title></f7-list-item>
                    <f7-list-item v-for="innerrow in row.values" checkbox :name="'attribute[' + row.attribute_id + ']'" :value="innerrow.text | andFilter" :input-value="innerrow.text | andFilter" :title="innerrow.text | andFilter"></f7-list-item>
                </template>
            </template>
        </f7-list>
    </f7-popup>

    <f7-block>
        <form id="sorting" class="full-width list-block" v-if="products.length > 0">
            <f7-list form>
                <f7-list-item>
                    <f7-list-item-cell>
                        <f7-list-item-row>
                            <f7-list-item-cell>
                                <li class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-title item-label">{{$t('category.sort')}}</div>
                                        <div class="item-input-wrap">
                                            <select class="col button button-big button-raised" name="sort" v-model="sort" v-on:change="update()">
                                                <option value="name">{{$t('category.sort.name')}}</option>
                                                <option value="price">{{$t('category.sort.price')}}</option>
                                                <option value="rating">{{$t('category.sort.rating')}}</option>
                                                <option value="sort_order">{{$t('category.sort.default')}}</option>
                                                <option value="date_added">{{$t('category.sort.dateAdded')}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                            </f7-list-item-cell>
                            <f7-list-item-cell>
                                <li class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-title item-label">{{$t('category.order')}}</div>
                                        <div class="item-input-wrap">
                                            <select class="col button button-big button-raised" name="order" v-model="order" v-on:change="update()">
                                                <option value="ASC">{{$t('category.order.asc')}}</option>
                                                <option value="DESC">{{$t('category.order.desc')}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                            </f7-list-item-cell>
                        </f7-list-item-row>
                    </f7-list-item-cell>
                </f7-list-item>
            </f7-list>
        </form>
    </f7-block>

    <f7-block>
        <f7-chip v-if="filterAttributes.length > 0 || filterOptions.length > 0 || filterManufacturer.length > 0" :text="$t('search.filter.removeAll')" media-bg="black" deleteable @delete="onChipDelete"></f7-chip>
        </f7-swiper>

    </f7-block>

    <f7-list v-if="noResult && products.length == 0" media-list id="result-list" class="result">
        <f7-block>
            <h3>{{$t('search.noResult.message')}}</h3>
        </f7-block>
    </f7-list>
    <!-- Search-through list -->
    <f7-list v-else-if="loading && products.length == 0" media-list id="result-list" class="result">
        <f7-row no-gap>
            <f7-col v-for="row in 1,4" width="50">
                <f7-card class="animated-background">
                    <div class="background-masker header-top"></div>
                    <div class="background-masker header-left"></div>
                    <div class="background-masker header-right"></div>
                    <div class="background-masker header-bottom"></div>
                    <div class="background-masker content-top"></div>
                </f7-card>
            </f7-col>
        </f7-row>
    </f7-list>
    <f7-list v-else media-list id="result-list" class="result">
        <f7-row no-gap>
            <f7-col v-for="row in products" :key="row.id" width="50">
                <f7-card>
                    <f7-card-header>
                        <div @click='navigate("/product?product_id=" + row.id)'><img :src="row.image" class="product-card-image"><span v-if="row.special" class="tag left-tag">{{getDiscount(row.special,row.price)}}%</span><span v-if="is_new(row.date_added)" class="tag right-tag">NEW</span><span v-if="!row.quantity"
                            class="tag out-of-stock-tag">{{row.stock_status}}</span></div>
                    </f7-card-header>
                    <f7-card-content>
                        <div @click='navigate("/product?product_id=" + row.id)' class="color-black">
                            <span class="product-cart-title">{{row.name | andFilter}}</span>
                            <br/> <span v-if="row.special" class="old-price">{{row.price_formated}}</span>
                            <br/> <span v-if="row.special" class="price">{{row.special_formated}}</span> <span v-if="!row.special" class="price">{{row.price_formated}}</span>
                        </div>
                    </f7-card-content>
                    <!-- <f7-card-footer>
                        <f7-segmented style="width:100%" v-if="theme.ios">
                            <f7-button class="product-card-footer-button" color="white" @click="shareProduct(row.name,row.thumb,row.product_id)" icon-f7="share"></f7-button>
                            <template v-if="!is_favourite(row.id)">
                                <f7-button class="product-card-footer-button" color="white" @click="addToWishlist(row.product_id)" icon-f7="heart"></f7-button>
                            </template>
                            <template v-else-if="is_favourite(row.id)">
                                <f7-button class="product-card-footer-button" color="white" @click="removeFromWishlist(row.product_id)" icon-f7="heart_fill" icon-color="red"></f7-button>
                            </template>
                        </f7-segmented>
                        <f7-segmented style="width:100%" v-if="theme.md">
                            <f7-button class="product-card-footer-button" color="black" @click="shareProduct(row.name,row.thumb,row.product_id)" icon-material="share"></f7-button>
                            <template v-if="!is_favourite(row.id)">
                                <f7-button class="product-card-footer-button" color="black" @click="addToWishlist(row.product_id)" icon-material="favorite_border"></f7-button>
                            </template>
                            <template v-else-if="is_favourite(row.id)">
                                <f7-button class="product-card-footer-button" color="black" @click="removeFromWishlist(row.product_id)" icon-material="favorite" icon-color="red"></f7-button>
                            </template>
                        </f7-segmented>
                    </f7-card-footer> -->
                </f7-card>
            </f7-col>
        </f7-row>
    </f7-list>

</f7-page>

</template>

<script>

import axios from 'axios'
import api from 'api.js'
import cms from 'cms.js'
import store from '../../vuex/store.js'

var timeout;
var page = 0;
var limit = 10;

export default {
    data() {
            return {
              items: localStorage.getItem("recentSearch") == null ? [] : JSON.parse(localStorage.getItem("recentSearch").split(",")),
              searchTerm : "",
                currentLanguageId: (localStorage.getItem('language_id')),
                currentLanguage: (localStorage.getItem('language_id') == 1 ? false : true),
                direction: (localStorage.getItem('language_id') == 1 ? "ltr" : "rtl"),
                products: [],
                term: this.$f7route.params.term,
                filters: [{
                    "field": "filter_text",
                    "operand": "LIKE",
                    "value": this.$f7route.params.term
                }],
                sort: "sort_order",
                order: "ASC",
                filterData: {
                    "price": [],
                    "attributes": [],
                    "options": [],
                    "manufacturers": [],
                    "settings": []
                },
                minPrice: "",
                maxPrice: "",
                filterAttributes: [],
                filterOptions: [],
                filterManufacturer: [],
                loading: true,
                noResult: false,
                theme : this.$theme
            }
        },
        computed: {
            cart: {
                get: function() {
                    return store.state.cart
                }
            },
        },
        filters: {
            andFilter(val) {
                if (val)
                    return val.replace(/&amp;/g, '&');
            }
        },
        mounted() {
            this.$f7.preloader.show();
            let self = this;
            page = 0;

            self.Dom7('#search_s').on('keyup', function(e) {
                if (e.which == 13) {
                    self.onSearch(e);
                }
            })

            var autocompleteSearchbar = self.$f7.autocomplete.create({
                openIn: 'dropdown',
                inputEl: '#search_s input[type="search"]',
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
            self.onInfinite();
        },
        methods: {
            display_mode(type, key) {
                    if (this.filterData.settings.length > 0)
                        return (this.filterData.settings[type][key] == 'off')
                },
                onRangeChange(e) {
                    //console.log(e);
                    this.Dom7('#minPriceLabel').text(e[0]);
                    this.Dom7('#maxPriceLabel').text(e[1]);
                },
                shareProduct(pname, pimage, pid) {
                    let self = this;
                    axios({
                        method: "GET",
                        url: api.baseUrl + api.urls.producturl.replace("{id}", pid),
                        headers: api.headers(sessionStorage.getItem('session_id'))
                    }).then(function(response) {
                        console.log(response);
                        window.plugins.socialsharing.share(self.$t('share.product.msg'), pname, pimage, self.$t('share.product.url') + response.data.data.keyword)
                    });
                },
                onChipDelete() {
                    let self = this;
                    self.$f7.preloader.show();
                    let chip = self.Dom7(this).parents('.chip');
                    this.filters = [{
                        "field": "filter_text",
                        "operand": "LIKE",
                        "value": self.term
                    }]
                    self.$f7.infiniteScroll.destroy();
                    self.Dom7('.infinite-scroll-preloader').remove();
                    chip.remove();
                    location.reload();
                },
                andFilter(val) {
                    if (val)
                        return val.replace(/&amp;/g, '&');
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
                        headers: api.headers(sessionStorage.getItem('session_id')),
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
                            cssClass : 'toast-red'
                        });
                        t.open();
                        navigator.vibrate([80,80,80])
                    });
                    self.$f7.preloader.hide();
                },
                removeFromWishlist(product_id) {
                    self.$f7.preloader.show();
                    axios({
                        method: "DELETE",
                        url: api.baseUrl + api.urls.wishlist.replace("{id}", product_id),
                        headers: api.headers(sessionStorage.getItem('session_id')),
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
                            cssClass : 'toast-red'
                        });
                        t.open();
                        navigator.vibrate([80,80,80])
                    });
                    self.$f7.preloader.hide();
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
                getImagefromSource(src) {
                    return "<img src='" + src + "'/>";
                },
                getCMSImage(name) {
                    return "http://mercatovip.com/app/" + name;
                },
                update() {
                    this.products = [];
                    page = 0;
                    this.onInfinite(true);
                },
                filter() {
                    let self = this;
                    self.$f7.preloader.show();
                    let data = self.$f7.form.convertToData("#filter");
                    self.filters = [{
                        "field": "filter_text",
                        "operand": "LIKE",
                        "value": self.term
                    }]
                    for (let v in data) {
                        if (data[v].length > 0) {
                            let obj = {
                                "field": v,
                                "operand": "=",
                                "logical_operand": "AND",
                                "value": data[v]
                            }
                            self.filters.push(obj);
                        }
                    }
                    //this.products.splice(0,this.products.length);
                    page = 0;
                    self.onInfinite(true);
                },
                onSearch: function(event) {
                    let self = this;
                    let $$ = self.Dom7;
                    let val = $$('form#search_s input').val();
                    console.log(val);
                    let obj = localStorage.getItem("recentSearch") == null ? [] : JSON.parse(localStorage.getItem("recentSearch"));
                    if (obj.indexOf(val) === -1) {
                        obj.push(val)
                    }
                    localStorage.setItem("recentSearch", JSON.stringify(obj))
                    self.items = JSON.parse(localStorage.getItem("recentSearch").split(","))
                    $$("#search input").blur();
                    self.$f7.searchbar.toggle("#search_s")
                    self.$f7router.navigate("/result/" + val)
                },
                navigate(link) {
                    this.$f7router.navigate(link);
                },
                onInfinite: function(onFilter = false) {
                    var self = this;
                    clearTimeout(timeout);
                    timeout = setTimeout(function() {
                        var productsHeaders = api.headers(sessionStorage.getItem('session_id'));
                        productsHeaders['X-Oc-Image-Dimension'] = "400x400";
                        self.loading = true;
                        self.noResult = false;
                        axios({
                            method: "POST",
                            url: api.baseUrl + api.urls.customSearch.replace('{limit}', limit).replace('{page}', ++page),
                            headers: productsHeaders,
                            data: {
                                "order": self.order,
                                "sort": self.sort,
                                "filters": self.filters
                            },
                            transformResponse: function(req) {
                                return JSON.parse(req.replace(/[\n\r]/g, ' '))
                            },
                        }).then(function(response) {
                            if (response.status == 200 && response.data.data.length == 0) {
                                self.$f7.infiniteScroll.destroy();
                                self.Dom7('.infinite-scroll-preloader').remove();
                                self.noResult = true;
                            }
                            if (response.status !== 202 && response.data.data.products && response.data.data.products.length > 0) {
                                if ((onFilter && page <= 1) || self.products.length == 0)
                                    self.products = response.data.data.products
                                else {
                                    for (var i = 0; i < response.data.data.products.length; i++) {
                                        self.products.push(response.data.data.products[i])
                                    }
                                }
                                if (page <= 1) {
                                    self.filterData.attributes = response.data.data.attributes
                                    self.filterData.manufacturers = response.data.data.manufacturers
                                    self.filterData.options = response.data.data.options
                                    self.filterData.price = response.data.data.price
                                    self.filterData.settings = response.data.data.settings
                                    self.minPrice = Math.floor(response.data.data.price.min)
                                    self.maxPrice = Math.floor(response.data.data.price.max)
                                }
                                self.loading = false;
                            }
                            self.$f7.preloader.hide();
                        }).catch(function(error) {
                            self.$f7.infiniteScroll.destroy();
                            self.Dom7('.infinite-scroll-preloader').remove();
                            self.$f7.preloader.hide();
                            self.products = [];
                            self.filterData.attributes = []
                            self.filterData.manufacturers = []
                            self.filterData.options = []
                            self.filterData.price = []
                            self.filterData.settings = []
                            self.minPrice = Math.floor(0)
                            self.maxPrice = Math.floor(0)
                            self.loading = false;
                        });
                    }, 500);
                },
        },
}

</script>
