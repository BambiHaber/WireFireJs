'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DataProcessor = (function () {
    function DataProcessor(options) {
        _classCallCheck(this, DataProcessor);

        this.options = options;
        this.dataSource = this.options.dataSource;
        this.sortKey = this.options.sortKey;
        this.sortDir = true;
    }

    _createClass(DataProcessor, [{
        key: 'getData',
        value: function getData() {
            return this.data || this.dataSource.getData();
        }
    }, {
        key: 'sort',
        value: function sort() {
            var _this = this;

            this.data = this.getData().sort(function (l, r) {
                var result = undefined;
                if (_this.sortDir) {
                    result = _this.processStringVal(l) < _this.processStringVal(r);
                } else {
                    result = _this.processStringVal(l) > _this.processStringVal(r);
                }
                return result;
            });

            this.sortDir = !this.sortDir;

            var method = this.getOnSort()['method'];
            var parameters = this.getOnSort()['params'];
            method.apply(method, [parameters]);

            return this;
        }
    }, {
        key: 'processStringVal',
        value: function processStringVal(obj) {
            return obj[this.sortKey].toLowerCase();
        }
    }, {
        key: 'getOnSort',
        value: function getOnSort() {
            if (this.options.events && this.options.events.sort) {
                return this.options.events.sort;
            } else {
                return { method: console.log, params: 'sorted' };
            }
        }

        /*
         sortByKey(options) {
         let keyDirection = this.sortDirection;
         this.sortDirection = !this.sortDirection;
          let dataClone = this.dataSource.slice(0);
         if (keyDirection) {
          } else {
          }
          return dataClone;
         }*/

    }]);

    return DataProcessor;
})();

//# sourceMappingURL=DataProcessor-compiled.js.map