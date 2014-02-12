
Npm.depends({
  'connect' : '2.7.10',
});

Package.describe({
  summary: "Use angularjs as a replacement for the standard meteor templating engine",
});

Package._transitional_registerBuildPlugin({
  name: "prepareTemplatesForAngularJS",
  use: [],
  sources: [
    'plugin/html_scanner.js',
    'plugin/compile-templates.js',
  ]
});

Package.on_use(function (api) {

  api.use(['webapp'], 'server');

  api.add_files(['template.js'], ['client', 'server']);

  api.add_files([
      'angular/angular.min.js',
      'define_template_on_client.js',

    ], 'client');

  api.add_files([
    'template_server.js',
    'define_template_on_server.js',

  ], 'server');

  if (api.export !== undefined)
    api.export('Template');

});
