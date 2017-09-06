class Wire {
    constructor() {
        this.eventMap = [];
    }

    announce(eventName) {
        console.log('announcing ', eventName);

        this.eventMap.forEach((singleEvent)=> {
            if (singleEvent['name'] === eventName) {
                singleEvent.callback();
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