/*
 * jquery.modalview
 * https://github.com/bleech/jquery.modalview
 *
 * Copyright (c) 2012 bleech
 * Licensed under the MIT, GPL licenses.
 */

;(function ( $, window, document, undefined ) {

    // the jquery exposed method
    $.fn.modalview = function ( options ) {

      options = $.extend( {}, $.fn.modalview.options, options );

      // create a new modalview for each link element
      return this.filter('a').each(function () {
        var elem = $(this);
        elem.data('modalview', new Modalview(elem, options));
      });

    };

    $.modalview = function ( content, options ) {

      options = $.extend( {}, $.fn.modalview.options, options );

      return new Modalview(content, options, true);

    };

    // global default options
    $.fn.modalview.options = {
      selector:   '#main',
      closeText:  'close',
      padding:    10,
      width:      580,
      onInit:     function () {},
      onOpen:     function () {},
      onClose:    function () {},
      onDestroy:  function () {}
    };

    // plugin constructor
    var Modalview = function (elem, options, render) {

      var that = this;
      var html;

      // options & elements
      this.options = options;
      this.content = '';

      // modalview template html
      html  = '<div class="modalview">';
      html +=   '<div class="close">' + this.options.closeText + '</div>';
      html +=   '<div class="container"></div>';
      html += '</div>';

      // insert the modalview into the page or grab the existing one
      this.modalview = $('.modalview').length > 0 ? $('.modalview') : $(html).appendTo('body').hide();
      this.container = this.modalview.find('.container');

      // set container width and padding
      this.container.css({
        padding:  parseInt(this.options.padding, 10) + 'px',
        width:    parseInt(this.options.width, 10) + 'px'
      });

      // center container horizontally
      this.container.css('marginLeft', -1 * (this.container.outerWidth() / 2) + 'px');

      // set content or delegate to element
      if (render) {

        this.content = elem;
        this.open();

      } else {

        // prefetch content
        $.get(elem.attr('href'), function (result) {
          // 1. Create a dummy div to hold the results
          // 2. inject the contents of the document in, removing the scripts
          //    to avoid any 'Permission Denied' errors in IE
          // 3. Locate the specified elements
          that.content = $('<div>').append(result.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")).find(that.options.selector).html();
        });

        // open modal on element click
        elem.on('click', function (e) {
          e.preventDefault();
          that.open();
        });

      }

      // close modal on close-click
      this.modalview.on('click', '.close', $.proxy(this.close, this));

      // onInit callback
      this.options.onInit.call(this);

    };

    // open modalview
    Modalview.prototype.open = function () {
      this.container.html(this.content);
      this.modalview.show();

      // onOpen callback
      this.options.onOpen.call(this);
    };

    // close modalview
    Modalview.prototype.close = function () {
      this.modalview.hide();
      this.modalview.off();
      this.container.html('');

      // onClose callback
      this.options.onClose.call(this);
    };

    // close modalview
    Modalview.prototype.destroy = function () {
      this.modalview.off();
      this.modalview.remove();

      // onDestroy callback
      this.options.onDestroy.call(this);
    };

}( jQuery, window, document ));