

<template>

<f7-page :dir="direction">
    <div class="list media-list chevron-center">
        <ul>
          <li class="list-group-title">Notifications</li>
            <li v-for="not,key in notifications">
                <a v-if="not.additionalData != ''" @click="readNotification(key)" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title-row">
                            <div class="item-title"><strong>{{not.title}}</strong></div>
                            <div class="item-after">{{getDate(not.date)}}</div>
                        </div>
                        <div class="item-subtitle" style="overflow: visible;white-space:pre-wrap;">{{not.body}}</div>
                        <div class="item-text"><img v-if="not.bigPicture != null" :src="not.bigPicture" /></div>
                    </div>
                </a>
                <a v-else @click="readNotification(key)" class="item-content text-color-black">
                    <div class="item-inner">
                        <div class="item-title-row">
                            <div class="item-title"><strong>{{not.title}}</strong></div>
                            <div class="item-after">{{getDate(not.date)}}</div>
                        </div>
                        <div class="item-subtitle" style="overflow: visible;white-space:pre-wrap;">{{not.body}}</div>
                        <div class="item-text"><img v-if="not.bigPicture != null" :src="not.bigPicture" /></div>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</f7-page>

</template>

<script>

import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import axios from 'axios'

import store from 'src/assets/vuex/store.js'
import cms_config from 'cms.js'
import api from 'api.js'

let self;

export default {

    data() {
            return {
                currentLanguageId: (localStorage.getItem('language_id')),
                currentLanguage: (localStorage.getItem('language_id') == 1 ? false : true),
                direction: (localStorage.getItem('language_id') == 1 ? "ltr" : "rtl"),
                sideBarPos: (localStorage.getItem('language_id') == 1 ? "right" : "left"),
                theme: this.$theme,
                //notifications : JSON.parse(localStorage.getItem('notifications'))
            }
        },
        mounted: function() {
            self = this;
            store.dispatch("notifications");
        },
        filters: {

        },
        computed: {
          notifications: {
              get: function() {
                  return store.state.notifications
              }
          },
        },
        methods: {
          readNotification(id){
            let self = this;
            //console.log(id);
            let notification = self.notifications[id]
            delete store.state.notifications[id];
            store.state.notifications = JSON.stringify(self.notifications)
            localStorage.setItem('notifications', JSON.stringify(self.notifications))
            if (notification.additionalData.path !== ""){
              self.$f7.panel.close();
              self.$f7.view[2].router.navigate(notification.additionalData.path);
            }
          },
          getDate(date){
            return ""; //date;
          }
        }
};

</script>
