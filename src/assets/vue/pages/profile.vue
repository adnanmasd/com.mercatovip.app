<template>
<f7-page no-tabbar>
    <f7-navbar :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left>
            <f7-link icon-only class="back">
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title>
            {{$t('profile.title')}}
        </f7-nav-title>
        <f7-nav-right>
            <f7-link icon-only>
                <f7-link icon-f7="reload" sheet-open=".my-sheet"></f7-link>
            </f7-link>
        </f7-nav-right>
    </f7-navbar>

    <div class="sheet-modal my-sheet">
        <div class="toolbar">
            <div class="toolbar-inner">
                <div class="left"></div>
                <div class="right">
                    <a class="link icon-only sheet-close" href="#">
                        <f7-icon icon="fa fa-times"></f7-icon>
                    </a>
                </div>
            </div>
        </div>
        <div class="sheet-modal-inner">
            <div class="block-title">{{$t('profile.changePass.title')}}</div>
            <div class="block" id="changePass">
                <f7-list form>
                    <f7-list-item>
                        <f7-input required validate name="password" type="password" :placeholder="$t('profile.password.placeholder')"></f7-input>
                    </f7-list-item>
                    <f7-list-item>
                        <f7-input required validate name="confirm" type="password" :placeholder="$t('profile.confirm')"></f7-input>
                    </f7-list-item>
                </f7-list>
                <f7-button fill big raised @click="change()" color="green">{{$t('profile.changePass')}}</f7-button>
            </div>
        </div>
    </div>

    <f7-list form inset style="margin: 0" id="profile">
        <f7-list-item>
            <f7-label>{{$t('profile.firstname')}}</f7-label>
            <f7-input required validate name="firstname" type="text" :placeholder="$t('profile.firstname')" :value="userinfo.firstname"></f7-input>
        </f7-list-item>
        <f7-list-item>
            <f7-label>{{$t('profile.lastname')}}</f7-label>
            <f7-input required validate name="lastname" type="text" :placeholder="$t('profile.lastname')" :value="userinfo.lastname"></f7-input>
        </f7-list-item>
        <f7-list-item>
            <f7-label>{{$t('profile.email')}}</f7-label>
            <f7-input required validate name="email" type="email" :placeholder="$t('profile.email')" :value="userinfo.email"></f7-input>
        </f7-list-item>
        <f7-list-item>
            <f7-label>{{$t('profile.mobile')}}</f7-label>
            <f7-row>
                <f7-col width="20">
                    +966
                </f7-col>
                <f7-col width="80">
                    <f7-input validate name="telephone" type="tel" :placeholder="$t('profile.mobile.placeholder')" :value="userinfo.telephone"></f7-input>
                </f7-col>
            </f7-row>
        </f7-list-item>
    </f7-list>
    <f7-block>
        <f7-button big raised fill color="blue" @click="save()">{{$t('profile.button.txt')}}</f7-button>
    </f7-block>

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
            userinfo: []
        }
    },
    mounted: function () {
        self = this;
        self.$f7.preloader.show();
        axios({
            method: "GET",
            headers: api.headers(sessionStorage.getItem('session_id')),
            url: api.baseUrl + api.urls.getAccountDetails
        }).then(function (response) {
            localStorage.setItem("user", true);
            store.dispatch("saveUser", response.data.data)
            self.userinfo = response.data.data
            self.$f7.preloader.hide();
        });
    },
    methods: {
        change: function () {
            let changePassObj = self.$f7.form.convertToData("#changePass");
            axios({
                method: "PUT",
                url: api.baseUrl + api.urls.changePass,
                headers: api.headers(sessionStorage.getItem('session_id')),
                data: {
                    "password": changePassObj.password,
                    "confirm": changePassObj.confirm
                }
            }).then(function (response) {
                self.$f7.sheet.close(".my-sheet", true);
                var t = self.$f7.toast.create({
                    text: self.$t('profile.changePass.success.message'),
                    closeTimeout: 5000,
                    destroyOnClose: true,
                    position: 'top',
                    cssClass: 'toast-green'
                });
                t.open();
                navigator.vibrate([80])
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
        save: function (event) {
            let self = this;
            self.$f7.preloader.show();
            let profileObj = self.$f7.form.convertToData("#profile");
            axios({
                method: "PUT",
                url: api.baseUrl + api.urls.getAccountDetails,
                headers: api.headers(sessionStorage.getItem('session_id')),
                data: {
                    "firstname": registerObj.firstname,
                    "lastname": registerObj.lastname,
                    "email": registerObj.email,
                    "telephone": registerObj.telephone ? registerObj.telephone : "+966000000000",
                    "fax": registerObj.fax
                }
            }).then(function (response) {

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
