class Wire {
    constructor() {
        this.eventMap = [];
    }

    announce(eventName, params) {
        console.log('announcing ', eventName);

        this.eventMap.forEach((singleEvent)=> {
            if (singleEvent['name'] === eventName) {
                if (params) {
                    singleEvent.callback(params)
                } else {
                    singleEvent.callback();
                }
            }
        });

    }

    attach(eventName, callback) {
        console.log(eventName, '  pushed');
        this.eventMap.push({
            name: eventName,
            callback: callback
        });
    }
}