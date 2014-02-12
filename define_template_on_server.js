
Template.__define__ = function (name, html) {
  if (!name) // TODO: body tag is not allowed on the server
    return;

  Template[name] = {};
  Template[name]._html = html;
}
