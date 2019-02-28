<template>
<f7-page :name="'tag'+tag_name" infinite @infinite="onInfinite" no-tabbar>
    <f7-navbar sliding :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left sliding>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title>
            {{tag_seo.h1 | andFilter}}
        </f7-nav-title>
        <f7-nav-right sliding>
            <f7-link icon-only>
            </f7-link>
        </f7-nav-right>
    </f7-navbar>
    <f7-block-title>{{tag_seo.h1 | andFilter}}</f7-block-title>
    <f7-block>
        {{tag_seo.meta_description}}
    </f7-block>
    <!-- Search-through list -->
    <div :class="'list virtual-list media-list products-' + tag_name + ' no-margin'">
        <ul>
            <li v-for="(row, index) in vlData.items" :key="index" media-item class="vlist-item product-line" :style="`top: ${vlData.topPosition}px`">
                <a :href="'/product?product_id=' + row.id" class="item-link item-content">
                    <div class="item-media">
                        <div><img :src="row.image" class="product-card-image"><span v-if="row.special" class="tag left-tag">{{getDiscount(row.special,row.price)}}%</span><span v-if="is_new(row.date_added)" class="tag right-tag">NEW</span><span v-if="!row.quantity"
                                    class="tag out-of-stock-tag">{{row.stock_status}}</span></div></div>
                    <div class="item-inner">
                        <div class="item-title-row">
                            <div class="item-title"><span class="product-cart-title">{{row.name | andFilter}}</span></div>
                        </div>
                        <div class="item-subtitle">
                            <span v-if="row.special" class="price">{{row.special_formated}}</span>
                            <span v-if="row.special" class="old-price">{{row.price_formated}}</span>
                            <span v-if="!row.special" class="price">{{row.price_formated}}</span>
                        </div>
                        <div class="item-text">
                            <f7-segmented style="width:100%" v-if="theme.ios">
                                <f7-button class="product-card-footer-button" color="white" @click="shareProduct(row.name,row.thumb,row.id)" icon-f7="share" icon-color="black"></f7-button>
                                <template v-if="!is_favourite(row.id)">
                                    <f7-button class="product-card-footer-button" color="white" @click="addToWishlist(row.id)" icon-f7="heart" icon-color="red"></f7-button>
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
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    </div>

</f7-page>
</template>

<script>
import axios from 'axios'
import api from 'api.js'
import cms from 'cms.js'
import store from '../../vuex/store.js'

var timeout;
var virtualList;
var page = 0;
var limit = 25;

export default {
    data() {
        return {
            items: localStorage.getItem("recentSearch") == null ? [] : JSON.parse(localStorage.getItem("recentSearch").split(",")),
            searchTerm: "",
            currentLanguageId: (localStorage.getItem('language_id')),
            currentLanguage: (localStorage.getItem('language_id') == 1 ? false : true),
            direction: (localStorage.getItem('language_id') == 1 ? "ltr" : "rtl"),
            products: [],
            sort: "sort_order",
            order: "ASC",
            today: new Date(),
            filterData: {
                "price": [],
                "attributes": [],
                "options": [],
                "manufacturers": []
            },
            loading: true,
            noResult: false,
            theme: this.$theme,
            minPrice: "",
            maxPrice: "",
            filterAttributes: [],
            filterOptions: [],
            filterManufacturer: [],
            loading: true,
            noResult: false,
            vlData: {},
            allContent: [],
            tag_name: [],
            tag_seo : []
        }
    },
    computed: {
        cart: {
            get: function () {
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
    created() {
        self = this;
        self.tag_seo = [];
        self.tag_name = self.$f7route.query.tag_name
        axios({
            method: "GET",
            url: api.baseUrl + api.urls.getTagSeo.replace('{tag}', self.tag_name),
            headers: api.headers(localStorage.getItem('session_id')),
        }).then(function (response) {
            console.log(response)
            self.tag_seo = response.data.data;
        }).catch(function (error) {
            console.log(error);
        });
    },
    mounted() {
        this.$f7.preloader.show();
        let self = this;
        page = 0;
        var tag_name = self.$f7route.query.tag_name
        self.tag_name = self.$f7route.query.tag_name

        self.virtualList = self.$f7.virtualList.create({
            // List Element
            el: '.products-' + tag_name,
            createUl: false,
            // Pass array with items
            items: self.products,
            rowsAfter: 25,
            rowsBefore: 100,
            //dynamicHeightBufferSize: 2,
            // List item Template7 template
            renderExternal: self.renderExternal,
            // Item height
            height: function (item) {
                return 200;
                //return self.theme === 'ios' ? 63 : 73;
            },
        });
        self.onInfinite();
    },
    methods: {
        renderExternal(vl, vlData) {
            this.vlData = vlData;
        },
        display_mode(type, key) {
            if (this.filterData.settings.length == 0) {
                return false;
            } else {
                return (this.filterData.settings[type][key] == 'off')
            }
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
            }).then(function (response) {
                console.log(response);
                window.plugins.socialsharing.share(self.$t('share.product.msg'), pname, pimage, self.$t('share.product.url') + response.data.data.keyword)
            });
        },
        onChipDelete() {
            let self = this;
            self.$f7.preloader.show();
            let chip = self.Dom7(this).parents('.chip');
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
            let self = this;
            self.$f7.preloader.show();
            axios({
                method: "POST",
                url: api.baseUrl + api.urls.wishlist.replace("{id}", product_id),
                headers: api.headers(localStorage.getItem('session_id')),
            }).then(function (response) {
                if (response.status == 200) {
                    store.dispatch("fetchWishlist");
                }
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
            }).then(function (response) {
                if (response.status == 200) {
                    store.dispatch("fetchWishlist");
                }
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
            return "https://mercatovip.com/app/" + name;
        },
        update() {
            this.products = [];
            page = 0;
            this.onInfinite(true);
        },

        onInfinite: function (onFilter = false) {
            var self = this;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                var productsHeaders = api.headers(localStorage.getItem('session_id'));
                productsHeaders['X-Oc-Image-Dimension'] = "227x237";
                self.loading = true;
                self.noResult = false;
                axios({
                    method: "GET",
                    url: api.base + '/index.php?route=feed/rest_api/products&tag=' + self.tag_name + '&limit=' + limit + '&page=' + (++page),
                    headers: productsHeaders,
                    transformResponse: function (req) {
                        return JSON.parse(req.replace(/[\n\r]/g, ' '))
                    },
                }).then(function (response) {
                    console.log(response);
                    if (response.status == 200 && response.data.data.length == 0) {
                        self.$f7.infiniteScroll.destroy();
                        self.Dom7('.infinite-scroll-preloader').remove();
                        self.loading = false;
                        self.$f7.preloader.hide();
                        self.noResult = true;
                    }
                    if (response.status !== 202 && response.data.data && response.data.data.length > 0) {
                        if (page <= 1) {
                            self.virtualList.replaceAllItems(response.data.data);
                        } else {
                            if (response.data.data.length > 0) {
                                self.virtualList.appendItems(response.data.data);
                            }
                        }
                        self.$f7.preloader.hide();
                        self.loading = false;
                        return;
                    }
                }).catch(function (error) {
                    self.$f7.preloader.hide();
                    self.$f7.infiniteScroll.destroy();
                    self.Dom7('.infinite-scroll-preloader').remove();
                    self.categoryProducts = [];
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
