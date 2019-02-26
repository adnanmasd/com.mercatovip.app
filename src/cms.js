export default {
  token : '8933c35d4a80a8d75f53088d3d4ae0',
  //token : '2cc9a3aa72371e30c2e227eba69d21',
  tokenVar : '?token=8933c35d4a80a8d75f53088d3d4ae0&populate=100',
  //tokenVar : '?token=2cc9a3aa72371e30c2e227eba69d21&populate=100',  
  baseUrl : 'https://mercatovip.com/app/cms',
  //baseUrl : 'https://dyourw.com/app',
  collectionPath : '/api/collections/get',
  singletonPath : '/api/singletons/get',
  regionsPath : '/api/regions/data',
  sliderHome : '/Slider',
  sliderCategory : '/SliderCategory',
  dummyCategory : '/DummyCategory',
  bannerHome : '/BannerHome',
  specialBannersHome : '/SpecialBannersHome',
  homePageProducts : '/HomePageProducts',
  sideBarCategories : '/SideBarCategories',
  sideBarTools : '/SideBarTools',
  sideBarInfo : '/SideBarInfo',
  getReigion: function(name) {
    return this.regionsPath + '/' + name
  },
  getCollection: function(name) {
    return this.collectionPath + '/' + name
  },
  getSingleton: function(name) {
    return this.singletonPath + '/' + name
  }
};
