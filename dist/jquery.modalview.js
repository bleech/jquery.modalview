/*! jQuery Modalview - v0.1.0 - 2012-06-11
* https://github.com/bleech/jquery.modalview
* Copyright (c) 2012 bleech; Licensed MIT, GPL */

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

      return new Modalview(content, options);

    };

    // global default options
    $.fn.modalview.options = {
      selector:   '#main',
      closeText:  'close',
      padding:    10,
      width:      580,
      onInit:     function () {},
      onOpen:     function () {},
      onClose:    function () {}
    };

    // plugin constructor
    var Modalview = function (elem, options) {

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
      if (typeof elem === 'string') {

        this.content = elem;
        this.open();

      } else {

        // prefetch content
        $.get(elem.attr('href'), function (result) {
          that.content = $(result).find(that.options.selector).html();
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
      this.container.html('');

      // onClose callback
      this.options.onClose.call(this);
    };

}( jQuery, window, document ));