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
    path: '/checkout/',
    component: require('./assets/vue/pages/checkout.vue'),
  },
  {
    path: '/confirm',
    component: require('./assets/vue/pages/confirm.vue'),
  },
  {
    path: '/wishlist/',
    component: require('./assets/vue/pages/wishlist.vue'),
  },
  {
    path: '/myorders',
    component: require('./assets/vue/pages/myorders.vue'),
  },
  {
    path: '/myorders/:order_id',
    component: require('./assets/vue/pages/order.vue'),
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
]

export default Routes
