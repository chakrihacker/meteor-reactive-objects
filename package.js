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
    'lib/transforms.js'],
    ['client', 'server']);

});

Package.on_test(function(api) {

  api.use('reactive-objects');
  api.use(['tinytest', 'deps'], ['client', 'server']);

  api.add_files([
    'tests/public-api.tests.js',
    'tests/mixin.tests.js',
    'tests/private-api.tests.js'], 
    ['client', 'server']);

});
