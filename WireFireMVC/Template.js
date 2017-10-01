/**
 * Template is similar to the underscore template negine.
 *
 * However - this should have a wrapper which instanciates a new instance and passes arguments.
 * creating new instance while passing the template string as a parameter.
 *
 * if passing data at the constructor, compile would invoke on the ctor also and return the compiled value.
 *
 * Use case 1 example:
 *  var greetingMessage = new Template('Hello ${firstname} ${lastname}',{firstname: 'Bambi', lastname: 'Haber'});
 *  will return: 'Hello Bambi Haber'
 *
 * Use case 2 example:
 *  var data = {firstname: 'Bambi', lastname: 'Haber'};
 *  var greetingMessageTemplate = new Template('Hello ${firstname} ${lastname}');
 *  var greetingMessage = greetingMessageTemplate.compile(data);
 *
 *  greetingMessage will be 'Hello Bambi Haber'
 *
 *
 * Use case 3(most recommended): create a wrapper function for factory pattern
 *
 * (function (rootObject) {
    rootObject.WF = rootObject.WF || {};
    WF.template = function (args) {
        return new Template(args);
    };
    }(window));
 *
 * var greetingTemplate = WF.template('Hello ${firstname} ${lastname}')
 *      greetingTemplate.compile(data)... etc..
 *
 */
class Template {
    /**
     *
     * @param templateString - for example ('First name: ${userFirstName}, Last name: ${userLastName}';
     * @param data           - any POJO object with keys and values that would be replaced by the tokens on the
     *                          compile function. if data is provided in the constructor it would instantly run compile.
     */
    constructor(templateString, data) {
        this.templateString = templateString;
        this.data = null;
        this.compiledString = null;

        if (data) {
            this.compile(this.data);
        }

    }

    /**
     * Provides a compiled text string according to the data object provided
     * @param data
     * @returns {*|string}
     */
    compile(data) {
        let result = this.templateString || '';
        if (result.length > 0 && data) {
            Object.entries(data).forEach((entry)=> {
                let objKey = entry[0];
                let objValue = entry[1];
                result = result.replace('${' + objKey + '}', objValue);
            });
        }
        this.compiledString = result;
        return result;
    }

    getText() {
        return (this.compiledString) ? this.compiledString : this.compile();
    }
}
