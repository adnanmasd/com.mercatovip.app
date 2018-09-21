<template>
<f7-page id="resetPass" no-tabbar no-navbar tabs :page-content="false">
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
        <f7-list form id="reset">
            <f7-list-item>
                <f7-label>{{$t('loginRegister.reset.password')}}</f7-label>
                <f7-input name="password" type="password" :placeholder="$t('loginRegister.reset.password')"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>{{$t('loginRegister.reset.confirm')}}</f7-label>
                <f7-input name="confirm" type="password" :placeholder="$t('loginRegister.reset.password')"></f7-input>
            </f7-list-item>
            <f7-block>
                <f7-button big raised fill color="green" v-on:click="reset">{{$t('loginRegister.reset.button.text')}}</f7-button>
            </f7-block>
        </f7-list>
</f7-page>
</template>

<script>
import axios from "axios"
import api from "api.js"
import store from "../../vuex/store.js"
import {
    setTimeout
} from 'timers';

let self;

export default {
    data() {
        return {
            logo: (localStorage.getItem('language_id') == 1 ? "static/img/Logo-en-big.png" : "static/img/Logo-ar-big.png"),
            email : ""
        }
    },
    mounted: function () {
        self = this;
        self.$f7.preloader.show();
        axios({
            method: "GET",
            url: api.baseUrl + api.urls.reset.replace("{code}",self.$f7route.query.code),
            headers: api.headers(sessionStorage.getItem('session_id')),
        }).then(function (response) {
            if (response.status == 200 && response.data.data.email) {
                self.email = response.data.data.email
            }
            self.$f7.preloader.hide();
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
            self.$f7router.navigate("/",{reloadCurrent:true})
        });
    },
    methods: {
        reset: function (event) {
            let self = this;
            self.$f7.preloader.show();
            let resetObj = self.$f7.form.convertToData("#reset");
            axios({
                method: "POST",
                url: api.baseUrl + api.urls.reset,
                headers: api.headers(sessionStorage.getItem('session_id')),
                data: {
                    "email": self.email,
                    "password": resetObj.password,
                    "confirm": resetObj.confirm
                }
            }).then(function (response) {
                let not = self.$f7.toast.create({
                    text: self.$t('login.notification.reset.success'),
                    closeTimeout: 3000,
                    destroyOnClose: true,
                    cssClass: 'toast-green',
                    position: 'top'
                });
                not.open();
                navigator.vibrate(100)
                self.$f7.preloader.hide();
                self.$f7router.navigate("/login",{reloadCurrent:true})
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

    }

}
</script>
