'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Base = (function () {
    function Base(options) {
        var _this = this;

        _classCallCheck(this, Base);

        this.options = options;

        if (this.options.reflector) {
            var reflectorCollection = this.options.reflector;
            reflectorCollection.forEach(function (reflectorModel) {
                var type = reflectorModel.exposeObject['type'];
                var as = reflectorModel.exposeObject['as'];
                var name = reflectorModel.exposeObject['name'];
                var invoke = reflectorModel.exposeObject['invoke'];

                _this[name] = as;
                if (invoke) {
                    var method = invoke['method'];
                    var parameters = invoke['parameters'];
                    method.apply(_this, parameters);
                }
            });
        }

        if (this.options.events && this.constructor.prototype.createElement) {
            this.constructor.prototype.createElement.call(this, this.options);
            this.bindEvents(this.options.events);
        }
    }

    _createClass(Base, [{
        key: 'bindEvents',
        value: function bindEvents(eventObject) {
            if (this.getElement) {
                var elementToBindTo = this.constructor.prototype.getElement.call(this);

                eventObject.forEach(function (singleEventObject) {
                    var eventNameArray = Object.keys(singleEventObject);
                    eventNameArray.forEach(function (eventName) {
                        var method = singleEventObject[eventName].method;
                        var parameters = singleEventObject[eventName].params;
                        elementToBindTo.addEventListener(eventName.toLowerCase(), function () {
                            method(parameters);
                        });
                    });
                });
            }
        }
    }]);

    return Base;
})();

//# sourceMappingURL=Base-compiled.js.map