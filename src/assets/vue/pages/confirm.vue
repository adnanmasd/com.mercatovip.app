

<template>

<f7-page name="confirm" no-tabbar>
    <f7-navbar sliding :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title>
            {{$t('confirm.title')}}
        </f7-nav-title>
        <f7-nav-right>
            <f7-link icon-only>
            </f7-link>
        </f7-nav-right>
    </f7-navbar>

    <f7-list media-list>
        <f7-list-item group-title :title="$t('confirm.items.title')"></f7-list-item>
        <f7-list-item :id="row.key" v-for="row in order.products" :title="row.name | andFilter">
            <div slot="inner" v-html="getProductInfo(row.quantity,row.price,row.total,row.option)"></div>
        </f7-list-item>
    </f7-list>

    <f7-block-title>{{$t('confirm.total.title')}}</f7-block-title>
    <f7-block>
        <f7-card v-for="row in order.totals">
            <f7-card-content>
                <f7-row>
                    <f7-col auto>{{row.title}}</f7-col>
                    <f7-col auto><span class="pull-right">{{row.text}}</span></f7-col>
                </f7-row>
            </f7-card-content>
        </f7-card>
    </f7-block>

    <f7-toolbar bottom-md>
        <f7-button style="width:100%" big raised fill color="green" @click="pay()">{{cashOnDelivery ? $t('confirm.place') : $t('confirm.pay')}}</f7-button>
    </f7-toolbar>
</f7-page>

</template>

<script>

import store from '../../vuex/store.js'
import api from 'api.js'
import payment from 'payment_api.js'
import axios from 'axios'

let self;
export default {
    data() {
            return {
                currentLanguageId: (localStorage.getItem('language_id')),
                currentLanguage: (localStorage.getItem('language_id') == 1 ? false : true),
                direction: (localStorage.getItem('language_id') == 1 ? "ltr" : "rtl"),
                order: [],
                cashOnDelivery: this.$f7route.query.payment == 'GOP_COD' || this.$f7route.query.payment == 'free_checkout',
                payment_brands: payment.brands.join(" "),
                postBack: "https://mercatovip.com/pay/confirm"
            }
        },
        computed: {
            cart: {
                get: function() {
                    return store.state.cart
                }
            },

        },
        mounted: function() {
            self = this;
            self.$f7.preloader.show();
            axios({
                method: "POST",
                url: api.baseUrl + api.urls.confirmOrder,
                headers: api.headers(sessionStorage.getItem('session_id'))
            }).then(function(response) {
                self.order = response.data.data
                console.log(self.order);
                self.$f7.preloader.hide();
            }).catch(function(error) {
                var t = self.$f7.toast.create({
                    text: error.response.data.error,
                    closeTimeout: 5000,
                    destroyOnClose: true,
                    postion: 'top',
                    cssClass: 'toast-red'
                });
                t.open();
                navigator.vibrate([80, 80, 80])
                self.$f7.preloader.hide();
                self.$f7router.back();
            });

        },
        filters: {
            andFilter(val) {
                if (val)
                    return val.replace(/&amp;/g, '&');
            }
        },
        methods: {
            pay() {
                    let self = this;
                    if (self.cashOnDelivery) {
                        self.$f7router.navigate("/thankyou?order_id="+self.order.order_id);
                    } else {
                        var payment_method = (self.$f7route.query.payment == 'payfort_fort') ? 'PAYFORT_FORT_PAYMENT_METHOD_CC' : 'PAYFORT_FORT_PAYMENT_METHOD_SADAD'
                        var pageContentUrl = api.payment_link + "&payment_method=" + payment_method + "&order_id=" + this.order.order_id;

                        var popup = window.open(pageContentUrl, "_blank", "hidden=no,location=yes,toolbar=yes,clearsessioncache=yes,clearcache=yes")
                        popup.addEventListener("loadstop", function(e) {
                            self.$f7.preloader.show();
                            console.log(e);
                            popup.show();
                            if (e.url.search('rest/payfort_fort/responseOnline') !== -1) {
                              console.log(e.url);
                              popup.close();
                              let query = self.$f7.utils.parseUrlQuery(e.url);
                              if (query.status == 14) {
                                //add order history
                                var t = self.$f7.toast.create({
                                  text: query.response_message,
                                  closeTimeout: 3000,
                                  destroyOnClose: true,
                                  position: 'top',
                                  cssClass: 'toast-green'
                                });
                                t.open();
                                navigator.vibrate([100]);
                                self.$f7router.navigate("/thankyou?order_id="+self.order.order_id);
                              } else {
                                //view the error
                                var t = self.$f7.toast.create({
                                  text: query.response_message + " (Status: " + query.status + ")",
                                  closeTimeout: 5000,
                                  destroyOnClose: true,
                                  position: 'top',
                                  cssClass: 'toast-red'
                                });
                                t.open();
                                navigator.vibrate([80, 80, 80]);
                              }
                            }
                            self.$f7.preloader.hide();
                        });
                    }
                },
                getProductInfo(quantity, price_per_item, total, options) {
                    return total + "<br/> " + this.$t('confirm.product.quantity.title') + quantity
                },
        }

}

</script>
