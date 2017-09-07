class Button extends Base {
    constructor(options) {
        super(options);
        this.options = options;
        this.text = this.options.text;
        this.disabled = this.options.disabled;

        this.buttonElement;
        if (!this.buttonElement) {
            this.createElement();
        }
    }

    createElement() {
        this.buttonElement = document.createElement('button');
    }

    render() {
        this.textElement = document.createTextNode(this.options['text']);
        this.buttonElement.appendChild(this.textElement);
        if (this.disabled) {
            this.disable();
        }
        return this;
    }

    getElement() {
        return this.buttonElement.rootNode || this.buttonElement;
    }

    enable() {
        this.buttonElement.classList.remove('disabled');
        console.log('button enabled');
    }

    disable() {
        this.buttonElement.classList.add('disabled');
        console.log('button disabled');
    }


}