// helper function to get js element.
var getElement = function(el) {
  return el instanceof jQuery ? el[0] : el;
};

// check if element has class.
var hasClass = function($el, className) {
  var el = this.getElement($el);
  if (el.classList) return el.classList.contains(className);
  else return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
};

// adds class to an element.
var addClass = function($el, className) {
  var el = this.getElement($el);
  if (el.classList) el.classList.add(className);
  else el.className += ' ' + className;
};

// removes class from an element.
var removeClass = function($el, className) {
  var el = this.getElement($el);
  if (el.classList) el.classList.remove(className);
  else el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
};

// hide provided element.
var hide = function($el) {
  var el = this.getElement($el);
  el.style.display = 'none';
}

// show provided element.
var show = function($el) {
  var el = this.getElement($el);
  el.style.display = '';
}

// append element to another element.
var append = function($parent, $el) {
  var parent = this.getElement($parent);
  var el = this.getElement($el);
  parent.appendChild(el);
}

// check if selector exists.
var exist = function(selector, $el) {
  var target;
  if (typeof $el != 'undefined') {
    target = this.getElement($el);
  } else {
    target = document;
  }
  return target.querySelector(selector) !== null;
}

// use for instead of each.
var each = function($el, fn) {
  for (var i = 0, len = $el.length; i < len; i++) {
    var $item = $el[i];
    fn(item);
  }
};

// get or set attribute of an element.
var attr = function($el, attr, val) {
  var el = this.getElement($el);
  if (typeof val == 'undefined') {
    el.getAttribute(attr);
  } else {
    el.setAttribute(attr, '');
  }
}

module.exports = {
  hasClass    : hasClass,
  addClass    : addClass,
  removeClass : removeClass,
  each        : each,
  hide        : hide,
  show        : show,
  append      : append,
  exist       : exist,
  each        : each,
  attr        : attr
};
