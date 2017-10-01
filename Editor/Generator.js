/**
 *
 *
 * This generates the GUI EDITOR
 * next step would be to handle all of the objects as layered class instances on a canvas instead of
 * an svg with dom elements
 *
 * code here is not structured and BADLY formed but just for purposes of proof of concept
 * this should be totally software oop solid pattern. still thinking whether an mvc pattern
 * will benefit for the core
 */

var wire = new Wire(); //I use this to delegate events also in the editor,
//Next step would be to write the editor with all the wireFire components!!! :))
var svgHandler = new SVGHandler();

class WireManager {
    constructor(options) {
        this.options = options;
        this.id = 'WireManager-' + newGuid();
        this.wireConnections = [];
        this.maintainWires();
        wire.attach('minimized', this.onEditableObjectSizeChange.bind(this));
        wire.attach('maximized', this.onEditableObjectSizeChange.bind(this));
    }

    onEditableObjectSizeChange(elementUniqueId) {
        this.wireConnections.forEach((plugModel)=> {
            if ((plugModel.sourceElementId === elementUniqueId) || (plugModel.targetObjectId === elementUniqueId)) {
                let invokingElement = document.querySelector(`#el-${elementUniqueId}`);
                if (invokingElement.classList.contains('minimize')) {

                } else if (invokingElement.classList.contains('maximize')) {

                }
            }
        });
    }

    maintainWires() {
        //Todo: resize SVG elements lines and call redraw? or not needed
        window.addEventListener('resize', (resizeEvent)=> {

            //iterate on all wired components
            //fetch x1 y1 x2 y2

            //and redraw lines
            console.log('window resized', resizeEvent);
        });
        //---> add listeners for window resize to: change width and height of all svg 
        // elements according to window width height


        wire.attach('elementMoving', (moveModel)=> {
            var movingElement = moveModel.element;

            if (movingElement.currentTarget.dataset) {
                var movingElementCurrentTarget = movingElement.currentTarget;
                var movingElementId = movingElementCurrentTarget.getAttribute('data-unique-id');

                //An editable object moved => lets updated all wires/////
                if (movingElementCurrentTarget.classList.contains('editableObject')) {
                    this.wireConnections.forEach((wirePlugModel)=> {

                        var sourceElementId = wirePlugModel.sourceElementId;
                        var targetElement = wirePlugModel.clickedTargetPointEl;
                        var targetElementId = targetElement.id || targetElement.dataset['objectId'];

                        if ((movingElementId === sourceElementId )
                            ||
                            (movingElementId === targetElementId)) {

                            //Then the moving element is in the wireConnections and
                            //We can redraw the wire!

                            //get start Point from event by id or name
                            var movingElTopCoordinate = moveModel.coords.top;
                            var movingElLeftCoordinate = moveModel.coords.left;

                            //get end point from method by id or name

                            var sourceEventName = wirePlugModel.sourceEventName;
                            var sourceConnectionPointEl = document.querySelectorAll(`[data-event-for-id="${sourceElementId}"][data-event-name="${sourceEventName}"]`)[0];
                            var sourceConnectionPointCoords = {
                                x: sourceConnectionPointEl.offsetLeft,
                                y: sourceConnectionPointEl.offsetTop
                            };


                            //take ConnectionPoint  from Target element
                            var targetConnectionPointEl = wirePlugModel.clickedTargetPointEl;

                            var targetConnectionPointCoords = {
                                x: targetConnectionPointEl.offsetLeft,
                                y: targetConnectionPointEl.offsetTop
                            };

                            //SET THE DAMN FUCKING POINT!!!!!! --- gosh that was complex.. next time ill implement everything in canvas with pixi.js
                            var lineEl = document.querySelector(`[data-line-from="${sourceElementId}"]`);
                            lineEl.setAttribute('x1', sourceConnectionPointEl.getBoundingClientRect().left + sourceConnectionPointEl.offsetWidth / 2);
                            lineEl.setAttribute('y1', sourceConnectionPointEl.getBoundingClientRect().top + sourceConnectionPointEl.offsetHeight / 2);
                            lineEl.setAttribute('x2', targetConnectionPointEl.getBoundingClientRect().left + targetConnectionPointEl.offsetWidth / 2);
                            lineEl.setAttribute('y2', targetConnectionPointEl.getBoundingClientRect().top + targetConnectionPointEl.offsetHeight / 2);

                        }
                    })
                }

            }
        });
        // --> add listeners for moving editable objects
        //on moving an editable object just maintain wires
        //in future do this only per object and not the whole wires array for performance
        //redrawing should occur on all plug models
    }

