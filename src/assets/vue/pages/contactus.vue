
<template>

<f7-page no-tabbar>
    <f7-navbar sliding :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left sliding>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title sliding>
            {{$t('contactus.title')}}
        </f7-nav-title>
        <f7-nav-right sliding>
            <f7-link icon-only>
            </f7-link>
        </f7-nav-right>
    </f7-navbar>
    <f7-block>
    <f7-list form id="contact">
        <f7-list-item>
            <f7-label>{{$t('contactus.name')}}</f7-label>
            <f7-input name="name" type="text" :placeholder="$t('contactus.name.placeholder')"></f7-input>
        </f7-list-item>
        <f7-list-item>
            <f7-label>{{$t('contactus.email')}}</f7-label>
            <f7-input name="email" type="email" :placeholder="$t('contactus.email.placeholder')"></f7-input>
        </f7-list-item>
        <f7-list-item>
            <f7-label>{{$t('contactus.comment')}}</f7-label>
            <f7-input name="enquiry" type="textarea" :placeholder="$t('contactus.comment.placeholder')"></f7-input>
        </f7-list-item>
        <br/>
        <f7-button @click="sendMessage()" big round fill color="green">{{$t('contactus.submit')}}</f7-button>
    </f7-list>
    </f7-block>

</f7-page>

</template>

<script>

import api from 'api.js'
import axios from 'axios'

let self;

export default {
    mounted() {
            self = this;
            self.$f7.preloader.show();
            self.$f7.preloader.hide();
        },
        methods: {
            sendMessage() {
                self.$f7.preloader.show();
                let formData = self.$f7.form.convertToData('#contact');
                axios({
                    method: "POST",
                    url: api.baseUrl + api.urls.sendContactUs,
                    headers: api.headers(localStorage.getItem('session_id')),
                    data: {
                        "name": formData.name,
                        "email": formData.email,
                        "enquiry": formData.enquiry,
                    }
                }).then(function(response) {
                    var t = self.$f7.toast.create({
                        text: self.$t('contactus.sumbit.success.msg'),
                        closeTimeout: 5000,
                        destroyOnClose: true,
                        position: 'top',
                        cssClass : 'toast-green'
                    });
                    t.open();
                    navigator.vibrate(100)
                    self.$f7.preloader.hide();
                    self.$f7.router.back();
                }).catch(function(error) {
                    var t = self.$f7.toast.create({
                        text: error.response.data.error,
                        closeTimeout: 5000,
                        destroyOnClose: true,
                        position: 'top',
                        cssClass : 'toast-red'
                    });
                    t.open();
                    navigator.vibrate([80,80,80])
                    self.$f7.preloader.hide();
                });
            },
        }
}

</script>
