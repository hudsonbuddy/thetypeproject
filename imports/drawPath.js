var paper = require('./paper-full.js');


Template.pathPage.rendered = function() {
    if(!this._rendered) {
        this._rendered = true;
        drawLine();
    }
}

function drawLine(){

    canvasPath = document.getElementById('pathCanvas');
    paper.setup(canvasPath);
    var from = new paper.Point(20, 20);
    var to = new paper.Point(80, 80);
    var path = new paper.Path.Line(from, to);
    path.strokeColor = 'black';
}
 
function makeCanvasReady(){

    canvasPath = document.getElementById('pathCanvas');
    canvasPath.addEventListener("mousedown", startThePath,false);
    canvasPath.addEventListener("mouseup", finishThePath,false);
}
  
function startThePath(event){

    canvasPath = document.getElementById('pathCanvas');
    paper.setup(canvasPath);
    if (path) {
        path.selected = false;
    }

    canvasPath.addEventListener("mousemove", drawPath,false);

    // Create a new path and set its stroke color to blue:
    path = new paper.Path({
        segments: [getMousePos(canvasPath, event)],
        strokeColor: 'blue',
        strokeWidth: 10,
        strokeCap: 'round',
        // Select the path, so we can see its segment points:
        fullySelected: true
    });
}

function drawPath(event){
    path.add(getMousePos(canvasPath, event));
}

function finishThePath(){
    canvasPath = document.getElementById('pathCanvas');
    canvasPath.removeEventListener("mousemove",drawPath);

    // When the mouse is released, simplify it:
    path.simplify(10);

    // Select the path, so we can see its segments:
    path.fullySelected = true;

}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
