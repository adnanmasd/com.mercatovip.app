<template>
  <f7-row>
    <f7-col width="50" :key="row.id" v-for="row in p">
      <f7-card>
        <f7-card-header>
          <div @click="navigate('/product?product_id=' + row.product_id)">
            <img :src="row.thumb" class="product-card-image">
            <span v-if="row.special" class="tag left-tag">{{getDiscount(row.special,row.price)}}%</span>
            <span v-if="is_new(row.date_added)" class="tag right-tag">NEW</span>
          </div>
        </f7-card-header>
        <f7-card-content>
          <div @click="navigate('/product?product_id=' + row.product_id)" class="color-black">
            <br>
            <span v-if="row.special" class="old-price">{{row.price_formated}}</span>
            <br>
            <span v-if="!row.special" class="price">{{row.price_formated}}</span>
            <span v-if="row.special" class="price">{{row.special_formated}}</span>
          </div>
        </f7-card-content>
      </f7-card>
    </f7-col>
  </f7-row>
</template>

<script>
import axios from "axios";
import store from "src/assets/vuex/store.js";
import cms_config from "cms.js";
import api from "api.js";
import { log } from "util";

var page = 1;

export default {
  name: "products-list",
  props: {
    conf: {
      required: true
    }
  },
  data() {
    return {
      p: [],
      is_p: false,
      loaded: false
    };
  },
  mounted() {
    var type = this.conf.type;
    var limit = this.conf.limit;
    var pagination = this.conf.pagination;
    var height = this.conf.height;

    var call = [];
    switch (type) {
      case "special":
        if (pagination) {
          call["url"] =
            api.baseUrl +
            api.urls.getSpecialsLimit
              .replace("{limit}", limit)
              .replace("{page}", page);
        } else {
          call["url"] =
            api.baseUrl + api.urls.getSpecialsLimit.replace("{limit}", limit).replace("{page}", "1");
        }
        break;
      case "random":
        call["url"] =
          api.baseUrl + api.urls.randomLimit.replace("{limit}", limit);
        break;
      case "latest":
        if (pagination) {
          call["url"] =
            api.baseUrl +
            api.urls.getLatestLimit
              .replace("{limit}", limit)
              .replace("{page}", page);
        } else {
          call["url"] =
            api.baseUrl + api.urls.getLatestLimit.replace("{limit}", limit).replace("{page}", "1");
        }
        break;
      case "bestsellers":
        if (pagination) {
          call["url"] =
            api.baseUrl +
            api.urls.getBestSellers
              .replace("{limit}", limit)
              .replace("{page}", page);
        } else {
          call["url"] =
            api.baseUrl + api.urls.getBestSellers.replace("{limit}", limit).replace("{page}", "1");
        }
        break;
    }

    var self = this;
    var headers = api.headers(localStorage.getItem("session_id"));
    headers["X-Oc-Image-Dimension"] = "227x237";
    axios({
      method: "GET",
      url: call.url,
      headers: headers,
      transformResponse: function(req) {
        var newReq = req.replace(/[\r\n|\n\r]/g, "");
        return JSON.parse(newReq);
      }
    })
      .then(function(response) {
        if (response.data.data != []) {
          self.p = response.data.data;
          self.loaded = true;
        }
      })
      .catch(function(error) {
        self.p = [];
      });
  },
  methods: {
    is_favourite(pid) {
      let wishlist = store.state.user ? store.state.user.wishlist : [];
      for (let j in wishlist) {
        if (wishlist[j].product_id == pid) return true;
      }
      return false;
    },
    addToWishlist(product_id) {
      self.$f7.preloader.show();
      axios({
        method: "POST",
        url: api.baseUrl + api.urls.wishlist.replace("{id}", product_id),
        headers: api.headers(localStorage.getItem("session_id"))
      })
        .then(function(response) {
          if (response.status == 200) {
            store.dispatch("fetchWishlist");
          }
        })
        .catch(function(error) {
          var t = self.$f7.toast.create({
            text: error.response.data.error,
            closeTimeout: 5000,
            destroyOnClose: true,
            position: "top",
            cssClass: "toast-red"
          });
          t.open();
          navigator.vibrate([80, 80, 80]);
        });
      self.$f7.preloader.hide();
    },
    removeFromWishlist(product_id) {
      self.$f7.preloader.show();
      axios({
        method: "DELETE",
        url: api.baseUrl + api.urls.wishlist.replace("{id}", product_id),
        headers: api.headers(localStorage.getItem("session_id"))
      })
        .then(function(response) {
          if (response.status == 200) {
            store.dispatch("fetchWishlist");
          }
        })
        .catch(function(error) {
          var t = self.$f7.toast.create({
            text: error.response.data.error,
            closeTimeout: 5000,
            destroyOnClose: true,
            position: "top",
            cssClass: "toast-red"
          });
          t.open();
          navigator.vibrate([80, 80, 80]);
        });
      self.$f7.preloader.hide();
    },
    is_new(date) {
      var d = Date.parse(date);
      var t = new Date();
      return Math.round((t - d) / (1000 * 60 * 60 * 24)) <= 30;
    },
    getDiscount(discount, price) {
      let val = 1 - discount / price;
      return Math.floor(val * 100);
    },
    navigate(link) {
      this.$f7router.navigate(link);
    }
  }
};
</script>
