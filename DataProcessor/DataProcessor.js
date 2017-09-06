class DataProcessor {
    constructor(options) {
        this.options = options;
        this.dataSource = this.options.dataSource;
        this.sortKey = this.options.sortKey;
        this.sortDir = true;
    }


    getData() {
        return this.data || this.dataSource.getData();

    }

    sort() {
        this.data = this.getData().sort((l, r)=> {
            let result;
            if (this.sortDir) {
                result = this.processStringVal(l) < this.processStringVal(r)
            } else {
                result = this.processStringVal(l) > this.processStringVal(r)
            }
            return result;
        });
        
        this.sortDir = !this.sortDir;

        let method = this.getOnSort()['method'];
        let parameters = this.getOnSort()['params'];
        method.apply(method, [parameters]);
        
        return this;
    }

    processStringVal(obj) {
        return obj[this.sortKey].toLowerCase();
    }


    getOnSort() {
        if (this.options.events && this.options.events.sort) {
            return this.options.events.sort
        } else {
            return {method: console.log, params: 'sorted'}
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

}