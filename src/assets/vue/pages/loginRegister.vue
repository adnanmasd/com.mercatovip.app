

<template>

<f7-page no-tabbar no-navbar tabs :page-content="false">
    <f7-tabs animated>
        <f7-page-content tab id="login" active>
            <f7-navbar :class="this.$theme.md ? 'color-black' : ''">
                <f7-nav-left>
                    <f7-link class="back" icon-only>
                        <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
                    </f7-link>
                </f7-nav-left>

                <f7-nav-right>
                    <f7-link class="back" icon-only>
                    </f7-link>
                </f7-nav-right>
            </f7-navbar>
            <f7-block>
                <img :src="logo" class="display-flex align-self-center align-items-center" style="margin:0 auto" />
            </f7-block>
            <f7-list form id="login">
                <f7-list-item>
                    <f7-label>{{$t('loginRegister.signin.email')}}</f7-label>
                    <f7-input name="email" type="email" :placeholder="$t('loginRegister.signin.email')"></f7-input>
                </f7-list-item>
                <f7-list-item>
                    <f7-row>
                        <f7-col width="70">
                            <f7-label>{{$t('loginRegister.signin.password')}}</f7-label>
                            <f7-input name="password" type="password" :placeholder="$t('loginRegister.signin.password')"></f7-input>
                        </f7-col>
                        <f7-col width="30">
                            <!--  Forgot Password ? -->
                        </f7-col>
                    </f7-row>
                </f7-list-item>
                <f7-block>
                    <f7-button big raised fill color="green" v-on:click="login">{{$t('loginRegister.signin.button.text')}}</f7-button>
                    <f7-block>
                        <div class="text-align-center">{{$t('loginRegister.or.text')}}</div>
                    </f7-block>
                    <f7-block class="text-align-center">
                        {{$t('loginRegister.signup.msg')}}
                        <f7-link class="registerLink" tab-link="#register">{{$t('loginRegister.signup.title')}}</f7-link>
                    </f7-block>
                </f7-block>
            </f7-list>
        </f7-page-content>

        <f7-page-content tab id="register">
            <f7-navbar :class="this.$theme.md ? 'color-black' : ''">
                <f7-nav-left>
                    <f7-link icon-only tab-link="#login">
                        <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
                    </f7-link>
                </f7-nav-left>
                <f7-nav-title>

                </f7-nav-title>
                <f7-nav-right>
                    <f7-link class="back" icon-only>
                    </f7-link>
                </f7-nav-right>
            </f7-navbar>
            <h1 class="text-align-center">{{$t('loginRegister.signup.title')}}</h1>
            <f7-list form inset style="margin: 0">
                <f7-list-item>
                    <f7-label>{{$t('loginRegister.register.firstname')}}</f7-label>
                    <f7-input required validate name="firstname" type="text" :placeholder="$t('loginRegister.register.firstname')"></f7-input>
                </f7-list-item>
                <f7-list-item>
                    <f7-label>{{$t('loginRegister.register.lastname')}}</f7-label>
                    <f7-input required validate name="lastname" type="text" :placeholder="$t('loginRegister.register.lastname')"></f7-input>
                </f7-list-item>
                <f7-list-item>
                    <f7-label>{{$t('loginRegister.register.email')}}</f7-label>
                    <f7-input required validate name="email" type="email" :placeholder="$t('loginRegister.register.email')"></f7-input>
                </f7-list-item>
                <f7-list-item>
                    <f7-label>{{$t('loginRegister.register.password')}}</f7-label>
                    <f7-input required validate name="password" type="password" :placeholder="$t('loginRegister.register.password')"></f7-input>
                </f7-list-item>
                <f7-list-item>
                    <f7-label>{{$t('loginRegister.register.confirm')}}</f7-label>
                    <f7-input required validate name="confirm" type="password" :placeholder="$t('loginRegister.register.confirm')"></f7-input>
                </f7-list-item>
                <f7-list-item>
                    <f7-label>{{$t('loginRegister.register.mobile')}}</f7-label>
                    <f7-input required validate name="telephone" type="tel" :placeholder="$t('loginRegister.register.email')"></f7-input>
                </f7-list-item>

                <f7-list-item :title="$t('loginRegister.register.address.info')" group-title></f7-list-item>
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
                        <option v-for="row in countries" :value="row.country_id">{{row.name}}</option>
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
                        <option value="">{{$t('loginRegister.register.selectone')}}</option>
                        <option v-for="row in cities" :value="row.city_id">{{row.name}}</option>
                    </f7-input>
                </f7-list-item>
                <f7-list-item :title="$t('loginRegister.register.tac.info')" group-title></f7-list-item>
                <f7-list-item required validate checkbox name="agree" value="1" :title="$t('loginRegister.register.tac.title')"></f7-list-item>
                <f7-list-item>
                    <f7-link class="color-blue" href="/information?information_id=5">{{$t('loginRegister.register.tac')}}</f7-link>
                </f7-list-item>
            </f7-list>
            <f7-block>
                <f7-button big raised fill color="blue" @click="register()">{{$t('loginRegister.register.button.txt')}}</f7-button>
            </f7-block>
            <br/>
        </f7-page-content>
    </f7-tabs>
