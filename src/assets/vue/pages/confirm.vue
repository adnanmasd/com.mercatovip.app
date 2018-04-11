

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

    <f7-toolbar bottom-md v-if="!creditCardPayment">
        <f7-button style="width:100%" big raised fill class="bg-green" @click="pay()">{{$t('confirm.pay')}}</f7-button>
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
                creditCardPayment: this.$f7route.query.payment == 'gate2play',
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
                headers: api.headers
            }).then(function(response) {
                self.order = response.data.data
                console.log(self.order);
                self.$f7.preloader.hide();
            }).catch(function(error) {
                var t = self.$f7.toast.create({
                    text: error.response.data.error,
                    closeTimeout: 5000,
                    destroyOnClose: true
                });
                t.open();
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
                    self.$f7router.reloadPage("/thankyou");
                },
                getProductInfo(quantity, price_per_item, total, options) {
                    return total + "<br/> " + this.$t('confirm.product.quantity.title') + quantity
                },
        }

}

</script>
