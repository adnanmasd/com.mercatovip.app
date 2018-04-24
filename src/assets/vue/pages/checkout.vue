

<template>

<f7-page no-tabbar no-navbar :page-content="false">

    <f7-tabs animated>
        <f7-page-content tab id="address" @tab:show="address_show()">
            <f7-navbar :class="this.$theme.md ? 'color-black' : ''">
                <f7-nav-left sliding>
                    <f7-link class="back" icon-only>
                        <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
                    </f7-link>
                </f7-nav-left>
                <f7-nav-title sliding>
                    {{$t('checkout.title')}}
                </f7-nav-title>
                <f7-nav-right sliding>
                    <f7-link icon-only>
                    </f7-link>
                </f7-nav-right>
            </f7-navbar>

            <div class="steps">
                <ul class="steps-container">
                    <li style="width:25%;" class="activated">
                        <div class="step">
                            <div class="step-image"><span></span></div>
                            <div class="step-current">{{$t('checkout.title.1')}}</div>
                        </div>
                    </li>
                    <li style="width:25%;">
                        <div class="step">
                            <div class="step-image"><span></span></div>
                            <div class="step-current">{{$t('checkout.title.2')}}</div>
                        </div>
                    </li>
                    <li style="width:25%;">
                        <div class="step">
                            <div class="step-image"><span></span></div>
                            <div class="step-current">{{$t('checkout.title.3')}}</div>
                        </div>
                    </li>
                </ul>
                <div class="step-bar" style="width: 20%;"></div>
            </div>
            <f7-list form id="checkout">
                <f7-list-item group-title :title="$t('checkout.shipping.address')"></f7-list-item>

                <f7-list-item radio :checked="(row.address_id == shipping_address.address_id)" v-for="row in shipping_address.addresses" name="shipping_address_id" :value="row.address_id" :input-value="row.address_id" :title="row.firstname + ' ' + row.lastname + ', ' + row.address_1 + ', ' + row.address_2 + ', ' + row.city"
                @click="address_type_selected = 'existing'">
                </f7-list-item>

                <f7-list-item radio name="shipping_address_id" value="new" input-value="new" :title="$t('checkout.shipping.address.new')" @click="address_type_selected = 'new'"></f7-list-item>
                <template v-if="address_type_selected == 'new'">
                    <f7-list-item>
                        <f7-label>{{$t('checkout.shipping.address.first')}}</f7-label>
                        <f7-input :value="address.firstname" name="firstname" type="text" @input="address.firstname = $event.target.value" :placeholder="$t('checkout.shipping.address.first')">
                            <span slot="info" v-if="errors.firstname"><span class="text-color-red">{{errors.firstname}}</span></span>
                        </f7-input>
                    </f7-list-item>
                    <f7-list-item>
                        <f7-label>{{$t('checkout.shipping.address.last')}}</f7-label>
                        <f7-input :value="address.lastname" name="lastname" type="text" @input="address.lastname = $event.target.value" :placeholder="$t('checkout.shipping.address.last')">
                            <span slot="info" v-if="errors.lastname"><span class="text-color-red">{{errors.lastname}}</span></span>
                        </f7-input>
                    </f7-list-item>
                    <f7-list-item>
                        <f7-label>{{$t('checkout.shipping.address.address1')}}</f7-label>
                        <f7-input :value="address.address1" name="address1" type="text" @input="address.address1 = $event.target.value" :placeholder="$t('checkout.shipping.address.address1')">
                            <span slot="info" v-if="errors.address1"><span class="text-color-red">{{errors.address1}}</span></span>
                        </f7-input>
                    </f7-list-item>

                    <f7-list-item>
                        <f7-label>{{$t('checkout.shipping.address.address2')}}</f7-label>
                        <f7-input :value="address.address2" info name="address2" type="text" @input="address.address2 = $event.target.value" :placeholder="$t('checkout.shipping.address.address2')">
                        </f7-input>
                    </f7-list-item>
                    <f7-list-item>
                        <f7-label>{{$t('checkout.shipping.address.postal')}}</f7-label>
                        <f7-input :value="address.postal" name="postal" type="text" @input="address.postal = $event.target.value" :placeholder="$t('checkout.shipping.address.postal')">
                            <span slot="info" v-if="errors.postal"><span class="text-color-red">{{errors.postal}}</span></span>
                        </f7-input>
                    </f7-list-item>

                    <f7-list-item>
                        <f7-label>{{$t('checkout.shipping.address.country')}}</f7-label>
                        <f7-input type="select" name="country_id" v-on:change="updateZone()" @input="address.country = $event.target.value">
                            <option value="">{{$t('checkout.shipping.address.selectone')}}</option>
                            <option v-for="row in countries" :value="row.country_id" :selected="address.country == row.country_id">{{row.name}}</option>
                            <span slot="info" v-if="errors.country_id"><span class="text-color-red">{{errors.country_id}}</span></span>
                        </f7-input>
                    </f7-list-item>

                    <f7-list-item>
                        <f7-label>{{$t('checkout.shipping.address.region')}}</f7-label>
                        <f7-input type="select" name="zone_id" v-on:change="updateCity()" @input="address.region = $event.target.value">
                            <option value="">{{$t('checkout.shipping.address.selectone')}}</option>
                            <option v-for="row in zones.zone" :value="row.zone_id" :selected="address.region == row.zone_id">{{row.name}}</option>
                            <span slot="info" v-if="errors.zone_id"><span class="text-color-red">{{errors.zone_id}}</span></span>
                        </f7-input>
                    </f7-list-item>

                    <f7-list-item>
                        <f7-label>{{$t('checkout.shipping.address.city')}}</f7-label>
                        <f7-input type="select" name="city" @input="address.city = $event.target.value">
                            <option value="">{{$t('checkout.shipping.address.selectone')}}</option>
                            <option v-for="row in cities" :value="row.city_id">{{row.name}}</option>
                            <span slot="info" v-if="errors.city_id"><span class="text-color-red">{{errors.city_id}}</span></span>
                        </f7-input>
                    </f7-list-item>
                </template>
            </f7-list>
            <f7-button style="width:100%" big raised fill color="green" @click="address_hide()">
                {{$t('checkout.continue')}}</f7-button>
        </f7-page-content>

        <f7-page-content tab id="shipping" @tab:show="shipping_show()">
            <f7-navbar :class="this.$theme.md ? 'color-black' : ''">
                <f7-nav-left sliding>
                    <f7-link icon-only tab-link="#address">
                        <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
                    </f7-link>
                </f7-nav-left>
                <f7-nav-title sliding>
                    {{$t('checkout.title')}}
                </f7-nav-title>
                <f7-nav-right sliding>
                    <f7-link icon-only>
                    </f7-link>
                </f7-nav-right>
            </f7-navbar>

            <div class="steps">
                <ul class="steps-container">
                    <li style="width:25%;" class="activated">
                        <div class="step">
                            <div class="step-image"><span></span></div>
                            <div class="step-current">{{$t('checkout.title.1')}}</div>
                        </div>
                    </li>
                    <li style="width:25%;" class="activated">
                        <div class="step">
                            <div class="step-image"><span></span></div>
                            <div class="step-current">{{$t('checkout.title.2')}}</div>
                        </div>
                    </li>
                    <li style="width:25%;">
                        <div class="step">
                            <div class="step-image"><span></span></div>
                            <div class="step-current">{{$t('checkout.title.3')}}</div>
                        </div>
                    </li>
                </ul>
                <div class="step-bar" style="width: 45%;"></div>
            </div>
            <f7-list form id="shipping_method_form">
                <f7-list-item group-title :title="$t('checkout.shipping.method')"></f7-list-item>
                <f7-list-item radio name="shipping_method" v-for="row,index in shipping_methods" :value="row.quote[index].code" checked :title="row.quote[index].title">{{row.quote[index].text}}</f7-list-item>
                <f7-list-item group-title :title="$t('checkout.comments')"></f7-list-item>
                <f7-list-item>
                    <f7-label>{{$t('checkout.comments')}}</f7-label>
                    <f7-input name="comments" type="textarea" :placeholder="$t('checkout.comments')"></f7-input>
                </f7-list-item>
            </f7-list>
            <f7-block>
                <f7-button style="width:100%" big raised fill color="green" @click="shipping_hide()">
                    {{$t('checkout.continue')}}</f7-button>
            </f7-block>
        </f7-page-content>

        <f7-page-content tab id="payment" @tab:show="payment_show()">
            <f7-navbar :class="this.$theme.md ? 'color-black' : ''">
                <f7-nav-left sliding>
                    <f7-link icon-only tab-link="#shipping">
                        <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
                    </f7-link>
                </f7-nav-left>
                <f7-nav-title sliding>
                    {{$t('checkout.title')}}
                </f7-nav-title>
                <f7-nav-right sliding>
                    <f7-link icon-only>
                    </f7-link>
                </f7-nav-right>
            </f7-navbar>

            <div class="steps">
                <ul class="steps-container">
                    <li style="width:25%;" class="activated">
                        <div class="step">
                            <div class="step-image"><span></span></div>
                            <div class="step-current">{{$t('checkout.title.1')}}</div>
                        </div>
                    </li>
                    <li style="width:25%;" class="activated">
                        <div class="step">
                            <div class="step-image"><span></span></div>
                            <div class="step-current">{{$t('checkout.title.2')}}</div>
                        </div>
                    </li>
                    <li style="width:25%;" class="activated">
                        <div class="step">
                            <div class="step-image"><span></span></div>
                            <div class="step-current">{{$t('checkout.title.3')}}</div>
                        </div>
                    </li>
                </ul>
                <div class="step-bar" style="width: 70%;"></div>
            </div>
            <f7-list form id="payment_method_form">
                <f7-list-item group-title :title="$t('checkout.payment.method')"></f7-list-item>
                <f7-list-item radio name="payment_method" v-if="row.code === 'GOP_COD' || row.code === 'free_checkout'" v-for="row,index in payment_methods" :value="row.code" checked :title='(row.code == "gate2play") ? ("<img src=" + "static/img/payment.png" + ">") : row.title'></f7-list-item>
                <!-- <f7-list-item checkbox name="agree" value="1" :title="$t('checkout.agree.text')"></f7-list-item> -->

            </f7-list>
            <f7-block>
                <f7-button style="width:100%" big raised fill color="green" @click="payment_hide()">
                    {{$t('checkout.continue')}}</f7-button>
                <p class="small">{{$t('checkout.payment.tac.para1')}}
                    <f7-link class="color-blue" href="/information?information_id=5">{{$t('checkout.tac')}}</f7-link>
                </p>
            </f7-block>
        </f7-page-content>
    </f7-tabs>

    <!--f7-toolbar bottom>
        <f7-button style="width:100%" big raised fill class="bg-green" @click="continue_checkout()">{{$t('checkout.continue')}}</f7-button>
    </f7-toolbar-->
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
                shipping_address: [],
                payment_address: [],
                shipping_methods: [],
                payment_methods: [],

                address: {
                    firstname: "",
                    lastname: "",
                    address1: "",
                    address2: "",
                    postal: "",
                    country: "",
                    region: "",
                    city: "",
                },
                address_type_selected: "",
                countries: [],
                zones: [],
                cities: [],
                payment_method: "",
                errors: []
            }
        },
        computed: {
            cart: {
                get: function() {
                    return store.state.cart
                }
            },
            cart_error: {
                get: function() {
                    return store.state.cart_error
                }
            },
        },
        mounted: function() {
            self = this;
            self.$f7.preloader.show();
            store.dispatch("fetchCart");
            let default_shipping_address = {};
            //countries
            self.$f7.request({
              async: false,
              dataType: 'json',
              contentType: "application/json",
                method: "GET",
                headers: api.headers,
                url: api.baseUrl + api.urls.getAllCountries,
                success: function(e,status,xhr){
                  self.countries = e.data
                  self.$f7.preloader.hide();
                }
            });
            self.$f7.tab.show("#address", true);
        },
        filters: {
            andFilter(val) {
                if (val)
                    return val.replace(/&amp;/g, '&');
            }
        },
        methods: {
            address_show() {
                    console.log('address');
                    let self = this;
                    self.$f7.preloader.show();
                    //shipping Address
                    self.$f7.request({
                            async : false,
                            dataType: 'json',
                            contentType: "application/json",
                            method: "GET",
                            crossDomain: true,
                            url: api.baseUrl + api.urls.shippingAddress,
                            headers: api.headers,
                            success : function (e,status,xhr){
                              self.shipping_address = e.data
                              self.a = self.shipping_address.address_id;
                              self.address_type_selected = self.shipping_address.address_id;
                              self.$f7.preloader.hide();
                            }

                        })
                        // payment Address
                        // axios({
                        //     method: "GET",
                        //     url: api.baseUrl + api.urls.paymentAddress,
                        //     headers: api.headers
                        // }).then(function(response) {
                        //     self.payment_address = response.data
                        //     self.$f7.preloader.hide();
                        // })
                },
                address_hide() {
                    console.log("address hide");
                    let self = this;
                    self.$f7.preloader.show();
                    let formData = self.$f7.form.convertToData("#checkout");
                    self.errors = [];
                    if (formData.shipping_address_id == 'new') {
                        if (formData.firstname == null || formData.firstname == "") {
                            self.errors['firstname'] = self.$t('checkout.validation.first')
                            self.errors.length++;
                        }
                        if (formData.lastname == null || formData.lastname == "") {
                            self.errors['lastname'] = self.$t('checkout.validation.last')
                            self.errors.length++;
                        }
                        if (formData.address1 == null || formData.address1 == "") {
                            self.errors['address1'] = self.$t('checkout.validation.address1')
                            self.errors.length++;
                        }
                        if (formData.postal == null || formData.postal == "") {
                            self.errors['postal'] = self.$t('checkout.validation.postal')
                            self.errors.length++;
                        }
                        if (formData.city == null || formData.city == "") {
                            self.errors['city'] = self.$t('checkout.validation.city')
                            self.errors.length++;
                        }
                        if (formData.zone_id == null || formData.zone_id == "") {
                            self.errors['zone_id'] = self.$t('checkout.validation.zone')
                            self.errors.length++;
                        }
                        if (formData.country_id == null || formData.country_id == "") {
                            self.errors['country_id'] = self.$t('checkout.validation.country')
                            self.errors.length++;
                        }
                        if (self.errors.length > 0) {
                            self.$f7.preloader.hide();
                            //self.$f7.tab.show("#address")
                            return;
                        } else {
                            let address_new = {
                                "firstname": formData.firstname,
                                "lastname": formData.lastname,
                                "city_id": formData.city,
                                "address_1": formData.address1,
                                "address_2": formData.address2,
                                "country_id": formData.country_id,
                                "postcode": formData.postal,
                                "zone_id": formData.zone_id
                            }
                            self.$f7.request({
                                async: false,
                                dataType: 'json',
                                contentType: "application/json",
                                method: "POST",
                                url: api.baseUrl + api.urls.shippingAddress,
                                headers: api.headers,
                                data: JSON.stringify(address_new),
                                success: function(e, status, xhr) {}
                            })
                            self.$f7.request({
                                async: false,
                                dataType: 'json',
                                contentType: "application/json",
                                method: "POST",
                                url: api.baseUrl + api.urls.paymentAddress,
                                headers: api.headers,
                                data: JSON.stringify(address_new),
                                success: function(e, status, xhr) {}
                            })
                        }
                    } else {
                        self.$f7.request({
                            async: false,
                            dataType: 'json',
                            contentType: "application/json",
                            method: "POST",
                            url: api.baseUrl + api.urls.setExistingShippingAddress,
                            headers: api.headers,
                            data: JSON.stringify({
                                "address_id": self.shipping_address.address_id
                            }),
                            success: function(e, status, xhr) {}
                        })

                        self.$f7.request({
                            async: false,
                            dataType: 'json',
                            contentType: "application/json",
                            method: "POST",
                            url: api.baseUrl + api.urls.setExistingPaymentAddress,
                            headers: api.headers,
                            data: JSON.stringify({
                                "address_id": self.shipping_address.address_id
                            }),
                            success: function(e, status, xhr) {
                                //self.payment_address = response.data
                                self.$f7.preloader.hide();
                            }
                        })
                      }
                        self.$f7.tab.show('#shipping')
                    },
                    shipping_show() {
                            console.log('shipping');
                            self.$f7.preloader.show();
                            //shipping methods

                            self.$f7.request({
                                async: false,
                                dataType: 'json',
                                contentType: "application/json",
                                method: "GET",
                                url: api.baseUrl + api.urls.shippingMethods,
                                headers: api.headers,
                                success : function(e,status,xhr){
                                  self.shipping_methods = e.data.shipping_methods
                                  self.$f7.preloader.hide();
                                }
                            })
                        },
                        shipping_hide() {
                            console.log("shipping hide");
                            let self = this;
                            let formData = self.$f7.form.convertToData("#shipping_method_form")
                                //shipping Methods
                            self.$f7.request({
                                method: "POST",
                                async: false,
                                dataType: 'json',
                                contentType: "application/json",
                                url: api.baseUrl + api.urls.shippingMethods,
                                headers: api.headers,
                                data: JSON.stringify({
                                    "shipping_method": formData.shipping_method,
                                    "comment": formData.comments
                                }),
                                success : function(e,status,xhr){
                                    self.$f7.tab.show("#payment");
                                },
                                error : function (e,xhr, status){
                                  let er = JSON.parse(e.response);
                                  var t = self.$f7.toast.create({
                                    text: er.error,
                                    closeTimeout: 5000,
                                    destroyOnClose: true,
                                    postion: 'top',
                                    cssClass: 'toast-red'
                                  });
                                  t.open();
                                  navigator.vibrate([80, 80, 80])
                                  self.$f7.tab.show("#shipping");
                                }
                            })
                        },
                        payment_show() {
                            console.log('payment');
                            self.$f7.preloader.show();
                            //payment Methods
                            self.$f7.request({
                                method: "GET",
                                async: false,
                                dataType: 'json',
                                contentType: "application/json",
                                url: api.baseUrl + api.urls.paymentMethods,
                                headers: api.headers,
                                beforeOpen: function(req,status) {
                                    //var newReq = req.replace(/[\r\n]/g, '');
                                    //return JSON.parse(newReq)
                                },
                                success : function(e,status,xhr){
                                  self.payment_methods = e.data.payment_methods
                                  self.$f7.preloader.hide();
                                }
                            })
                        },
                        payment_hide() {
                            console.log("payment hide");
                            //payment Methods
                            let self = this;
                            self.$f7.preloader.show();
                            let formData = self.$f7.form.convertToData("#payment_method_form")
                            self.$f7.request({
                                method: "POST",
                                async: false,
                                dataType: 'json',
                                contentType: "application/json",
                                url: api.baseUrl + api.urls.paymentMethods,
                                headers: api.headers,
                                data: JSON.stringify({
                                    "payment_method": formData.payment_method,
                                    "agree": true,
                                    "comment": ""
                                }),
                                success : function(e,status,xhr){
                                  self.payment_method = formData.payment_method
                                  self.$f7.preloader.hide();
                                  setTimeout(function() {
                                    self.$f7router.navigate("/confirm?payment=" + self.payment_method)
                                  }, 500)
                                },
                                error : function (e,status,xhr){
                                  let er = JSON.parse(e.response);
                                  var t = self.$f7.toast.create({
                                    text: er.error,
                                    closeTimeout: 5000,
                                    destroyOnClose: true,
                                    postion: 'top',
                                    cssClass: 'toast-red'
                                  });
                                  t.open();
                                  navigator.vibrate([80, 80, 80])
                                  self.$f7.tab.show("#payment");
                                  self.$f7.preloader.hide();
                                }
                            })
                        },
                        updateZone() {
                            let self = this;
                            self.$f7.preloader.show();
                            let $$ = self.Dom7
                            let country_id = self.address.country;
                            self.$f7.request({
                              async: false,
                              dataType: 'json',
                              contentType: "application/json",
                                method: "GET",
                                headers: api.headers,
                                url: api.baseUrl + api.urls.getAllZonesByCountry.replace("{id}", country_id),
                                success: function(e,status,xhr){
                                  self.zones = e.data
                                  self.$f7.preloader.hide();
                                }
                            });
                        },
                        updateCity() {
                            let self = this;
                            self.$f7.preloader.show();
                            let $$ = self.Dom7
                            let zone_id = self.address.region;
                            for (let j in self.zones.zone) {
                                if (self.zones.zone[j].zone_id == zone_id)
                                    self.cities = self.zones.zone[j].cities;
                                self.$f7.preloader.hide();
                            }
                        },
                }

        }

</script>
