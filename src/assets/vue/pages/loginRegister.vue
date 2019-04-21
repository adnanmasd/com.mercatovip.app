

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
                        <f7-col width="60">
                            <f7-label>{{$t('loginRegister.signin.password')}}</f7-label>
                            <f7-input name="password" type="password" :placeholder="$t('loginRegister.signin.password')"></f7-input>
                        </f7-col>
                        <f7-col width="40">
                            <!--  Forgot Password ? -->
                            <f7-button href="/forgot/">{{$t('loginRegister.forgot.password')}}</f7-button>
                        </f7-col>
                    </f7-row>
                </f7-list-item>
                <f7-block>
                    <f7-button big raised fill color="green" v-on:click="login">{{$t('loginRegister.signin.button.text')}}</f7-button>
                    <!-- <f7-block>
                        <div class="text-align-center">{{$t('loginRegister.or.text')}}</div>
                    </f7-block> -->
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
            <div class="sheet-modal my-sheet">
                <div class="toolbar">
                    <div class="toolbar-inner">
                        <div class="left"></div>
                        <div class="right"><a class="link icon-only sheet-close" href="#"><f7-icon icon="fa fa-times"></f7-icon></a></div>
                    </div>
                </div>
                <div class="sheet-modal-inner">
                    <div class="block">
                        <h4>{{$t('loginRegister.verify.title')}} {{maskedPhone}}</h4>
                        <f7-input type="number" validate :value="otp" pattern="[0-9]*" @input="otp = $event.target.value" ></f7-input>
                        <f7-button fill big raised @click="verify()" color="green">{{$t('loginRegister.verfiy.verify')}}</f7-button>
                    </div>
                </div>
            </div>
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
                    <f7-row>
                      <f7-col width="20">
                        +966
                      </f7-col>
                      <f7-col width="80">
                        <f7-input validate name="telephone" type="tel" :placeholder="$t('loginRegister.register.mobile.placeholder')"></f7-input>
                      </f7-col>
                    </f7-row>
                </f7-list-item>

                <!--f7-list-item :title="$t('loginRegister.register.address.info')" group-title></f7-list-item>
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
                </f7-list-item-->
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
                logo: (localStorage.getItem('language_id') == 1 ? "static/img/Logo-en-big.png" : "static/img/Logo-ar-big.png"),
                c: "",
                z: "",
                countries: [],
                zones: [],
                cities: [],
                otp : "",
                maskedPhone : "",
            }
        },
        mounted: function() {
            self = this;
            self.$f7.preloader.show();
            axios({
                method: "GET",
                headers: api.headers(localStorage.getItem('session_id')),
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
                        headers: api.headers(localStorage.getItem('session_id')),
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
                        headers: api.headers(localStorage.getItem('session_id')),
                        data: {
                            "email": loginObj.email,
                            "password": loginObj.password
                        }
                    }).then(function(response) {
                        //localStorage.setItem("user", true);
                        store.dispatch("loginUser", response.data.data)
                        store.dispatch('fetchCart')
                        self.$f7.preloader.hide();
                        self.$f7router.back()
                    }).catch(function(error) {
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
                sendOTP: function(){
                  let self = this;
                  self.$f7.preloader.show();
                  let registerObj = self.$f7.form.convertToData("#register");
                  let mobileNumber = "+966"+registerObj.telephone;
                  self.maskedPhone = "+966XXXXX" + mobileNumber.substring(mobileNumber.length -4, mobileNumber.length)
                  window.verifyPhoneNumber("+966"+registerObj.telephone);
                  self.$f7.sheet.open(".my-sheet", true);
                  self.$f7.preloader.hide();
                },
                verify: function(){
                  if (window.signInWithPhone){
                    self.$f7.sheet.close(".my-sheet", true);
                    this.register();
                  } else {
                    var t = self.$f7.toast.create({
                        text: self.$t('numberNotVerified'),
                        closeTimeout: 5000,
                        destroyOnClose: true,
                        position: 'top',
                        cssClass: 'toast-red'
                    });
                    t.open();
                    navigator.vibrate([80, 80, 80])
                  }
                },
                register: function(event) {
                    let self = this;
                    self.$f7.preloader.show();
                    let registerObj = self.$f7.form.convertToData("#register");
                    axios({
                        method: "POST",
                        url: api.baseUrl + api.urls.register,
                        headers: api.headers(localStorage.getItem('session_id')),
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
                    }).then(function(response) {
                        localStorage.setItem("user", true);
                        store.dispatch("loginUser", response.data.data)
                        store.dispatch('fetchCart')
                        self.$f7.preloader.hide();
                        if (self.$f7route.query.url)
                            self.$f7router.navigate(self.$f7route.query.url,{reloadCurrent  :true})
                        else
                            self.$f7router.back("/");
                    }).catch(function(error) {
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
