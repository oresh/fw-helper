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

  /* Base scripts file. */

  /* snippets global objects. */
  var snippets = {
    Behavior: {},
    Settings: {},
    Functions: {}
  };

  /* snippets global params. */
  snippets.Settings = {
    refreshRate : 50 //ms
  }

  /**
   * Default (base) behavior
   */
  snippets.Behavior.default = function(settings) {
    $('html').removeClass('no-js');
  }

  /**
   * Execute all Behaviors.
   */
  snippets.Functions.runBehaviors = function(settings) {
    var base = this;
    if (typeof settings.context == 'undefined') settings.context = document;
    var behaviors = Object.keys(base.Behavior);
    for (var i = 0, len = behaviors.length; i < len; i++) {
      base.Functions.runBehavior(behaviors[i], settings);
    }
  }

  /**
   * Execute all Behaviors.
   */
  snippets.Functions.runBehavior = function(name, settings) {
    var base = this;
    var localSettings = {
      context: document,
      selector: ''
    };
    if (typeof settings != 'undefined' && settings) {
      jQuery.extend(localSettings, settings);
    }
    base.Behavior[name[i]](localSettings);
  }

  /**
   * Helper function to get real window width
   */
  snippets.Functions.getWindowWidth = function() {
    var windowWidth = 0;
    if (typeof(window.innerWidth) == 'number') {
      windowWidth = window.innerWidth;
    } else {
      if (document.documentElement && document.documentElement.clientWidth) {
        windowWidth = document.documentElement.clientWidth;
      } else {
        if (document.body && document.body.clientWidth) {
          windowWidth = document.body.clientWidth;
        }
      }
    }
    return windowWidth;
  }

  /**
   * Sticky footer
   * ex: .sticky-footer
   * ex: [snippets-sticky-footer]
   */
  snippets.Behavior.stickyFooter = function(settings) {
    var base = this;
    var $stickyFooter = $('.sticky-footer', settings.context);
    $stickyFooter.add('[snippets-sticky-footer]');
    if (settings.selector) $stickyFooter.add(settings.selector, settings.context);

    if (selector) $stickyFooter.add(selector);

    if ($stickyFooter.length) {
      var footerHeight = 0;
      var bodyHeight = 0;
      var vwptHeight = 0;
      var wrapperHeight = 0;
      var $body = $('body');
      var $mainwrapper = $('.main-wrapper');

      snippets.Functions.positionFooter = function() {
        $mainwrapper.css('min-height', 0);
        footerHeight = $stickyFooter.outerHeight();
        bodyHeight = $body.height();
        vwptHeight = $(window).height();
        wrapperHeight = $mainwrapper.height();
        if (vwptHeight > bodyHeight) {
          $mainwrapper.css('min-height', vwptHeight - footerHeight);
        }
      };

      snippets.Functions.positionFooter();

      $(window).load(function() {
          snippets.Functions.positionFooter();
      });

      $(window).resize(function() {
          window.clearTimeout(stickyFooterTimeout);
          var rate = base.Settings.refreshRate;
          var stickyFooterTimeout = setTimeout(function() {
            snippets.Functions.positionFooter();
          }, rate);
      });
    }
  }

  /**
   * Chosen selects
   * ex: select.chosen-select
   * ex: select[snippets-chosen-select]
   */
  snippets.Behavior.chosenSelect = function(settings) {
    var $select = $('.chosen-select', settings.context);
    $select.add("[snippets-chosen-select]", settings.context);
    if (settings.selector) $select.add(settings.selector, settings.context);

    if (settings.selector) $select.add(selector, context);

    if ($select.length) {
      for (var i = 0, len = $select.length; i < len; i++) {
        var $this = $select.eq(i);
        if ($this.hasClass('multiple') || $this.attr('snippets-chosen-select') == 'multiple') {
          // chosen multiple
        } else if ($this.hasClass('custom') || $this.attr('snippets-chosen-select') == 'custom') {
          // custom chosen
        } else {
          // basic chosen no search
          $this.chosen({
            disable_search: true,
            width: '100%',
            display_disabled_options: false
          });
        }
      }
    }
  }

  /**
   * Simple popup open
   * ex: a.popup-link[snippets-popup-block="#popup"]
   * ex: [snippets-popup-block="#popup"]
   * popup [snippets-popup-link="#popup-link"]
   */
  snippets.Behavior.popupShow = function(settings) {
    var $linkPopup = $('[snippets-popup-block]', settings.context);
    if (settings.selector) $linkPopup.add(settings.selector, settings.context);

    if ($linkPopup.length) {
      var $mainContent = $('.main-content');
      var $body = $('body');
      $mainContent.removeClass('popup-opened');
      $linkPopup.removeClass('is-active');

      $body.on('click', '[snippets-popup-block]', function(e) {
        var $this = $(this).addClass('is-active');
        var $popup = $($this.attr('snippets-popup-block'));
        $popup.show();
        $mainContent.addClass('popup-opened');
        e.stopPropagation();
        e.preventDefault();
      });

      $('body').on('click', '.popup .icon-close', function() {
        var $this = $(this);
        $this.closest('.popup').hide();
        $linkPopup = $($this.attr('snippets-popup-link'))
        $linkPopup.removeClass('is-active');
        $mainContent.removeClass('popup-opened');
        e.stopPropagation();
        e.preventDefault();
      });

      $(document).keyup(function(e) {
        if (e.keyCode == 27) {
          $('.popup').hide();
          $linkPopup.removeClass('is-active');
          $mainContent.removeClass('popup-opened');
        }
      });
    }
  }

  /**
   * Simple dropdown
   * ex: .link-dropdown
   * ex: [snippets-link-dropdown]
   */
  snippets.Behavior.dropdownToggle = function(settings) {
    var $linkDropdown = $('.link-dropdown', settings.context);
    $linkDropdown.add('[snippets-link-dropdown]', settings.context);
    if (settings.selector) $linkDropdown.add(settings.selector, settings.context);

    if ($linkDropdown.length) {
      $('body').on('click','.link-dropdown, [snippets-link-dropdown]', function(e) {
        var $this = $(this)
        var  $dDContainer = $this.parent();
        if ($dDContainer.hasClass('is-opened')) {
          $dDContainer.removeClass('is-opened');
        } else {
          $('.has-dropdown').removeClass('is-opened');
          $dDContainer.addClass('is-opened');
        }
        e.stopPropagation();
        e.preventDefault();
      });

      $(document).keyup(function(e) {
        if (e.keyCode == 27) {
          $('.has-dropdown').removeClass('is-opened');
        }
      });
    }
  }

  /**
   * Toggle collapsible blocks
   * ex: [snippets-collapse="next"]
   * ex: [snippets-collapse="next-all"]
   * ex: [snippets-collapse="next-all-parent"]
   * ex: [snippets-collapse="el:.classname"]
   * ex: [snippets-collapse="el:.classname, class:activeclass"]
   **/
  snippets.Behavior.fxCollapsible = function(settings) {
    var base = this;
    var $collapsibles = $('.collapse-content', settings.context);
    $collapsibles.add('[snippets-collapse-content]', settings.context);
    if (settings.selector) $collapsibles.add(settings.selector, settings.context);

    if ($collapsibles.length) {
      if (!$collapsibles.eq(0).hasClass('collapse-content-processed')) {
        // close collapse
        function closeCollapsible($colapse, time) {
          if (typeof time == 'undefined') time = 300;
          $colapse.slideUp(time);
        }
        // toggle collapse
        fution toggleCollapse($colapse, time) {
          if (typeof time == 'undefined') time = 300;
          if (time == 0) {
            if ($colapse.is(":visible")) {
              $colapse.hide();
            } else {
              $colapse.show();
            }
          } else {
            $colapse.slideToggle(time);
          }
        }
        $collapsibles.hide();
        $collapsibles.filter('.opened').show();
        $collapsibles.filter('.opened').parent().find('[snippets-collapse]').addClass('active');

        // add processed class
        $collapsibles.addClass('collapse-content-processed');

        // close collapsible on X click.
        $collapsibles.find('.collapse-close').on('click', function(e) {
          e.stopPropagation();
          closeCollapsible($(this).closest('.collapse-content'));
        });
      }
    }

    // triggers functionality.
    var $triggers = $('[snippets-collapse]', context);
    if ($triggers.length) {
      $tggers.on('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var $this = $(this);
        var mobileOnly = $this.attr('collapse-mobile');
        if (typeof mobileOnly !== typeof undefined && mobileOnly !== false) {
          if (base.Functions.getWindowWidth() > 991) {
            return false;
          }
        }
        var mobileOnly = $this.attr('collapse-mobile-sm');
        if (typeof mobileOnly !== typeof undefined && mobileOnly !== false) {
          if (base.Functions.getWindowWidth() > 767) {
            return false;
          }
        }
        var collapseOptions = {};
        var attrString = $this.attr('snippets-collapse').split(', ');
        attrString.forEach(function(attrString) {
          var tup = attrString.split(':');
          collapseOptions[tup[0]] = tup[1];
        });
        var collapseClass = typeof collapseOptions.class != 'undefined' ? collapseOptions.class : 'active';
        $this.toggleClass(collapseClass);
        if (typeof collapseOptions.text !== 'undefined') {
          var text = collapseOptions.text.split(',');
          var on = text[0];
          var off = text[1];

          if ($this.hasClass(collapseClass)) {
            $this.text(on);
          } else {
            $this.text(off);
          }
        }
        if (typeof collapseOptions.main != 'undefined') {
          val = collapseOptions.main;
        }
        if (typeof collapseOptions.el != 'undefined') {
          toggleCollapse($(collapseOptions.el), collapseOptions.time);
        } else {
          if (collapseOptions.target == "next-all") {
            toggleCollapse($this.nextAll(), collapseOptions.time);
          }
          if (collapseOptions.target == "next-all-parent") {
            toggleCollapse($this.parent().nextAll(), collapseOptions.time);
          } else {
            toggleCollapse($this.next(), collapseOptions.time);
          }
        }
      });
    }
  }

  /**
   * Hide popup
   * add close button to popup
   * ex: .popup a.popup-close
   * ex: .popup span[snippets-popup-close]
   */
  snippets.Behavior.hidePopup = function(settings) {
    var $popupClose = $('.popup .popup-close:not(.custom)', settings.context);
    $popupClose.add('.popup .[snippets-popup-close]:not(.custom)', settings.context);
    if (settings.selector) $popupClose.add(settings.selector, settings.context);

    if ($popupClose.length) {
      var $popup = $('.popup');
      $popupClose.on('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        $popup.hide();
        $('body').removeClass('is-blocked');
      });

      $(document).keyup(function(e) {
        if (e.keyCode == 27) {
          $popup.hide();
          $('body').removeClass('is-blocked');
        }
      });
      $('body').on('click', '.popup .outer-click', function() {
        $popup.hide();
      });
    }
  }

  /**
   * Collapsible Text
   * ex: div[snippets-trim-content="200" snippets-trim-text="show more text"]
   */
  snippets.Behavior.collapsibleText = function (settings) {
    var $collapsibleText = $('[snippets-trim-content]', settings.context);

    if ($collapsibleText.length) {
      for (var i = 0, len = $collapsibleText.length; i < len; i++) {
        var $this = $collapsibleText.eq(i);
        var html = '<div class="text-block-collapsed hidden">' + $this.html() + '</div>';
        var trimsize = $this.attr('[snippets-trim-content]') ? parseInt($this.attr('[snippets-trim-content]')) : 256;
        var text = '<p class="text-block-visible">' + $this.text().trim().substr(0, trimsize) + '</p>';
        var link = '<span class="text-block-show">' + $this.attr('snippets-trim-text') ? $this.attr('snippets-trim-text') : 'show more' + '</span>';
        $this.html(text + link + html);
      }

      $('body').on('click', 'text-block-show', function() {
        var $this = $(this);
        $this.parent().addClass('is-opened');
        $this.parent().html($this.siblings('text-block-collapsed'));
      });
    }
  }

  /**
   * Five stars rating
   * add [snippets-stars-rating] to star rating block
   * add .star to rating button
   */
  snippets.Behavior.ratingStars = function (settings) {
    var $starsBlock = $('[snippets-stars-rating]', settings.context);
    if (settings.selector) $starsBlock.add(settings.selector, settings.context);

    if ($starsBlock.length) {
      var $iconSingle = $icon.eq(j);
      var selectors = '[snippets-stars-rating] .star'
      if (settings.selector) {
        selectors += ',' + settings.selector + ' .star';
      }
      $('body').on('mouseenter', selectors, function() {
        var $this = $(this);
        $this.addClass('icon-full').removeClass('icon-empty');
        $this.prevAll('.icon').addClass('icon-full').removeClass('icon-empty');
        $this.nextAll('.icon').addClass('icon-empty').removeClass('icon-full');
      });

      $('body').on('mouseleave', selectors, function() {
        var $this = $(this);
        $this.find('.icon').removeClass('icon-full icon-empty');
      });
    }
  }

  /**
   * Fix width or height.
   * [snippets-fix-size] behavior.
   */
  snippets.Behavior.fixSize = function(settings) {
    var $fixSizeCols = $('[snippets-fix-size]', settings.context);
    if ($fixSizeCols.length) {
      var $this = $();
      window.fixSizerows = [];
      var k = -1;

      function getFixedLength(v, ind, rowsLength) {
        if (!$fixSizeCols.eq(v).length) {
          return 0;
        }
        var $ot = $fixSizeCols.eq(v).offset().top;
        var $next = $fixSizeCols.eq(v + 1);

        if (typeof ind == 'undefined') {
          ind = 1;
        }

        if (typeof fixSizerows[rowsLength] == 'undefined') {
          fixSizerows[rowsLength] = [];
        }

        if (!$next.length) {
          var rL = fixSizerows[rowsLength];
          if (rL[rL.length - 1] && rL[rL.length - 1].index() != $fixSizeCols.eq(v).index()) {
              rL[rL.length] = $fixSizeCols.eq(v);
          }
          return 0;
        }
        if ($next.length) {
          if ($next.offset().top == $ot) {
            if (ind == 1) {
                fixSizerows[rowsLength][0] = $fixSizeCols.eq(v);
            }

            fixSizerows[rowsLength][ind] = $next;
            v = getFixedLength(v + 1, ind + 1, rowsLength);
          } else {
            if (ind == 1 && v == 0) {
              fixSizerows[rowsLength][ind] = $next;
              return getFixedLength(v + 1, ind, rowsLength);
            }
          }
        }

        return v;
      }

      function getMax(arr) {
        var max = arr[0];
        for (var i = 1, len = arr.length; i < len; i++) {
            if (arr[i] > max) max = arr[i];
        }
        return max
      }

      function setHeight() {
        for (var i = 0, len = fixSizerows.length; i < len; i++) {
          var row = fixSizerows[i];
          var heights = [];
          var widths = [];
          var heightmax = 0;
          var widthmax = 0;
          for (var j = 0, lenj = row.length; j < lenj; j++) {
            if ($(row[j]).attr('snippets-fix-size') == 'width') {
              if ($(row[j]).is(":visible")) {
                $(row[j]).width('auto');
                widths[widths.length] = $(row[j]).width();
              }
            } else {
              heights[heights.length] = $(row[j]).height();
            }
          }
          heightmax = getMax(heights);
          widthmax = getMax(widths);
          var isMobile = base.Functions.getWindowWidth() < 767;
          for (var j = 0, lenj = row.length; j < lenj; j++) {
            if (typeof heightmax != 'undefined' && !isMobile) {
              $(row[j]).height(heightmax);
            }
            if (typeof widthmax != 'undefined') {
              $(row[j]).width(widthmax);
            }
          }
        }
      }
      function startFixed() {
        $fixSizeCols.css('height', 'auto');
        fixSizerows = [];
        k = -1;
        while (k != 0) {
            k = getFixedLength(k + 1, 1, fixSizerows.length);
        }
        setHeight();
      }
      // Check for height fixes on document ready.
      startFixed();
      $(window).resize(function() {
        if (base.Functions.getWindowWidth() > 767) {
          startFixed();
        }
      });
    }
  }

  /**
   * Scroll up button
   * ex: .button-up
   * ex: [snippets-button-up]
   */
  snippets.Behavior.scrollUp = function(settings) {
    var $btnUp = $('.button-up', settings.context);
    $btnUp.add('[snippets-button-up]',settings.context);

    if ($btnUp.length) {
      $btnUp.on('click', function() {
        $("html, body").animate({
          scrollTop: 0
        }, 600);
        return false;
      });
      var btnT = $btnUp.offset().top;
      var btnL = $btnUp.offset().left;
      var fT = $('footer').offset().top;
      var wH = $(window).height();

      $(window).scroll(function () {
        var dT = $(document).scrollTop();
        if ((btnT - dT + 70) < wH) {
          $btnUp.addClass('fixed').css({
            bottom: 20,
            left: btnL
          });
          if ((dT + wH + 30) > fT) {
            $btnUp.css('bottom', (dT + wH + 70) - fT);
          }
        } else {
          $btnUp.removeClass('fixed');
        }
      });
    }
  }

  /**
   * Fancybox initialisation
   * ex. fancybox
   */
  snippets.Behavior.fancyBoxInit = function(context) {
    var $fancybox = $('.fancybox', context);
    if ($fancybox.length) {
      $fancybox.fancybox({
        fitToView: false
      });
    }
  }

  /**
   * Change attribute on click.
   * Ex.: [snippets-change-attr="el:#wrapper, attr:href, val:#"]
   */
  snippets.Behavior.attributeChange = function(settings) {
    var $attrTriggers = $('[snippets-change-attr]', settings.context);
    if ($attrTriggers.length) {
      $attrTriggers.on('click', function(e) {
        var $this = $(this);
        var tabOptions = {};
        var attrString = $this.attr('snippets-change-attr').split(', ');
        attrString.forEach(function(attrString) {
          var tup = attrString.split(':');
          tabOptions[tup[0]] = tup[1];
        });
        var el = tabOptions.el ? tabOptions.el : '';
        var $el = $(el);
        if ($el.length) {
          var attr = tabOptions.attr ? tabOptions.attr : 'text';
          var val = tabOptions.val ? tabOptions.val : '';
          $el.attr(attr, val);
        }
      });
    }
  }

  /**
   * Smart forms behaviors
   * TODO: вспомнить, что делает. добавить умные лейблы
   */
  snippets.Behavior.smartForm = function(settings) {
    var $form = $('form', settings.context);
    $form.add('[snippets-form]', settings.context);
    if (settings.selector) $form.add(settings.selector, settings.context);

    if ($form.length) {
      $('form input[type="text"],form input[type="email"],form input[type="password"], formtextarea', settings.context).keyup(function(e) {
        var $this = $(this);
        if ($this.val().length) {
          $this.removeClass('error');
          if ($this.closest('form').hasClass('form-validate')) {
            if (!$this.next().hasClass('input-label-name')) {
              var lbl = '<span class="input-label-name">' + $this.attr('placeholder') + '</span>';
              $(lbl).insertAfter($this);
            }
          }
        } else {
          $this.next('.input-label-name').remove();
        }
      });
    }
  }

  /**
   * Imagefill library
   */
  snippets.Behavior.imageFillBg = function(settings) {
    var $imageContainers = $('.imagefill', settings.context);
    $imageContainers.add('[snippets-imagefill]', settings.context);
    if (settings.selector) $imageContainers.add(settings.selector, settings.context);

    if ($imageContainers.length) {
      $imageContainers.imagefill();
    }
  }


}));