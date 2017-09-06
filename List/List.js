class List {
    constructor(options) {
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

    render() {

        if (this.id) {
            this.ulElement.setAttribute('id', this.id);
        }
        if (this.cssClass) {
            this.addClass(this.ulElement, this.cssClass);
        }

        var entries = this.dataSource.getData();
        if (entries) {
            entries.forEach((dataObject)=> {
                this.ulElement.appendChild(this.renderRow(dataObject));
            });
        }
        return this;
    }

    getElement() {
        return this.ulElement.getRootNode();
    }

    renderRow(data) {

        let rowEl = document.createElement('li');
        let rowText = '';

        if (this.rowClass) {
            rowEl.classList.add(this.rowClass);
        }

        if (this.rowTemplate) {
            rowText = this.rowTemplate;
            Object.keys(data).forEach((key)=> {
                rowText = rowText.replace('${' + key + '}', data[key]);
            });

        } else if (this.displayKey) {
            rowText = data[this.displayKey];
        }
        let rowTextNode = document.createTextNode(rowText);
        rowEl.appendChild(rowTextNode);

        return rowEl.getRootNode();
    }

    addClass(el, className) {
        el.classList.add(className);
    }

    empty() {
        while (this.ulElement.firstChild) {
            this.ulElement.removeChild(this.ulElement.firstChild);
        }
        return this;
    }
}