// Main helper function
var Helper = {}

// Helper private functions
var _helper = {}

// helper function to get js element.
_helper.getElement = function(el) {
  return el instanceof jQuery ? el[0] : el;
};

// check if element has class.
Helper.hasClass = function($el, className) {
  var el = _helper.getElement($el);
  if (el.classList) return el.classList.contains(className);
  else return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
};

// adds class to an element.
Helper.addClass = function($el, className) {
  var el = _helper.getElement($el);
  if (el.classList) el.classList.add(className);
  else el.className += ' ' + className;
};

// removes class from an element.
Helper.removeClass = function($el, className) {
  var el = _helper.getElement($el);
  if (el.classList) el.classList.remove(className);
  else el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
};

// hide provided element.
Helper.hide = function($el) {
  var el = _helper.getElement($el);
  el.style.display = 'none';
}

// show provided element.
Helper.show = function($el) {
  var el = _helper.getElement($el);
  el.style.display = '';
}

// append element to another element.
Helper.append = function($parent, $el) {
  var parent = _helper.getElement($parent);
  var el = _helper.getElement($el);
  parent.appendChild(el);
}

// check if selector exists.
Helper.exist = function(selector, $el) {
  var target;
  if (typeof $el != 'undefined') {
    target = _helper.getElement($el);
  } else {
    target = document;
  }
  return target.querySelector(selector) !== null;
}

// use for instead of each.
Helper.each = function($el, fn) {
  for (var i = 0, len = $el.length; i < len; i++) {
    var $item = $el[i];
    fn(item);
  }
};

// get or set attribute of an element.
Helper.attr = function($el, attr, val) {
  var el = _helper.getElement($el);
  if (typeof val == 'undefined') {
    el.getAttribute(attr);
  } else {
    el.setAttribute(attr, '');
  }
}

// export Helper object.
module.exports = Helper;
