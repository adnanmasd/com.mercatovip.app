<template>
<f7-page :name="'address_new'" no-tabbar>
    <f7-navbar sliding :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title>
            {{$t('address.new.title')}}
        </f7-nav-title>
        <f7-nav-right>
            <f7-link icon-only>

            </f7-link>
        </f7-nav-right>
    </f7-navbar>

    <f7-card>
        <f7-card-content>
            <f7-list id="address">
                <f7-list-item>
                    <f7-label>{{$t('loginRegister.register.firstname')}}</f7-label>
                    <f7-input required validate name="firstname" type="text" :placeholder="$t('loginRegister.register.firstname')"></f7-input>
                </f7-list-item>
                <f7-list-item>
                    <f7-label>{{$t('loginRegister.register.lastname')}}</f7-label>
                    <f7-input required validate name="lastname" type="text" :placeholder="$t('loginRegister.register.lastname')"></f7-input>
                </f7-list-item>
                <f7-list-item>
                    <f7-label>{{$t('loginRegister.register.address.1')}}</f7-label>
                    <f7-input required validate name="address1" type="text" :placeholder="$t('loginRegister.register.address.1')"></f7-input>
                </f7-list-item>

                <f7-list-item>
                    <f7-label>{{$t('loginRegister.register.address.2')}}</f7-label>
                    <f7-input name="address2" type="text" :placeholder="$t('loginRegister.register.address.2')"></f7-input>
                </f7-list-item>
                <f7-list-item>
                    <f7-label>{{$t('loginRegister.register.postal')}}</f7-label>
                    <f7-input name="postal" type="text" :placeholder="$t('loginRegister.register.postal')"></f7-input>
                </f7-list-item>
                <f7-list-item>
                    <f7-label>{{$t('loginRegister.register.country')}}</f7-label>
                    <f7-input required validate type="select" name="country_id" v-on:change="updateZone()" :value="c">
                        <option value="">{{$t('loginRegister.register.selectone')}}</option>
                        <template v-for="row in countries">
                            <option :value="row.country_id">{{row.name}}</option>
                        </template>
                    </f7-input>
                </f7-list-item>

                <f7-list-item>
                    <f7-label>{{$t('loginRegister.register.region')}}</f7-label>
                    <f7-input required validate type="select" name="zone_id" v-on:change="updateCity()" :value="z">
                        <option value="">{{$t('loginRegister.register.selectone')}}</option>
                        <option v-for="row in zones.zone" :value="row.zone_id">{{row.name}}</option>
                    </f7-input>
                </f7-list-item>

                <f7-list-item>
                    <f7-label>{{$t('loginRegister.register.city')}}</f7-label>
                    <f7-input required validate type="select" name="city">
                        <option v-for="row in cities" :value="row.city_id">{{row.name}}</option>
                    </f7-input>
                </f7-list-item>
            </f7-list>
        </f7-card-content>
    </f7-card>

    <f7-block>
        <f7-button big raised fill color="blue" @click="save()">{{$t('address.button.txt')}}</f7-button>
    </f7-block>

</f7-page>
</template>

<script>
import api from 'api.js'
import axios from 'axios'
import store from '../../vuex/store.js'
import {
    setTimeout
} from 'timers';

let self;

export default {
    data() {
        return {
            currentLanguageId: (localStorage.getItem('language_id')),
            currentLanguage: (localStorage.getItem('language_id') == 1 ? false : true),
            direction: (localStorage.getItem('language_id') == 1 ? "ltr" : "rtl"),
            c: "",
            z: "",
            countries: [],
            zones: [],
            cities: []
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
        axios({
            method: "GET",
            headers: api.headers(localStorage.getItem('session_id')),
            url: api.baseUrl + api.urls.getAllCountries
        }).then(function (response) {
            self.countries = response.data.data
            self.$f7.preloader.hide();
        });

    },
    methods: {

        updateZone() {
            let self = this;
            self.$f7.preloader.show();
            let $ = self.Dom7
            let country_id = ($('select[name="country_id"]')[0].value);
            axios({
                method: "GET",
                headers: api.headers(localStorage.getItem('session_id')),
                url: api.baseUrl + api.urls.getAllZonesByCountry.replace("{id}", country_id)
            }).then(function (response) {
                self.c = country_id
                self.zones = response.data.data
                self.$f7.preloader.hide();
            });
        },
        updateCity() {
            let self = this;
            self.$f7.preloader.show();
            let $ = self.Dom7
            let zone_id = ($('select[name="zone_id"]')[0].value);
            for (let j in self.zones.zone) {
                if (self.zones.zone[j].zone_id == zone_id)
                    self.cities = self.zones.zone[j].cities;
                self.z = zone_id;
                self.$f7.preloader.hide();
            }
        },

        save: function (event) {
            let self = this;
            self.$f7.preloader.show();
            let registerObj = self.$f7.form.convertToData("#address");
            axios({
                method: "POST",
                url: api.baseUrl + api.urls.listAddress,
                headers: api.headers(localStorage.getItem('session_id')),
                data: {
                    "firstname": registerObj.firstname,
                    "lastname": registerObj.lastname,
                    "city_id": registerObj.city,
                    "address_1": registerObj.address1,
                    "address_2": registerObj.address2,
                    "country_id": registerObj.country_id,
                    "postcode": registerObj.postal,
                    "zone_id": registerObj.zone_id,
                    "default": ""
                }
            }).then(function (response) {
                self.$f7.preloader.hide();
                var t = self.$f7.toast.create({
                    text: self.$t('address.add.success.msg'),
                    closeTimeout: 5000,
                    destroyOnClose: true,
                    position: 'top',
                    cssClass: 'toast-green'
                });
                t.open();
                navigator.vibrate(80)
                self.$f7router.back()
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
        }
    }
}
</script>
