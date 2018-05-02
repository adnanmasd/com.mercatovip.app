

<template>

<f7-page :name="'category'+category.name[currentLanguageId]" no-tabbar>
    <f7-navbar sliding :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left sliding>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title>
            {{category.name[currentLanguageId] | andFilter}}
        </f7-nav-title>
        <f7-nav-right sliding>
            <f7-link popup-open="#filter" icon-only>
                <f7-icon fa="filter">
                </f7-icon>
            </f7-link>
        </f7-nav-right>
        <f7-subnavbar :inner="false">
            <f7-searchbar id="search_cat" search-list="#search-list" :placeholder="$t('home.searchbar.placeholder')" :clear-button="true" customSearch v-model="searchTerm">
            </f7-searchbar>

        </f7-subnavbar>
    </f7-navbar>

    <f7-block v-if="category.sliders != [] && category.sliders.length > 0">
        <f7-swiper pagination :params="{loop:false,spaceBetween: 10,centeredSlides:true,autoplay:5000}">
            <f7-swiper-slide v-for="row in category.sliders" class="image-slider">
                <span v-if="getText(row.value)" class="slider-title">{{getText(row.value)}}</span>
                <img @click="navigate(row.value.link)" :src="getCMSImage(row.value)" class="slider">
                <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </f7-swiper-slide>
        </f7-swiper>
    </f7-block>
    <f7-block v-if="category.banners != [] && category.banners.length > 0">
        <f7-row class="full-width">
            <f7-col v-for="row in category.banners" width="50">
                <f7-link :href="row.value.link">
                    <span class="banner-title">{{getText(row.value)}}</span>
                    <img :src="getCMSImage(row.value)" class="banner lazy swiper-lazy">
                </f7-link>
            </f7-col>
        </f7-row>
    </f7-block>

</f7-page>

</template>

<script>

import axios from 'axios'
import api from 'api.js'
import cms from 'cms.js'
import store from '../../vuex/store.js'

var timeout;
var page = 0;
var limit = 10;

export default {
    data() {
            return {
                items: localStorage.getItem("recentSearch") == null ? [] : JSON.parse(localStorage.getItem("recentSearch").split(",")),
                searchTerm : "",
                currentLanguageId: (localStorage.getItem('language_id')),
                currentLanguage: (localStorage.getItem('language_id') == 1 ? false : true),
                direction: (localStorage.getItem('language_id') == 1 ? "ltr" : "rtl"),
                sliderCategory: [],
                bannerCategory: [],
                category: {
                  "name" : {
                    0 : "",
                    1 : ""
                  },
                  sliders: [],
                  banners: []
                },
                today: new Date(),
                loading: true,
                noResult: false,
                theme: this.$theme
            }
        },
        computed: {
            cart: {
                get: function() {
                    return store.state.cart
                }
            },
        },
        filters: {
            andFilter(val) {
                if (val)
                    return val.replace(/&amp;/g, '&');
            }
        },
        mounted() {
            let self = this;
            self.$f7.preloader.show();
            page = 0;
            let category_id = self.$f7route.query.category_id
            axios({
                method: "POST",
                url: cms.baseUrl + cms.collectionPath + cms.dummyCategory + cms.tokenVar,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    filter: {
                        'id': category_id
                    },
                }
            }).then(function(response) {
                self.category = response.data.entries[0]
                //console.log(self.category);
                self.$f7.preloader.hide();
            });

            self.Dom7('#search_cat').on('keyup', function(e) {
                if (e.which == 13) {
                    self.onSearch(e);
                }
            })

            var autocompleteSearchbar = self.$f7.autocomplete.create({
                openIn: 'dropdown',
                inputEl: '#search_cat input[type="search"]',
                //dropdownPlaceholderText: 'Type "Apple"',
                source: function(query, render) {
                    var results = [];
                    if (query.length === 0) {
                        render(results);
                        return;
                    }
                    // Find matched items
                    for (var i = 0; i < self.items.length; i++) {
                        if (self.items[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(self.items[i]);
                    }
                    // Render items by passing array with result items
                    render(results);
                },
                on: {
                    change: function(autocomplete, value) {
                        self.onSearch();
                    }
                }
            })
        },
        methods: {
                andFilter(val) {
                    if (val)
                        return val.replace(/&amp;/g, '&');
                },
                getImagefromSource(src) {
                    return "<img src='" + src + "'/>";
                },
                getCMSImage(value) {
                    let str = "img" + this.currentLanguageId;
                    let name =  value[str].path
                    if (name.indexOf("http") == -1) {
                        return "https://mercatovip.com/app/" + name;
                    } else {
                        return name;
                    }
                },
                navigate(link) {
                    this.$f7router.navigate(link);
                },
                onSearch: function(event) {
                    let self = this;
                    let $$ = self.Dom7;
                    let val = $$('form#search_cat input').val();
                    console.log(val);
                    let obj = localStorage.getItem("recentSearch") == null ? [] : JSON.parse(localStorage.getItem("recentSearch"));
                    if (obj.indexOf(val) === -1) {
                        obj.push(val)
                    }
                    localStorage.setItem("recentSearch", JSON.stringify(obj))
                    self.items = JSON.parse(localStorage.getItem("recentSearch").split(","))
                    $$("#search input").blur();
                    self.$f7.searchbar.toggle("#search_cat")
                    self.$f7router.navigate("/result/" + val)
                },
                getText(value){
                  let str = "txt" + this.currentLanguageId
                  return value[str];
                },
                getPath(value){
                  let str = "img" + this.currentLanguageId
                  return value[str];
                }
        },
}

</script>
