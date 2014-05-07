/*jslint indent: 4, maxlen: 120 */
/*global describe, it, window, $*/
describe('JEC', function () {
    'use strict';
    var assert = window.assert,
        key = function (elem, code) {
            var list = ['keydown', 'keypress', 'keyup'];
            $.each(list, function () {
                var e = $.Event(this, {
                    keyCode: code
                });
                elem.trigger(e);
            });
        },
        reset = function (elem) {
            elem.jecKill();
            elem.children('option[value=opt2]').prop('selected', true);
            elem.val('opt2');
            elem.children().andSelf().removeAttr('class').addClass('hidden');
            elem.children().andSelf().removeAttr('style');
        };

    describe('Combobox initialization', function () {
        it('should create a new combobox', function () {
            var elem = $('#test').jec();
            assert.equal(elem.is(':editable'), true);
            reset(elem);
        });
    });

    describe('Keyboard', function () {
        it('should behave correctly with keyboard', function () {
            var elem = $('#test').jec(),
                option = elem.children('option.jecEditableOption');
            key($('#test'), 72);
            assert.equal(option.val(), 'H');
            key($('#test'), 105);
            assert.equal(option.val(), 'Hi');
            key($('#test'), 32);
            assert.equal(option.val(), 'Hi ');
            key($('#test'), 33);
            assert.equal(option.val(), 'Hi !');
            key($('#test'), 8);
            assert.equal(option.val(), 'Hi ');
            key($('#test'), 46);
            assert.equal(option.val(), 'Hi');
            reset(elem);
        });
    });

    describe('Setting position', function () {
        it('should set the editable option on the specific position', function () {
            var position = 1,
                elem = $('#test').jec({
                    position: position
                });
            assert.equal(elem.children('option').eq(position).hasClass('jecEditableOption'), true);
            reset(elem);
        });
        it('should set the editable option on the last position', function () {
            var elem = $('#test').jec({
                position: 3
            });
            assert.equal(elem.children('option:last').hasClass('jecEditableOption'), true);
            reset(elem);
        });
        it('should set the editable option on the last position (big value)', function () {
            var elem = $('#test').jec({
                position: 100
            });
            assert.equal(elem.children('option:last').hasClass('jecEditableOption'), true);
            reset(elem);
        });
        it('should set the editable option on the default ignoring negative value', function () {
            var elem = $('#test').jec({
                position: -1
            });
            assert.equal(elem.children('option:first').hasClass('jecEditableOption'), true);
            reset(elem);
        });
        it('should set the editable option on the default ignoring float value', function () {
            var elem = $('#test').jec({
                position: 2.2
            });
            assert.equal(elem.children('option:first').hasClass('jecEditableOption'), true);
            reset(elem);
        });
        it('should set the editable option on the default ignoring string value', function () {
            var elem = $('#test').jec({
                position: '1'
            });
            assert.equal(elem.children('option:first').hasClass('jecEditableOption'), true);
            reset(elem);
        });
        it('should set the editable option on the default ignoring boolean value', function () {
            var elem = $('#test').jec({
                position: true
            });
            assert.equal(elem.children('option:first').hasClass('jecEditableOption'), true);
            reset(elem);
        });
        it('should set the editable option on the default ignoring undefined value', function () {
            var elem = $('#test').jec({
                position: undefined
            });
            assert.equal(elem.children('option:first').hasClass('jecEditableOption'), true);
            reset(elem);
        });
        it('should set the editable option on the default ignoring null value', function () {
            var elem = $('#test').jec({
                position: null
            });
            assert.equal(elem.children('option:first').hasClass('jecEditableOption'), true);
            reset(elem);
        });
        it('should set the editable option on the default ignoring object value', function () {
            var elem = $('#test').jec({
                position: {
                    position: 1
                }
            });
            assert.equal(elem.children('option:first').hasClass('jecEditableOption'), true);
            reset(elem);
        });
        it('should set the editable option on the default ignoring array value', function () {
            var elem = $('#test').jec({
                position: [1]
            });
            assert.equal(elem.children('option:first').hasClass('jecEditableOption'), true);
            reset(elem);
        });
        it('should set the editable option on the default ignoring function value', function () {
            var elem = $('#test').jec({
                position: function () {
                    return 1;
                }
            });
            assert.equal(elem.children('option:first').hasClass('jecEditableOption'), true);
            reset(elem);
        });
    });

    describe('Setting max length', function () {
        it('should set the max length to 2', function () {
            var length = 2,
                elem = $('#test').jec({
                    maxLength: length
                });
            key(elem, 72);
            key(elem, 72);
            key(elem, 72);
            assert.lengthOf(elem.children('.jecEditableOption').val(), length);
            reset(elem);
        });
        it('should ignore invalid negative max length value', function () {
            var i,
                length = 10,
                elem = $('#test').jec({
                    maxLength: -1
                });
            for (i = 0; i < length; i++) {
                key(elem, 72);
            }
            assert.lengthOf(elem.children('.jecEditableOption').val(), length);
            reset(elem);
        });
        it('should ignore invalid float max length value', function () {
            var i,
                length = 10,
                elem = $('#test').jec({
                    maxLength: 1.2
                });
            for (i = 0; i < length; i++) {
                key(elem, 72);
            }
            assert.lengthOf(elem.children('.jecEditableOption').val(), length);
            reset(elem);
        });
        it('should ignore invalid string max length value', function () {
            var i,
                length = 10,
                elem = $('#test').jec({
                    maxLength: '1'
                });
            for (i = 0; i < length; i++) {
                key(elem, 72);
            }
            assert.lengthOf(elem.children('.jecEditableOption').val(), length);
            reset(elem);
        });
        it('should ignore invalid boolean max length value', function () {
            var i,
                length = 10,
                elem = $('#test').jec({
                    maxLength: true
                });
            for (i = 0; i < length; i++) {
                key(elem, 72);
            }
            assert.lengthOf(elem.children('.jecEditableOption').val(), length);
            reset(elem);
        });
        it('should ignore invalid undefined max length value', function () {
            var i,
                length = 10,
                elem = $('#test').jec({
                    maxLength: undefined
                });
            for (i = 0; i < length; i++) {
                key(elem, 72);
            }
            assert.lengthOf(elem.children('.jecEditableOption').val(), length);
            reset(elem);
        });
        it('should ignore invalid null max length value', function () {
            var i,
                length = 10,
                elem = $('#test').jec({
                    maxLength: null
                });
            for (i = 0; i < length; i++) {
                key(elem, 72);
            }
            assert.lengthOf(elem.children('.jecEditableOption').val(), length);
            reset(elem);
        });
        it('should ignore invalid object max length value', function () {
            var i,
                length = 10,
                elem = $('#test').jec({
                    maxLength: {
                        maxLength: 1
                    }
                });
            for (i = 0; i < length; i++) {
                key(elem, 72);
            }
            assert.lengthOf(elem.children('.jecEditableOption').val(), length);
            reset(elem);
        });
        it('should ignore invalid array max length value', function () {
            var i,
                length = 10,
                elem = $('#test').jec({
                    maxLength: [1]
                });
            for (i = 0; i < length; i++) {
                key(elem, 72);
            }
            assert.lengthOf(elem.children('.jecEditableOption').val(), length);
            reset(elem);
        });
        it('should ignore invalid function max length value', function () {
            var i,
                length = 10,
                elem = $('#test').jec({
                    maxLength: function () {
                        return 1;
                    }
                });
            for (i = 0; i < length; i++) {
                key(elem, 72);
            }
            assert.lengthOf(elem.children('.jecEditableOption').val(), length);
            reset(elem);
        });
    });

    describe('Setting classes', function () {
        it('should not set any additional classes given as empty string', function () {
            var elem = $('#test').jec({
                classes: ''
            });
            assert.lengthOf(elem.attr('class').split(/\s+/), 1);
            reset(elem);
        });
        it('should set an additional class given as string', function () {
            var className = 'myClass1',
                elem = $('#test').jec({
                    classes: className
                });
            assert.lengthOf(elem.attr('class').split(/\s+/), 2);
            assert.equal(elem.hasClass(className), true);
            reset(elem);
        });
        it('should set multiple additional class given as string', function () {
            var className1 = 'myClass1',
                className2 = 'myClass2',
                elem = $('#test').jec({
                    classes: className1 + ' ' + className2
                });
            assert.lengthOf(elem.attr('class').split(/\s+/), 3);
            assert.equal(elem.hasClass(className1), true);
            assert.equal(elem.hasClass(className2), true);
            reset(elem);
        });
        it('should not set any additional classes given as empty array', function () {
            var elem = $('#test').jec({
                classes: []
            });
            assert.lengthOf(elem.attr('class').split(/\s+/), 1);
            reset(elem);
        });
        it('should set an additional class given as array', function () {
            var className = 'myClass1',
                elem = $('#test').jec({
                    classes: [className]
                });
            assert.lengthOf(elem.attr('class').split(/\s+/), 2);
            assert.equal(elem.hasClass(className), true);
            reset(elem);
        });
        it('should set multiple additional class given as array', function () {
            var className1 = 'myClass1',
                className2 = 'myClass2',
                elem = $('#test').jec({
                    classes: [className1, className2]
                });
            assert.lengthOf(elem.attr('class').split(/\s+/), 3);
            assert.equal(elem.hasClass(className1), true);
            assert.equal(elem.hasClass(className2), true);
            reset(elem);
        });
        it('should fail to set any additional classes given as int', function () {
            var elem = $('#test').jec({
                classes: 1
            });
            assert.lengthOf(elem.attr('class').split(/\s+/), 1);
            reset(elem);
        });
        it('should fail to set any additional classes given as float', function () {
            var elem = $('#test').jec({
                classes: 1.2
            });
            assert.lengthOf(elem.attr('class').split(/\s+/), 1);
            reset(elem);
        });
        it('should fail to set any additional classes given as boolean', function () {
            var elem = $('#test').jec({
                classes: true
            });
            assert.lengthOf(elem.attr('class').split(/\s+/), 1);
            reset(elem);
        });
        it('should fail to set any additional classes given as undefined', function () {
            var elem = $('#test').jec({
                classes: undefined
            });
            assert.lengthOf(elem.attr('class').split(/\s+/), 1);
            reset(elem);
        });
        it('should fail to set any additional classes given as null', function () {
            var elem = $('#test').jec({
                classes: null
            });
            assert.lengthOf(elem.attr('class').split(/\s+/), 1);
            reset(elem);
        });
        it('should fail to set any additional classes given as object', function () {
            var elem = $('#test').jec({
                classes: {
                    classes: 'myClass1'
                }
            });
            assert.lengthOf(elem.attr('class').split(/\s+/), 1);
            reset(elem);
        });
        it('should fail to set any additional classes given as function', function () {
            var elem = $('#test').jec({
                classes: function () {
                    return 'myClass';
                }
            });
            assert.lengthOf(elem.attr('class').split(/\s+/), 1);
            reset(elem);
        });
    });

    describe('Setting option classes', function () {
        it('should not set any additional classes given as empty string', function () {
            var elem = $('#test').jec({
                optionClasses: ''
            });
            assert.lengthOf(elem.children('.jecEditableOption').attr('class').split(/\s+/), 1);
            reset(elem);
        });
        it('should set an additional class given as string', function () {
            var className = 'myClass1',
                elem = $('#test').jec({
                    optionClasses: className
                }),
                option = elem.children('.jecEditableOption');
            assert.lengthOf(option.attr('class').split(/\s+/), 2);
            assert.equal(option.hasClass(className), true);
            reset(elem);
        });
        it('should set multiple additional class given as string', function () {
            var className1 = 'myClass1',
                className2 = 'myClass2',
                elem = $('#test').jec({
                    optionClasses: className1 + ' ' + className2
                }),
                option = elem.children('.jecEditableOption');
            assert.lengthOf(option.attr('class').split(/\s+/), 3);
            assert.equal(option.hasClass(className1), true);
            assert.equal(option.hasClass(className2), true);
            reset(elem);
        });
        it('should not set any additional classes given as empty array', function () {
            var elem = $('#test').jec({
                optionClasses: []
            });
            assert.lengthOf(elem.children('.jecEditableOption').attr('class').split(/\s+/), 1);
            reset(elem);
        });
        it('should set an additional class given as array', function () {
            var className = 'myClass1',
                elem = $('#test').jec({
                    optionClasses: [className]
                }),
                option = elem.children('.jecEditableOption');
            assert.lengthOf(option.attr('class').split(/\s+/), 2);
            assert.equal(option.hasClass(className), true);
            reset(elem);
        });
        it('should set multiple additional class given as array', function () {
            var className1 = 'myClass1',
                className2 = 'myClass2',
                elem = $('#test').jec({
                    optionClasses: [className1, className2]
                }),
                option = elem.children('.jecEditableOption');
            assert.lengthOf(option.attr('class').split(/\s+/), 3);
            assert.equal(option.hasClass(className1), true);
            assert.equal(option.hasClass(className2), true);
            reset(elem);
        });
        it('should fail to set any additional classes given as int', function () {
            var elem = $('#test').jec({
                optionClasses: 1
            });
            assert.lengthOf(elem.children('.jecEditableOption').attr('class').split(/\s+/), 1);
            reset(elem);
        });
        it('should fail to set any additional classes given as float', function () {
            var elem = $('#test').jec({
                optionClasses: 1.2
            });
            assert.lengthOf(elem.children('.jecEditableOption').attr('class').split(/\s+/), 1);
            reset(elem);
        });
        it('should fail to set any additional classes given as boolean', function () {
            var elem = $('#test').jec({
                optionClasses: true
            });
            assert.lengthOf(elem.children('.jecEditableOption').attr('class').split(/\s+/), 1);
            reset(elem);
        });
        it('should fail to set any additional classes given as undefined', function () {
            var elem = $('#test').jec({
                optionClasses: undefined
            });
            assert.lengthOf(elem.children('.jecEditableOption').attr('class').split(/\s+/), 1);
            reset(elem);
        });
        it('should fail to set any additional classes given as null', function () {
            var elem = $('#test').jec({
                optionClasses: null
            });
            assert.lengthOf(elem.children('.jecEditableOption').attr('class').split(/\s+/), 1);
            reset(elem);
        });
        it('should fail to set any additional classes given as object', function () {
            var elem = $('#test').jec({
                optionClasses: {
                    optionClasses: 'myClass1'
                }
            });
            assert.lengthOf(elem.children('.jecEditableOption').attr('class').split(/\s+/), 1);
            reset(elem);
        });
        it('should fail to set any additional classes given as function', function () {
            var elem = $('#test').jec({
                optionClasses: function () {
                    return 'myClass';
                }
            });
            assert.lengthOf(elem.children('.jecEditableOption').attr('class').split(/\s+/), 1);
            reset(elem);
        });
    });

    describe('Setting styles', function () {
        it('should not set any additional styles given as empty object', function () {
            var elem = $('#test').jec({
                styles: {}
            });
            assert.equal(elem.css('opacity'), 1);
            reset(elem);
        });
        it('should change the opacity to 0.5', function () {
            var opacity = 0.5,
                elem = $('#test').jec({
                    styles: {
                        opacity: opacity
                    }
                });
            assert.equal(elem.css('opacity'), opacity);
            reset(elem);
        });
        it('should change the opacity to 0.5 and display to none', function () {
            var opacity = 0.5,
                display = 'none',
                elem = $('#test').jec({
                    styles: {
                        opacity: opacity,
                        display: display
                    }
                });
            assert.equal(elem.css('opacity'), opacity);
            assert.equal(elem.css('display'), display);
            reset(elem);
        });
        it('should not set any additional styles given as string', function () {
            var elem = $('#test').jec({
                styles: 'opacity: 0.5;'
            });
            assert.equal(elem.attr('style'), undefined);
            reset(elem);
        });
        it('should not set any additional styles given as int', function () {
            var elem = $('#test').jec({
                styles: 1
            });
            assert.equal(elem.attr('style'), undefined);
            reset(elem);
        });
        it('should not set any additional styles given as float', function () {
            var elem = $('#test').jec({
                styles: 1.2
            });
            assert.equal(elem.attr('style'), undefined);
            reset(elem);
        });
        it('should not set any additional styles given as undefined', function () {
            var elem = $('#test').jec({
                styles: undefined
            });
            assert.equal(elem.attr('style'), undefined);
            reset(elem);
        });
        it('should not set any additional styles given as null', function () {
            var elem = $('#test').jec({
                styles: null
            });
            assert.equal(elem.attr('style'), undefined);
            reset(elem);
        });
        it('should not set any additional styles given as boolean', function () {
            var elem = $('#test').jec({
                styles: true
            });
            assert.equal(elem.attr('style'), undefined);
            reset(elem);
        });
        it('should not set any additional styles given as array', function () {
            var elem = $('#test').jec({
                styles: ['opacity: 0.5;']
            });
            assert.equal(elem.attr('style'), undefined);
            reset(elem);
        });
        it('should not set any additional styles given as function', function () {
            var elem = $('#test').jec({
                styles: function () {
                    return 'opacity: 0.5;';
                }
            });
            assert.equal(elem.attr('style'), undefined);
            reset(elem);
        });
    });

    describe('Setting option styles', function () {
        it('should not set any additional styles given as empty object', function () {
            var elem = $('#test').jec({
                optionStyles: {}
            });
            assert.equal(elem.children('.jecEditableOption').css('opacity'), 1);
            reset(elem);
        });
        it('should change the opacity to 0.5', function () {
            var opacity = 0.5,
                elem = $('#test').jec({
                    optionStyles: {
                        opacity: opacity
                    }
                });
            assert.equal(elem.children('.jecEditableOption').css('opacity'), opacity);
            reset(elem);
        });
        it('should change the opacity to 0.5 and display to none', function () {
            var opacity = 0.5,
                display = 'none',
                elem = $('#test').jec({
                    optionStyles: {
                        opacity: opacity,
                        display: display
                    }
                }),
                option = elem.children('.jecEditableOption');
            assert.equal(option.css('opacity'), opacity);
            assert.equal(option.css('display'), display);
            reset(elem);
        });
        it('should not set any additional styles given as string', function () {
            var elem = $('#test').jec({
                optionStyles: 'opacity: 0.5;'
            });
            assert.equal(elem.children('.jecEditableOption').attr('style'), undefined);
            reset(elem);
        });
        it('should not set any additional styles given as int', function () {
            var elem = $('#test').jec({
                optionStyles: 1
            });
            assert.equal(elem.children('.jecEditableOption').attr('style'), undefined);
            reset(elem);
        });
        it('should not set any additional styles given as float', function () {
            var elem = $('#test').jec({
                optionStyles: 1.2
            });
            assert.equal(elem.children('.jecEditableOption').attr('style'), undefined);
            reset(elem);
        });
        it('should not set any additional styles given as undefined', function () {
            var elem = $('#test').jec({
                optionStyles: undefined
            });
            assert.equal(elem.children('.jecEditableOption').attr('style'), undefined);
            reset(elem);
        });
        it('should not set any additional styles given as null', function () {
            var elem = $('#test').jec({
                optionStyles: null
            });
            assert.equal(elem.children('.jecEditableOption').attr('style'), undefined);
            reset(elem);
        });
        it('should not set any additional styles given as boolean', function () {
            var elem = $('#test').jec({
                optionStyles: true
            });
            assert.equal(elem.children('.jecEditableOption').attr('style'), undefined);
            reset(elem);
        });
        it('should not set any additional styles given as array', function () {
            var elem = $('#test').jec({
                optionStyles: ['opacity: 0.5;']
            });
            assert.equal(elem.children('.jecEditableOption').attr('style'), undefined);
            reset(elem);
        });
        it('should not set any additional styles given as function', function () {
            var elem = $('#test').jec({
                optionStyles: function () {
                    return 'opacity: 0.5;';
                }
            });
            assert.equal(elem.children('.jecEditableOption').attr('style'), undefined);
            reset(elem);
        });
    });
    describe('Setting trigger change event handler', function () {
        it('should respect attached change event handler', function () {
            var val = 0,
                handler = function () {
                    val = 1;
                },
                elem = $('#test').on('change', handler).jec({
                    triggerChangeEvent: true
                });
            key(elem, 72);
            assert.equal(val, 1);
            elem.off('change', handler);
            reset(elem);
        });
        it('should ignore change event handler', function () {
            var val = 0,
                handler = function () {
                    val = 1;
                },
                elem = $('#test').on('change', handler).jec({
                    triggerChangeEvent: false
                });
            key(elem, 72);
            assert.equal(val, 0);
            elem.off('change', handler);
            reset(elem);
        });
        it('should ignore setting change event handler flag given as string', function () {
            var val = 0,
                handler = function () {
                    val = 1;
                },
                elem = $('#test').on('change', handler).jec({
                    triggerChangeEvent: 'true'
                });
            key(elem, 72);
            assert.equal(val, 0);
            elem.off('change', handler);
            reset(elem);
        });
        it('should ignore setting change event handler flag given as int', function () {
            var val = 0,
                handler = function () {
                    val = 1;
                },
                elem = $('#test').on('change', handler).jec({
                    triggerChangeEvent: 1
                });
            key(elem, 72);
            assert.equal(val, 0);
            elem.off('change', handler);
            reset(elem);
        });
        it('should ignore setting change event handler flag given as float', function () {
            var val = 0,
                handler = function () {
                    val = 1;
                },
                elem = $('#test').on('change', handler).jec({
                    triggerChangeEvent: 1.2
                });
            key(elem, 72);
            assert.equal(val, 0);
            elem.off('change', handler);
            reset(elem);
        });
        it('should ignore setting change event handler flag given as undefined', function () {
            var val = 0,
                handler = function () {
                    val = 1;
                },
                elem = $('#test').on('change', handler).jec({
                    triggerChangeEvent: undefined
                });
            key(elem, 72);
            assert.equal(val, 0);
            elem.off('change', handler);
            reset(elem);
        });
        it('should ignore setting change event handler flag given as null', function () {
            var val = 0,
                handler = function () {
                    val = 1;
                },
                elem = $('#test').on('change', handler).jec({
                    triggerChangeEvent: null
                });
            key(elem, 72);
            assert.equal(val, 0);
            elem.off('change', handler);
            reset(elem);
        });
        it('should ignore setting change event handler flag given as object', function () {
            var val = 0,
                handler = function () {
                    val = 1;
                },
                elem = $('#test').on('change', handler).jec({
                    triggerChangeEvent: {
                        triggerChangeEvent: true
                    }
                });
            key(elem, 72);
            assert.equal(val, 0);
            elem.off('change', handler);
            reset(elem);
        });
        it('should ignore setting change event handler flag given as array', function () {
            var val = 0,
                handler = function () {
                    val = 1;
                },
                elem = $('#test').on('change', handler).jec({
                    triggerChangeEvent: [true]
                });
            key(elem, 72);
            assert.equal(val, 0);
            elem.off('change', handler);
            reset(elem);
        });
        it('should ignore setting change event handler flag given as function', function () {
            var val = 0,
                handler = function () {
                    val = 1;
                },
                elem = $('#test').on('change', handler).jec({
                    triggerChangeEvent: function () {
                        return true;
                    }
                });
            key(elem, 72);
            assert.equal(val, 0);
            elem.off('change', handler);
            reset(elem);
        });
    });
});
/*
    test('Setting: focusOnNewOption', function () {
        expect(10);

        $('#test').jec({ focusOnNewOption: false });
        equal($('#test').val(), 'opt2', 'Focus on second option (bool false)');
        reset($('#test'));

        $('#test').jec({ focusOnNewOption: '1' });
        equal($('#test').val(), 'opt2', 'Focus on second option (string)');
        reset($('#test'));

        $('#test').jec({ focusOnNewOption: 1 });
        equal($('#test').val(), 'opt2', 'Focus on second option (int)');
        reset($('#test'));

        $('#test').jec({ focusOnNewOption: 1.2 });
        equal($('#test').val(), 'opt2', 'Focus on second option (float)');
        reset($('#test'));

        $('#test').jec({ focusOnNewOption: null });
        equal($('#test').val(), 'opt2', 'Focus on second option (null)');
        reset($('#test'));

        $('#test').jec({ focusOnNewOption: undefined });
        equal($('#test').val(), 'opt2', 'Focus on second option (undefined)');
        reset($('#test'));

        $('#test').jec({ focusOnNewOption: { focus: true} });
        equal($('#test').val(), 'opt2', 'Focus on second option (object)');
        reset($('#test'));

        $('#test').jec({ focusOnNewOption: [true] });
        equal($('#test').val(), 'opt2', 'Focus on second option (array)');
        reset($('#test'));

        $('#test').jec({ focusOnNewOption: $ });
        equal($('#test').val(), 'opt2', 'Focus on second option (function)');
        reset($('#test'));

        $('#test').jec({ focusOnNewOption: true });
        equal($('#test').val(), '', 'Focus on editable option (bool true)');
        reset($('#test'));
    });

    test('Setting: useExistingOptions', function () {
        expect(3);

        $('#test').jec({ useExistingOptions: true });
        $('#test option:eq(1)').prop('selected', true);
        $('#test').trigger('change');
        equal($('#test').jecValue(), 'opt1', 'Select first option');
        $('#test option:eq(2)').prop('selected', true);
        $('#test').trigger('change');
        equal($('#test').jecValue(), 'opt2', 'Select second option');
        $('#test option:last').prop('selected', true);
        $('#test').trigger('change');
        equal($('#test').jecValue(), 'opt3', 'Select last option');
        reset($('#test'));
    });

    test('Setting: ignoredKeys', function () {
        expect(3);

        $('#test').jec({ ignoredKeys: [72, { min: 73, max: 75}] });
        key($('#test'), 72);
        equal($('#test').jecValue(), '', 'Ignored key pressed (number)');
        key($('#test'), 74);
        equal($('#test').jecValue(), '', 'Ignored key pressed (range)');
        key($('#test'), 76);
        equal($('#test').jecValue(), 'L', 'Key outside of ignores pressed');
        reset($('#test'));
    });

    test('Setting: acceptedKeys', function () {
        expect(3);

        $('#test').jec({ acceptedKeys: [72, { min: 73, max: 75}] });
        key($('#test'), 72);
        equal($('#test').jecValue(), 'H', 'Accepted key pressed (number)');
        key($('#test'), 74);
        equal($('#test').jecValue(), 'HJ', 'Accepted key pressed (range)');
        key($('#test'), 76);
        equal($('#test').jecValue(), 'HJ', 'Key outside of accepted pressed');
        reset($('#test'));
    });

    test('Setting: ignoreOptGroups', function () {
        expect(10);

        $('#gtest').jec({ ignoreOptGroups: false, position: 1 });
        equal($('#gtest > option:eq(1)').val(), '', 'Correct editable option placement');
        reset($('#gtest'));

        $('#gtest').jec({ ignoreOptGroups: true, position: 1 });
        equal($('#gtest optgroup:first option:first').val(), '',
            'Correct editable option placement inside optgroup');
        reset($('#gtest'));

        $('#gtest').jec({ ignoreOptGroups: '1', position: 1 });
        equal($('#gtest > option:eq(1)').val(), '', 'Ignoring invalid parameter (string)');
        reset($('#gtest'));

        $('#gtest').jec({ ignoreOptGroups: 1, position: 1 });
        equal($('#gtest > option:eq(1)').val(), '', 'Ignoring invalid parameter (int)');
        reset($('#gtest'));

        $('#gtest').jec({ ignoreOptGroups: 1.2, position: 1 });
        equal($('#gtest > option:eq(1)').val(), '', 'Ignoring invalid parameter (float)');
        reset($('#gtest'));

        $('#gtest').jec({ ignoreOptGroups: null, position: 1 });
        equal($('#gtest > option:eq(1)').val(), '', 'Ignoring invalid parameter (null)');
        reset($('#gtest'));

        $('#gtest').jec({ ignoreOptGroups: undefined, position: 1 });
        equal($('#gtest > option:eq(1)').val(), '', 'Ignoring invalid parameter (undefined)');
        reset($('#gtest'));

        $('#gtest').jec({ ignoreOptGroups: { focus: true}, position: 1 });
        equal($('#gtest > option:eq(1)').val(), '', 'Ignoring invalid parameter (object)');
        reset($('#gtest'));

        $('#gtest').jec({ ignoreOptGroups: [true], position: 1 });
        equal($('#gtest > option:eq(1)').val(), '', 'Ignoring invalid parameter (array)');
        reset($('#gtest'));

        $('#gtest').jec({ ignoreOptGroups: $, position: 1 });
        equal($('#gtest > option:eq(1)').val(), '', 'Ignoring invalid parameter (function)');
        reset($('#gtest'));
    });

    module('initJS');
    test('Editable combobox initialization', function () {
        expect(1);

        var combobox = $.jec();
        ok(combobox.children('option.jecEditableOption').length === 1,
            'Create pure JS combobox without any preferences');
        reset(combobox);
    });

    test('Options', function () {
        expect(34);

        var op = [1, 1.2, 'v1', { k1: 'v1' }, { k2: 1, k3: 1.2, k4: 'v4' }, [], undefined, null,
            true, { g1: [2.3, 2, {k5: 'v5', k6: 3}]}], combobox = $.jec(op);

        ok(combobox.children('option.jecEditableOption').length === 1, 'Combobox created');
        equal(combobox.children('option:eq(1)').val(), '1', 'Checking option #1 key');
        equal(combobox.children('option:eq(1)').text(), '1', 'Checking option #1 value');
        equal(combobox.children('option:eq(2)').val(), '1.2', 'Checking option #2 key');
        equal(combobox.children('option:eq(2)').text(), '1.2', 'Checking option #2 value');
        equal(combobox.children('option:eq(3)').val(), 'v1', 'Checking option #3 key');
        equal(combobox.children('option:eq(3)').text(), 'v1', 'Checking option #3 value');
        equal(combobox.children('option:eq(4)').val(), 'k1', 'Checking option #4 key');
        equal(combobox.children('option:eq(4)').text(), 'v1', 'Checking option #4 value');
        equal(combobox.children('option:eq(5)').val(), 'k2', 'Checking option #5 key');
        equal(combobox.children('option:eq(5)').text(), '1', 'Checking option #5 value');
        equal(combobox.children('option:eq(6)').val(), 'k3', 'Checking option #6 key');
        equal(combobox.children('option:eq(6)').text(), '1.2', 'Checking option #6 value');
        equal(combobox.children('option:eq(7)').val(), 'k4', 'Checking option #7 key');
        equal(combobox.children('option:eq(7)').text(), 'v4', 'Checking option #7 value');
        equal(combobox.children('option').length, 8, 'Checking options number');

        equal(combobox.children('optgroup').length, 1, 'Checking optgroup number');
        equal(combobox.children('optgroup').attr('label'), 'g1', 'Checking optgroup number');
        equal(combobox.find('optgroup option').length, 4, 'Checking optgroup options number');
        equal(combobox.find('optgroup option:eq(0)').val(), '2.3', 'Checking optgroup option #1 key');
        equal(combobox.find('optgroup option:eq(0)').text(), '2.3', 'Checking optgroup option #1 value');
        equal(combobox.find('optgroup option:eq(1)').val(), '2', 'Checking optgroup option #2 key');
        equal(combobox.find('optgroup option:eq(1)').text(), '2', 'Checking optgroup option #2 value');
        equal(combobox.find('optgroup option:eq(2)').val(), 'k5', 'Checking optgroup option #3 key');
        equal(combobox.find('optgroup option:eq(2)').text(), 'v5', 'Checking optgroup option #3 value');
        equal(combobox.find('optgroup option:eq(3)').val(), 'k6', 'Checking optgroup option #4 key');
        equal(combobox.find('optgroup option:eq(3)').text(), '3', 'Checking optgroup option #4 value');
        reset(combobox);

        combobox = $.jec(undefined);
        ok(combobox.children('option.jecEditableOption').length === 1, 'Combobox created (undefined)');
        reset(combobox);

        combobox = $.jec(null);
        ok(combobox.children('option.jecEditableOption').length === 1, 'Combobox created (null)');
        reset(combobox);

        combobox = $.jec('1');
        ok(combobox.children('option.jecEditableOption').length === 1, 'Combobox created (string)');
        reset(combobox);

        combobox = $.jec(1);
        ok(combobox.children('option.jecEditableOption').length === 1, 'Combobox created (int)');
        reset(combobox);

        combobox = $.jec(1.2);
        ok(combobox.children('option.jecEditableOption').length === 1, 'Combobox created (float)');
        reset(combobox);

        combobox = $.jec(true);
        ok(combobox.children('option.jecEditableOption').length === 1, 'Combobox created (boolean)');
        reset(combobox);

        combobox = $.jec({});
        ok(combobox.children('option.jecEditableOption').length === 1,
            'Combobox created (boolean)');
        reset(combobox);
    });

    test('Keyboard', function () {
        expect(6);

        var cbOptions = [{ opt1: 'opt1', opt2: 'opt2', opt3: 'opt3'}],
            combobox = $.jec(cbOptions, { position: 0 });

        combobox.jec();
        key(combobox, 72);
        equal(combobox.jecValue(), 'H', 'Type letter H');
        key(combobox, 105);
        equal(combobox.jecValue(), 'Hi', 'Type letter i');
        key(combobox, 32);
        equal(combobox.jecValue(), 'Hi ', 'Type space');
        key(combobox, 33);
        equal(combobox.jecValue(), 'Hi !', 'Type !');
        key(combobox, 8);
        equal(combobox.jecValue(), 'Hi ', 'Backspace');
        key(combobox, 46);
        equal(combobox.jecValue(), 'Hi', 'Delete');
        reset(combobox);
    });

    test('Setting: position', function () {
        expect(13);

        var cbOptions = [{ opt1: 'opt1', opt2: 'opt2', opt3: 'opt3'}],
            combobox = $.jec(cbOptions, { position: 0 });

        ok(combobox.children('option:first.jecEditableOption').length === 1,
            'Editable option on first position');
        reset(combobox);

        combobox = $.jec(cbOptions, { position: 1 });
        ok(combobox.children('option').eq(1).filter('.jecEditableOption').length === 1,
            'Editable option on second position');
        reset(combobox);

        combobox = $.jec(cbOptions, { position: 3 });
        ok(combobox.children('option').eq(3).filter('.jecEditableOption').length === 1,
            'Editable option on last position');
        reset(combobox);

        combobox = $.jec(cbOptions, { position: 100 });
        ok(combobox.children('option:last').filter('.jecEditableOption').length === 1,
            'Editable option on last position (value greater then number of options)');
        reset(combobox);

        combobox = $.jec(cbOptions, { position: -1 });
        ok(combobox.children('option:first.jecEditableOption').length === 1,
            'Editable option on first position (negative int)');
        reset(combobox);

        combobox = $.jec(cbOptions, { position: 1.2 });
        ok(combobox.children('option:first.jecEditableOption').length === 1,
            'Editable option on first position (float)');
        reset(combobox);

        combobox = $.jec(cbOptions, { position: '1' });
        ok(combobox.children('option:first.jecEditableOption').length === 1,
            'Editable option on first position (string)');
        reset(combobox);

        combobox = $.jec(cbOptions, { position: true });
        ok(combobox.children('option:first.jecEditableOption').length === 1,
            'Editable option on first position (boolean)');
        reset(combobox);

        combobox = $.jec(cbOptions, { position: null });
        ok(combobox.children('option:first.jecEditableOption').length === 1,
            'Editable option on first position (null)');
        reset(combobox);

        combobox = $.jec(cbOptions, { position: undefined });
        ok(combobox.children('option:first.jecEditableOption').length === 1,
            'Editable option on first position (undefined)');
        reset(combobox);

        combobox = $.jec(cbOptions, { position: {} });
        ok(combobox.children('option:first.jecEditableOption').length === 1,
            'Editable option on first position (object)');
        reset(combobox);

        combobox = $.jec(cbOptions, { position: [] });
        ok(combobox.children('option:first.jecEditableOption').length === 1,
            'Editable option on first position (array)');
        reset(combobox);

        combobox = $.jec(cbOptions, { position: $ });
        ok(combobox.children('option:first.jecEditableOption').length === 1,
            'Editable option on first position (function)');
        reset(combobox);
    });

    test('Setting: maxLength', function () {
        expect(10);

        var cbOptions = [{ opt1: 'opt1', opt2: 'opt2', opt3: 'opt3'}],
            combobox = $.jec(cbOptions, { maxLength: 2 });

        key(combobox, 72);
        key(combobox, 72);
        key(combobox, 72);
        equal(combobox.jecValue().length, 2, 'Limiting max length');
        reset(combobox);

        combobox = $.jec(cbOptions, { maxLength: -1 });
        key(combobox, 72);
        equal(combobox.jecValue().length, 1, 'Negative max length');
        reset(combobox);

        combobox = $.jec(cbOptions, { maxLength: 0.1 });
        key(combobox, 72);
        equal(combobox.jecValue().length, 1, 'Malformed max length (float)');
        reset(combobox);

        combobox = $.jec(cbOptions, { maxLength: '0' });
        key(combobox, 72);
        equal(combobox.jecValue().length, 1, 'Malformed max length (string)');
        reset(combobox);

        combobox = $.jec(cbOptions, { maxLength: true });
        key(combobox, 72);
        equal(combobox.jecValue().length, 1, 'Malformed max length (bool)');
        reset(combobox);

        combobox = $.jec(cbOptions, { maxLength: null });
        key(combobox, 72);
        equal(combobox.jecValue().length, 1, 'Malformed max length (null)');
        reset(combobox);

        combobox = $.jec(cbOptions, { maxLength: undefined });
        key(combobox, 72);
        equal(combobox.jecValue().length, 1, 'Malformed max length (undefined)');
        reset(combobox);

        combobox = $.jec(cbOptions, { maxLength: {} });
        key(combobox, 72);
        equal(combobox.jecValue().length, 1, 'Malformed max length (object)');
        reset(combobox);

        combobox = $.jec(cbOptions, { maxLength: [] });
        key(combobox, 72);
        equal(combobox.jecValue().length, 1, 'Malformed max length (array)');
        reset(combobox);

        combobox = $.jec(cbOptions, { maxLength: $ });
        key(combobox, 72);
        equal(combobox.jecValue().length, 1, 'Malformed max length (function)');
        reset(combobox);
    });

    test('Setting: classes', function () {
        expect(15);

        var c1 = 'class1', c2 = 'class2',
            cbOptions = [{ opt1: 'opt1', opt2: 'opt2', opt3: 'opt3'}],
            combobox = $.jec(cbOptions, { classes: '' });

        ok(isEmptyOrUndefined(combobox.attr('class')), 'No extra classes (string)');
        reset(combobox);

        combobox = $.jec(cbOptions, { classes: c1 });
        ok(combobox.hasClass(c1), 'One extra class (string)');
        reset(combobox);

        combobox = $.jec(cbOptions, { classes: c1 + ' ' + c2 });
        ok(combobox.hasClass(c1), 'Several extra classes - checking c1 class (string)');
        ok(combobox.hasClass(c2), 'Several extra classes - checking c2 class (string)');
        reset(combobox);

        combobox = $.jec(cbOptions, { classes: [] });
        ok(isEmptyOrUndefined(combobox.attr('class')), 'No extra classes (array)');
        reset(combobox);

        combobox = $.jec(cbOptions, { classes: [c1] });
        ok(combobox.hasClass(c1), 'One extra class (array)');
        reset(combobox);

        combobox = $.jec(cbOptions, { classes: [c1, c2] });
        ok(combobox.hasClass(c1), 'Several extra classes - checking c1 class(array)');
        ok(combobox.hasClass(c2), 'Several extra classes - checking c2 class(array)');
        reset(combobox);

        combobox = $.jec(cbOptions, { classes: 1 });
        ok(isEmptyOrUndefined(combobox.attr('class')), 'No extra classes (int)');
        reset(combobox);

        combobox = $.jec(cbOptions, { classes: 1.2 });
        ok(isEmptyOrUndefined(combobox.attr('class')), 'No extra classes (float)');
        reset(combobox);

        combobox = $.jec(cbOptions, { classes: true });
        ok(isEmptyOrUndefined(combobox.attr('class')), 'No extra classes (boolean)');
        reset(combobox);

        combobox = $.jec(cbOptions, { classes: null });
        ok(isEmptyOrUndefined(combobox.attr('class')), 'No extra classes (null)');
        reset(combobox);

        combobox = $.jec(cbOptions, { classes: undefined });
        ok(isEmptyOrUndefined(combobox.attr('class')), 'No extra classes (undefined)');
        reset(combobox);

        combobox = $.jec(cbOptions, { classes: {} });
        ok(isEmptyOrUndefined(combobox.attr('class')), 'No extra classes (object)');
        reset(combobox);

        combobox = $.jec(cbOptions, { classes: $ });
        ok(isEmptyOrUndefined(combobox.attr('class')), 'No extra classes (function)');
        reset(combobox);
    });

    test('Setting: optionClasses', function () {
        expect(15);

        var c1 = 'c1', c2 = 'c2', cbOptions = [{ opt1: 'opt1', opt2: 'opt2', opt3: 'opt3'}],
            combobox = $.jec(cbOptions, { optionClasses: '' });

        ok(trim(combobox.children('option.jecEditableOption').attr('class')) ===
            'jecEditableOption', 'No extra classes (string)');
        reset(combobox);

        combobox = $.jec(cbOptions, { optionClasses: c1 });
        ok(combobox.children('option.jecEditableOption').hasClass(c1),
            'One extra class (string)');
        reset(combobox);

        combobox = $.jec(cbOptions, { optionClasses: c1 + ' ' + c2 });
        ok(combobox.children('option.jecEditableOption').hasClass(c1),
            'Several extra classes - checking c1 class (string)');
        ok(combobox.children('option.jecEditableOption').hasClass(c2),
            'Several extra classes - checking c2 class (string)');
        reset(combobox);

        combobox = $.jec(cbOptions, { optionClasses: [] });
        ok(trim(combobox.children('option.jecEditableOption').attr('class')) ===
            'jecEditableOption', 'No extra classes (array)');
        reset(combobox);

        combobox = $.jec(cbOptions, { optionClasses: [c1] });
        ok(combobox.children('option.jecEditableOption').hasClass(c1),
            'One extra class (array)');
        reset(combobox);

        combobox = $.jec(cbOptions, { optionClasses: [c1, c2] });
        ok(combobox.children('option.jecEditableOption').hasClass(c1),
             'Several extra classes - checking c1 class(array)');
        ok(combobox.children('option.jecEditableOption').hasClass(c2),
             'Several extra classes - checking c2 class(array)');
        reset(combobox);

        combobox = $.jec(cbOptions, { optionClasses: 1 });
        ok(trim(combobox.children('option.jecEditableOption').attr('class')) ===
            'jecEditableOption', 'No extra classes (int)');
        reset(combobox);

        combobox = $.jec(cbOptions, { optionClasses: 1.2 });
        ok(trim(combobox.children('option.jecEditableOption').attr('class')) ===
            'jecEditableOption', 'No extra classes (float)');
        reset(combobox);

        combobox = $.jec(cbOptions, { optionClasses: true });
        ok(trim(combobox.children('option.jecEditableOption').attr('class')) ===
            'jecEditableOption', 'No extra classes (boolean)');
        reset(combobox);

        combobox = $.jec(cbOptions, { optionClasses: null });
        ok(trim(combobox.children('option.jecEditableOption').attr('class')) ===
            'jecEditableOption', 'No extra classes (null)');
        reset(combobox);

        combobox = $.jec(cbOptions, { optionClasses: undefined });
        ok(trim(combobox.children('option.jecEditableOption').attr('class')) ===
            'jecEditableOption', 'No extra classes (undefined)');
        reset(combobox);

        combobox = $.jec(cbOptions, { optionClasses: {} });
        ok(trim(combobox.children('option.jecEditableOption').attr('class')) ===
            'jecEditableOption', 'No extra classes (object)');
        reset(combobox);

        combobox = $.jec(cbOptions, { optionClasses: $ });
        ok(trim(combobox.children('option.jecEditableOption').attr('class')) ===
            'jecEditableOption', 'No extra classes (function)');
        reset(combobox);
    });

    test('Setting: styles', function () {
        expect(12);

        var s1 = 'opacity', v1 = '0.5', s2 = 'display', v2 = 'block', obj = {},
            cbOptions = [{ opt1: 'opt1', opt2: 'opt2', opt3: 'opt3'}],
            combobox = $.jec(cbOptions, { styles: obj });

        equal(combobox.css(s1), '1', 'No extra styles');
        reset(combobox);

        obj[s1] = v1;
        combobox = $.jec(cbOptions, { styles: obj });
        equal(combobox.css(s1), v1, 'Opacity changed');
        reset(combobox);

        obj[s2] = v2;
        combobox = $.jec(cbOptions, { styles: obj });
        equal(combobox.css(s1), v1, 'Opacity and display changed, checking opacity');
        equal(combobox.css(s2), v2, 'Opacity and display changed, checking display');
        reset(combobox);

        combobox = $.jec(cbOptions, { styles: 'width: 100px' });
        equal(combobox.css(s1), '1', 'No extra styles (string)');
        reset(combobox);

        combobox = $.jec(cbOptions, { styles: 0 });
        equal(combobox.css(s1), '1', 'No extra styles (int)');
        reset(combobox);

        combobox = $.jec(cbOptions, { styles: 0.5 });
        equal(combobox.css(s1), '1', 'No extra styles (float)');
        reset(combobox);

        combobox = $.jec(cbOptions, { styles: true });
        equal(combobox.css(s1), '1', 'No extra styles (boolean)');
        reset(combobox);

        combobox = $.jec(cbOptions, { styles: null });
        equal(combobox.css(s1), '1', 'No extra styles (null)');
        reset(combobox);

        combobox = $.jec(cbOptions, { styles: undefined });
        equal(combobox.css(s1), '1', 'No extra styles (undefined)');
        reset(combobox);

        combobox = $.jec(cbOptions, { styles: [] });
        equal(combobox.css(s1), '1', 'No extra styles (array)');
        reset(combobox);

        combobox = $.jec(cbOptions, { styles: $ });
        equal(combobox.css(s1), '1', 'No extra styles (function)');
        reset(combobox);
    });

    test('Setting: optionStyles', function () {
        expect(12);

        var s1 = 'opacity', v1 = '0.5', s2 = 'display', v2 = 'block', obj = {},
            cbOptions = [{ opt1: 'opt1', opt2: 'opt2', opt3: 'opt3'}],
            combobox = $.jec(cbOptions, { optionStyles: obj });

        equal(combobox.children('option.jecEditableOption').css(s1), '1', 'No extra styles');
        reset(combobox);

        obj[s1] = v1;
        combobox = $.jec(cbOptions, { optionStyles: obj });
        equal(combobox.children('option.jecEditableOption').css(s1), v1, 'Opacity changed');
        reset(combobox);

        obj[s2] = v2;
        combobox = $.jec(cbOptions, { optionStyles: obj });
        equal(combobox.children('option.jecEditableOption').css(s1), v1,
            'Opacity and display changed, checking opacity');
        equal(combobox.children('option.jecEditableOption').css(s2), v2,
            'Opacity and display changed, checking display');
        reset(combobox);

        combobox = $.jec(cbOptions, { styles: 'width: 100px' });
        equal(combobox.children('option.jecEditableOption').css(s1), '1', 'No extra styles (string)');
        reset(combobox);

        combobox = $.jec(cbOptions, { optionStyles: 0 });
        equal(combobox.children('option.jecEditableOption').css(s1), '1', 'No extra styles (int)');
        reset(combobox);

        combobox = $.jec(cbOptions, { optionStyles: 0.5 });
        equal(combobox.children('option.jecEditableOption').css(s1), '1', 'No extra styles (float)');
        reset(combobox);

        combobox = $.jec(cbOptions, { optionStyles: true });
        equal(combobox.children('option.jecEditableOption').css(s1), '1', 'No extra styles (boolean)');
        reset(combobox);

        combobox = $.jec(cbOptions, { optionStyles: null });
        equal(combobox.children('option.jecEditableOption').css(s1), '1', 'No extra styles (null)');
        reset(combobox);

        combobox = $.jec(cbOptions, { optionStyles: undefined });
        equal(combobox.children('option.jecEditableOption').css(s1), '1', 'No extra styles (undefined)');
        reset(combobox);

        combobox = $.jec(cbOptions, { optionStyles: [] });
        equal(combobox.children('option.jecEditableOption').css(s1), '1', 'No extra styles (array)');
        reset(combobox);

        combobox = $.jec(cbOptions, { optionStyles: $ });
        equal(combobox.children('option.jecEditableOption').css(s1), '1', 'No extra styles (function)');
        reset(combobox);
    });

    test('Setting: triggerChangeEvent', function () {
        expect(10);

        var test = null, cbOptions = [{ opt1: 'opt1', opt2: 'opt2', opt3: 'opt3'}], combobox;

        function testHandler() {
            test = 1;
        }

        combobox = $.jec(cbOptions, { triggerChangeEvent: true });
        combobox.bind('change', testHandler);
        key(combobox, 72);
        equal(test, 1, 'Run change event handler');
        reset(combobox);
        test = null;

        combobox = $.jec(cbOptions, { triggerChangeEvent: false });
        combobox.bind('change', testHandler);
        key(combobox, 72);
        equal(test, null, 'Ignore change event handler');
        reset(combobox);
        test = null;

        combobox = $.jec(cbOptions, { triggerChangeEvent: '' });
        combobox.bind('change', testHandler);
        key(combobox, 72);
        equal(test, null, 'Ignore malformed parameter (string)');
        reset(combobox);
        test = null;

        combobox = $.jec(cbOptions, { triggerChangeEvent: 1 });
        combobox.bind('change', testHandler);
        key(combobox, 72);
        equal(test, null, 'Ignore malformed parameter (int)');
        reset(combobox);
        test = null;

        combobox = $.jec(cbOptions, { triggerChangeEvent: 1.2 });
        combobox.bind('change', testHandler);
        key(combobox, 72);
        equal(test, null, 'Ignore malformed parameter (float)');
        reset(combobox);
        test = null;

        combobox = $.jec(cbOptions, { triggerChangeEvent: undefined });
        combobox.bind('change', testHandler);
        key(combobox, 72);
        equal(test, null, 'Ignore malformed parameter (undefined)');
        reset(combobox);
        test = null;

        combobox = $.jec(cbOptions, { triggerChangeEvent: null });
        combobox.bind('change', testHandler);
        key(combobox, 72);
        equal(test, null, 'Ignore malformed parameter (null)');
        reset(combobox);
        test = null;

        combobox = $.jec(cbOptions, { triggerChangeEvent: {} });
        combobox.bind('change', testHandler);
        key(combobox, 72);
        equal(test, null, 'Ignore malformed parameter (object)');
        reset(combobox);
        test = null;

        combobox = $.jec(cbOptions, { triggerChangeEvent: [] });
        combobox.bind('change', testHandler);
        key(combobox, 72);
        equal(test, null, 'Ignore malformed parameter (array)');
        reset(combobox);
        test = null;

        combobox = $.jec(cbOptions, { triggerChangeEvent: $ });
        combobox.bind('change', testHandler);
        key(combobox, 72);
        equal(test, null, 'Ignore malformed parameter (function)');
        reset(combobox);
        test = null;
    });

    test('Setting: focusOnNewOption', function () {
        expect(10);

        var cbOptions = [{ opt1: 'opt1', opt2: 'opt2', opt3: 'opt3'}],
            combobox = $.jec(cbOptions, { focusOnNewOption: false, position: 1 });

        equal(combobox.val(), 'opt1', 'Focus on first option');
        reset(combobox);

        combobox = $.jec(cbOptions, { focusOnNewOption: true, position: 1 });
        equal(combobox.val(), '', 'Focus moved to editable option');
        reset(combobox);

        combobox = $.jec(cbOptions, { focusOnNewOption: '1', position: 1 });
        equal(combobox.val(), 'opt1', 'Focus on first option (string)');
        reset(combobox);

        combobox = $.jec(cbOptions, { focusOnNewOption: 1, position: 1 });
        equal(combobox.val(), 'opt1', 'Focus on first option (int)');
        reset(combobox);

        combobox = $.jec(cbOptions, { focusOnNewOption: 1.2, position: 1 });
        equal(combobox.val(), 'opt1', 'Focus on first option (float)');
        reset(combobox);

        combobox = $.jec(cbOptions, { focusOnNewOption: null, position: 1 });
        equal(combobox.val(), 'opt1', 'Focus on first option (null)');
        reset(combobox);

        combobox = $.jec(cbOptions, { focusOnNewOption: undefined, position: 1 });
        equal(combobox.val(), 'opt1', 'Focus on first option (undefined)');
        reset(combobox);

        combobox = $.jec(cbOptions, { focusOnNewOption: { focus: true }, position: 1 });
        equal(combobox.val(), 'opt1', 'Focus on first option (object)');
        reset(combobox);

        combobox = $.jec(cbOptions, { focusOnNewOption: [true], position: 1 });
        equal(combobox.val(), 'opt1', 'Focus on first option (array)');
        reset(combobox);

        combobox = $.jec(cbOptions, { focusOnNewOption: $, position: 1 });
        equal(combobox.val(), 'opt1', 'Focus on first option (function)');
        reset(combobox);
    });

    test('Setting: useExistingOptions', function () {
        expect(3);

        var cbOptions = [{ opt1: 'opt1', opt2: 'opt2', opt3: 'opt3'}],
            combobox = $.jec(cbOptions, { useExistingOptions: true });

        combobox.children('option:eq(1)').prop('selected', true);
        combobox.trigger('change');
        equal(combobox.jecValue(), 'opt1', 'Select first option');
        combobox.children('option:eq(2)').prop('selected', true);
        combobox.trigger('change');
        equal(combobox.jecValue(), 'opt2', 'Select second option');
        combobox.children('option:last').prop('selected', true);
        combobox.trigger('change');
        equal(combobox.jecValue(), 'opt3', 'Select last option');
        reset(combobox);
    });

    test('Setting: ignoredKeys', function () {
        expect(3);

        var cbOptions = [{ opt1: 'opt1', opt2: 'opt2', opt3: 'opt3'}],
            combobox = $.jec(cbOptions, { ignoredKeys: [72, { min: 73, max: 75}] });

        key(combobox, 72);
        equal(combobox.jecValue(), '', 'Ignored key pressed (number)');
        key(combobox, 74);
        equal(combobox.jecValue(), '', 'Ignored key pressed (range)');
        key(combobox, 76);
        equal(combobox.jecValue(), 'L', 'Key outside of ignores pressed');
        reset(combobox);
    });

    test('Setting: acceptedKeys', function () {
        expect(3);

        var cbOptions = [{ opt1: 'opt1', opt2: 'opt2', opt3: 'opt3'}],
            combobox = $.jec(cbOptions, { acceptedKeys: [72, { min: 73, max: 75}] });

        key(combobox, 72);
        ok(combobox.jecValue() === 'H', 'Accepted key pressed (number)');
        key(combobox, 74);
        ok(combobox.jecValue() === 'HJ', 'Accepted key pressed (range)');
        key(combobox, 76);
        ok(combobox.jecValue() === 'HJ', 'Key outside of accepted pressed');
        reset(combobox);
    });

    module('disable');
    test('Editable combobox deactivation', function () {
        expect(2);

        $('#test').jec();
        $('#test').jecOff();
        ok($('#test option').length === 3, 'Check if editable option was removed');
        ok($('#test').data('jecId') !== null, 'Check if id is still present');
        reset($('#test'));
    });

    module('enable');
    test('Editable combobox activation', function () {
        expect(1);

        $('#test').jec();
        $('#test').jecOff();
        $('#test').jecOn();
        ok($('#test option.jecEditableOption').length === 1, 'Check if editable option was added');
        reset($('#test'));
    });

    module('kill');
    test('Editable combobox destruction', function () {
        expect(2);

        $('#test').jec();
        reset($('#test'));
        ok($('#test option').length === 3, 'Check if editable option was removed');
        ok($('#test').data('jecId') === undefined, 'Check if id was removed');
    });

    module('value');
    test('Getting value', function () {
        expect(3);

        var v1 = 'v1', v2 = 1, v3 = 1.2;

        $('#test').jec();
        $('#test option.jecEditableOption').text(v1).val(v1);
        equal($('#test').jecValue(), v1, 'Get value (string)');
        $('#test option.jecEditableOption').text(v2).val(v2);
        equal($('#test').jecValue(), String(v2), 'Get value (int)');
        $('#test option.jecEditableOption').text(v3).val(v3);
        equal($('#test').jecValue(), String(v3), 'Get value (float)');
        reset($('#test'));
    });

    test('Setting value', function () {
        expect(9);

        var v1 = 'v1', v2 = 1, v3 = 1.2;

        $('#test').jec();
        $('#test').jecValue(v1);
        equal($('#test').jecValue(), v1, 'Get value (string)');
        $('#test').jecValue(v2);
        equal($('#test').jecValue(), String(v2), 'Get value (int)');
        $('#test').jecValue(v3);
        equal($('#test').jecValue(), String(v3), 'Get value (float)');
        $('#test').jecValue({});
        equal($('#test').jecValue(), String(v3), 'Get value (object)');
        $('#test').jecValue([]);
        equal($('#test').jecValue(), String(v3), 'Get value (array)');
        $('#test').jecValue(null);
        equal($('#test').jecValue(), String(v3), 'Get value (null)');
        $('#test').jecValue(undefined);
        equal($('#test').jecValue(), String(v3), 'Get value (undefined)');
        $('#test').jecValue(true);
        equal($('#test').jecValue(), String(v3), 'Get value (boolean)');
        $('#test').jecValue($);
        equal($('#test').jecValue(), String(v3), 'Get value (function)');
        reset($('#test'));
    });

    module('pref');
    test('Getting preference', function () {
        expect(17);

        $('#test').jec();
        ok($('#test').jecPref() === undefined, 'Get preference (undefined)');
        ok($('#test').jecPref(null) === undefined, 'Get preference (null)');
        ok($('#test').jecPref({}) === undefined, 'Get preference (object)');
        ok($('#test').jecPref(1) === undefined, 'Get preference (int)');
        ok($('#test').jecPref(1.2) === undefined, 'Get preference (float)');
        ok($('#test').jecPref(true) === undefined, 'Get preference (boolean)');
        ok($('#test').jecPref($) === undefined, 'Get preference (function)');
        ok($('#test').jecPref('dummy') === undefined, 'Get preference (not-existing string)');

        var i, keys = [], defaults = {
            position: 0,
            classes: [],
            styles: {},
            optionClasses: [],
            optionStyles: {},
            focusOnNewOption: false,
            useExistingOptions: false,
            ignoredKeys: [],
            acceptedKeys: [
                { min: 32, max: 126 },
                { min: 191, max: 382 }
            ]
        };

        $.each(defaults, function (key, value) {
            if (value !== undefined) {
                if (key === 'acceptedKeys') {
                    value = defaults.acceptedKeys;
                    $.each(value, function () {
                        // min,max tuple
                        if ($.isPlainObject(this) && typeof this.min === 'number' && typeof this.max === 'number'
                                && this.min <= this.max) {
                            for (i = this.min; i <= this.max; i += 1) {
                                keys[keys.length] = i;
                            }
                            // number
                        } else if (typeof this === 'number') {
                            keys[keys.length] = this;
                        }
                    });
                    deepEqual($('#test').jecPref('acceptedKeys'), keys, 'Get ' + key + ' value');
                } else {
                    deepEqual($('#test').jecPref(key), value, 'Get ' + key + ' value');
                }
            }
        });

        reset($('#test'));
    });

    test('Setting preference: position', function () {
        expect(9);

        $('#test').jec();
        $('#test').jecPref('position', 1);
        equal($('#test').jecPref('position'), 1, 'Set preference (int)');
        $('#test').jecPref('position', 1.2);
        equal($('#test').jecPref('position'), 1, 'Set preference (float)');
        $('#test').jecPref('position', '2');
        equal($('#test').jecPref('position'), 1, 'Set preference (string)');
        $('#test').jecPref('position', {});
        equal($('#test').jecPref('position'), 1, 'Set preference (object)');
        $('#test').jecPref('position', []);
        equal($('#test').jecPref('position'), 1, 'Set preference (array)');
        $('#test').jecPref('position', false);
        equal($('#test').jecPref('position'), 1, 'Set preference (boolean)');
        $('#test').jecPref('position', undefined);
        equal($('#test').jecPref('position'), 1, 'Set preference (undefined)');
        $('#test').jecPref('position', null);
        equal($('#test').jecPref('position'), 1, 'Set preference (null)');
        $('#test').jecPref('position', $);
        equal($('#test').jecPref('position'), 1, 'Set preference (function)');
        reset($('#test'));
    });

    test('Setting preference: classes', function () {
        expect(9);

        var c1 = 'c1';
        $('#test').jec();
        $('#test').jecPref('classes', [c1]);
        deepEqual($('#test').jecPref('classes'), [c1], 'Set preference (array)');
        $('#test').jecPref('classes', c1);
        deepEqual($('#test').jecPref('classes'), [c1], 'Set preference (string)');
        $('#test').jecPref('classes', 1);
        deepEqual($('#test').jecPref('classes'), [c1], 'Set preference (int)');
        $('#test').jecPref('classes', 1.2);
        deepEqual($('#test').jecPref('classes'), [c1], 'Set preference (float)');
        $('#test').jecPref('classes', {});
        deepEqual($('#test').jecPref('classes'), [c1], 'Set preference (object)');
        $('#test').jecPref('classes', false);
        deepEqual($('#test').jecPref('classes'), [c1], 'Set preference (boolean)');
        $('#test').jecPref('classes', undefined);
        deepEqual($('#test').jecPref('classes'), [c1], 'Set preference (undefined)');
        $('#test').jecPref('classes', null);
        deepEqual($('#test').jecPref('classes'), [c1], 'Set preference (null)');
        $('#test').jecPref('classes', $);
        deepEqual($('#test').jecPref('classes'), [c1], 'Set preference (function)');
        reset($('#test'));
    });

    test('Setting preference: styles', function () {
        expect(9);

        var styles = { opacity: 0.5, 'display': 'none' };

        $('#test').jec();
        $('#test').jecPref('styles', styles);
        equal($('#test').jecPref('styles'), styles, 'Set preference (object)');
        $('#test').jecPref('styles', []);
        equal($('#test').jecPref('styles'), styles, 'Set preference (array)');
        $('#test').jecPref('styles', 'width: 100px;');
        equal($('#test').jecPref('styles'), styles, 'Set preference (string)');
        $('#test').jecPref('styles', 1);
        equal($('#test').jecPref('styles'), styles, 'Set preference (int)');
        $('#test').jecPref('styles', 1.2);
        equal($('#test').jecPref('styles'), styles, 'Set preference (float)');
        $('#test').jecPref('styles', false);
        equal($('#test').jecPref('styles'), styles, 'Set preference (boolean)');
        $('#test').jecPref('styles', undefined);
        equal($('#test').jecPref('styles'), styles, 'Set preference (undefined)');
        $('#test').jecPref('styles', null);
        equal($('#test').jecPref('styles'), styles, 'Set preference (null)');
        $('#test').jecPref('styles', $);
        equal($('#test').jecPref('styles'), styles, 'Set preference (function)');
        reset($('#test'));
    });

    test('Setting preference: focusOnNewOption', function () {
        expect(9);

        $('#test').jec();
        $('#test').jecPref('focusOnNewOption', true);
        equal($('#test').jecPref('focusOnNewOption'), true, 'Set preference (boolean)');
        $('#test').jecPref('focusOnNewOption', 'true');
        equal($('#test').jecPref('focusOnNewOption'), true, 'Set preference (string)');
        $('#test').jecPref('focusOnNewOption', {});
        equal($('#test').jecPref('focusOnNewOption'), true, 'Set preference (object)');
        $('#test').jecPref('focusOnNewOption', []);
        equal($('#test').jecPref('focusOnNewOption'), true, 'Set preference (array)');
        $('#test').jecPref('focusOnNewOption', 1);
        equal($('#test').jecPref('focusOnNewOption'), true, 'Set preference (int)');
        $('#test').jecPref('focusOnNewOption', 1.2);
        equal($('#test').jecPref('focusOnNewOption'), true, 'Set preference (float)');
        $('#test').jecPref('focusOnNewOption', undefined);
        equal($('#test').jecPref('focusOnNewOption'), true, 'Set preference (undefined)');
        $('#test').jecPref('focusOnNewOption', null);
        equal($('#test').jecPref('focusOnNewOption'), true, 'Set preference (null)');
        $('#test').jecPref('focusOnNewOption', $);
        equal($('#test').jecPref('focusOnNewOption'), true, 'Set preference (function)');
        reset($('#test'));
    });

    test('Setting preference: useExistingOptions', function () {
        expect(9);

        $('#test').jec();
        $('#test').jecPref('useExistingOptions', true);
        equal($('#test').jecPref('useExistingOptions'), true, 'Set preference (boolean)');
        $('#test').jecPref('useExistingOptions', 'true');
        equal($('#test').jecPref('useExistingOptions'), true, 'Set preference (string)');
        $('#test').jecPref('useExistingOptions', {});
        equal($('#test').jecPref('useExistingOptions'), true, 'Set preference (object)');
        $('#test').jecPref('useExistingOptions', []);
        equal($('#test').jecPref('useExistingOptions'), true, 'Set preference (array)');
        $('#test').jecPref('useExistingOptions', 1);
        equal($('#test').jecPref('useExistingOptions'), true, 'Set preference (int)');
        $('#test').jecPref('useExistingOptions', 1.2);
        equal($('#test').jecPref('useExistingOptions'), true, 'Set preference (float)');
        $('#test').jecPref('useExistingOptions', undefined);
        equal($('#test').jecPref('useExistingOptions'), true, 'Set preference (undefined)');
        $('#test').jecPref('useExistingOptions', null);
        equal($('#test').jecPref('useExistingOptions'), true, 'Set preference (null)');
        $('#test').jecPref('useExistingOptions', $);
        equal($('#test').jecPref('useExistingOptions'), true, 'Set preference (function)');
        reset($('#test'));
    });

    test('Setting preference: ignoredKeys', function () {
        expect(9);

        var range, parsedRange = [10, 11, 12, 13, 14, 15, 35, 55];
        range = [
            { min: 10, max: 15 }, // (min, max) tuple
            35, 55 // number values
        ];

        $('#test').jec();
        $('#test').jecPref('ignoredKeys', range);
        deepEqual($('#test').jecPref('ignoredKeys'), parsedRange, 'Set preference (array)');
        $('#test').jecPref('ignoredKeys', true);
        deepEqual($('#test').jecPref('ignoredKeys'), parsedRange, 'Set preference (boolean)');
        $('#test').jecPref('ignoredKeys', '');
        deepEqual($('#test').jecPref('ignoredKeys'), parsedRange, 'Set preference (string)');
        $('#test').jecPref('ignoredKeys', {});
        deepEqual($('#test').jecPref('ignoredKeys'), parsedRange, 'Set preference (object)');
        $('#test').jecPref('ignoredKeys', 1);
        deepEqual($('#test').jecPref('ignoredKeys'), parsedRange, 'Set preference (int)');
        $('#test').jecPref('ignoredKeys', 1.2);
        deepEqual($('#test').jecPref('ignoredKeys'), parsedRange, 'Set preference (float)');
        $('#test').jecPref('ignoredKeys', undefined);
        deepEqual($('#test').jecPref('ignoredKeys'), parsedRange, 'Set preference (undefined)');
        $('#test').jecPref('ignoredKeys', null);
        deepEqual($('#test').jecPref('ignoredKeys'), parsedRange, 'Set preference (null)');
        $('#test').jecPref('ignoredKeys', $);
        deepEqual($('#test').jecPref('ignoredKeys'), parsedRange, 'Set preference (function)');
        reset($('#test'));
    });

    test('Setting preference: acceptedKeys', function () {
        expect(9);

        var range, parsedRange = [10, 11, 12, 13, 14, 15, 35, 55];
        range = [
            { min: 10, max: 15 }, // (min, max) tuple
            35, 55 // number values
        ];

        $('#test').jec();
        $('#test').jecPref('acceptedKeys', range);
        deepEqual($('#test').jecPref('acceptedKeys'), parsedRange, 'Set preference (array)');
        $('#test').jecPref('acceptedKeys', true);
        deepEqual($('#test').jecPref('acceptedKeys'), parsedRange, 'Set preference (boolean)');
        $('#test').jecPref('acceptedKeys', '');
        deepEqual($('#test').jecPref('acceptedKeys'), parsedRange, 'Set preference (string)');
        $('#test').jecPref('acceptedKeys', {});
        deepEqual($('#test').jecPref('acceptedKeys'), parsedRange, 'Set preference (object)');
        $('#test').jecPref('acceptedKeys', 1);
        deepEqual($('#test').jecPref('acceptedKeys'), parsedRange, 'Set preference (int)');
        $('#test').jecPref('acceptedKeys', 1.2);
        deepEqual($('#test').jecPref('acceptedKeys'), parsedRange, 'Set preference (float)');
        $('#test').jecPref('acceptedKeys', undefined);
        deepEqual($('#test').jecPref('acceptedKeys'), parsedRange, 'Set preference (undefined)');
        $('#test').jecPref('acceptedKeys', null);
        deepEqual($('#test').jecPref('acceptedKeys'), parsedRange, 'Set preference (null)');
        $('#test').jecPref('acceptedKeys', $);
        deepEqual($('#test').jecPref('acceptedKeys'), parsedRange, 'Set preference (function)');
        reset($('#test'));
    });*/