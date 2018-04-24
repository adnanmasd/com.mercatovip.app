

<template>

<f7-page no-tabbar>
    <f7-navbar sliding :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left sliding>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title sliding>
            {{$t('review.title')}}
        </f7-nav-title>
        <f7-nav-right sliding>
            <f7-link icon-only>
            </f7-link>
        </f7-nav-right>
    </f7-navbar>
    <f7-block-title>{{$t('review.title')}}</f7-block-title>
    <f7-list form id="review">
        <f7-list-item>
            <f7-label>{{$t('review.name')}}</f7-label>
            <f7-input name="name" type="text" :placeholder="$t('review.name.placeholder')"></f7-input>
        </f7-list-item>
        <f7-list-item>
            <f7-label>{{$t('review.comment')}}</f7-label>
            <f7-input name="text" type="textarea" :placeholder="$t('review.comment.placeholder')"></f7-input>
        </f7-list-item>
        <f7-list-item group-title>{{$t('review.rating')}}</f7-list-item>
        <f7-list-item radio name="rating" value="1" checked>
            <div slot="inner"><i class='icon md-36 f7-icons' style='color:orange'>star_fill</i></div>
        </f7-list-item>
        <f7-list-item radio name="rating" value="2">
            <div slot="inner"><i class='icon md-36 f7-icons' style='color:orange'>star_fill</i><i class='icon md-36 f7-icons' style='color:orange'>star_fill</i></div>
        </f7-list-item>
        <f7-list-item radio name="rating" value="3">
            <div slot="inner"><i class='icon md-36 f7-icons' style='color:orange'>star_fill</i><i class='icon md-36 f7-icons' style='color:orange'>star_fill</i><i class='icon md-36 f7-icons' style='color:orange'>star_fill</i></div>
        </f7-list-item>
        <f7-list-item radio name="rating" value="4">
            <div slot="inner"><i class='icon md-36 f7-icons' style='color:orange'>star_fill</i><i class='icon md-36 f7-icons' style='color:orange'>star_fill</i><i class='icon md-36 f7-icons' style='color:orange'>star_fill</i><i class='icon md-36 f7-icons' style='color:orange'>star_fill</i></div>
        </f7-list-item>
        <f7-list-item radio name="rating" value="5">
            <div slot="inner"><i class='icon md-36 f7-icons' style='color:orange'>star_fill</i><i class='icon md-36 f7-icons' style='color:orange'>star_fill</i><i class='icon md-36 f7-icons' style='color:orange'>star_fill</i><i class='icon md-36 f7-icons' style='color:orange'>star_fill</i>
                <i
                class='icon md-36 f7-icons' style='color:orange'>star_fill</i>
            </div>
        </f7-list-item>
        <br/>
        <f7-button @click="addReview()" big round color="white" class="bg-green">{{$t('review.submit')}}</f7-button>
    </f7-list>

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
            self.product_id = this.$f7route.query.product_id
            self.$f7.preloader.hide();
        },
        methods: {
            addReview() {
                self.$f7.preloader.show();
                let formData = window.f7.form.convertToData('#review');
                axios({
                    method: "POST",
                    url: api.baseUrl + api.urls.createProductReviews.replace("{id}", self.$f7route.query.product_id),
                    headers: api.headers,
                    data: {
                        "name": formData.name,
                        "text": formData.text,
                        "rating": formData.rating,
                    }
                }).then(function(response) {
                    var t = self.$f7.toast.create({
                        text: self.$t('review.submit.success.msg'),
                        closeTimeout: 5000,
                        destroyOnClose: true,
                        position: 'top',
                        cssClass : 'toast-green'
                    });
                    t.open();
                    navigator.vibrate(100)
                    self.$f7.preloader.hide();
                    self.$f7router.back();
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
