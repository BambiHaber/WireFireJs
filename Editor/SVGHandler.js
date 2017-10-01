class SVGHandler {
    createSvgLine(endClickCallback, wireModelRef, firstEvent) {
        var linesContainerEl = document.querySelector('body');
        //TODO: remove the width height setters from here. its non related and should be managed outside
        var id = 'line-' + newGuid();
        var lineSourceId = wireModelRef.sourceElementId;

        var firstClickRectangularBound = firstEvent.getClientRects()[0];
        var firstTrailX = Math.ceil(firstClickRectangularBound.left) + firstClickRectangularBound.width / 2;
        var firstTrailY = Math.ceil(firstClickRectangularBound.top) + firstClickRectangularBound.height / 2;
        wireModelRef.startPointCoords.x1 = firstTrailX;
        wireModelRef.startPointCoords.y1 = firstTrailY;

        var svgLineTemplate = `<line data-line-from="${lineSourceId}" x1="${cursorX}" y1="${cursorY}" x2="${firstTrailX}" y2="${firstTrailY}" style="stroke:rgb(12, 154, 255);stroke-width:2;"/>`;

        var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElement.setAttribute('xmlns:xlink', "http://www.w3.org/1999/xlink");
        svgElement.setAttribute('id', id);
        svgElement.setAttribute('width', '' + document.querySelector('#designer').offsetWidth);
        svgElement.setAttribute('height', '' + document.querySelector('#designer').offsetHeight);
        svgElement.innerHTML = svgLineTemplate;
        linesContainerEl.insertBefore(svgElement, linesContainerEl.childNodes[0]);


        let handleSvgLineDraw = function (e) {
            var currentLocationX = e.pageX;
            var currentLocationY = e.pageY;
            if (e.target.classList.contains('connectionPoint')) {
                currentLocationX = e.target.getBoundingClientRect().left + e.target.offsetWidth / 2;
                currentLocationY = e.target.getBoundingClientRect().top + e.target.offsetHeight / 2;
            }
            let lineElement = svgElement.querySelector('line');
            lineElement.setAttribute('x2', currentLocationX + '');
            lineElement.setAttribute('y2', currentLocationY + '');
        };

        let removeListeners = function (ev) {
            document.removeEventListener('mousemove', handleSvgLineDraw);
            document.removeEventListener('mousedown', removeListeners);

            if (endClickCallback) {
                endClickCallback({
                    svgElement: svgElement,
                    lineEl: svgElement.querySelector('line'),
                    targetElement: ev.currentTarget,
                    clickedTargetPointEl: ev.target
                }, wireModelRef);
            }
        };

        document.addEventListener('mousemove', handleSvgLineDraw);
        document.addEventListener('mousedown', removeListeners);
    }
}