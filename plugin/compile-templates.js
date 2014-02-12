
var path = Npm.require('path');

Plugin.registerSourceHandler("html", function (compileStep) {
  // XXX use archinfo rather than rolling our own
  var targetIsBrowser = compileStep.arch.match(/^browser(\.|$)/);
  
  // XXX the way we deal with encodings here is sloppy .. should get
  // religion on that
  var contents = compileStep.read().toString('utf8');
  try {
    var results = html_scanner.scan(contents, compileStep.inputPath);
  } catch (e) {
    if (e instanceof html_scanner.ParseError) {
      compileStep.error({
        message: e.message,
        sourcePath: compileStep.inputPath,
        line: e.line
      });
      return;
    } else
      throw e;
  }

  if (targetIsBrowser && results.head)
    compileStep.appendDocument({ section: "head", data: results.head });

  if (targetIsBrowser && results.body)
    compileStep.appendDocument({ section: "body", data: results.body });

  if (results.js) {
    var path_part = path.dirname(compileStep.inputPath);
    if (path_part === '.')
      path_part = '';
    if (path_part.length && path_part !== path.sep)
      path_part = path_part + path.sep;
    var ext = path.extname(compileStep.inputPath);
    var basename = path.basename(compileStep.inputPath, ext);

    // XXX generate a source map

    compileStep.addJavaScript({
      path: path.join(path_part, "template." + basename + ".js"),
      sourcePath: compileStep.inputPath,
      data: results.js
    });
  }
});
