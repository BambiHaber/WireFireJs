class DataSource {
    constructor(options) {
        this.options = options;
        this.url = this.options.url;
        this.data = null;
    }

    toJSON() {
        return JSON.parse(this.getData());
    }

    getData() {
        return this.data;
    }

    fetch() {
        window.fetch(this.url)
            .then((response) => {
                response.json().then((json)=> {
                    this.data = json;
                    let method = this.getSuccess()['method'];
                    let parameters = this.getSuccess()['params'];
                    method.apply(method, [parameters]);
                });
            })
            .catch((err)=> {
                let method = this.getFail()['method'];
                let parameters = this.getFail()['params'];
                method.apply(method, [parameters]);
            });

    }

    getSuccess() {
        if (this.options.events && this.options.events.success) {
            return this.options.events.success
        } else {
            return {method: console.log, params: 'fetch success'}
        }
    }

    getFail() {
        if (this.options.events && this.options.events.error) {
            return this.options.events.error
        } else {
            return {method: console.log, params: 'fetch failed'}
        }
    }

}