    addPlugModel(plugModel) {
        this.wireConnections.push(plugModel);
    }

    removePlugModel(wireId) {
        this.wireConnections = this.wireConnections.filter((plugModel)=> {
            return wireId != plugModel.uniquePluggingId
        });
    }

    startWiring(options) {

        var currentWireModel = new WirePlugModel({
            sourceElementId: options.sourceElementId,
            sourceEventName: options.eventName
        });

        let firstEvent = options.event;
        svgHandler.createSvgLine(this.plugWire.bind(this), currentWireModel, firstEvent);
    }

    plugWire(svgElAndLineAttributesObject, wireModelReference) {
        /*    svgElement: svgElement,
         lineElAttributeCollection: [...svgElement.querySelector('line').attributes]
         }, wireModelRef);*/

        /**
         *  this.startPointCoords = {
            x1: null,
            y1: null
        };
         this.endPointCoords = {
            x2:null,
            y2:null
        };
         */

        var lineEl = svgElAndLineAttributesObject['lineEl'];
        wireModelReference.startPointCoords.x1 = lineEl.getAttribute('x1');
        wireModelReference.startPointCoords.y1 = lineEl.getAttribute('y1');
        wireModelReference.endPointCoords.x2 = lineEl.getAttribute('x2');
        wireModelReference.endPointCoords.y2 = lineEl.getAttribute('y2');
        wireModelReference.targetElement = svgElAndLineAttributesObject['targetElement'];
        wireModelReference.clickedTargetPointEl = svgElAndLineAttributesObject['clickedTargetPointEl'];
        wireModelReference.targetObjectId = wireModelReference.clickedTargetPointEl.dataset['objectId'];
        wireModelReference.clickedTargetPointEl.classList.add('connected');

        this.wireConnections.push(wireModelReference);
        console.log('Wire model: ' + JSON.stringify(wireModelReference) + ' -- pushed to wireConnections');
    }
}

var wireManager = new WireManager();

/**
 * @type {{Button: {iconClass: string, description: string, classId: {editable: boolean, type: string, mandatory: boolean, unique: boolean}, constructorParameters: {text: {editable: boolean, domType: string, type: string, default: string}, disabled: {editable: boolean, domType: string, type: string, default: boolean}}, methods: string[], events: *[]}, DataSource: {iconClass: string, description: string, classId: {editable: boolean, type: string, mandatory: boolean, unique: boolean}, constructorParameters: {url: {editable: boolean, domType: string, type: string, default: string}}, events: *[]}}}
 */
