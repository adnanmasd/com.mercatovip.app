#!/usr/bin/env node

//
// This hook copies various resource files
// from our version control system directories
// into the appropriate platform specific location
//


// configure all the files to copy.
// Key of object is the source file,
// value is the destination location.
// It's fine to put all platforms' icons
// and splash screen files here, even if
// we don't build for all platforms
// on each developer's box.

var filestocopy = [
  {
    "res/icons/android/drawable-hdpi/ic_stat_onesignal_default.png":
    "platforms/android/app/src/main/res/drawable-hdpi/ic_stat_onesignal_default.png"
  },
  {
    "res/icons/android/drawable-mdpi/ic_stat_onesignal_default.png":
    "platforms/android/app/src/main/res/drawable-mdpi/ic_stat_onesignal_default.png"
  },
  {
    "res/icons/android/drawable-xhdpi/ic_stat_onesignal_default.png":
    "platforms/android/app/src/main/res/drawable-xhdpi/ic_stat_onesignal_default.png"
  },
  {
    "res/icons/android/drawable-xxhdpi/ic_stat_onesignal_default.png":
    "platforms/android/app/src/main/res/drawable-xxhdpi/ic_stat_onesignal_default.png"
  },
  {
    "res/icons/android/drawable-xxxhdpi/ic_stat_onesignal_default.png":
    "platforms/android/app/src/main/res/drawable-xxxhdpi/ic_stat_onesignal_default.png"
  },
  {
    "res/icons/android/drawable-xxxhdpi/ic_onesignal_large_icon_default.png":
    "platforms/android/app/src/main/res/drawable-xxxhdpi/ic_onesignal_large_icon_default.png"
  }
];

var fs = require('fs');
var path = require('path');

// no need to configure below
var rootdir = process.argv[2];

filestocopy.forEach(function(obj) {
    Object.keys(obj).forEach(function(key) {
        var val = obj[key];
        var srcfile = key;//path.join(rootdir, key);
        var destfile = val;//path.join(rootdir, val);
        console.log("copying "+srcfile+" to "+destfile);
        var destdir = path.dirname(destfile);
        if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
            fs.createReadStream(srcfile).pipe(
               fs.createWriteStream(destfile));
        }
    });
});
