# jQuery Modalview

A simple prefetching ajax modal plugin. Prefetches the target page DOM and displays it in a modal when clicking on the link.

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

### Initialization
```javascript
$('.modal').modalview();
```

### Options
```javascript
// setting global default options
$.fn.modalview.options = {
	selector:   '#main',
	closeText:  'close',
	padding:    '10px',
	width:      '580px',
	onInit:     function () {},
	onOpen:     function () {},
	onClose:    function () {}
};

// setting custom instance options
$('.modal').modalview({
	selector:   '#main',
	closeText:  'close',
	padding:    '10px',
	width:      '580px',
	onInit:     function () {},
	onOpen:     function () {},
	onClose:    function () {}
});
```

## Roadmap
- creating a demo
- refactoring to automatically set the target width & padding
- refactoring close button (html string?)
- making the plugin extendable globally and per instance (prototypal inheritance)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## License
Copyright (c) 2012 bleech  
Licensed under the MIT, GPL licenses.
