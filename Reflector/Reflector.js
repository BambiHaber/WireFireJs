class Reflector {
    constructor(options) {

        this.options = options;
        this.toObject = this.options.toObject;
        this.innerObjectFunction = this.options.innerObjectFunction;
        this.scopeLocation = this.options.scopeLocation || 'start'; //or 'end
    }

    createInstance(paramsObject) {
        class dummyClass extends this.toObject {
           
        }


        // new dummyClass.prototype.constructor.bind(this.super)
        //  return new dummyClass(paramsObject);
    }

}