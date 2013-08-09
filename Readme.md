```javascript
$('input').selection( [startIndex, [endIndex]] );
```

* Parameter ```startIndex``` optional int - the start index to start the selection at
* Parameter ```endIndex``` optional int - the end index to end the selection at
* Return jQuery object if parameters are passed, returns position object when no parameters are passed


```javascript
$('input').getSubValPosition( startIndex, [endIndex] );
```

* Parameter ```startIndex``` int - the start index of the text
* Parameter ```endIndex``` optional int - the end index of the text
* Returns an object with position and dimensional information


## Get caret position #

Get the caret position or selected range for an input text field.

```javascript
var selection = $('input#in').selection();
```

Results

```javascript
{
	start:  2, // The start index of the selection
	end:    4, // The end index of the selection, will be the same if text is not selected
	length: 2,
	text:   'ed'
}
```

## Position caret ##

Position the caret in a text input field.

```javascript
$('input#in').selection( 4 );
```

## Select text ##

Select a range of text in the text input field.

```javascript
$('input#in').selection( 4, 10 );
```

## Get the positional and dimensional information ##

Get the offset from the top of the input the text appears, and the width and height of the text.

```javascript
$('input#in').getSubValPosition( 3, 5 );
```

Results

```javascript
{
	left: 9,
	top: 1,
	width: 8,
	height: 16
}
```

## Demo ##

[View the demo](http://htmlpreview.github.io/?https://github.com/seamusleahy/jquery.selection.js/blob/master/demo.html)

## Credits ##
Thanks to 
Samuel Clay @samuelclay for the getSelection code from VisualSearch
Christian C. Salvadó <http://codingspot.com/> for the setSelectionRange code posted to StackOverflow
