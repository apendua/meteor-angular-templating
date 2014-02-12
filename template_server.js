
var Fiber = Npm.require('fibers');
var connect = Npm.require('connect');
var connectHandlers = WebApp.connectHandlers;

var notFound = function (res, msg) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json; character=utf-8");
  res.end(JSON.stringify({
    error   : 404,
    reason  : "object not found",
    details : msg,
  }));
}

var forbidden = function (res) {
  res.statusCode = 403;
  res.setHeader("Content-Type", "application/json; character=utf-8");
  res.end(JSON.stringify({
    error   : 403,
    reason  : "access denied",
    details : "you have no permissions to access this object",
  }));
}

var re = new RegExp('/template/');

connectHandlers

  .use(function (req, res, next) {
    
    if (re.test(req.url)) {

      // TODO: allow both paths and template names
      // TODO: make security restrictions

      var name = req.url.split('/')[2];
      var template = Template[name];

      if (!template) {
        notFound(res, "template '" + name + "' cannot be found");
  
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html; character=utf-8");

        res.end(template._html);
      }

    } else {
      next();
    }
  });

