// stuff cannot be "backwired"
// methods wouldnt connect to events
// but events will only connect to methods
/**
 * Created by OferHaber on 09/09/2017.
 */
class WirePlugModel {
    constructor(options) {
        this.options = options;
        //source
        this.sourceElementId = this.options.sourceElementId;
        this.sourceEventName = this.options.sourceEventName;

        //target
        this.targetObjectId = this.options.targetObjectId;
        this.targetObjectMethod = this.options.targetObjectMethod;

        /**
         * Make this classes with props with getters setters
         * getters setters could then listen themselves to the window events??
         * or move events?? instead of wiremanager iterating on everything
         *
         * again, Poc & lazyness constraints
         * @type {{x1: null, y1: *}}
         */
        this.startPointCoords = {
            x1: null,
            y1: null
        };
        this.endPointCoords = {
            x2: null,
            y2: null
        };
    }
    
}
