Package.describe({
  summary: "Objects with clean reactive properties, via ECMA-262 property get/set standards."
});

Package.on_use(function (api, where) {
  
  api.use(['deps'], ['client', 'server']);

  if(api.export) {
    api.export('ReactiveObjects', ['client', 'server']);
  }
  
  api.add_files([
    'lib/ReactiveObjects.js',
    'lib/removes.js',
    'lib/isa.js',
    'lib/transforms.js',
    'src/observe.js'],
    ['client', 'server']);

});

//this is a bit of a, total, hack but basically we are getting observe-js tag 'v0.2.0'
//We need to get the commit that the tag is tied to via ".../tarball/<commit>"
//Npm.depends({
//  "observe-js": "https://github.com/Polymer/observe-js/tarball/5805cbe3e022c8a3027c0d8a61ee96dc222b733c",
//  "async": "0.2.9"
//});

Package.on_test(function(api) {

  api.use(['reactive-objects'], ['client', 'server']);
  api.use(['tinytest', 'deps'], ['client', 'server']);

  api.add_files([
    'tests/public-api.tests.js',
    'tests/mixin.tests.js',
    'tests/private-api.tests.js'], 
    ['client', 'server']);

});