</f7-page>

</template>

<script>

import axios from "axios"
import api from "api.js"
import store from "../../vuex/store.js"

let self;

export default {
    data() {
            return {
                logo: (localStorage.getItem('language_id') == 1 ? "static/img/logo-en-big.png" : "static/img/logo-ar-big.png"),
                c: "",
                z: "",
                countries: [],
                zones: [],
                cities: []
            }
        },
        mounted: function() {
            self = this;
            self.$f7.preloader.show();
            axios({
                method: "GET",
                headers: api.headers,
                url: api.baseUrl + api.urls.getAllCountries
            }).then(function(response) {
                self.countries = response.data.data
                self.$f7.preloader.hide();
            });
        },
        methods: {
            updateZone() {
                    let self = this;
                    self.$f7.preloader.show();
                    let $$ = self.Dom7
                    let country_id = ($$('select[name="country_id"]')[0].value);
                    axios({
                        method: "GET",
                        headers: api.headers,
                        url: api.baseUrl + api.urls.getAllZonesByCountry.replace("{id}", country_id)
                    }).then(function(response) {
                        self.c = country_id
                        self.zones = response.data.data
                        self.$f7.preloader.hide();
                    });
                },
                updateCity() {
                    let self = this;
                    self.$f7.preloader.show();
                    let $$ = self.Dom7
                    let zone_id = ($$('select[name="zone_id"]')[0].value);
                    for (let j in self.zones.zone) {
                        if (self.zones.zone[j].zone_id == zone_id)
                            self.cities = self.zones.zone[j].cities;
                        self.z = zone_id;
                        self.$f7.preloader.hide();
                    }
                },
                login: function(event) {
                    let self = this;
                    self.$f7.preloader.show();
                    let loginObj = self.$f7.form.convertToData("#login");
                    axios({
                        method: "POST",
                        url: api.baseUrl + api.urls.login,
                        headers: api.headers,
                        data: {
                            "email": loginObj.email,
                            "password": loginObj.password
                        }
                    }).then(function(response) {
                        localStorage.setItem("user", true);
                        store.dispatch("saveUser", response.data.data)
                        store.dispatch('fetchCart')
                        let not = self.$f7.notification.create({
                            icon: '<img class="favico" src="static/img/favico.PNG"/>',
                            title: self.$t('login.notification.title'),
                            text: self.$t('login.notification.welcome') + response.data.data.firstname,
                            closeButton: true,
                            closeTimeout: 3000,
                        });
                        not.open();
                        self.$f7.preloader.hide();
                        self.$f7router.back()
                    }).catch(function(error) {
                        var t = self.$f7.toast.create({
                            text: error.response.data.error,
                            closeTimeout: 5000,
                            destroyOnClose: true
                        });
                        t.open();
                        self.$f7.preloader.hide();
                    });
                },
                register: function(event) {
                    let self = this;
                    self.$f7.preloader.show();
                    let registerObj = self.$f7.form.convertToData("#register");
                    axios({
                        method: "POST",
                        url: api.baseUrl + api.urls.register,
                        headers: api.headers,
                        data: {
                            "firstname": registerObj.firstname,
                            "lastname": registerObj.lastname,
                            "email": registerObj.email,
                            "password": registerObj.password,
                            "confirm": registerObj.confirm,
                            "telephone": registerObj.telephone,
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
                    }).then(function(response) {
                        localStorage.setItem("user", true);
                        store.dispatch("saveUser", response.data.data)
                        store.dispatch('fetchCart')
                        self.$f7.preloader.hide();
                        if (self.$f7route.options.query)
                            self.$f7router.reloadPage(self.$f7route.options.query.url)
                        else
                            self.$f7router.back()
                    }).catch(function(error) {
                        var t = self.$f7.toast.create({
                            text: error.response.data.error,
                            closeTimeout: 5000,
                            destroyOnClose: true
                        });
                        t.open();
                        self.$f7.preloader.hide();
                    });
                }
        }

}

</script>
