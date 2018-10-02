<template>
    <f7-swiper-slide v-if="loaded == false">
    <f7-card class="animated-background">
        <div class="background-masker header-top"></div>
        <div class="background-masker header-left"></div>
        <div class="background-masker header-right"></div>
        <div class="background-masker header-bottom"></div>
        <div class="background-masker content-top"></div>
    </f7-card>
    </f7-swiper-slide>
    <f7-swiper-slide v-else-if="loaded == true && is_p == true">
    <f7-card>
        <f7-card-header>
            <div @click='navigate("/product?product_id=" + p.product_id)'><img :src="p.image" class="product-card-image"><span v-if="p.special" class="tag left-tag">{{getDiscount(p.special,p.price)}}%</span><span v-if="is_new(p.date_added)" class="tag right-tag">NEW</span></div>
        </f7-card-header>
        <f7-card-content>
            <div @click='navigate("/product?product_id=" + p.product_id)' class="color-black">
               <br/> <span v-if="p.special" class="price">{{p.special_formated}}</span> <span v-if="!p.special" class="price">{{p.price_formated}}</span>
            </div>
        </f7-card-content>
    </f7-card>
    </f7-swiper-slide>
    
</template>

<script>
import axios from "axios";
import store from "src/assets/vuex/store.js";
import cms_config from "cms.js";
import api from "api.js";

export default {
    name: 'product-card',
    props: {
        product_id: {
            type: [String, Number],
            required: true
        }
    },
    data() {
        return {
            p: [],
            is_p : false,
            loaded: false
        }
    },
    mounted() {
        var self = this;
        var headers = api.headers(sessionStorage.getItem('session_id'));
        headers['X-Oc-Image-Dimension'] = "227x237";
        axios({
            method: "GET",
            url: api.baseUrl + api.urls.getProductById.replace("{id}", this.product_id),
            headers: headers,
            transformResponse: function (req) {
                var newReq = req.replace(/[\r\n|\n\r]/g, '');
                return JSON.parse(newReq)
            }
        }).then(function (response) {
            if (response.data.data != []){
                self.p = response.data.data
                self.loaded = true;
                self.is_p = true;
            }
        }).catch(function(error) {
            self.loaded=true;
            self.p = [];
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
