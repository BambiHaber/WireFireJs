'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Button = (function (_Base) {
    function Button(options) {
        _classCallCheck(this, Button);

        _get(Object.getPrototypeOf(Button.prototype), 'constructor', this).call(this, options);
        this.options = options;
        this.text = this.options.text;
        this.disabled = this.options.disabled;
        this.buttonElement;

        if (!this.buttonElement) {
            this.createElement();
        }
    }

    _inherits(Button, _Base);

    _createClass(Button, [{
        key: 'createElement',
        value: function createElement() {
            this.buttonElement = document.createElement('button');
        }
    }, {
        key: 'render',
        value: function render() {
            this.textElement = document.createTextNode(this.options['text']);
            this.buttonElement.appendChild(this.textElement);
            if (this.disabled) {
                this.disable();
            }
            return this;
        }
    }, {
        key: 'getElement',
        value: function getElement() {
            return this.buttonElement.rootNode || this.buttonElement;
        }
    }, {
        key: 'enable',
        value: function enable() {
            this.buttonElement.classList.remove('disabled');
            console.log('button enabled');
        }
    }, {
        key: 'disable',
        value: function disable() {
            this.buttonElement.classList.add('disabled');
            console.log('button disabled');
        }
    }]);

    return Button;
})(Base);

//# sourceMappingURL=Button-compiled.js.map