

<template>

<f7-page no-tabbar>
    <f7-navbar sliding :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left sliding>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title sliding>
            {{$t('wishlist.title')}}
        </f7-nav-title>
        <f7-nav-right sliding>
            <f7-link icon-only>
            </f7-link>
        </f7-nav-right>
    </f7-navbar>



    <f7-block-title>{{$t('wishlist.title.heading')}}</f7-block-title>
    <!-- Search-through list -->
    <f7-card v-if="wishlist.length == 0" :content="$t('wishlist.empty')">
    </f7-card>
    <f7-list v-if="wishlist.length > 0" media-list id="wishlist-result-list" class="result">
        <f7-grid no-gutter>
            <f7-row v-for="row in wishlist" :key="row.product_id" width="50">
                <f7-card>
                    <f7-card-header>
                        <a :href="'/product?product_id=' + row.product_id" data-view=".view-main"><img :src="row.thumb" class="product-card-image"><span v-if="row.special" class="tag left-tag">{{getDiscount(row.special,row.price)}}%</span><span v-if="is_new(row.date_added)" class="tag right-tag">NEW</span><span v-if="!row.stock"
                            class="tag out-of-stock-tag">{{row.stock_status}}</span></a>
                    </f7-card-header>
                    <f7-card-content>
                        <f7-link :href="'/product?product_id=' + row.product_id" data-view=".view-main">
                            <span class="product-cart-title">{{row.name | andFilter}}</span>
                            <br/> <span v-if="row.special" class="old-price">{{row.price}}</span>
                            <br/> <span v-if="row.special" class="price">{{row.special}}</span> <span v-if="!row.special" class="price">{{row.price}}</span>
                        </f7-link>
                    </f7-card-content>
                    <f7-card-footer>
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
                    </f7-card-footer>
                </f7-card>
            </f7-row>
        </f7-grid>
    </f7-list>
</f7-page>

</template>

<script>

import store from '../../vuex/store.js'
import api from 'api.js'
import axios from 'axios'

export default {
    data() {
            return {
                currentLanguageId: (localStorage.getItem('language_id')),
                currentLanguage: (localStorage.getItem('language_id') == 1 ? false : true),
                direction: (localStorage.getItem('language_id') == 1 ? "ltr" : "rtl"),
            }
        },
        computed: {
            wishlist: {
                get: function() {
                    return store.state.user ? store.state.user.wishlist : []
                }
            },
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
        mounted: function() {
            window.FirebasePlugin.setScreenName("Wishlist");
        },
        methods: {
            shareProduct(pname, pimage, pid) {
                    let self = this;
                    axios({
                        method: "GET",
                        url: api.baseUrl + api.urls.producturl.replace("{id}", pid),
                        headers: api.headers
                    }).then(function(response) {
                        console.log(response);
                        window.plugins.socialsharing.share(self.$t('share.product.msg'), pname, pimage, self.$t('share.product.url') + response.data.data.keyword)
                    });
                },
                is_favourite(pid) {
                    let wishlist = store.state.user.wishlist
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
                    let val = 1 - (discount.match(/[0-9 , \.]+/g) / price.match(/[0-9 , \.]+/g));
                    return Math.floor(val * 100);
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
                            destroyOnClose: true
                        });
                        t.open();
                    });
                    self.$f7.preloader.hide();
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
                            destroyOnClose: true
                        });
                        t.open();
                    });
                    self.$f7.preloader.hide();
                },
        }

}

</script>
