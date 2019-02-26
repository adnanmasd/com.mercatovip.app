<template>
<f7-page :name="'return'+r.return_id" no-tabbar>
    <f7-navbar sliding :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title>
            {{$t('return.number')}} {{r.return_id}}
        </f7-nav-title>
        <f7-nav-right>
            <f7-link icon-only>

            </f7-link>
        </f7-nav-right>
    </f7-navbar>

    <f7-card>
        <f7-card-content>
            <div class="card data-table data-table-collapsible data-table-init">
                <div class="card-header">
                    <div class="data-table-title">{{$t('return.info')}}</div>
                </div>
                <div class="card-content">
                    <table>
                        <thead>
                            <tr>
                                <th class="label-cell">{{$t('return.title')}}</th>
                                <th class="numeric-cell">{{$t('return.order.title')}}</th>
                                <th class="numeric-cell">{{$t('return.product.text')}}</th>
                                <th class="numeric-cell">{{$t('return.model.text')}}</th>
                                <th class="numeric-cell">{{$t('return.quantity')}}</th>
                                <th class="numeric-cell">{{$t('return.status')}}</th>
                                <th class="numeric-cell">{{$t('return.comment')}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="label-cell">{{r.return_id}}</td>
                                <td class="numeric-cell">{{r.order_id}}</td>
                                <td class="numeric-cell">{{r.product}}</td>
                                <td class="numeric-cell">{{r.model}}</td>
                                <td class="numeric-cell">{{r.quantity}}</td>
                                <td class="numeric-cell">{{r.action}}</td>
                                <td class="numeric-cell">{{r.comment}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <br/>
            <f7-list v-if="r.histories">
                <f7-list-item group-title>{{$t('return.history.info')}}</f7-list-item>

                <div class="timeline">
                    <!-- Timeline item with multiple events per day  -->
                    <template v-for="row in r.histories">
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
            r: [],
            return_statuses: []
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
        self = this;
        self.$f7.preloader.show();
        let return_id = this.$f7route.params.return_id

        axios({
            method: "GET",
            url: api.baseUrl + api.urls.getReturnDetail.replace('{id}', return_id),
            headers: api.headers(localStorage.getItem('session_id')),
            transformResponse: function (req) {
                var newReq = req.replace(/[\r\n|\n\r]/g, '');
                return JSON.parse(newReq)
            }
        }).then(function (response) {
            self.r = response.data.data
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
            self.$f7.preloader.hide();
        });
    },
    methods: {
        formatPrice(value, currency) {
            return parseFloat(value).toFixed(2) + ' ' + currency
        }
    }
}
</script>
