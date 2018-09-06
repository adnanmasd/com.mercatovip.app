

<template>

<f7-page name="404" no-tabbar>
    <f7-navbar sliding :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left sliding>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title sliding>
            404
        </f7-nav-title>
        <f7-nav-right sliding>
            <f7-link icon-only>
            </f7-link>
        </f7-nav-right>
    </f7-navbar>

    <f7-block>
        Page Not Found
    </f7-block>

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
            }
        },
        computed: {
            cart: {
                get: function() {
                    return store.state.cart
                }
            },

        },
        mounted: function() {
            self = this;
            
        }
}

</script>
