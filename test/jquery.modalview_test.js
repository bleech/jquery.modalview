/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('jQuery#modalview', {
    setup: function() {
      // setup dom element accessors
      this.links = $('#qunit-fixture').find('a');

      // apply modalview plugin
      this.links.modalview();
    },
    teardown: function () {
      $('.modalview').remove();
    }
  });

  test('initialization on links', 1, function () {
    var modalview = this.links.first().data('modalview');
    ok(modalview, 'loads onto element');
  });

  test('modalview container', 3, function () {
    var container = $('.modalview');

    equal(container.length, 2, 'creates a modalview container for each link');
    ok(container.is(':hidden'), 'hides container by default');

    this.links.trigger('click');
    ok(container.is(':visible'), 'shows container on click');
  });

  asyncTest('content loading', 4, function () {
    var that      = this;
    var modalview = this.links.first().data('modalview');
    var container = $('.modalview');

    setTimeout(function () {
      equal(modalview.content, 'main content', 'prefetches content');
      equal(container.find('.container').text(), '', 'closed container is empty');

      that.links.first().trigger('click');
      equal(container.find('.container').first().text(), 'main content', 'open container holds fetched content');

      container.find('.close').trigger('click');
      equal(container.find('.container').text(), '', 'container is empty again after having been closed');

      start();
    }, 100);
  });

  module('jQuery#modalview options', {
    setup: function() {
      // setup dom element accessors
      this.links = $('#qunit-fixture').find('a');
      $('.modalview').remove();
    }
  });

  test('default width & padding options', 1, function () {
    this.links.modalview();
    equal($('.modalview .container:first').outerWidth(), 600, 'container has default width of 600px');
  });

  test('setting custom width & padding options', 1, function () {
    this.links.modalview({
      padding: 20,
      width: 460
    });
    equal($('.modalview .container:first').outerWidth(), 500, 'container has a width of 500px');
  });

}(jQuery));
