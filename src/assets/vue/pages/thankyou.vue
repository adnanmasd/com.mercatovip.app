

<template>

<f7-page name="thankyou" no-tabbar>
    <f7-navbar sliding :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left sliding>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title sliding>
            {{$t('thankyou.title')}}
        </f7-nav-title>
        <f7-nav-right sliding>
            <f7-link icon-only>
            </f7-link>
        </f7-nav-right>
    </f7-navbar>

    <f7-block>
        <h3>Order # {{order_id}}</h3> {{$t('thankyou.para')}}
    </f7-block>
    <f7-block>
        <f7-button big raised fill color="green" href="/">{{$t('thankyou.orders')}}</f7-button>
    </f7-block>

</f7-page>

</template>

<script>

import store from '../../vuex/store.js'
import api from 'api.js'
import axios from 'axios'

let self;
export default {
    data() {
            return {
                currentLanguageId: (localStorage.getItem('language_id')),
                currentLanguage: (localStorage.getItem('language_id') == 1 ? false : true),
                direction: (localStorage.getItem('language_id') == 1 ? "ltr" : "rtl"),
                order_id: ""
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
            self.order_id = self.$f7route.query.order_id
            self.$f7.preloader.show();
            axios({
                method: "PUT",
                url: api.baseUrl + api.urls.confirmOrder,
                headers: api.headers(sessionStorage.getItem('session_id'))
            }).then(function(response) {
                console.log(resposne);
                var t = self.$f7.toast.create({
                    text: self.$t('confirm.success.msg'),
                    title: self.$t('confirm.success.title'),
                    closeTimeout: 5000,
                    destroyOnClose: true,
                    position: 'top',
                    cssClass : 'toast-green'
                })
                t.open();
                navigator.vibrate(100)
                self.order_id = response.data.data.order_id
                store.dispatch("fetchCart");
                self.$f7.preloader.hide();
            }).catch(function(error) {
                self.$f7.toast.create({
                    text: error.response,
                    closeTimeout: 5000,
                    destroyOnClose: true,
                    position: 'top',
                    cssClass : 'toast-red'
                });
                t.open();
                navigator.vibrate([80,80,80])
                self.$f7.preloader.hide();
            })
        },
}

</script>
