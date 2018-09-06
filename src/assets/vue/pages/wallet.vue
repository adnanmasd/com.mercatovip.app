<template>
<f7-page no-tabbar>
    <f7-navbar sliding :class="theme.md ? 'color-black' : ''">
        <f7-nav-left sliding>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title sliding>
            {{$t('wallet.title')}}
        </f7-nav-title>
        <f7-nav-right sliding>
            <f7-link icon-only>
            </f7-link>
        </f7-nav-right>
    </f7-navbar>

    <f7-block-title>{{$t('wallet.title.heading')}}</f7-block-title>
    <!-- Search-through list -->
    <f7-card>
        <f7-card-header><span class="text-align-center">{{$t('wallet.currentBalance.txt')}}</span></f7-card-header>
        <f7-card-content>
            <h1 class="text-align-center">{{transactions.user_balance}}</h1>
        </f7-card-content>
    </f7-card>

    <div class="timeline">
        <!-- Timeline item with multiple events per day  -->
        <template v-for="row in transactions.transactions">
            <div class="timeline-item">
                <div class="timeline-item-date">{{row.date_added.split('-')[0]}} <small>{{row.date_added.split('-')[1]}}</small></div>
                <div class="timeline-item-divider"></div>
                <div class="timeline-item-content">
                    <div class="timeline-item-title">
                        {{row.amount}}
                    </div>
                    <div class="timeline-item-subtitle">{{row.description}}</div>
                    <div class="timeline-item-text">
                        <span v-if="row.amount < 0">Debit</span>
                        <span v-else-if="row.amount > 0">Credit</span>
                    </div>
                </div>
            </div>
        </template>
    </div>

</f7-page>
</template>

<script>
import store from '../../vuex/store.js'
import api from 'api.js'
import axios from 'axios'

export default {
    data() {
        return {
            currentLanguageId: (localStorage.getItem('language_id')),
            currentLanguage: (localStorage.getItem('language_id') == 1 ? false : true),
            direction: (localStorage.getItem('language_id') == 1 ? "ltr" : "rtl"),
            theme: this.$theme,
            transactions: []
        }
    },
    computed: {

    },
    filters: {
        andFilter(val) {
            if (val)
                return val.replace(/&amp;/g, '&');
        }
    },
    mounted: function () {
        self = this;
        self.$f7.preloader.show();
        axios({
            method: "GET",
            url: api.baseUrl + api.urls.getTransaction,
            headers: api.headers(sessionStorage.getItem('session_id')),
            transformResponse: function (req) {
                var newReq = req.replace(/[\r\n|\n\r]/g, '');
                return JSON.parse(newReq)
            }
        }).then(function (response) {
            self.transactions = response.data.data
            self.$f7.preloader.hide();
        }).catch(function (error) {
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
    methods: {

    }

}
</script>
