

<template>

<f7-page name="product" no-tabbar>
    <f7-navbar sliding :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title>
            {{product.name | andFilter}}
        </f7-nav-title>
        <f7-nav-right>
            <f7-link icon-only @click="shareProduct(product.name,product.image,product.id)" icon-if-ios="f7:share" icon-if-md="material:share">
            </f7-link>
        </f7-nav-right>
    </f7-navbar>

    <f7-popup id="description" style="overflow-y:auto">
        <f7-navbar sliding :class="this.$theme.md ? 'color-black' : ''">
            <f7-nav-left>
                <f7-link popup-close icon-only>
                    <f7-icon icon="fa fa-times"></f7-icon>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title>
                {{$t('product.description.title')}}
            </f7-nav-title>
            <f7-nav-right>
                <f7-link icon-only>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-block v-html="product.description">
        </f7-block>
    </f7-popup>

    <f7-popup id="specification" style="overflow-y:auto">
        <f7-navbar sliding :class="this.$theme.md ? 'color-black' : ''">
            <f7-nav-left>
                <f7-link popup-close icon-only>
                    <f7-icon icon="fa fa-times"></f7-icon>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title>
                {{$t('product.specification.title')}}
            </f7-nav-title>
            <f7-nav-right>
                <f7-link icon-only>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-block>
            <div class="data-table card data-table-init">
                <table>
                    <thead>
                        <tr>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="label-cell">{{$t('product.specification.brand')}}</td>
                            <td class="numeric-cell">{{product.manufacturer}}</td>
                        </tr>
                        <tr v-for="(row,key,index) in attributes">
                            <td class="label-cell">{{row.name | andFilter}}</td>
                            <td class="numeric-cell">{{row.text | andFilter}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </f7-block>
    </f7-popup>


    <f7-popup id="reviews" v-if="reviews > 0">
        <f7-navbar sliding :class="this.$theme.md ? 'color-black' : ''">
            <f7-nav-left>
                <f7-link popup-close icon-only>
                    <f7-icon icon="fa fa-times"></f7-icon>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title>
                {{$t('product.reviews.title')}}
            </f7-nav-title>
            <f7-nav-right>
                <f7-link icon-only>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-block>
            <div class="card" v-for="row in product.reviews.reviews">
                <div class="card-header">
                    <f7-row style="width: 100%">
                        <f7-col><strong class="color-blue">{{row.author}}</strong></f7-col>
                        <f7-col>
                            <div class='rating'>
                                <f7-icon v-if="row.rating > 0" v-for="n in row.rating" f7="star_fill" class="md-14 orange"></f7-icon>
                                <f7-icon v-for="n in Math.ceil(5-row.rating)" f7="star" class="md-14"></f7-icon>
                            </div>
                        </f7-col>
                    </f7-row>
                </div>
                <div class="card-content">
                    <div class="card-content-inner" v-html="row.text"></div>
                </div>
                <div class="card-footer">
                    {{(row.date_added)}}
                </div>
            </div>
        </f7-block>
    </f7-popup>

    <div class="swiper-container" id="mainImageSlider">
        <div class="swiper-wrapper" v-if="imgs.length == 0">
            <div class="swiper-slide" v-for="num in 1,2">
                <f7-card class="animated-background product">
                    <div class="background-masker-product header-top"></div>
                    <div class="background-masker-product header-left"></div>
                    <div class="background-masker-product header-right"></div>
                    <div class="background-masker-product header-bottom"></div>
                    <!-- <div class="background-masker content-top"></div> -->
                </f7-card>
            </div>
        </div>
        <div class="swiper-wrapper" v-else>
            <div class="swiper-slide welcome-slider" v-for="row in imgs" :key="row.id">
                <img class="main-image" @click="openPhotoBrowser" :src="row" />
                <span v-if="product.special" class="tag left-tag">{{getDiscount(product.special,product.price)}}%</span>
                <span v-if="is_new(product.date_added)" class="tag right-tag">NEW</span>
                <span v-if="!product.quantity" class="tag out-of-stock-tag">{{product.stock_status}}</span>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>

    <img v-if="!product.seller" src="static/img/mercato-tag.png" class="pull-right" />
    <template v-if="loading">
        <div class="animated-background product-name">
            <div class="background-masker-product-name header-top"></div>
            <div class="background-masker-product-name header-left"></div>
            <div class="background-masker-product-name header-right"></div>
            <div class="background-masker-product-name header-bottom"></div>
            <div class="background-masker-product-name content-top"></div>
            <div class="background-masker-product-name content-top2"></div>
        </div>
    </template>
    <template v-else>
        <f7-block-title>{{$t('product.ean.title')}} : {{product.ean}} </f7-block-title>
        <f7-block>
            <f7-row>
                <f7-col width="90">
                    <strong class="product-name">{{product.name | andFilter}}</strong>
                    <br/>
                    <small>{{product.model}}</small>
                </f7-col>
                <f7-col width="10">
                    <f7-link @click="addToWishlist(product.id)" v-if="!is_favourite()" icon-if-ios="f7:heart" icon-if-md="material:favorite_border">
                    </f7-link>
                    <f7-link @click="removeFromWishlist(product.id)" v-else-if="is_favourite()" icon-if-ios="f7:heart_fill" icon-if-md="material:favorite" icon-color="red">
                    </f7-link>
                </f7-col>
            </f7-row>
        </f7-block>
    </template>
    <f7-block>
        <f7-row>
            <f7-col width="70">
                <div class="price-product-page">
                    <span v-if="product.special" class="old-price">{{product.price_formated}}<br/></span>
                    <span v-if="product.special" class="price">{{product.special_formated}}</span>
                    <span v-if="!product.special" class="price">{{product.price_formated}}</span>
                </div>
            </f7-col>
            <f7-col width="30">
                <div class='rating'>
                    <f7-icon v-if="product.rating > 0" v-for="n in product.rating" f7="star_fill" class="md-14 orange"></f7-icon>
                    <f7-icon v-for="n in remainingRating" f7="star" class="md-14"></f7-icon>
                </div>
                <span class="review-number">{{reviews}} {{$t('product.reviews.title')}}</span>
            </f7-col>
        </f7-row>
    </f7-block>

    <f7-block>
        <f7-list form id="option">
            <template v-for="row,id in product.options">
                <f7-list-item :class="row.required ? 'required' : ''" v-if="row.type == 'radio' || row.type == 'checkbox' || row.type == 'select'" :title="row.name" group-title></f7-list-item>
                <f7-list-item v-if="row.type == 'select'" :name="row.product_option_id" v-for="o in row.option_value" :required="row.required? 'required' : ''" radio :title="(o.name) + (o.price ? ' (' + o.price_prefix + o.price_formated + ')' : '')" :disabled="o.quantity == 0"
                :value="o.product_option_value_id"></f7-list-item>
                <f7-list-item v-if="row.type == 'radio'" :name="row.product_option_id" v-for="o in row.option_value" :required="row.required? 'required' : ''" radio :title="(o.name) + (o.price ? ' (' + o.price_prefix + o.price_formated + ')' : '')" :disabled="o.quantity == 0"
                :value="o.product_option_value_id"></f7-list-item>
                <f7-list-item v-if="row.type == 'checkbox'" :name="row.product_option_id" v-for="o in row.option_value" :required="row.required?'required' : ''" checkbox :title="(o.name) + (o.price ? ' (' + o.price_prefix + o.price_formated + ')' : '')" :disabled="o.quantity == 0"
                :value="o.product_option_value_id"></f7-list-item>

                <f7-list-item v-else-if="row.type == 'text' || row.type == 'textarea' ||  row.type == 'date' ||  row.type == 'datetime'">
                    <f7-label>{{row.name}}</f7-label>
                    <f7-input :name="row.product_option_id" :type="row.type" :placeholder="row.name" :required="row.required ? 'required' : ''"></f7-input>
                </f7-list-item>
                <f7-list-item v-else-if="row.type == 'file'">
                    <f7-label>{{row.name}}</f7-label>
                    <f7-input :name="row.product_option_id" :type="row.type" :required="row.required? 'required' : ''"></f7-input>
                </f7-list-item>
            </template>
        </f7-list>
    </f7-block>
    <f7-list form>
        <f7-list-item>
            <f7-row class="full-width">
                <f7-col width="50" class="text-align-center auto-margin">
                    {{$t('product.quantity.title')}}
                </f7-col>
                <f7-col width="50" style="text-align:center">
                    <div class="stepper stepper-init stepper-big stepper-round stepper-fill color-black">
                        <div class="stepper-button-minus"></div>
                        <div class="stepper-input-wrap full-width text-align-center">
                            <input type="text" value="1" min="1" :max="product.quantity" step="1" readonly>
                        </div>
                        <div class="stepper-button-plus"></div>
                    </div>
                </f7-col>
            </f7-row>
        </f7-list-item>
    </f7-list>

    <f7-block>
        <f7-button :disabled="product.quantity == 0" @click="addToCart()" big raised fill color="green">{{$t('product.addtoCart')}}</f7-button>
        <!--f7-button v-if="added_to_cart" @click="removeFromCart()" big raised class="bg-red" color="white">REMOVE FROM CART</f7-button-->
    </f7-block>

    <f7-card>
        <f7-card-header>{{$t('product.soldBy')}}</f7-card-header>
        <f7-card-content> <strong>MercatoVIP-Shop</strong>
            <br/>
            <!--f7-icon material="thumb_up" class="md-16 green"></f7-icon> 95% positive rating<-->
        </f7-card-content>
    </f7-card>

    <f7-card>
        <f7-card-content>
            <f7-list media-list>
                <f7-list-item class="product-desc" link="#" popup-open="#description" :title="$t('product.description.title')" :text="product.meta_description">
                    <div slot="inner">
                        <f7-link popup-open="#description" class="read-more pull-right">{{$t('product.readmore')}}</f7-link>
                    </div>
                </f7-list-item>
                <f7-list-item :title="$t('product.specification.title')" class="product-desc" link="#" popup-open="#specification" :text="$t('product.specification.brand')+' : '+product.manufacturer">
                    <div slot="inner">
                        <f7-link popup-open="#specification" class="read-more pull-right">{{$t('product.readmore')}}</f7-link>
                    </div>
                </f7-list-item>
            </f7-list>
        </f7-card-content>
    </f7-card>

    <f7-block-title><span class="heading-review">{{$t('product.reviews.title')}}</span><span class="pull-right"><f7-link  v-if="reviews > 0" class="read-more" popup-open="#reviews">{{$t('product.seeAll')}}</f7-link></span></f7-block-title>
    <f7-block>
        <f7-swiper v-if="reviews > 0" class="review-swiper" :params="{slidesPerView:1, spaceBetween: 20,freeMode: true}">
            <f7-swiper-slide v-for="row in product.reviews.reviews" v-if="row.rating >= 3">
                <div class="card">
                    <div class="card-header">
                        <f7-row style="width: 100%">
                            <f7-col><strong class="color-blue">{{row.author}}</strong></f7-col>
                            <f7-col>
                                <div class='rating'>
                                    <f7-icon v-if="row.rating > 0" v-for="n in row.rating" f7="star_fill" class="md-14 orange"></f7-icon>
                                    <f7-icon v-for="n in Math.ceil(5-row.rating)" f7="star" class="md-14"></f7-icon>
                                </div>
                            </f7-col>
                        </f7-row>
                    </div>
                    <div class="card-content">
                        <div class="card-content-inner" v-html="row.text"></div>
                    </div>
                    <div class="card-footer">{{(row.date_added)}}</div>
                </div>
            </f7-swiper-slide>
        </f7-swiper>
    </f7-block>

    <f7-card>
        <f7-link :href="'/review?product_id=' + product.id">
            <f7-card-content>
                <f7-icon if-ios="f7:compose" if-md="material:mode_comment"></f7-icon> {{$t('product.review.write')}}
            </f7-card-content>
        </f7-link>
    </f7-card>
</f7-page>

</template>

<script>

import api from 'api.js'
import axios from 'axios'
import store from '../../vuex/store.js'

import Swiper from 'framework7/dist/components/swiper/swiper-class/swiper.js'


let self;

export default {
    data() {
            return {
                currentLanguageId: (localStorage.getItem('language_id')),
                currentLanguage: (localStorage.getItem('language_id') == 1 ? false : true),
                direction: (localStorage.getItem('language_id') == 1 ? "ltr" : "rtl"),
                loading: true,
                product: [],
                images: [],
                imgs: [],
                attributes: [],
                reviews: 0,
                quantity: 1,
                remainingRating: 5,
                quantitiesAvailable: [],
                cart_item: {
                    "product_id": "",
                    "quantity": "",
                    "option": {}
                }
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
        async mounted() {
            self = this;
            self.$f7.preloader.show();
            let product_id = this.$f7route.query.product_id
            var productHeaders = api.headers(sessionStorage.getItem('session_id'));
            productHeaders['X-Oc-Image-Dimension'] = "760x800";
            await axios({
                method: "GET",
                url: api.baseUrl + api.urls.getProductById.replace('{id}', product_id),
                headers: productHeaders,
                transformResponse: function(req) {
                    var newReq = req.replace(/[\r\n|\n\r]/g, '');
                    return JSON.parse(newReq)
                }
            }).then(function(response) {
                if (response.status !== 202 && response.data.data) {
                    self.product = response.data.data;

                    self.images.push(self.product.original_image);
                    for (let i = 0; i < self.product.original_images.length; i++)
                        self.images.push(self.product.original_images[i]);

                    self.imgs.push(self.product.image);
                    for (let i = 0; i < self.product.images.length; i++)
                        self.imgs.push(self.product.images[i]);

                    for (let i = 0; i < self.product.attribute_groups.length; i++) {
                        for (let j in self.product.attribute_groups[i].attribute) {
                            self.attributes.push(self.product.attribute_groups[i].attribute[j]);
                        }
                    }
                    self.reviews = self.product.reviews.review_total
                    self.remainingRating = 5 - self.product.rating
                    self.original_price = self.product.price_formated
                    self.original_special = self.product.special_formated
                    self.product_price = self.product.price_formated

                    if (self.product.options.length > 0) {
                        for (var o in self.product.options) {
                            for (var j in self.product.options[o].option_value) {
                                if (self.product.options[o].option_value[j].subtract == true) {
                                    self.quantitiesAvailable[self.product.options[o].option_value[j].product_option_value_id] = self.product.options[o].option_value[j].quantity
                                }
                            }
                        }
                    } else {
                        self.quantitiesAvailable[0] = self.product.quantity
                    }
                }
                self.loading = false;
                self.$f7.preloader.hide();
            });
            var swiper2 = new Swiper('#mainImageSlider', {
                init: true,
                slidesPerView: 1,
                loop: false,
                spaceBetween: 10
            });
        },
        methods: {
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
                is_favourite() {
                    let wishlist = store.state.user ? store.state.user.wishlist : []
                    for (let j in wishlist) {
                        if (wishlist[j].product_id == this.product.id)
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
                /*remainingRating(rating) {
                    return 5 - rating;
                },*/
                getImagefromSource(src) {
                    return "<img src='" + src + "'/>";
                },
                openPhotoBrowser: function(key) {
                    console.log(key);
                    var myPhotoBrowser = self.$f7.photoBrowser.create({
                        zoom: true,
                        type: 'popup',
                        exposition: false,
                        theme: 'light',
                        lazyLoading: true,
                        backLinkText: "",
                        navbarOfText: "/",
                        photos: this.images
                    });
                    myPhotoBrowser.open();
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
                        navigator.vibrate([80,80,80]);
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
                addToCart() {
                    var self = this;
                    self.$f7.preloader.show();
                    var quantity = self.$f7.stepper.get('.stepper')
                    self.cart_item.product_id = self.product.id;
                    self.cart_item.quantity = quantity.value;
                    self.cart_item.option = self.$f7.form.convertToData('#option');
                    if (self.quantitiesAvailable.length == 1) {
                        if (quantity.value > self.quantitiesAvailable[0]) {
                            var t = self.$f7.toast.create({
                                text: self.$t('product.addToCart.notavailable.msg'),
                                closeTimeout: 5000,
                                destroyOnClose: true,
                                cssClass: 'toast-red',
                                position: 'top'
                            });
                            t.open();
                            navigator.vibrate([80,80,80])
                            self.$f7.preloader.hide();
                            return;
                        }
                    } else {
                        for (var o in self.cart_item.option) {
                            if (quantity.value > self.quantitiesAvailable[self.cart_item.option[o]]) {
                                  var t = self.$f7.toast.create({
                                    text: self.$t('product.addToCart.notavailable.msg'),
                                    closeTimeout: 5000,
                                    destroyOnClose: true,
                                    cssClass: 'toast-red',
                                    position: 'top'
                                });
                                t.open();
                                navigator.vibrate([80,80,80]);
                                self.$f7.preloader.hide();
                                return;
                            }
                        }
                    }
                    axios({
                        method: "POST",
                        url: api.baseUrl + api.urls.cart,
                        headers: api.headers(sessionStorage.getItem('session_id')),
                        data: self.cart_item
                    }).then(function(response) {
                        if (response.status == 200) {
                            store.dispatch("fetchCart").then(() => {
                                var t = self.$f7.toast.create({
                                    text: self.$t('product.addTocart.success'),
                                    closeTimeout: 5000,
                                    destroyOnClose: true,
                                    //icon: '<i class="fa fa-shopping-cart-plus text-color-white"></i>',
                                    cssClass: 'toast-green',
                                    position: 'top'
                                });
                                t.open();
                                navigator.vibrate(100)
                            });
                            // self.$f7.toolbar.show(self.Dom7('#mainToolbar'), true);
                            // setTimeout(function() {
                            //     self.$f7.toolbar.hide(self.Dom7('#mainToolbar'), true);
                            // }, 3000)
                            self.$f7.preloader.hide();
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
                        self.$f7.preloader.hide();
                    });
                },
        }
}

</script>
