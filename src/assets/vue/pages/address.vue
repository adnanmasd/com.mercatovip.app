<template>
<f7-page name="addresses">
    <f7-navbar :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left sliding>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title sliding>
            {{$t('address.title')}}
        </f7-nav-title>
        <f7-nav-right sliding>
            <f7-link icon-if-ios="f7:add_round"  icon-if-md="material:add_circle"  icon-only  href="/address_new"></f7-link>
        </f7-nav-right>
    </f7-navbar>

    <f7-block>
        {{$t('address.msg')}}
        <h3 v-if="address.length <= 0">
            {{$t('address.emptylist.msg')}}
        </h3>
    </f7-block>
    <f7-list media-list v-if="address.length > 0">
        <f7-list-item v-for="row in address" :title="row.firstname + ' ' + row.lastname" :subtitle="row.address_1" :text="row.city + ', ' + row.country">
            <span slot="after">
                <!--template v-if="row.address_id == default_address">
                    <i class="fa fa-check text-color-green"></i>
                </template>
                <template v-else>
                    <f7-link @click="makeDefualt(row.address_id)">{{$t('address.setDeafult.txt')}}</f7-link>
                </template-->
            </span>
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
            address: [],
            default_address : ""
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
    mounted() {
        let self = this;
        self.$f7.preloader.show();

        axios({
            method: "GET",
            url: api.baseUrl + api.urls.listAddress,
            headers: api.headers(sessionStorage.getItem('session_id')),
        }).then(function (response) {
            if (response.status !== 202 && response.data.data.addresses.length > 0) {
                self.address = response.data.data.addresses
            } 
            self.$f7.preloader.hide();
        }).catch(function (error) {
            self.$f7.preloader.hide();
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

        let user = JSON.parse(localStorage.getItem('user'))
        self.default_address = user.address_id
    },
    methods: {
        makeDefault(address_id){


        }
    },
}
</script>
