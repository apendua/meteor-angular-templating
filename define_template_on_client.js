
var templates = angular.module('templates', []);

function createFragment(htmlStr) {
    // see: http://stackoverflow.com/questions/814564/inserting-html-elements-with-javascript

    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');

    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

Template.__define__ = function (name, html, options) {
  
  if (!name) {
    // bootstrap angularjs
    Meteor.startup(function () {

      document.body.insertBefore(createFragment(html), document.body.childNodes[0]);
      var ngApp = options['ng-app'];

      // I don't understand why but this is enough to bootstrap our app
      _.each(options, function (value, key) {
        document.body.setAttribute(key, value);
      });

      // I feel like this is not the best place to do it :/
      //if (ngApp !== undefined) {
      //  angular.bootstrap(document.body, [ngApp, ]);
      //}

    });

  } else {

    Template[name] = {
      // to prevent errors :/
      evetns  : function () {},
      helpers : function () {},
    };

    Template[name]._html = html;

    templates.run(function($templateCache) {
      $templateCache.put('/template/' + name, html);
    });

  }
}
