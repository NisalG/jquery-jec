/**
 * jQuery jEC (jQuery Editable Combobox) 0.5.2
 * http://code.google.com/p/jquery-jec
 * http://plugins.jquery.com/project/jEC
 *
 * Copyright (c) 2008 Lukasz Rajchel (lukasz@rajchel.pl | http://lukasz.rajchel.pl)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Documentation	:	http://code.google.com/p/jquery-jec/wiki/Documentation
 * Changelog:		:	http://code.google.com/p/jquery-jec/wiki/Changelog
 */

(function($) {

 	// register new jQuery function
	$.fn.editableCombobox = function(options) {

		// default options
		var defaults = {
			position: 0,
			classes: '',
			styles: {},
			pluginClass: 'jecEditableOption',
			useExistingOptions: false,
			ignoredKeys: [],
			acceptedRanges: [
				{min:32, max:126},	// standard chars
				{min:191, max:382}	// latin accented chars
			]
		
			
		};

		// options
		var options = $.extend(defaults, options);

		// IE doesn't implement indexOf() method
		if ($.browser.msie) {
			Array.prototype.indexOf = function(object) {
			
				for (var i = 0; i < this.length; i++) {
					if (this[i] == object) {
						return i;
					}
				}
				return -1;
			}
		}

		return $(this).filter('select').each(function() {

			// add editable option tag if not exists
			if ($(this).children(options.pluginClass).length == 0) {
				var editableOption = $(document.createElement('option'));
				editableOption.addClass(options.pluginClass).hide();

				// add passed CSS classes
				if (typeof(options.classes) == 'string') {
					editableOption.addClass(options.classes);
				} else if (typeof(options.classes) == 'object') {
					for (var i = 0; i < options.classes.length; i++) {
						editableOption.addClass(options.classes[i]);
					}
				}

				// add passed CSS styles
				if (typeof(options.styles) == 'object') {
					for (var i = 0; i < options.styles.length; i++) {
						editableOption.append(options.styles[i]);
					}
				}

				// insert created element on correct position
				if ($(this).children().eq(options.position).length != 0) {
					$(this).children().eq(options.position).before(editableOption);
				} else {
					$(this).append(editableOption);
				}
			}
			
			// handle keys pressed on select
			// backspace and delete must be handled in keydown event in order to work in IE
			$(this).keydown(function(event) {

				var keyCode = getKeyCode(event);
				switch(keyCode) {
					case 8:	// backspace
					case 46:
						var option = $(this).children('option.' + options.pluginClass);
						if (option.val().length > 1) {
							// remove selection from all options
							$(this).children(':selected').removeAttr('selected');

							// remove last character
							var value = option.val().substring(0, option.val().length - 1);
							option.val(value).text(value).attr('selected', 'selected').show();
						} else if (option.val().length == 1) {
							option.val('').text('').hide();
						}
						return (keyCode != 8);
						break;
				}
			});

			// the rest of the keys is handled in keypress event because it gives more informations about pressed key
			$(this).keypress(function(event) {

				var keyCode = getKeyCode(event);
				switch(keyCode) {
					case 9: // tab
					case 39: // up arrow
					case 40: // down arrow
						break;
					default:
						// don't handle ignored keys
						if (options.ignoredKeys.indexOf(keyCode) == -1) {
							// remove selection from all options
							$(this).children(':selected').removeAttr('selected');
							
							keyValue = '';
							// iterate through valid ranges
							for (validKey in options.acceptedRanges) {
								// the range can be either a min,max tuple or exact value
								if((typeof(options.acceptedRanges[validKey].exact) != 'undefined' && options.acceptedRanges[validKey].exact == keyCode) || 
									(typeof(options.acceptedRanges[validKey].min) != 'undefined' && typeof(options.acceptedRanges[validKey].max) != 'undefined' 
										&& keyCode >= options.acceptedRanges[validKey].min && keyCode <= options.acceptedRanges[validKey].max)) {
									keyValue = String.fromCharCode(keyCode);
								}
							}

							// add key value to proper option tag
							var option = $(this).children('option.' + options.pluginClass);
							var value = option.val() + keyValue;
							option.val(value).text(value).attr('selected', 'selected').show();
						}
						break;
				}
			});

			// handles 'useExistingOptions' = true behavior
			if (options.useExistingOptions) {
				setEditableOption($(this));
				$(this).change(function() {
					setEditableOption($(this));
				});
			}
			
			// sets editable option to the value of currently selected option
			function setEditableOption(elem) {
				elem.children('option.' + options.pluginClass).val(elem.children('option:selected').text());
			}
			
			function getKeyCode(event) {
				if ($.browser.msie) {
					return event.keyCode;
				} else {
					return event.which;
				}
			}
		});
	};

})(jQuery);