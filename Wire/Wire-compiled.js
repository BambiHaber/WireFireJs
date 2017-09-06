'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Wire = (function () {
    function Wire() {
        _classCallCheck(this, Wire);

        this.eventMap = [];
    }

    _createClass(Wire, [{
        key: 'announce',
        value: function announce(eventName) {
            console.log('announcing ', eventName);

            this.eventMap.forEach(function (singleEvent) {
                if (singleEvent['name'] === eventName) {
                    singleEvent.callback();
                }
            });
        }
    }, {
        key: 'attach',
        value: function attach(eventName, callback) {
            console.log(eventName, '  pushed');
            this.eventMap.push({
                name: eventName,
                callback: callback
            });
        }
    }]);

    return Wire;
})();

//# sourceMappingURL=Wire-compiled.js.map