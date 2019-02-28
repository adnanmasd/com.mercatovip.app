

<template>

<f7-page name="latest" no-tabbar>
    <f7-navbar :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title>
            {{$t('latest.title')}}
        </f7-nav-title>
        <f7-nav-right>
            <f7-link icon-only>
            </f7-link>
        </f7-nav-right>
    </f7-navbar>

    <f7-block-title>{{$t('latest.title')}}</f7-block-title>
    <!-- Search-through list -->
    <f7-list v-if="latest.length > 0" media-list id="latest-result-list" class="result">
        <f7-row no-gap>
            <f7-col v-for="row in latest" :key="row.product_id" width="50">
                <f7-card>
                    <f7-card-header>
                        <div @click='navigate("/product?product_id=" + row.product_id)'><img :src="row.thumb" class="product-card-image"><span v-if="row.special" class="tag left-tag">{{getDiscount(row.special,row.price)}}%</span><span v-if="is_new(row.date_added)" class="tag right-tag">NEW</span><span v-if="!row.quantity"
                            class="tag out-of-stock-tag">{{row.stock_status}}</span></div>
                    </f7-card-header>
                    <f7-card-content>
                        <div @click='navigate("/product?product_id=" + row.product_id)' class="color-black">
                            <span class="product-cart-title">{{row.name | andFilter}}</span>
                            <br/> <span v-if="row.special" class="old-price">{{row.price_formated}}</span>
                            <br/> <span v-if="row.special" class="price">{{row.special_formated}}</span> <span v-if="!row.special" class="price">{{row.price_formated}}</span>
                        </div>
                    </f7-card-content>
                    <!-- <f7-card-footer>
                        <f7-segmented style="width:100%">
                            <f7-button class="product-card-footer-button" color="white" @click="shareProduct(row.name,row.thumb,row.product_id)" icon-f7="share"></f7-button>
                            <template v-if="!is_favourite(row.product_id)">
                                <f7-button class="product-card-footer-button" color="white" @click="addToWishlist(row.product_id)" icon-f7="heart"></f7-button>
                            </template>
                            <template v-else-if="is_favourite(row.product_id)">
                                <f7-button class="product-card-footer-button" color="white" @click="removeFromWishlist(row.product_id)" icon-f7="heart_fill" icon-color="red"></f7-button>
                            </template>
                        </f7-segmented>
                    </f7-card-footer> -->
                </f7-card>
            </f7-col>
        </f7-row>
    </f7-list>
    <f7-list v-else media-list id="result-list" class="result">
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
</f7-page>

</template>

<script>

import axios from 'axios'
import api from 'api.js'
import store from '../../vuex/store.js'

export default {
    data() {
            return {
                currentLanguageId: (localStorage.getItem('language_id')),
                currentLanguage: (localStorage.getItem('language_id') == 1 ? false : true),
                direction: (localStorage.getItem('language_id') == 1 ? "ltr" : "rtl"),
                latest: [],
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
            var latest_headers = api.headers(localStorage.getItem('session_id'));
            latest_headers['X-Oc-Image-Dimension'] = "400x400";
            axios({
                method: "GET",
                url: api.baseUrl + api.urls.getLatest,
                headers: latest_headers
            }).then(function(response) {
                self.latest = response.data.data;
                self.$f7.preloader.hide();
            });
        },
        methods: {
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
                addToWishlist(product_id) {
                    window.f7.showPreloader();
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
                    window.f7.hidePreloader();
                },
                removeFromWishlist(product_id) {
                    window.f7.showPreloader();
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
                getImagefromSource(src) {
                    return "<img src='" + src + "'/>";
                },
        },
        navigate(link) {
            this.$f7router.navigate(link);
        }
}

</script>
