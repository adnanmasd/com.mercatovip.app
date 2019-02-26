

<template>

<f7-page :name="'myorders'+order.order_id" no-tabbar>
    <f7-navbar sliding :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title>
            {{$t('order.order.number')}} {{order.order_id}}
        </f7-nav-title>
        <f7-nav-right>
            <f7-link icon-only>

            </f7-link>
        </f7-nav-right>
    </f7-navbar>

    <f7-card>
        <f7-card-content>
            <f7-list>
                <f7-list-item group-title>{{$t('order.order.info')}}</f7-list-item>
                <f7-list-item :title="$t('order.order.title')">{{order.order_id}}</f7-list-item>
                <f7-list-item :title="$t('order.order.date')">{{order.date_added}}</f7-list-item>
                <f7-list-item :title="$t('order.order.status')">{{order_statuses[order.order_status_id]}}</f7-list-item>
                <f7-list-item :title="$t('order.order.payment')">{{order.payment_method}}</f7-list-item>
                <f7-list-item :title="$t('order.order.delivery')">{{order.shipping_method}}</f7-list-item>

                <f7-list-item group-title>{{$t('order.customer.info')}}</f7-list-item>
                <f7-list-item :title="$t('order.customer.first')">{{order.firstname}}</f7-list-item>
                <f7-list-item :title="$t('order.customer.last')">{{order.lastname}}</f7-list-item>
                <f7-list-item :title="$t('order.customer.contact')">{{order.telephone}}</f7-list-item>
                <f7-list-item :title="$t('order.customer.email')">{{order.email}}</f7-list-item>

                <f7-list-item group-title>{{$t('order.shipped.info')}}</f7-list-item>
                <f7-list-item v-html="order.shipping_address" style="padding: 10px"></f7-list-item>
            </f7-list>
            <br/>
            <f7-list media-list>
                <f7-list-item group-title>{{$t('order.products.info')}}</f7-list-item>
                <f7-list-item v-for="row in order.products" :title="row.name" :after="row.total" :text="$t('order.products.quantity') + row.quantity" :subtitle="row.model">{{order.shipment}}</f7-list-item>
            </f7-list>
            <br/>
            <f7-list>
                <f7-list-item group-title>{{$t('order.total.info')}}</f7-list-item>
                <f7-list-item v-for="row in order.totals" :title="row.title" :after="formatPrice(row.value,order.currency_code)">{{order.shipment}}</f7-list-item>

                <f7-list-item v-if="order.comment !== ''" group-title>{{$t('order.comment.info')}}</f7-list-item>
                <f7-list-item v-if="order.comment !== ''" v-html="order.comment"></f7-list-item>

                <f7-list-item group-title>{{$t('order.history')}}</f7-list-item>

                <div class="timeline">
                    <!-- Timeline item with multiple events per day  -->
                    <template v-for="row in order.histories">
                        <div class="timeline-item">
                            <div class="timeline-item-date">{{row.date_added.split('-')[0]}} <small>{{row.date_added.split('-')[1]}}</small></div>
                            <div class="timeline-item-divider"></div>
                            <div class="timeline-item-content">
                                <div class="timeline-item-title">{{row.status}}</div>
                                <div class="timeline-item-subtitle" v-html="row.comment"></div>
                            </div>
                        </div>
                    </template>
                </div>

                <!--f7-timeline>
                    <f7-timeline-item v-for="" :day="row.date_added.split('-')[0]" :month="row.date_added.split('-')[1]" inner :title="row.status" :text=""></f7-timeline-item>
                </f7-timeline-->
            </f7-list>
        </f7-card-content>
    </f7-card>

</f7-page>

</template>

<script>

import api from 'api.js'
import axios from 'axios'
import store from '../../vuex/store.js'

let self;

export default {
    data() {
            return {
                currentLanguageId: (localStorage.getItem('language_id')),
                currentLanguage: (localStorage.getItem('language_id') == 1 ? false : true),
                direction: (localStorage.getItem('language_id') == 1 ? "ltr" : "rtl"),
                order: [],
                order_statuses: []
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
            self = this;
            self.$f7.preloader.show();
            let order_id = this.$f7route.params.order_id

            axios({
                method: "GET",
                url: api.baseUrl + api.urls.getorderById.replace('{id}', order_id),
                headers: api.headers(localStorage.getItem('session_id')),
                transformResponse: function(req) {
                    var newReq = req.replace(/[\r\n|\n\r]/g, '');
                    return JSON.parse(newReq)
                }
            }).then(function(response) {
                self.order = response.data.data
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
                localStorage.removeItem("user");
                self.$f7.preloader.hide();
                self.$f7router.load("/login");
            });

            axios({
                method: "GET",
                url: api.baseUrl + api.urls.getAllOrderStatuses,
                headers: api.headers(localStorage.getItem('session_id')),
            }).then(function(response) {
                for (let j in response.data.data) {
                    self.order_statuses[response.data.data[j].order_status_id] = response.data.data[j].name
                }
                self.$f7.preloader.hide();

            }).catch (function(error){
            self.$f7.preloader.hide();
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
        },
        methods: {
            formatPrice(value, currency) {
                return parseFloat(value).toFixed(2) + ' ' + currency
            }
        }
}

</script>
