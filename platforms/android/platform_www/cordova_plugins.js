cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-launch-review.LaunchReview",
    "file": "plugins/cordova-launch-review/www/launchreview.js",
    "pluginId": "cordova-launch-review",
    "clobbers": [
      "LaunchReview"
    ]
  },
  {
    "id": "cordova-plugin-customurlscheme.LaunchMyApp",
    "file": "plugins/cordova-plugin-customurlscheme/www/android/LaunchMyApp.js",
    "pluginId": "cordova-plugin-customurlscheme",
    "clobbers": [
      "window.plugins.launchmyapp"
    ]
  },
  {
    "id": "cordova-plugin-deeplinks.universalLinks",
    "file": "plugins/cordova-plugin-deeplinks/www/universal_links.js",
    "pluginId": "cordova-plugin-deeplinks",
    "clobbers": [
      "universalLinks"
    ]
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-inappbrowser.inappbrowser",
    "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
    "pluginId": "cordova-plugin-inappbrowser",
    "clobbers": [
      "cordova.InAppBrowser.open",
      "window.open"
    ]
  },
  {
    "id": "cordova-plugin-network-information.network",
    "file": "plugins/cordova-plugin-network-information/www/network.js",
    "pluginId": "cordova-plugin-network-information",
    "clobbers": [
      "navigator.connection",
      "navigator.network.connection"
    ]
  },
  {
    "id": "cordova-plugin-network-information.Connection",
    "file": "plugins/cordova-plugin-network-information/www/Connection.js",
    "pluginId": "cordova-plugin-network-information",
    "clobbers": [
      "Connection"
    ]
  },
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  },
  {
    "id": "es6-promise-plugin.Promise",
    "file": "plugins/es6-promise-plugin/www/promise.js",
    "pluginId": "es6-promise-plugin",
    "runs": true
  },
  {
    "id": "cordova-plugin-x-socialsharing.SocialSharing",
    "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
    "pluginId": "cordova-plugin-x-socialsharing",
    "clobbers": [
      "window.plugins.socialsharing"
    ]
  },
  {
    "id": "onesignal-cordova-plugin.OneSignal",
    "file": "plugins/onesignal-cordova-plugin/www/OneSignal.js",
    "pluginId": "onesignal-cordova-plugin",
    "clobbers": [
      "OneSignal"
    ]
  },
  {
    "id": "kommunicate-cordova-plugin.kommunicate",
    "file": "plugins/kommunicate-cordova-plugin/www/kommunicate.js",
    "pluginId": "kommunicate-cordova-plugin",
    "clobbers": [
      "kommunicate"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-ios-export-compliance": "1.0.2",
  "cordova-ios-plugin-no-export-compliance": "0.0.5",
  "cordova-launch-review": "3.1.0",
  "cordova-plugin-customurlscheme": "4.3.0",
  "cordova-plugin-deeplinks": "1.1.0",
  "cordova-plugin-device": "2.0.2",
  "cordova-plugin-inappbrowser": "2.0.2",
  "cordova-plugin-network-information": "2.0.1",
  "cordova-plugin-splashscreen": "5.0.2",
  "cordova-plugin-vibration": "3.1.0",
  "cordova-plugin-whitelist": "1.3.3",
  "es6-promise-plugin": "4.1.0",
  "cordova-plugin-x-socialsharing": "5.3.1",
  "onesignal-cordova-plugin": "2.4.6",
  "cordova-plugin-add-swift-support": "1.7.2",
  "cordova-plugin-cocoapod-support": "1.6.0",
  "kommunicate-cordova-plugin": "0.4.6"
};
// BOTTOM OF METADATA
});