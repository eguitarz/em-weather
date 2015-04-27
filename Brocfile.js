/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');

var app = new EmberApp();

app.import("bower_components/typeahead.js/dist/typeahead.jquery.min.js");
app.import("bower_components/typeahead.js/dist/bloodhound.min.js");
app.import("bower_components/jquery-ui/jquery-ui.min.js");

app.import("bower_components/jquery-ui/themes/redmond/jquery-ui.css");
app.import("bower_components/weather-icons/css/weather-icons.css");

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

// module.exports = app.toTree();
// Copy only the relevant files:
var fontOpenSans = pickFiles('bower_components/weather-icons/font', {
   srcDir: '/',
   files: ['**/*.eot', '**/*.svg', '**/*.woff', '**/*.ttf', '**/*.otf'],
   destDir: '/font'
});

// Merge the app tree and our new font assets.
module.exports = mergeTrees([app.toTree(), fontOpenSans]);