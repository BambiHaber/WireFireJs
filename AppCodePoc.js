/**
 *
 *  Wire/Fire/unknown name.js - code proof of concept.
 *
 *  Target:  Create a web developer designers UI/IDE, that generates
 *  a data structure that describes connections between elements, events, and data.
 *
 *  Have an engine parse in runtime the data-structure to create instances of the following
 *  code example.
 *
 *  Code can be used without the designated designer which is not yet implemented.
 *  This way will provide a visual comfortable way for developing web applications
 *
 *  OR
 *
 *  Provide coding with a specific principle for having decoupled objects for developing web apps
 *  keeping 'order' in development.
 *
 *
 *  Minuses - All classes at the moment are instanciated upon start which my not be optimal for performance
 *              -- should be fixed in the future
 *
 *  this is just a proof of concept... nothing is yet finished
 * /



 // so... off we go:

 /**
 * Wire - we use this object for 2 main things:
 *        1.) Attach an event name with a callback
 *        2.) Announce an event that has happened
 **/
var wire = new Wire(); //Should be invisible to user for Auto wiring purposes


/**
 * Button - we use this to create the "fetch button"
 * clicking this will announce to the wire that a fetchButton has been clicked
 */
var fetchButton = new Button({
    text: 'Get names',
    events: [{
        click: {method: wire.announce.bind(this.wire), params: 'fetchButtonClicked'}
    }]
});


/**
 * Button - we use this to create the "sort button"
 * clicking this will announce to the wire that a sort has been clicked
 */
var sortButton = new Button({
    text: 'Sort by first name',
    events: [{
        click: {method: wire.announce.bind(this.wire), params: 'sortClicked'}
    }],
    disabled: true
});

/**
 * DataSource - we use this to create a remote request to a url
 *              and use the wire to announce failure or success
 *              in this case - fetching the "people" data source
 */
var peopleDataSource = new DataSource({
    url: 'http://www.mocky.io/v2/59af0198130000ba08035992',
    events: {
        success: {method: wire.announce.bind(this.wire), params: 'peopleFetchSuccess'},
        error: {method: wire.announce.bind(this.wire), params: 'peopleFetchError'}
    }
});

/**
 * DataProcessor - we use this to handle a data source, in this case a POJO collection
 *                 from the people data source, we pass the source object, and we have a sort function
 *                 when sorted by a predefined key we use the wire to announce that sorting has been invoked
 */
var peopleDataProcessor = new DataProcessor({
    dataSource: peopleDataSource,
    sortKey: 'firstname',
    events: {
        sort: {method: wire.announce.bind(this.wire), params: 'peopleDataSorted'}
    }
});

/**
 * List - creates an unordered list object from a DataProcessor object
 *        it enables rendering from a template with tokens that refer to a single entry
 *        from the POJO collection
 */
var peopleList = new List({
    dataSource: peopleDataProcessor,
    rowTemplate: '${firstname} ${lastName}'
});


// --- Containers
/**
 *
 * Container - This class creates an element according to tags,
 *             it can contain children (buttons, list, another container, everything
 *             that supports element generation)
 *
 *             TODO: ENABLE SCAFFOLDING FROM CONTAINERS AND BASE ELEMENTS TO MARKUP???
 *             OR: ENABLE CONTAINER TO BE GENERATED FROM MARKUP/TEMPLATE!!! VERY IMPORTANT !!
 *
 *              -- At the moment this is code only object
 */
var listContainer = new Container({
    id: 'listContainer',
    tag: 'section',
    children: [peopleList],
    autoRender: false
});

var buttonContainer = new Container({
    id: 'buttons',
    tag: 'section',
    children: [fetchButton, sortButton]
});

var mainContainer = new Container({
    id: 'parent',
    tag: 'main',
    children: [listContainer, buttonContainer],
    cssClass: 'mainContainer',
    appendTo: document.body
});


// --- Events

/**
 * Wire Events attachment
 * Here we declare the callbacks for all objects when something happens,
 * in this case - creating listeners for the event names that we declared
 */

// We clicked the button, lets get the data!
wire.attach('fetchButtonClicked', peopleDataSource.fetch.bind(peopleDataSource));

// People returned from the web service... lets enable sorting and show them!
wire.attach('peopleFetchSuccess', function () {
    peopleList.render();
    sortButton.enable();
});

// We clicked the sort button.. lets sort!
wire.attach('sortClicked', peopleDataProcessor.sort.bind(peopleDataProcessor));

// On sort - empty the list and re render!
wire.attach('peopleDataSorted', function () {
    peopleList.empty().render();
});