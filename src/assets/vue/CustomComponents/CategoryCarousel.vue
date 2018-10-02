<template>
<f7-swiper :params="{slidesPerView: 2.3, spaceBetween:1,loop: false,freeMode: true,observer: true}">
    <f7-swiper-slide v-if="loaded == false" v-for="row in 1,4">
        <f7-card class="animated-background">
            <div class="background-masker header-top"></div>
            <div class="background-masker header-left"></div>
            <div class="background-masker header-right"></div>
            <div class="background-masker header-bottom"></div>
            <div class="background-masker content-top"></div>
        </f7-card>
    </f7-swiper-slide>
    <f7-swiper-slide v-else v-for="p in products">
        <f7-card>
            <f7-card-header>
                <div @click='navigate("/product?product_id=" + p.id)'><img :src="p.image" class="product-card-image"><span v-if="p.special" class="tag left-tag">{{getDiscount(p.special,p.price)}}%</span><span v-if="is_new(p.date_added)" class="tag right-tag">NEW</span></div>
            </f7-card-header>
            <f7-card-content>
                <div @click='navigate("/product?product_id=" + p.id)' class="color-black">
                    <!-- <span class="product-cart-title">{{p.name | andFilter}}</span>
                                    <br/> <span v-if="p.special" class="old-price">{{p.price_formated}}</span> -->
                    <br/> <span v-if="p.special" class="price">{{p.special_formated}}</span> <span v-if="!p.special" class="price">{{p.price_formated}}</span>
                </div>
            </f7-card-content>
            <!-- <f7-card-footer>
                <f7-segmented style="width:100%" v-if="theme.ios">
                    <f7-button class="product-card-footer-button" color="white" @click="shareProduct(p.name,p.thumb,p.id)" icon-f7="share"></f7-button>
                    <template v-if="!is_favourite(p.id)">
                        <f7-button class="product-card-footer-button" color="white" @click="addToWishlist(p.id)" icon-f7="heart"></f7-button>
                    </template>
                    <template v-else-if="is_favourite(p.id)">
                        <f7-button class="product-card-footer-button" color="white" @click="removeFromWishlist(p.id)" icon-f7="heart_fill" icon-color="red"></f7-button>
                    </template>
                </f7-segmented>
                <f7-segmented style="width:100%" v-if="theme.md">
                    <f7-button class="product-card-footer-button" color="black" @click="shareProduct(p.name,p.thumb,p.id)" icon-material="share"></f7-button>
                    <template v-if="!is_favourite(p.id)">
                        <f7-button class="product-card-footer-button" color="black" @click="addToWishlist(p.id)" icon-material="favorite_border"></f7-button>
                    </template>
                    <template v-else-if="is_favourite(p.id)">
                        <f7-button class="product-card-footer-button" color="black" @click="removeFromWishlist(p.id)" icon-material="favorite" icon-color="red"></f7-button>
                    </template>
                </f7-segmented>
            </f7-card-footer> -->
        </f7-card>
    </f7-swiper-slide>
</f7-swiper>
</template>

<script>
import axios from "axios";
import store from "src/assets/vuex/store.js";
import cms_config from "cms.js";
import api from "api.js";

export default {
    name: 'category',
    props: {
        category_id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            products: [],
            loaded: false
        }
    },
    mounted() {
        var self = this;
        var headers = api.headers(sessionStorage.getItem('session_id'));
        headers['X-Oc-Image-Dimension'] = "227x237";
        axios({
            method: "GET",
            url: api.baseUrl + api.urls.getProductsByCategoryFilterPageLimit.replace("{id}", this.category_id).replace("{limit}", 15).replace("{page}", 1),
            headers: headers,
            transformResponse: function (req) {
                var newReq = req.replace(/[\r\n|\n\r]/g, '');
                return JSON.parse(newReq)
            }
        }).then(function (response) {
            if (response.data.data != [])
                self.products = response.data.data
            self.loaded = true;
        });
    },
    methods: {
        is_favourite(pid) {
            let wishlist = store.state.user ? store.state.user.wishlist : [];
            for (let j in wishlist) {
                if (wishlist[j].product_id == pid) return true;
            }
            return false;
        },
        addToWishlist(product_id) {
            self.$f7.preloader.show();
            axios({
                    method: "POST",
                    url: api.baseUrl + api.urls.wishlist.replace("{id}", product_id),
                    headers: api.headers(sessionStorage.getItem("session_id"))
                })
                .then(function (response) {
                    if (response.status == 200) {
                        store.dispatch("fetchWishlist");
                    }
                })
                .catch(function (error) {
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
            self.$f7.preloader.hide();
        },
        removeFromWishlist(product_id) {
            self.$f7.preloader.show();
            axios({
                    method: "DELETE",
                    url: api.baseUrl + api.urls.wishlist.replace("{id}", product_id),
                    headers: api.headers(sessionStorage.getItem("session_id"))
                })
                .then(function (response) {
                    if (response.status == 200) {
                        store.dispatch("fetchWishlist");
                    }
                })
                .catch(function (error) {
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
            self.$f7.preloader.hide();
        },
        is_new(date) {
            var d = Date.parse(date);
            var t = new Date();
            return Math.round((t - d) / (1000 * 60 * 60 * 24)) <= 30;
        },
        getDiscount(discount, price) {
            let val = 1 - discount / price;
            return Math.floor(val * 100);
        },
        navigate(link) {
            this.$f7router.navigate(link);
        }
    },
};
</script>