var tools =
{
    'List': {
        iconClass: 'fa fa-list',
        description: 'Creates an Unordered list from a Dataprocessor',
        classId: {editable: true, type: 'text', mandatory: true, unique: true},
        methods: ['render', 'empty', 'addClass', 'getElement', 'renderRow'],
        constructorParameters: {
            dataSource: {editable: true, domType: 'text', type: 'text', default: ''},
            rowTemplate: {editable: true, domType: 'text', type: 'text', default: ''},
            autoRender: {editable: true, domType: 'checkbox', type: 'boolean', default: false},
            cssClass: {editable: true, domType: 'text', type: 'text', default: ''},
            rowClass: {editable: true, domType: 'text', type: 'text', default: ''},
            style: {editable: true, domType: 'text', type: 'text', default: ''}
        },
        events: [
            {
                name: 'success',
                isWire: true,
                parameters: {
                    editable: true, type: 'text', default: '${classId}FetchSuccess'
                }
            },
            {
                name: 'error',
                isWire: true,
                parameters: {
                    editable: true, type: 'text', default: '${classId}FetchError'
                }
            }]
    },

    'Button': {
        iconClass: 'fa fa-stop',
        description: 'Creates a button element',
        classId: {editable: true, type: 'text', mandatory: true, unique: true},
        constructorParameters: {
            text: {editable: true, domType: 'text', type: 'text', default: ''},
            disabled: {editable: true, domType: 'checkbox', type: 'boolean', default: false}
        },
        methods: ['render', 'enable', 'disable', 'getElement', 'createElement'],
        events: [{
            name: 'click',
            isWire: true,
            parameters: {
                editable: true,
                type: 'text',
                default: '${classId}Clicked'
            }
        }]
    },

    'DataSource': {
        iconClass: 'fa fa-database',
        description: 'Creates an object which can fetch data from remote url',
        classId: {editable: true, type: 'text', mandatory: true, unique: true},
        methods: ['fetch', 'getData', 'toJSON', 'getSuccess', 'getSuccess'],
        constructorParameters: {
            url: {editable: true, domType: 'text', type: 'text', default: ''}
        },
        events: [
            {
                name: 'success',
                isWire: true,
                parameters: {
                    editable: true, type: 'text', default: '${classId}FetchSuccess'
                }
            },
            {
                name: 'error',
                isWire: true,
                parameters: {
                    editable: true, type: 'text', default: '${classId}FetchError'
                }
            }]
    },

    'DataProcessor': {
        iconClass: 'fa fa-filter',
        description: 'Process a data source -  filter/sort by key',
        classId: {editable: true, type: 'text', mandatory: true, unique: true},
        methods: ['getData', 'sort', 'getSuccess', 'getSuccess'],
        constructorParameters: {
            dataSource: {editable: true, domType: 'text', type: 'text', default: ''},
            /**
             *^^^^^^
             *Editor should contain wiring for this type
             * Sorting should contain definition
             *
             *
             */
            sortKey: {editable: true, domType: 'text', type: 'text', default: ''}
            /**
             * ^^^^
             * Should come from a scheme, like a scheme object.. editor can contain
             * "binding fields" all this structure can be a different
             */
            /*

             this.dataSource = this.options.dataSource;
             tthis.sortKey = this.options.sortKey;
             tthis.sortDir = true;
             */
        },
        events: [
            {
                name: 'success',
                isWire: true,
                parameters: {
                    editable: true, type: 'text', default: '${classId}FetchSuccess'
                }
            },
            {
                name: 'error',
                isWire: true,
                parameters: {
                    editable: true, type: 'text', default: '${classId}FetchError'
                }
            }]
    }
};

var toolContainerEl = document.querySelector("#toolContainer");
var designerContainerEl = document.querySelector("#designer");

function createTools() {

    Object.keys(tools).forEach((toolName)=> {
        toolContainerEl.innerHTML += `<div class="tool" onclick="addToolEditor('${toolName}');"><span class="${tools[toolName]['iconClass']}"></span>${toolName}</div>`;
    });
}


