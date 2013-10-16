Package.describe({
  summary: "Objects with clean reactive properties, via ECMA-262 property get/set standards."
});

Package.on_use(function (api, where) {
  if(api.export) {
    api.use(['deps'], ['client', 'server']);
    api.export('ReactiveObjects', ['client', 'server']);
  }
  api.add_files('ReactiveObjects.js', ['client', 'server']);
});

Package.on_test(function(api) {
  api.use('reactive-objects');
  //api.use('test-helpers', 'server');
  api.use(['tinytest', 'deps', 'underscore'], ['client', 'server']);

  api.add_files(['tests/public-api.tests.js','tests/private-api.tests.js'], ['client', 'server']);
});
