

<template>

<f7-page :name="'information'+information_id" no-tabbar>
    <f7-navbar :class="this.$theme.md ? 'color-black' : ''">
      <f7-nav-left>
        <f7-link class="back" icon-only>
            <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
        </f7-link>
      </f7-nav-left>
      <f7-nav-title>
        {{information.title | andFilter}}
      </f7-nav-title>
      <f7-nav-right>
        <f7-link icon-only class="disabled">
        </f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-block inner v-html="information.description">
    </f7-block>

</f7-page>

</template>

<script>

import axios from 'axios'
import api from 'api.js'

let self;

export default {
    data() {
            return {
                currentLanguageId: (localStorage.getItem('language_id')),
                currentLanguage: (localStorage.getItem('language_id') == 1 ? false : true),
                direction: (localStorage.getItem('language_id') == 1 ? "ltr" : "rtl"),
                information: [],
                information_id : ""
            }
        },
        filters: {
          andFilter(val){
            if(val)
            return val.replace(/&amp;/g,'&');
          }
        },
        mounted() {
            let self = this;
            self.$f7.preloader.show();
            self.information_id = this.$f7route.query.information_id
            axios({
              method : "GET",
              url : api.baseUrl + api.urls.getInformationById.replace("{id}", self.information_id),
              headers : api.headers(localStorage.getItem('session_id')),
              transformResponse: function(res) {
                  var newReq = res.replace(/[\r\n|\n\r]/g, '');
                  var newnewReq = newReq.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, "'").replace(/&amp;/g,"&").replace(/&nbsp;/g,"<br/>").replace(/src='/g,"src='https://mercatovip.com/");
                  return JSON.parse(newnewReq)
              }
            }).then(function(response){
              self.information = response.data.data
              self.$f7.preloader.hide();
            });
        },
        methods: {
        },
}

</script>