function makeDraggable(clickToDragElement, element) {


    var initX, initY, firstX, firstY;

    clickToDragElement.addEventListener('mousedown', function (e) {

        e.preventDefault();
        initX = element.offsetLeft;
        initY = element.offsetTop;
        firstX = e.pageX;
        firstY = e.pageY;

        element.addEventListener('mousemove', dragIt, false);

        window.addEventListener('mouseup', function () {
            element.removeEventListener('mousemove', dragIt, false);
        }, false);

    }, false);

    /*  element.addEventListener('touchstart', function(e) {

     e.preventDefault();
     initX = this.offsetLeft;
     initY = this.offsetTop;
     var touch = e.touches;
     firstX = touch[0].pageX;
     firstY = touch[0].pageY;

     this.addEventListener('touchmove', swipeIt, false);

     window.addEventListener('touchend', function(e) {
     e.preventDefault();
     element.removeEventListener('touchmove', swipeIt, false);
     }, false);

     }, false);
     */
    function dragIt(dragEl) {

        var leftPoint = initX + dragEl.pageX - firstX;
        var topPoint = initY + dragEl.pageY - firstY;

        if (leftPoint > 0 && topPoint > 0) {
            this.style.left = leftPoint + 'px';
            this.style.top = topPoint + 'px';
        }

        wire.announce('elementMoving', {
            element: dragEl,
            coords: {
                left: leftPoint,
                top: topPoint
            }
        });
    }

    /*function swipeIt(e) {
     var contact = e.touches;
     this.style.left = initX+contact[0].pageX-firstX + 'px';
     this.style.top = initY+contact[0].pageY-firstY + 'px';
     }*/
}


