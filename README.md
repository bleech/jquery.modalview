# jQuery Modalview

A simple prefetching ajax modal plugin. Prefetches the target page DOM and displays it in a modal when clicking on the link.  
Accepts a JSON response with a content attribute too.  
Opens given content as string too.

## Getting Started
Download the [production version][min] or the [development version][max].  
Integrate the basic styles from the [stylesheet][styles] and add your own styling.

[min]: https://raw.github.com/bleech/jquery.modalview/master/dist/jquery.modalview.min.js
[max]: https://raw.github.com/bleech/jquery.modalview/master/dist/jquery.modalview.js
[styles]: https://raw.github.com/bleech/jquery.modalview/master/dist/jquery.modalview.css

### Markup
```html
<a href="somepage.html" class="modal">Some page</a>
```

jump to a DOM element referenced by hash string
```html
<a href="somepage.html#qunit-fixture" class="modal">Some page</a>
```

add a custom class to the modalview container
```html
<a href="somepage.html" class="modal" data-modalclass="custom">Some page</a>
```

### Initialization
```javascript
$('.modal').modalview();
```
or
```javascript
$.modalview('some content');
```

### Options
```javascript
// setting global default options
$.fn.modalview.options = {
	selector:   '#main',
	closeText:  'close',
	padding:    10,
	width:      580,
	onInit:     function () {},
	onOpen:     function () {},
	onClose:    function () {}
};

// setting custom instance options
$('.modal').modalview({
	selector:   '#main',
	closeText:  'close',
	padding:    10,
	width:      580,
	onInit:     function () {},
	onOpen:     function () {},
	onClose:    function () {}
});
```

## Roadmap
- refactoring to automatically set the target width & padding (is this a good idea?)
- refactoring close button (html string?)
- making the plugin extendable globally and per instance (prototypal inheritance)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## License
Copyright (c) 2012 bleech  
Licensed under the MIT, GPL licenses.
