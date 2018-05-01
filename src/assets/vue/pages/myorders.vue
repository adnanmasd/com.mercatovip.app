

<template>

<f7-page name="myorders" infinite-scroll @infinite="onInfinite">
    <f7-navbar :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left sliding>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title sliding>
            {{$t('myorders.title')}}
        </f7-nav-title>
        <f7-nav-right sliding>
            <f7-link></f7-link>
        </f7-nav-right>
    </f7-navbar>

    <f7-block>
        {{$t('myorders.msg')}}
        <h3 v-if="orders.length <= 0">
            {{$t('myorders.emptylist.msg')}}
        </h3>
    </f7-block>
    <f7-list media-list v-if="orders.length > 0">
        <f7-list-item v-for="row in orders" :link="'/myorders/'+row.order_id" :title="$t('myorders.order.number') + row.order_id" :subtitle="row.status" :text="row.date_added" :after="row.total">
        </f7-list-item>
    </f7-list>

</f7-page>

</template>

<script>

import axios from 'axios'
import api from 'api.js'
import cms from 'cms.js'
import store from '../../vuex/store.js'

var timeout;
var page = 0;
var limit = 10;

export default {
    data() {
            return {
                currentLanguageId: (localStorage.getItem('language_id')),
                currentLanguage: (localStorage.getItem('language_id') == 1 ? false : true),
                direction: (localStorage.getItem('language_id') == 1 ? "ltr" : "rtl"),
                orders: []
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
            self.onInfinite();
            page = 0;
            /*page = 1;
            axios({
                method: "GET",
                url: api.baseUrl + api.urls.getOrderList.replace("{page}", ++page).replace("{limit}",limit),
                headers: api.headers
            }).then(function(response) {
                self.orders = response.data.data;
                window.f7.hidePreloader();
            }).catch(function(error){
              window.f7.alert(error.response.data.error,"Failed");
              localStorage.removeItem("user");
              window.f7.hidePreloader();
              window.f7.mainView.router.url("/login");
            });*/
        },
        methods: {
            onInfinite: function(event) {
                var self = this;
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    axios({
                        method: "GET",
                        url: api.baseUrl + api.urls.getOrderList.replace("{page}", ++page).replace("{limit}", limit),
                        headers: api.headers,
                    }).then(function(response) {
                        if (response.status !== 202 && response.data.data.length > 0) {
                            if (self.orders.length == 0)
                                self.orders = response.data.data
                            else {
                                for (var i = 0; i < response.data.data.length; i++) {
                                    self.orders.push(response.data.data[i])
                                }
                            }
                        } else if (response.status === 200 && response.data.data.length == 0) {
                            self.$f7.infiniteScroll.destroy();
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
                }, 500);
            }
        },
}

</script>
