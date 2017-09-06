'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DataSource = (function () {
    function DataSource(options) {
        _classCallCheck(this, DataSource);

        this.options = options;
        this.url = this.options.url;
        this.data = null;
    }

    _createClass(DataSource, [{
        key: 'toJSON',
        value: function toJSON() {
            return JSON.parse(this.getData());
        }
    }, {
        key: 'getData',
        value: function getData() {
            return this.data;
        }
    }, {
        key: 'fetch',
        value: function fetch() {
            var _this = this;

            window.fetch(this.url).then(function (response) {
                response.json().then(function (json) {
                    _this.data = json;
                    var method = _this.getSuccess()['method'];
                    var parameters = _this.getSuccess()['params'];
                    method.apply(method, [parameters]);
                });
            })['catch'](function (err) {
                var method = _this.getFail()['method'];
                var parameters = _this.getFail()['params'];
                method.apply(method, [parameters]);
            });
        }
    }, {
        key: 'getSuccess',
        value: function getSuccess() {
            if (this.options.events && this.options.events.success) {
                return this.options.events.success;
            } else {
                return { method: console.log, params: 'fetch success' };
            }
        }
    }, {
        key: 'getFail',
        value: function getFail() {
            if (this.options.events && this.options.events.error) {
                return this.options.events.error;
            } else {
                return { method: console.log, params: 'fetch failed' };
            }
        }
    }]);

    return DataSource;
})();

//# sourceMappingURL=DataSource-compiled.js.map