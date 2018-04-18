//paFHpZOVS70j4UTfWsEGB5CtXTjnIjc7
//4RsyLcNY41FH1WGWWlxCLow8GVFrWZIR
let base_url = "https://mercatovip.com/api/rest";
//let base_url = "https://dyourw.com/demo/api/rest";

let headers = {
  "X-Oc-Merchant-Id" :	"4RsyLcNY41FH1WGWWlxCLow8GVFrWZIR",
  "X-Oc-Merchant-Language" : localStorage.getItem('language_code'),
  "X-Oc-Session" : localStorage.getItem('session_id') ? localStorage.getItem('session_id') : '',
  "Content-Type" : "application/json",
  "Accept" : "application/json",
};

export default {
  "baseUrl" : base_url,
  "headers" : headers,
  "urls" : {
    "getSession" : "/session",
    "loginRM" : "/login_rm",
    "listAddress" : "/account/address",
    "addressById" : "/account/address/{id}",
    "getAccountDetails" : "/account",
    "changePass" : "/account/password",
    "forgottenPass" : "/forgotten",
    "login" : "/login",
    "logout" : "/logout",
    "register" : "/register",
    "subscribeNL" : "/newsletter/subscribe",
    "unsubscribeNL" : "/newsletter/unsubscribe",
    "getorderById" : "/customerorders/{id}",
    "reorderById" : "/customerorders/{id}/product_id/{order_product_id}",
    "getOrderList" : "/customerorders/limit/{limit}/page/{page}",
    "getTransaction" : "/account/transactions",
    "cart" : "/cart",
    "cartBulk" : "/cart_bulk",
    "deleteCartItem" : "/cart/{key}",
    "emptyCart" : "/cart/empty",
    "getCategory" : "/categories",
    "getCategoryById" : "/categories/{id}",
    "getCategoriesByLevel" : "/categories/level/{level}",
    "getSubCategories" : "/categories/parent/{parent}",
    "getSubCategoriesByLevel" : "/categories/{parent}/level/{level}",
    "getChecksum" : "/checksums",
    "sendContactUs" : "/contact",
    "getAllCountries" : "/countries",
    "getAllZonesByCountry" : "/countries/{id}",
    "coupon" : "/coupon",
    "createGuestUser" : "/guest",
    "createSuestShippingAddress" : "/guestshipping",
    "getAllInformation" : "/information",
    "getInformationById" : "/information/{id}",
    "getLanguages" : "/languages",
    "getLanguageById" : "/languages/{id}",
    "getAllManufacturers" : "/manufacturers",
    "getManufacturerById" : "/manufacturer/{id}",
    "confirmOrder" : "/confirm",
    "startPayment" : "/pay",
    "getAllOrderStatuses" : "/order_statuses",
    "addOrderHistory" : "/order_history/{id}",
    "getUTCOffset" : "/utc_offset",
    "simpleConfirmOrder" : "/simpleconfirm",
    "paymentAddress" : "/paymentaddress",
    "setExistingPaymentAddress" : "/paymentaddress/existing",
    "paymentMethods" : "/paymentmethods",
    "getAllProducts" : "/products",
    "getProductById" : "/products/{id}",
    "getProductsByCategory" : "/products/category/{id}",
    "getProductsByCategoryFilter" : "/products/category/{id}/filters/{filters}",
    "getProductsByCategoryFilterPageLimit" : "/products/category/{id}/limit/{limit}/page/{page}",
    "customSearch" : "/products/custom_search/limit/{limit}/page/{page}",
    "getProductsByManufacturer" : "/products/manufacturer/{id}",
    "getProductsByManufacturerPageLimit" : "/products/manufacturer/{id}/limit/{limit}/page/{page}",
    "searchProducts" : "/products/search/{search}",
    "searchProductsPageLimit" : "/products/search/{search}/limit/{limit}/page/{page}",
    "getSimpleProducts" : "/products/simple",
    "getProductsWithFields" : "/products/simple/customfields/{customfields}",
    "getBestSellers" : "/bestsellers/limit/{limit}",
    "getCompareProducts" : "/compare/{ids}",
    "getFeatured" : "/featured",
    "getFeaturedLimit" : "/featured/limit/{limit}",
    "getLatest" : "/latest",
    "getLatestLimit" : "/latest/limit/{limit}",
    "getRelatedProducts" : "/related/{id}",
    "createProductReviews" : "/products/{id}/review",
    "getClasses" : "/product_classes",
    "getSpecials" : "/specials",
    "getSpecialsLimit" : "/specials/limit/{limit}",
    "returns" : "/returns",
    "getReturnDetail" : "/returns/{id}",
    "reward" : "/reward",
    "shippingAddress" : "/shippingaddress",
    "setExistingShippingAddress" : "/shippingaddress/existing",
    "shippingMethods" : "/shippingmethods",
    "getStores" : "/stores",
    "getStoreById" : "/stores/{id}",
    "voucher" : "/voucher",
    "getWishlist" : "/wishlist",
    "wishlist" : "/wishlist/{id}",
    "producturl" : "/producturl/{id}"
  }

}
