var fs = require('fs');
var path = require('path');

module.exports = function(ctx) {
  var pathToManifest = path.join(ctx.opts.projectRoot, 'platforms', 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
  var manifestContent = fs.readFileSync(pathToManifest, 'utf8');
  manifestContent = manifestContent.replace('singleTop', 'singleInstance');

  fs.writeFileSync(pathToManifest, manifestContent, 'utf8');
};
