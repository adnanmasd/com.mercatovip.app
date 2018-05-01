const Routes = [
  {
    name: "home",
    path: '/',
    component: require('./assets/vue/pages/home.vue')
  },
  {
    path: '/panel-left/',
    component: require('./assets/vue/pages/panel-left.vue')
  },
  {
    path: '/panel-right/',
    component: require('./assets/vue/pages/notifications.vue')
  },
  {
    path: '/checkout/',
    //component: require('./assets/vue/pages/checkout.vue'),
    async(routeTo, routeFrom, resolve, reject) {
      let user = localStorage.getItem('user')
      if (user == null || user == "null") {
        resolve({ component: require('./assets/vue/pages/loginRegister.vue') })
      } else {
        resolve({ component: require('./assets/vue/pages/checkout.vue') })
      }
    }
  },
  {
    path: '/confirm',
    component: require('./assets/vue/pages/confirm.vue'),
  },
  {
    path: '/thankyou',
    component: require('./assets/vue/pages/thankyou.vue'),
  },
  {
    path: '/wishlist',
    async(routeTo, routeFrom, resolve, reject) {
      let user = localStorage.getItem('user')
      if (user == null || user == "null") {
        resolve({ component: require('./assets/vue/pages/loginRegister.vue') })
      } else {
        resolve ({ component: require('./assets/vue/pages/wishlist.vue') })
      }
    }
  },
  {
    path: '/myorders',
    async(routeTo, routeFrom, resolve, reject) {
      let user = localStorage.getItem('user')
      if (user == null || user == "null") {
        resolve({ component: require('./assets/vue/pages/loginRegister.vue') })
      } else {
        resolve({ component: require('./assets/vue/pages/myorders.vue') })
      }
    }
  },
  {
    path: '/myorders/:order_id',
    async(routeTo, routeFrom, resolve, reject) {
      let user = localStorage.getItem('user')
      if (user == null || user == "null") {
        resolve({ component: require('./assets/vue/pages/loginRegister.vue') })
      } else {
        resolve({ component: require('./assets/vue/pages/order.vue') })
      }
    }
  },
  {
    path: '/track',
    component: require('./assets/vue/pages/track.vue'),
  },
  {
    path: '/result/:term',
    component: require('./assets/vue/pages/result.vue')
  },
  {
    path: '/daily_offers',
    component: require('./assets/vue/pages/daily_offers.vue')
  },
  {
    path: '/weekly_offers',
    component: require('./assets/vue/pages/weekly_offers.vue')
  },
  {
    path: '/information',
    component: require('./assets/vue/pages/information.vue')
  },
  {
    path: '/product',
    component: require('./assets/vue/pages/product.vue')
  },
  {
    path: '/category',
    component: require('./assets/vue/pages/category.vue'),
  },
  {
    path: '/dummyCategory',
    component: require('./assets/vue/pages/category_dummy.vue'),
  },
  {
    path: '/special',
    component: require('./assets/vue/pages/special.vue'),
  },
  {
    path: '/latest',
    component: require('./assets/vue/pages/latest.vue'),
  },
  {
    path: '/review',
    component: require('./assets/vue/pages/review.vue')
  },
  {
    path: '/login/',
    component: require('./assets/vue/pages/loginRegister.vue')
  },
  {
    path: '/thankyou/',
    component: require('./assets/vue/pages/thankyou.vue')
  },
  {
    path: '/notifications/',
    component: require('./assets/vue/pages/notifications.vue')
  },
  {
    path: '(.*)',
    url: './assets/vue/pages/404.vue',
  },
]

export default Routes
