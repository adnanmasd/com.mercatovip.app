<template>
<div v-if="loaded == false" class='text-align-center'>
    <f7-preloader></f7-preloader>
</div>
<f7-swiper v-else :params="{preloadImages: false,slidesPerView: 2.3, spaceBetween:1,loop: false,freeMode: true,observer: true,
    lazy: {loadPrevNext: true,loadPrevNextAmount: 3}}">
    <f7-swiper-slide v-for="p in products">
        <f7-card>
            <f7-card-header>
                <div @click='navigate("/product?product_id=" + p.id)'><img :src="p.image" class="product-card-image"><span v-if="p.special" class="tag left-tag">{{getDiscount(p.special,p.price)}}%</span><span v-if="is_new(p.date_added)" class="tag right-tag">NEW</span></div>
            </f7-card-header>
            <f7-card-content>
                <div @click='navigate("/product?product_id=" + p.id)' class="color-black">
                   <br/> <span v-if="p.special" class="price">{{p.special_formated}}</span> <span v-if="!p.special" class="price">{{p.price_formated}}</span>
                </div>
            </f7-card-content>
        </f7-card>
        <div class="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
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
        var cat = this.category_id;
        var self = this;
        var headers = api.headers(localStorage.getItem('session_id'));
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
            if (response.data.data != [] && self.loaded == false){ 
                self.products = response.data.data
            }
            self.loaded = true;
        });
    },
    methods: {
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
