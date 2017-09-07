var wireConnections = [];

var tools =
{
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
    function dragIt(e) {

        var leftPoint = initX + e.pageX - firstX;
        var topPoint = initY + e.pageY - firstY;

        if (leftPoint > 0 && topPoint > 0) {
            this.style.left = leftPoint + 'px';
            this.style.top = topPoint + 'px';
        }
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
    <label data-idTemplate="${eventObj.parameters.default}" class="listenForId">${eventObj.parameters.default}</label><span  onclick="createSvgLine(this)" class="connectionPoint fa fa-circle"></span>
    </div>
</div>
`;
    });

    eventContainerEl.innerHTML = eventWireMarkup;

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
}
function minimize(elId) {
    let el = document.querySelector(elId);
    el.classList.remove('open')
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


function createSvgLine() {
    var linesContainerEl = document.querySelector('body');


    var id = 'line-' + newGuid();
    var firstTrailX = cursorX + 2;
    var firstTrailY = cursorY + 2;
    var svgLineTemplate = `<line x1="${cursorX}" y1="${cursorY}" x2="${firstTrailX}" y2="${firstTrailY}" style="stroke:rgb(12, 154, 255);stroke-width:2;"/>`;

    var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute('xmlns:xlink', "http://www.w3.org/1999/xlink");
    svgElement.setAttribute('id', id);
    svgElement.setAttribute('width', 1000 + '');
    svgElement.setAttribute('height', 1000 + '');
    svgElement.innerHTML = svgLineTemplate;
    linesContainerEl.insertBefore(svgElement, linesContainerEl.childNodes[0]);

    var handleSvgLineDraw = function (e) {
        var currentLocationX = e.pageX;
        var currentLocationY = e.pageY;
        let lineElement = svgElement.querySelector('line');
        lineElement.setAttribute('x2', currentLocationX + '');
        lineElement.setAttribute('y2', currentLocationY + '');
    };

    var removeListeners = function (e) {
        e.preventDefault();
        document.removeEventListener('mousemove', handleSvgLineDraw);
        document.removeEventListener('click', removeListeners);
    };

    document.addEventListener('mousemove', handleSvgLineDraw);
    document.addEventListener('mousedown', removeListeners);

}
var cursorX;
var cursorY;
document.addEventListener('mousemove', function (e) {
    cursorX = e.pageX;
    cursorY = e.pageY;
    console.log('at ', cursorX, ' on  ', cursorY);
});

createTools();
