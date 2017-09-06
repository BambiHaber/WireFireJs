'use strict';

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

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
"use strict";

/*
class Reflactable {
    constructor(options) {
        this.options = options;
    }
}*/

//# sourceMappingURL=Reflactable-compiled.js.map
"use strict";

/*
class Reflactable {
    constructor(options) {
        this.options = options;
    }
}*/
"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Wireable = function Wireable(options) {
    _classCallCheck(this, Wireable);

    this.options = options;
    if (this.options.wire && this.options.events) {}
};

//# sourceMappingURL=Wireable-compiled.js.map
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wireable = function Wireable(options) {
    _classCallCheck(this, Wireable);

    this.options = options;
    if (this.options.wire && this.options.events) {}
};
'use strict';

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;desc = parent = getter = undefined;_again = false;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) subClass.__proto__ = superClass;
}

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
            this.buttonElement.setAttribute('disabled', 'disabled');
            console.log('button enabled');
        }
    }, {
        key: 'disable',
        value: function disable() {
            this.buttonElement.removeAttribute('disabled');
            console.log('button disabled');
        }
    }]);

    return Button;
})(Base);

//# sourceMappingURL=Button-compiled.js.map
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
            this.buttonElement.setAttribute('disabled', 'disabled');
            console.log('button enabled');
        }
    }, {
        key: 'disable',
        value: function disable() {
            this.buttonElement.removeAttribute('disabled');
            console.log('button disabled');
        }
    }]);

    return Button;
})(Base);
'use strict';

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;desc = parent = getter = undefined;_again = false;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) subClass.__proto__ = superClass;
}

var Container = (function (_Base) {
    function Container(options) {
        _classCallCheck(this, Container);

        _get(Object.getPrototypeOf(Container.prototype), 'constructor', this).call(this, options);
        this.options = options;
        this.id = this.options.id;
        this.tag = this.options.tag;
        this.wire = this.options.wire;
        this.parentElement = this.options.parentElement;
        this.children = this.options.children;
        this.cssClass = this.options.cssClass;

        this.containerEl = document.createElement(this.tag);
    }

    _inherits(Container, _Base);

    _createClass(Container, [{
        key: 'render',
        value: function render() {
            var _this = this;

            if (this.id) {
                this.containerEl.setAttribute('id', this.id);
            }
            if (this.cssClass) {
                this.addClass(this.containerEl, this.cssClass);
            }

            this.children.forEach(function (child) {
                _this.containerEl.appendChild(child.getElement());
            });

            return this;
        }
    }, {
        key: 'getElement',
        value: function getElement() {
            return this.containerEl.getRootNode();
        }
    }, {
        key: 'getParentElement',
        value: function getParentElement() {
            return this.containerEl.parentNode;
        }
    }, {
        key: 'addChild',
        value: function addChild(childObject) {}
    }]);

    return Container;
})(Base);

