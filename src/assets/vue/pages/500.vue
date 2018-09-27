

<template>

<f7-page name="500" no-tabbar>
    <f7-navbar sliding :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left sliding>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title sliding>
            {{$t('500.title')}}
        </f7-nav-title>
        <f7-nav-right sliding>
            <f7-link icon-only>
            </f7-link>
        </f7-nav-right>
    </f7-navbar>

    <f7-block>
        <img src="static/img/500.png" class="display-flex align-self-center align-items-center" style="margin:0 auto"/>
        </f7-block>
        <f7-block>
        {{$t('500.message')}}
        </f7-block>
        <!--f7-block>
            <div class="list inset">
                <ul>
                    <li>
                        <f7-button :text="$t('500.button2.text')" big fill color="green" href="/"></f7-button>
                    </li>
                </ul>
            </div>
    </f7-block-->

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
