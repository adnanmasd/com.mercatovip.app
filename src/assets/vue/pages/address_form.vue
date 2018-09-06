<template>
<f7-page :name="'address_'+address.address_id" no-tabbar>
    <f7-navbar sliding :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title>
            {{$t('address.title')}}
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
                    <f7-input required validate name="firstname" type="text" :placeholder="$t('loginRegister.register.firstname')" :value="address.firstname"></f7-input>
                </f7-list-item>
                <f7-list-item>
                    <f7-label>{{$t('loginRegister.register.lastname')}}</f7-label>
                    <f7-input required validate name="lastname" type="text" :placeholder="$t('loginRegister.register.lastname')" :value="address.lastname"></f7-input>
                </f7-list-item>
                <f7-list-item>
                    <f7-label>{{$t('loginRegister.register.address.1')}}</f7-label>
                    <f7-input required validate name="address1" type="text" :placeholder="$t('loginRegister.register.address.1')" :value="address.address_1"></f7-input>
                </f7-list-item>

                <f7-list-item>
                    <f7-label>{{$t('loginRegister.register.address.2')}}</f7-label>
                    <f7-input name="address2" type="text" :placeholder="$t('loginRegister.register.address.2')" :value="address.address_2"></f7-input>
                </f7-list-item>
                <f7-list-item>
                    <f7-label>{{$t('loginRegister.register.postal')}}</f7-label>
                    <f7-input name="postal" type="text" :placeholder="$t('loginRegister.register.postal')" :value="address.postcode"></f7-input>
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
                    <f7-input required validate type="select" name="city" :value="city">
                        <option v-for="row in cities" :value="row.city_id">{{row.name}}</option>
                    </f7-input>
                </f7-list-item>
            </f7-list>
        </f7-card-content>
    </f7-card>

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
            address: [],
            c: "",
            z: "",
            city: "",
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
        let address_id = this.$f7route.params.addressId

        axios({
            method: "GET",
            url: api.baseUrl + api.urls.addressById.replace('{id}', address_id),
            headers: api.headers(sessionStorage.getItem('session_id')),
            transformResponse: function (req) {
                var newReq = req.replace(/[\r\n|\n\r]/g, '');
                return JSON.parse(newReq)
            }
        }).then(function (response) {
            self.address = response.data.data
            self.updateCounty();
            self.c = self.address.country_id;

            self.updateZone();
            setTimeout(function () {
                self.z = self.address.zone_id;
            }, 3000)

            self.updateCity();
            setTimeout(function () {
                self.city = self.address.city_id
            }, 3000)

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
        updateCounty() {
            axios({
                method: "GET",
                headers: api.headers(sessionStorage.getItem('session_id')),
                url: api.baseUrl + api.urls.getAllCountries
            }).then(function (response) {
                self.countries = response.data.data
                self.$f7.preloader.hide();
            });
        },
        updateZone() {
            let self = this;
            self.$f7.preloader.show();
            let country_id = self.c;
            axios({
                method: "GET",
                headers: api.headers(sessionStorage.getItem('session_id')),
                url: api.baseUrl + api.urls.getAllZonesByCountry.replace("{id}", country_id)
            }).then(function (response) {
                self.zones = response.data.data
                self.$f7.preloader.hide();
            });
        },
        updateCity() {
            let self = this;
            self.$f7.preloader.show();
            let zone_id = self.z;
            for (let j in self.zones.zone) {
                if (self.zones.zone[j].zone_id == zone_id)
                    self.cities = self.zones.zone[j].cities;
                self.$f7.preloader.hide();
            }
        },

        register: function (event) {
            let self = this;
            self.$f7.preloader.show();
            let registerObj = self.$f7.form.convertToData("#register");
            axios({
                method: "POST",
                url: api.baseUrl + api.urls.register,
                headers: api.headers(sessionStorage.getItem('session_id')),
                data: {
                    "firstname": registerObj.firstname,
                    "lastname": registerObj.lastname,
                    "email": registerObj.email,
                    "password": registerObj.password,
                    "confirm": registerObj.confirm,
                    "telephone": registerObj.telephone ? registerObj.telephone : "+966000000000",
                    "fax": registerObj.fax,
                    "company_id": registerObj.company_id,
                    "company": registerObj.company,
                    "city": registerObj.city,
                    "address_1": registerObj.address1,
                    "address_2": registerObj.address2,
                    "country_id": registerObj.country_id,
                    "postcode": registerObj.postal,
                    "zone_id": registerObj.zone_id,
                    "tax_id": registerObj.tax_id,
                    "agree": registerObj.agree[0] ? registerObj.agree[0] : "0"
                }
            }).then(function (response) {
                localStorage.setItem("user", true);
                store.dispatch("saveUser", response.data.data)
                store.dispatch('fetchCart')
                self.$f7.preloader.hide();
                if (self.$f7route.options.query)
                    self.$f7router.reloadPage(self.$f7route.options.query.url)
                else
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
