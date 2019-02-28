

<template>

<f7-page name="special" no-tabbar infinite @infinite="onInfinite">
    <f7-navbar sliding :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left sliding>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title sliding>
            {{$t('special.title')}}
        </f7-nav-title>
        <f7-nav-right sliding>
            <f7-link icon-only>
            </f7-link>
        </f7-nav-right>
    </f7-navbar>

    <f7-block-title>{{$t('special.title')}}</f7-block-title>
    <!-- Search-through list -->
    <f7-block v-if="noOffers == true">
        <h3>{{$t('search.noResult.message')}}</h3>
    </f7-block>

    <f7-list v-else-if="specials.length == 0" media-list id="result-list" class="result">
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


    <f7-list v-else-if="specials.length > 0" media-list id="special-result-list" class="result">
        <f7-row no-gap>
            <f7-col v-for="row in specials" :key="row.product_id" width="50">
                <f7-card>
                    <f7-card-header>
                        <div @click='navigate("/product?product_id=" + row.product_id)'><img :src="row.thumb" class="product-card-image"><span v-if="row.special" class="tag left-tag">{{getDiscount(row.special,row.price)}}%</span><span v-if="is_new(row.date_added)" class="tag right-tag">NEW</span><span v-if="!row.quantity"
                            class="tag out-of-stock-tag">{{row.stock_status}}</span></div>
                    </f7-card-header>
                    <f7-card-content>
                        <div @click='navigate("/product?product_id=" + row.product_id)'>
                            <span class="product-cart-title">{{row.name | andFilter}}</span>
                            <br/> <span v-if="row.special" class="old-price">{{row.price_formated}}</span>
                            <br/> <span v-if="row.special" class="price">{{row.special_formated}}</span> <span v-if="!row.special" class="price">{{row.price_formated}}</span>
                        </div>
                    </f7-card-content>
                   <f7-card-footer>
                        <f7-segmented style="width:100%" v-if="theme.ios">
                            <f7-button class="product-card-footer-button" color="white" @click="shareProduct(row.name,row.thumb,row.product_id)" icon-f7="share" icon-color="black"></f7-button>
                            <template v-if="!is_favourite(row.id)">
                                <f7-button class="product-card-footer-button" color="white" @click="addToWishlist(row.product_id)" icon-f7="heart" icon-color="red"></f7-button>
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
                    </f7-card-footer>
                </f7-card>
            </f7-col>
        </f7-row>
    </f7-list>
</f7-page>

</template>

<script>

import axios from 'axios'
import api from 'api.js'
import store from '../../vuex/store.js'

var timeout;
var page = 0;
var limit = 10;

export default {
    data() {
            return {
                currentLanguageId: (localStorage.getItem('language_id')),
                currentLanguage: (localStorage.getItem('language_id') == 1 ? false : true),
                direction: (localStorage.getItem('language_id') == 1 ? "ltr" : "rtl"),
                specials: [],
                noOffers: false,
                sort: "sort_order",
                order: "ASC",
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
            let self = this;
            self.$f7.preloader.show();
            page = 0;
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
                        headers: api.headers(localStorage.getItem('session_id'))
                    }).then(function(response) {
                        console.log(response);
                        window.plugins.socialsharing.share(self.$t('share.product.msg'), pname, pimage, self.$t('share.product.url') + response.data.data.keyword)
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
                andFilter(val) {
                    if (val)
                        return val.replace(/&amp;/g, '&');
                },
                addToWishlist(product_id) {
                    let self = this;
                    self.$f7.preloader.show();
                    axios({
                        method: "POST",
                        url: api.baseUrl + api.urls.wishlist.replace("{id}", product_id),
                        headers: api.headers(localStorage.getItem('session_id')),
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
                    let self = this;
                    self.$f7.preloader.show();
                    axios({
                        method: "DELETE",
                        url: api.baseUrl + api.urls.wishlist.replace("{id}", product_id),
                        headers: api.headers(localStorage.getItem('session_id')),
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
                is_favourite(pid) {
                    let wishlist = store.state.user ? store.state.user.wishlist : []
                    for (let j in wishlist) {
                        if (wishlist[j].product_id == pid)
                            return true
                    }
                    return false
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
                navigate(link) {
                    this.$f7router.navigate(link);
                },
                update() {
                    this.products = [];
                    page = 0;
                    this.onInfinite(true);
                },
                onInfinite: function(onFilter = false) {
                    var self = this;
                    clearTimeout(timeout);
                    timeout = setTimeout(function() {
                        var specials_headers = api.headers(localStorage.getItem('session_id'));
                        specials_headers['X-Oc-Image-Dimension'] = "400x400";
                        axios({
                            method: "GET",
                            url: api.baseUrl + api.urls.getSpecialsLimit.replace('{limit}', limit).replace('{page}', ++page),
                            headers: specials_headers,
                            transformResponse: function(req) {
                                return JSON.parse(req.replace(/[\n\r]/g, ' '))
                            },
                        }).then(function(response) {
                            if (response.status == 200 && response.data.data.length == 0) {
                                self.$f7.infiniteScroll.destroy();
                                self.Dom7('.infinite-scroll-preloader').remove();
                                self.loading = false;
                            }
                            if (response.status !== 202 && response.data.data && response.data.data.length > 0) {
                                if (self.specials.length == 0)
                                    self.specials = response.data.data
                                else {
                                    for (var i = 0; i < response.data.data.length; i++) {
                                       self.specials.push(response.data.data[i])
                                    }
                                }
                                self.loading = false;
                            }
                            self.$f7.preloader.hide();
                        }).catch(function(error) {
                            self.$f7.infiniteScroll.destroy();
                            self.Dom7('.infinite-scroll-preloader').remove();
                            self.$f7.preloader.hide();
                            self.specials = [];
                            self.loading = false;
                        });
                    }, 500);
                },
        },
}

</script>
