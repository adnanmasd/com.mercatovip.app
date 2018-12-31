const Routes = [
  {
    name: "home",
    path: '/',
    component: require('./assets/vue/pages/home.vue'),
    tabs: [
      // First (default) tab has the same url as the page itself
      {
        // Tab path
        path: '/',
        id: 'hometab',
      },
      // Second tab
      {
        path: '/cart/',
        id: 'carttab',
      },
      // Third tab
      {
        path: '/profile/',
        id: 'profiletab',
      },
    ],
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
    path: '/profile',
    async(routeTo, routeFrom, resolve, reject) {
      let user = localStorage.getItem('user')
      if (user == null || user == "null") {
        resolve({ component: require('./assets/vue/pages/loginRegister.vue') })
      } else {
        resolve({ component: require('./assets/vue/pages/profile.vue') })
      }
    }
  },
  {
    path: '/address',
    async(routeTo, routeFrom, resolve, reject) {
      let user = localStorage.getItem('user')
      if (user == null || user == "null") {
        resolve({ component: require('./assets/vue/pages/loginRegister.vue') })
      } else {
        resolve({ component: require('./assets/vue/pages/address.vue') })
      }
    }
  },
  {
    path: '/address_new',
    async(routeTo, routeFrom, resolve, reject) {
      let user = localStorage.getItem('user')
      if (user == null || user == "null") {
        resolve({ component: require('./assets/vue/pages/loginRegister.vue') })
      } else {
        resolve({ component: require('./assets/vue/pages/address_new.vue') })
      }
    }
  },
  {
    path: '/address/:addressId',
    async(routeTo, routeFrom, resolve, reject) {
      let user = localStorage.getItem('user')
      if (user == null || user == "null") {
        resolve({ component: require('./assets/vue/pages/loginRegister.vue') })
      } else {
        resolve({ component: require('./assets/vue/pages/address_form.vue') })
      }
    }
  },
  {
    path: '/wallet',
    async(routeTo, routeFrom, resolve, reject) {
      let user = localStorage.getItem('user')
      if (user == null || user == "null") {
        resolve({ component: require('./assets/vue/pages/loginRegister.vue') })
      } else {
        resolve({ component: require('./assets/vue/pages/wallet.vue') })
      }
    }
  },
  {
    path: '/returns',
    async(routeTo, routeFrom, resolve, reject) {
      let user = localStorage.getItem('user')
      if (user == null || user == "null") {
        resolve({ component: require('./assets/vue/pages/loginRegister.vue') })
      } else {
        resolve({ component: require('./assets/vue/pages/returns.vue') })
      }
    }
  },
  {
    path: '/returns/:return_id',
    async(routeTo, routeFrom, resolve, reject) {
      let user = localStorage.getItem('user')
      if (user == null || user == "null") {
        resolve({ component: require('./assets/vue/pages/loginRegister.vue') })
      } else {
        resolve({ component: require('./assets/vue/pages/return.vue') })
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
    path: '/tag',
    component: require('./assets/vue/pages/tag.vue')
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
    path: '/forgot/',
    component: require('./assets/vue/pages/forgot.vue')
  },
  {
    path: '/setPassword',
    component: require('./assets/vue/pages/setPassword.vue')
  },
  {
    path: '/contact',
    component: require('./assets/vue/pages/contactus.vue')
  },
  {
    path: '/404',
    component: require('./assets/vue/pages/404.vue'),
  },
  {
    path: '/500',
    component: require('./assets/vue/pages/500.vue'),
  },
  {
    path: '(.*)',
    component: require('./assets/vue/pages/404.vue'),
  },
]

export default Routes
