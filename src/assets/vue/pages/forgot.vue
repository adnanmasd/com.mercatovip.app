<template>
<f7-page no-tabbar no-navbar tabs :page-content="true">
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
    <f7-list form id="forgotPass">
        <f7-list-item>
            <f7-label>{{$t('forgot.email')}}</f7-label>
            <f7-input name="email" type="email" :placeholder="$t('forgot.email')"></f7-input>
        </f7-list-item>

        <f7-block>
            <f7-button big raised fill color="green" v-on:click="forgot">{{$t('forgot.reset.button.text')}}</f7-button>
        </f7-block>
    </f7-list>
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
        }
    },
    mounted: function () {
        self = this;
    },
    methods: {
        forgot: function (event) {
            let self = this;
            self.$f7.preloader.show();
            let forgotObj = self.$f7.form.convertToData("#forgotPass");
            axios({
                method: "POST",
                url: api.baseUrl + api.urls.forgottenPass,
                headers: api.headers(localStorage.getItem('session_id')),
                data: {
                    "email": forgotObj.email
                }
            }).then(function (response) {
                let not = "";
                not = self.$f7.toast.create({
                    title: self.$t('forgot.success.title'),
                    text: self.$t('forgot.success.message'),
                    closeTimeout: 3000,
                    destroyOnClose: true,
                    cssClass: 'toast-green',
                    position: 'top'
                });
                not.open();
                navigator.vibrate(100)
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
            });
        },
    }

}
</script>
