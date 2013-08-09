/**
 * Position the cursor in a text input, select a range in a text input, or set the selection range
 *
 * Get the selection text. If it is just the cursor, the start and end will be the same.
 *
 * var selection = $('input#in').selection();
 * 
 * {
 *	start: 2,
 *  end: 4,
 *  length; 2,
 *  text: 'ed'
 * }
 *
 * Set the cursor position.
 *
 * $('input#in').selection( 4 );
 *
 * Set the selection.
 *
 * $('input#in').selection( 4, 10 );
 *
 * Get the position and dimensions of text within the input
 *
 * $('input#in').getSubValPosition( 3, 5 );
 *
 * Thanks to 
 * Samuel Clay @samuelclay for the getSelection code from VisualSearch
 * Christian C. Salvadó <http://codingspot.com/> for the setSelectionRange code posted to StackOverflow
 */
(function( $ ) {

	// Retrieves the selection of the first field
	// Originally from: http://documentcloud.github.io/visualsearch/build/visualsearch.js
	var getSelection = function() {
		var $input = this.filter( 'input:text' ).eq(0);
		
		if ( $input.length ) {
			var input = $input.get(0);

			if ( input.selectionStart != null ) { // FF/Webkit
				var start = input.selectionStart;
				var end   = input.selectionEnd;
				return {
					start   : start,
					end     : end,
					length  : end-start,
					text    : input.value.substr(start, end-start)
				};
			} else if ( document.selection ) { // IE
				var range = document.selection.createRange();
				if (range) {
					var textRange = input.createTextRange();
					var copyRange = textRange.duplicate();
					textRange.moveToBookmark(range.getBookmark());
					copyRange.setEndPoint('EndToStart', textRange);
					var start = copyRange.text.length;
					var end   = start + range.text.length;
					return {
						start   : start,
						end     : end,
						length  : end-start,
						text    : range.text
					};
				}
			}
		}
		return {start: 0, end: 0, length: 0};
	};




	// Set selection range
	// Originally from: http://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
	var setSelectionRange = function( selectionStart, selectionEnd ) {
		this.filter( 'input:text' ).each( function() {
			var input = this;
			if ( input.setSelectionRange ) { // FF/Webkit
				input.focus();
				input.setSelectionRange(selectionStart, selectionEnd);
			}
			else if ( input.createTextRange ) { // IE
				var range = input.createTextRange();
				range.collapse(true);
				range.moveEnd('character', selectionEnd);
				range.moveStart('character', selectionStart);
				range.select();
			}
		});
	};


	// Register the plugin
	$.fn.extend({
		selection: function( selectionStart, selectionEnd ) {
			if ( selectionStart != null && selectionEnd != null ) {
				setSelectionRange.call( this, selectionStart, selectionEnd );
			} else if ( selectionStart != null ) {
				setSelectionRange.call( this, selectionStart, selectionStart );
			} else {
				return getSelection.call( this );
			}
			return this;
		},

		getSubValPosition: function( startIndex, endIndex ) {

			var $input = this.filter( 'input:text' ).eq(0);
			if ( $input.length == 0 ) {
				// No input field
				return null;
			}

			if ( endIndex == null ) {
				endIndex = startIndex;
			}

			var clone;
			if ( $input.data( 'visual-selection-clone' ) ) {
				clone = $input.data( 'visual-selection-clone' );
			} else {
				clone = $('<div></div>').appendTo( 'body' );
				$input.data( 'visual-selection-clone', clone );

				// Copy the style
				var input = $input.get(0);
				var style;
				
				if( window.getComputedStyle ) {
	        style = window.getComputedStyle( input, null );
	        for ( var i=0; i<style.length; ++i ) {
	        	clone.css( style[i], style.getPropertyValue(style[i]) );
	        }
				} else if( input.currentStyle ) {
	        clone.css( input.currentStyle  );
	      }

	      clone.css({ 'position': 'absolute', 'whiteSpace': 'pre', 'left': '-9999px', 'top': '-9999px', 'opacity': 0 });
			}

			clone.empty();

			var beforeText = $input.val().substring( 0, startIndex );
			var selectedText = $input.val().substring( startIndex, endIndex );
			var afterText = $input.val().substring( endIndex );

			var selectionElement = $('<span style="display: inline-block;"></span>').text( selectedText );
			clone
				.append( document.createTextNode(beforeText) )
				.append( selectionElement )
				.append( document.createTextNode(afterText + ' ') );

			var position = selectionElement.position();
			position.width = selectionElement.width();
			position.height = selectionElement.height();
			position.left = position.left - $input.scrollLeft();

			console.log( position.left );

			return position;
		}
	});
})( jQuery );




