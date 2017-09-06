class Container extends Base {
    constructor(options) {
        super(options);
        this.options = options;
        this.id = this.options.id;
        this.tag = this.options.tag;
        this.wire = this.options.wire;
        this.parentElement = this.options.parentElement;
        this.children = this.options.children;
        this.cssClass = this.options.cssClass;
        this.appendTo = this.options.appendTo;
        this.autoRender = this.options.autoRender || true;

        this.containerEl = document.createElement(this.tag);

        if (this.appendTo) {
            this.appendTo.appendChild(this.render().getElement())
        }
    }

    render() {

        if (this.id) {
            this.containerEl.setAttribute('id', this.id);
        }
        if (this.cssClass) {
            this.containerEl.classList.add(this.cssClass);
        }

        this.children.forEach((child)=> {
            this.containerEl.appendChild(child.render().getElement());
        });

        return this;
    }

    getElement() {
        return this.containerEl.getRootNode();
    }

    getParentElement() {
        return this.containerEl.parentNode;
    }

    addChild(childObject) {

    }
}