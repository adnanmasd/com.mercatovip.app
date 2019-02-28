<template>
<f7-page name="returns">
    <f7-navbar :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left sliding>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title sliding>
            {{$t('returns.title')}}
        </f7-nav-title>
        <f7-nav-right sliding>
            <f7-link></f7-link>
        </f7-nav-right>
    </f7-navbar>

    <f7-block>
        {{$t('returns.msg')}}
        <h3 v-if="returns.length <= 0">
            {{$t('returns.emptylist.msg')}}
        </h3>
    </f7-block>
    <f7-list media-list v-if="returns.length > 0">
        <f7-list-item v-for="row in returns" :link="'/returns/'+row.return_id" :title="$t('return.number') + row.return_id" :subtitle="row.name" :text="row.date_added" :after="row.status">
        </f7-list-item>
    </f7-list>

</f7-page>
</template>

<script>
import axios from 'axios'
import api from 'api.js'
import cms from 'cms.js'
import store from '../../vuex/store.js'

export default {
    data() {
        return {
            currentLanguageId: (localStorage.getItem('language_id')),
            currentLanguage: (localStorage.getItem('language_id') == 1 ? false : true),
            direction: (localStorage.getItem('language_id') == 1 ? "ltr" : "rtl"),
            returns: []
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
            url: api.baseUrl + api.urls.returns,
            headers: api.headers(localStorage.getItem('session_id'))
        }).then(function (response) {
            if (response.status !== 202) {
                self.returns = response.data.data
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
    },
    methods: {},
}
</script>
