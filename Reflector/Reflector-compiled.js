'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Reflector = (function () {
    function Reflector(options) {
        _classCallCheck(this, Reflector);

        this.options = options;
        this.toObject = this.options.toObject;
        this.innerObjectFunction = this.options.innerObjectFunction;
        this.scopeLocation = this.options.scopeLocation || 'start'; //or 'end
    }

    _createClass(Reflector, [{
        key: 'createInstance',
        value: function createInstance(paramsObject) {
            var dummyClass = (function (_toObject) {
                function dummyClass() {
                    _classCallCheck(this, dummyClass);

                    if (_toObject != null) {
                        _toObject.apply(this, arguments);
                    }
                }

                _inherits(dummyClass, _toObject);

                return dummyClass;
            })(this.toObject);
        }
    }]);

    return Reflector;
})();

// new dummyClass.prototype.constructor.bind(this.super)
//  return new dummyClass(paramsObject);

//# sourceMappingURL=Reflector-compiled.js.map