function addToolEditor(toolName) {
    let guid = newGuid();
    var selectedTool = tools[toolName];
    var constructorParameters = selectedTool.constructorParameters;
    var constructorParametersNames = Object.keys(constructorParameters);

    var title = document.createElement('div');
    title.innerHTML = `<h4>${toolName}</h4><h6>${selectedTool.description}</h6>`;

    title.classList.add('fieldWrapper');

    var idField = document.createElement('div');
    idField.innerHTML = '<label>ID</label><input class="idField" type="' + selectedTool.classId.type + '" />';
    idField.classList.add('fieldWrapper');

    var ctorParamFields = '';
    constructorParametersNames.forEach((ctorParamKey)=> {
        var ctorParamField = '<div class="fieldWrapper"><label>' + ctorParamKey + '</label><input data-param="' + ctorParamKey + '" type="' + constructorParameters[ctorParamKey].domType + '" value="' + constructorParameters[ctorParamKey].default + '"/></div>'
        ctorParamFields += ctorParamField;
    });

    idField.innerHTML += ctorParamFields;
    var windowOptions = document.createElement('div');
    windowOptions.classList.add('topWinOptions');

    windowOptions.innerHTML = `<section class="winOptions">
<span class="fa fa-window-maximize maximize" onclick="maximize('#el-${guid}');"></span>
<span class="fa fa-window-minimize minimize" onclick="minimize('#el-${guid}');"></span>
<span class="fa fa-arrows move" id="dragable-${guid}"> </span></section>`;

    var editorEl = document.createElement('div');
    editorEl.classList.add('editableObject');
    editorEl.appendChild(windowOptions);
    var contentContainer = document.createElement('div');
    contentContainer.classList.add('contentContainer');

    contentContainer.appendChild(title);
    contentContainer.appendChild(idField);
    /*
     contentContainer.appendChild(ctorParamFieldsEl);
     */
    makeDraggable(windowOptions.querySelector('#dragable-' + guid), editorEl);
    editorEl.setAttribute('id', 'el-' + guid);
    editorEl.appendChild(contentContainer);


    // ----- Events generator and binder -------
    var eventContainerEl = document.createElement('div');
    eventContainerEl.classList.add('eventContainer');

    var toolEventsCollection = selectedTool.events;

    var eventWireMarkup = '';
    eventWireMarkup += '<h3>Events</h3>';

    toolEventsCollection.forEach((eventObj)=> {
        eventWireMarkup +=
            `<div class="fieldWrapper">

<label>
    <span class="fa fa-bolt"></span>${eventObj.name}
</label>

    <div class="selectContainer">
    <select data-for-event="${eventObj.name}">
    <option value="wire-announce" selected="selected">Wire announce</option>
    <option value="custom-function">Invoke custom function</option>
    </select>
    </div>

    <div class="connectContainer">
    <label data-idTemplate="${eventObj.parameters.default}" class="listenForId">${eventObj.parameters.default}</label>
    <span data-event-name="${eventObj.name}" data-event-for-id="${guid}" onclick="startConnection({event:this, sourceElementId:'${guid}', eventName:'${eventObj.name}'});" 
    class="connectionPoint fa fa-circle">
</span>
    </div>
</div>
`;
    });

    /*
     event: event,
     sourceElementId: sourceElementId,
     eventName: eventName
     */

    eventContainerEl.innerHTML = eventWireMarkup;
    var allEventSelectElementsForObject = eventContainerEl.querySelectorAll('select');
    [].forEach.call(allEventSelectElementsForObject, (singleSelectElement)=> {
        singleSelectElement.addEventListener('change', (e)=> {

            let selectedValue = singleSelectElement.options[singleSelectElement.selectedIndex];
            let targetEl = e.currentTarget;
            if (selectedValue.value === 'wire-announce') {
                //Remove a potentially existing code thing
                //add connection point
                console.log('wire-announced selected for ', guid);
            } else if (selectedValue.value === 'custom-function') {
                //remove connection point
                //add text area for JS text
                console.log('custom fn selected for', guid);

            }
        })
    });


    //listen for changes in id to change the listenForId elements

    var idFieldInputElement = idField.querySelector('.idField');

    idFieldInputElement.addEventListener('keyup', function (e) {
        var textValue = e.currentTarget.value;
        var elementsWithIdBound = eventContainerEl.querySelectorAll('.listenForId');
        [].forEach.call(elementsWithIdBound, function (elementWithId) {
            let template = elementWithId.dataset.idtemplate;
            elementWithId.innerText = template.replace('${classId}', textValue)
        });
    });


    editorEl.appendChild(eventContainerEl);
    if (selectedTool.methods) {
        var methodsContainer = document.createElement('div');
        methodsContainer.classList.add('methodsContainer');


        var methodsMarkup = '';
        methodsMarkup += '<h3>Methods</h3>';
        selectedTool.methods.forEach((singleMethod)=> {
            methodsMarkup += `<div class="fieldWrapper"><label>${singleMethod}</label><span class='floater'><span data-method-name="${singleMethod}" data-object-id="${guid}"  class="fa fa-plug singlemethod"></span></span></div>`;
        });
        methodsContainer.innerHTML = methodsMarkup;

        editorEl.appendChild(methodsContainer);
    }
    editorEl.dataset.uniqueId = guid;

    /*selectedTool./* events: [
     {
     name: 'success',
     isWire: true,
     parameters: {
     editable: true, type: 'text', default: '${classId}FetchSuccess'
     }
     },
     {
     name: 'success',
     isWire: true,
     parameters: {
     editable: true, type: 'text', default: '${classId}FetchError'
     }
     }]*/


    // ----- End events generator and binder ------


    designerContainerEl.appendChild(editorEl);
}


function maximize(elId) {
    let el = document.querySelector(elId);
    el.classList.add('open');
    //TODO:Show everything
    wire.announce('maximized', el.dataset.uniqueId);
}
function minimize(elId) {
    let el = document.querySelector(elId);
    el.classList.remove('open');
    //TODO: hide everything but the id and iconclass
    wire.announce('minimized', el.dataset.uniqueId);
}

function newGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

var startConnection = (options) => {
    let event, sourceElementId, eventName;
    event = options['event'];
    sourceElementId = options['sourceElementId'];
    eventName = options['eventName'];
    event.classList.add('connected');
    wireManager.startWiring({
        event: event,
        sourceElementId: sourceElementId,
        eventName: eventName
    });

};


var cursorX;
var cursorY;
document.addEventListener('mousemove', function (e) {
    cursorX = e.pageX;
    cursorY = e.pageY;
    // console.log('at ', cursorX, ' on  ', cursorY);
});

createTools();
