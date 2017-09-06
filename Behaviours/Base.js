class Base {
    constructor(options) {
        this.options = options;

        if (this.options.reflector) {
            let reflectorCollection = this.options.reflector;
            reflectorCollection.forEach((reflectorModel)=> {
                let type = reflectorModel.exposeObject['type'];
                let as = reflectorModel.exposeObject['as'];
                let name = reflectorModel.exposeObject['name'];
                let invoke = reflectorModel.exposeObject['invoke'];

                this[name] = as;
                if (invoke) {
                    let method = invoke['method'];
                    let parameters = invoke['parameters'];
                    method.apply(this, parameters);
                }
            });
        }

        if (this.options.events && this.constructor.prototype.createElement) {
            this.constructor.prototype.createElement.call(this, this.options);
            this.bindEvents(this.options.events);
        }

    }

    bindEvents(eventObject) {
        if (this.getElement) {
            var elementToBindTo = this.constructor.prototype.getElement.call(this);

            eventObject.forEach((singleEventObject)=> {
                let eventNameArray = Object.keys(singleEventObject);
                eventNameArray.forEach((eventName) => {
                    var method = singleEventObject[eventName].method;
                    var parameters = singleEventObject[eventName].params;
                    elementToBindTo.addEventListener(eventName.toLowerCase(), ()=> {
                        method(parameters);
                    });
                });
            });
        }
    }
}