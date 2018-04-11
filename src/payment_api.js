let checkout_script_url = "https://test.oppwa.com/v1/paymentWidgets.js?checkoutId="
//"https://oppwa.com/v1/paymentWidgets.js?checkoutId=";

let checkout_url = "https://test.oppwa.com/v1/checkouts";
//https://oppwa.com/v1/checkouts";

//https://oppwa.com/v1/checkouts/{token}/payment
let payment_url = "https://test.oppwa.com/v1/checkouts/{token}/payment"

export default {
  "checkout_script_url" : checkout_script_url,
  "checkout_url" : checkout_url,
  "payment_url" : payment_url,
  "channel" : "8a8294185fe82705015ffda8df2235a6",
  "mode" : "CONNECTOR_TEST",
  "login" : "8a8294185fe82705015ffda8962e35a2",
  "pwd" : "7AsMBZPg48",
  "type" : "DB",
  "brands" : ["VISA","MASTER"],
  "style" : "card"
}
