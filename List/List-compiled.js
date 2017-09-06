'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var List = (function () {
    function List(options) {
        _classCallCheck(this, List);

        this.options = options;
        this.style = this.options.style;
        this.id = this.options.id;
        this.cssClass = this.options.cssClass;
        this.rowClass = this.options.rowClass;
        this.dataSource = this.options.dataSource;
        this.displayKey = this.options.displayKey;
        this.rowTemplate = this.options.rowTemplate;
        this.autoRender = this.options.autoRender || false;
        this.wire = this.options.wire;

        this.ulElement = document.createElement('ul');
    }

    _createClass(List, [{
        key: 'render',
        value: function render() {
            var _this = this;

            if (this.id) {
                this.ulElement.setAttribute('id', this.id);
            }
            if (this.cssClass) {
                this.addClass(this.ulElement, this.cssClass);
            }

            var entries = this.dataSource.getData();
            if (entries) {
                entries.forEach(function (dataObject) {
                    _this.ulElement.appendChild(_this.renderRow(dataObject));
                });
            }
            return this;
        }
    }, {
        key: 'getElement',
        value: function getElement() {
            return this.ulElement.getRootNode();
        }
    }, {
        key: 'renderRow',
        value: function renderRow(data) {

            var rowEl = document.createElement('li');
            var rowText = '';

            if (this.rowClass) {
                rowEl.classList.add(this.rowClass);
            }

            if (this.rowTemplate) {
                rowText = this.rowTemplate;
                Object.keys(data).forEach(function (key) {
                    rowText = rowText.replace('${' + key + '}', data[key]);
                });
            } else if (this.displayKey) {
                rowText = data[this.displayKey];
            }
            var rowTextNode = document.createTextNode(rowText);
            rowEl.appendChild(rowTextNode);

            return rowEl.getRootNode();
        }
    }, {
        key: 'addClass',
        value: function addClass(el, className) {
            el.classList.add(className);
        }
    }, {
        key: 'empty',
        value: function empty() {
            while (this.ulElement.firstChild) {
                this.ulElement.removeChild(this.ulElement.firstChild);
            }
            return this;
        }
    }]);

    return List;
})();

//# sourceMappingURL=List-compiled.js.map