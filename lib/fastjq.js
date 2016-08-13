(function (factory) {
  "use strict";
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  }
  else if(typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('jquery'));
  }
  else {
    factory(jQuery);
  }
}(function ($, undefined) {
  "use strict";

  // Main fastjQ function
  var fastjQ = {}

  // fastjQ private functions
  var _fastjQ = {}

  // fastjQ function to get js element.
  _fastjQ.getElement = function(el) {
    return el instanceof jQuery ? el[0] : el;
  };

  // check if element has class.
  fastjQ.hasClass = function($el, className) {
    var el = _fastjQ.getElement($el);
    if (el.classList) return el.classList.contains(className);
    else return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  };

  // adds class to an element.
  fastjQ.addClass = function($el, className) {
    var el = _fastjQ.getElement($el);
    if (el.classList) el.classList.add(className);
    else el.className += ' ' + className;
  };

  // removes class from an element.
  fastjQ.removeClass = function($el, className) {
    var el = _fastjQ.getElement($el);
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  };

  // hide provided element.
  fastjQ.hide = function($el) {
    var el = _fastjQ.getElement($el);
    el.style.display = 'none';
  }

  // show provided element.
  fastjQ.show = function($el) {
    var el = _fastjQ.getElement($el);
    el.style.display = '';
  }

  // append element to another element.
  fastjQ.append = function($parent, $el) {
    var parent = _fastjQ.getElement($parent);
    var el = _fastjQ.getElement($el);
    parent.appendChild(el);
  }

  // check if selector exists.
  fastjQ.exist = function(selector, $el) {
    var target;
    if (typeof $el != 'undefined') {
      target = _fastjQ.getElement($el);
    } else {
      target = document;
    }
    return target.querySelector(selector) !== null;
  }

  // use for instead of each.
  fastjQ.each = function($el, fn) {
    for (var i = 0, len = $el.length; i < len; i++) {
      var $item = $el[i];
      fn(item);
    }
  };

  // get or set attribute of an element.
  fastjQ.attr = function($el, attr, val) {
    var el = _fastjQ.getElement($el);
    if (typeof val == 'undefined') {
      el.getAttribute(attr);
    } else {
      el.setAttribute(attr, val);
    }
  }

  // export fastjQ object.
  module.exports = fastjQ;

}));
