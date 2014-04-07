Package.describe({
  summary: "Objects with clean reactive properties, via ECMA-262 property get/set standards."
});

Package.on_use(function (api, where) {
  
  api.use(['deps', 'behave'], ['client', 'server']);

  if(api.export) {
    //api.export('ReactiveObjects', ['client', 'server']);
  }
  
  api.add_files([
    'lib/reactive-objects.js',
    'lib/model-methods.js'
  ],
  ['client', 'server']);
});

Package.on_test(function(api) {

  api.use('reactive-objects');
  api.use(['tinytest', 'deps', 'behave'], ['client', 'server']);

  api.add_files(['tests/public-api.tests.js'], ['client', 'server']);

});
