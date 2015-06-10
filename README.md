stylecow plugin custom-media
============================

[![Build Status](https://travis-ci.org/stylecow/stylecow-plugin-custom-media.svg)](https://travis-ci.org/stylecow/stylecow-plugin-custom-media)

Stylecow plugin to work with the @custom-media at-rule, [available in CSS Media Queries Level 4](http://dev.w3.org/csswg/mediaqueries/#custom-mq).

You write:

```css
@custom-media --small-viewport (max-width: 30em);
 
@media (--small-viewport) {
	body {
		color: blue;
	}
}
```

And stylecow converts to:

```css
@media (max-width: 30em) {
	body {
		color: blue;
	}
}
```

More demos in [the tests folder](https://github.com/stylecow/stylecow-plugin-custom-media/tree/master/tests/cases)
