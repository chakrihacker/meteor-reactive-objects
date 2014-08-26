Package.describe({
  summary: "Objects with clean reactive properties, via ECMA-262 property get/set standards.",
  name: "reactive-objects",
  git: 'https://github.com/Meteor-Reaction/meteor-reactive-objects.git',
  version: '0.8.0'
});

Package.on_use(function (api, where) {
  
  api.use(['deps', 'underscore', 'behave'], ['client', 'server']);

  if(api.export) {
    api.export(['ReactiveObjects'], ['client', 'server']);
  }
  
  api.add_files([
    'lib/reactive-objects.js',
    'lib/model-methods.js',
    'lib/proxies.js'
  ],
  ['client', 'server']);
});

Package.on_test(function(api) {

  api.use('reactive-objects');
  api.use(['tinytest', 'deps', 'underscore'], ['client', 'server']);

  api.add_files([
    'tests/public-api.tests.js',
    'tests/proxies.tests.js'
    ], ['client', 'server']);

});
