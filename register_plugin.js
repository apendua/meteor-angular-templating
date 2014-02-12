
Plugin.registerSourceHandler('html', function (compileStep) {
  var contents = compileStep.read().toString('utf8');
});