//# sourceMappingURL=Container-compiled.js.map
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Container = (function (_Base) {
    function Container(options) {
        _classCallCheck(this, Container);

        _get(Object.getPrototypeOf(Container.prototype), 'constructor', this).call(this, options);
        this.options = options;
        this.id = this.options.id;
        this.tag = this.options.tag;
        this.wire = this.options.wire;
        this.parentElement = this.options.parentElement;
        this.children = this.options.children;
        this.cssClass = this.options.cssClass;

        this.containerEl = document.createElement(this.tag);
    }

    _inherits(Container, _Base);

    _createClass(Container, [{
        key: 'render',
        value: function render() {
            var _this = this;

            if (this.id) {
                this.containerEl.setAttribute('id', this.id);
            }
            if (this.cssClass) {
                this.addClass(this.containerEl, this.cssClass);
            }

            this.children.forEach(function (child) {
                _this.containerEl.appendChild(child.getElement());
            });

            return this;
        }
    }, {
        key: 'getElement',
        value: function getElement() {
            return this.containerEl.getRootNode();
        }
    }, {
        key: 'getParentElement',
        value: function getParentElement() {
            return this.containerEl.parentNode;
        }
    }, {
        key: 'addChild',
        value: function addChild(childObject) {}
    }]);

    return Container;
})(Base);
"use strict";

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var DataProcessor = (function () {
    function DataProcessor(options) {
        _classCallCheck(this, DataProcessor);

        this.options = options;
        this.dataSource = this.options.dataSource;

        //        this.sortDirection = true;
        //data type
        // comparator
        // autosort on init
        //lari-fari
        this.sortKey = this.options.sortKey;
    }

    _createClass(DataProcessor, [{
        key: "getData",
        value: function getData() {
            return this.data || this.dataSource.getData();
        }
    }, {
        key: "sort",
        value: function sort() {
            var _this = this;

            this.data = this.getData().sort(function (l, r) {
                return _this.processStringVal(l) < _this.processStringVal(r);
            });
        }
    }, {
        key: "processStringVal",
        value: function processStringVal(obj) {
            return obj[this.sortKey].toLowerCase();
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
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataProcessor = (function () {
    function DataProcessor(options) {
        _classCallCheck(this, DataProcessor);

        this.options = options;
        this.dataSource = this.options.dataSource;

        //        this.sortDirection = true;
        //data type
        // comparator
        // autosort on init
        //lari-fari
        this.sortKey = this.options.sortKey;
    }

    _createClass(DataProcessor, [{
        key: "getData",
        value: function getData() {
            return this.data || this.dataSource.getData();
        }
    }, {
        key: "sort",
        value: function sort() {
            var _this = this;

            this.data = this.getData().sort(function (l, r) {
                return _this.processStringVal(l) < _this.processStringVal(r);
            });
        }
    }, {
        key: "processStringVal",
        value: function processStringVal(obj) {
            return obj[this.sortKey].toLowerCase();
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
'use strict';

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

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

            /*use strict';
             var xhr = new XMLHttpRequest();
             xhr.onreadystatechange = ()=> {
             if (xhr.readyState === 4 && xhr.status === 200) {
             let method = this.getSuccess()['method'];
             let parameters = this.getSuccess()['params'];
             this.data = xhr.responseText;
             console.log('fetch got', this.data);
             method(parameters);
             } else {
             let method = this.getFail()['method'];
             let parameters = this.getFail()['params'];
             method(parameters);
             }
             };
             xhr.open('GET', this.url);
             xhr.send();*/
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

            /*use strict';
             var xhr = new XMLHttpRequest();
             xhr.onreadystatechange = ()=> {
             if (xhr.readyState === 4 && xhr.status === 200) {
             let method = this.getSuccess()['method'];
             let parameters = this.getSuccess()['params'];
             this.data = xhr.responseText;
             console.log('fetch got', this.data);
             method(parameters);
             } else {
             let method = this.getFail()['method'];
             let parameters = this.getFail()['params'];
             method(parameters);
             }
             };
             xhr.open('GET', this.url);
             xhr.send();*/
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
'use strict';

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

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
    }

    _createClass(List, [{
        key: 'render',
        value: function render() {
            var _this = this;

            this.ulElement = document.createElement('ul');
            if (this.id) {
                this.ulElement.setAttribute('id', this.id);
            }
            if (this.cssClass) {
                this.addClass(this.ulElement, this.cssClass);
            }

            var entries = this.dataSource.getData();

            entries.forEach(function (dataObject) {
                _this.ulElement.appendChild(_this.renderRow(dataObject));
            });

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
    }

    _createClass(List, [{
        key: 'render',
        value: function render() {
            var _this = this;

            this.ulElement = document.createElement('ul');
            if (this.id) {
                this.ulElement.setAttribute('id', this.id);
            }
            if (this.cssClass) {
                this.addClass(this.ulElement, this.cssClass);
            }

            var entries = this.dataSource.getData();

            entries.forEach(function (dataObject) {
                _this.ulElement.appendChild(_this.renderRow(dataObject));
            });

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
'use strict';

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

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
'use strict';

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

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

//# sourceMappingURL=WireFire-compiled.js.map