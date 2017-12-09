var paper = require('./paper-full.js');


Template.pathPage.rendered = function() {
    if(!this._rendered) {
        this._rendered = true;
        setupPlane();
        
        //test drawTypeLine

        drawTypeLine('ISTJ');
    }
}

function setupPlane(){

    //find and setup canvas element for Paper
    canvasPath = document.getElementById('pathCanvas');
    paper.setup(canvasPath);

    //Draw coordinate lines
    var xline = new paper.Path.Line(new paper.Point(0, 250), new paper.Point(500,250));
    var yline = new paper.Path.Line(new paper.Point(250, 0), new paper.Point(250, 500));
    
    //Draw hash marks

    var xhash1 = new paper.Path.Line(new paper.Point(242, 50), new paper.Point(258, 50));
    var xhash2 = new paper.Path.Line(new paper.Point(242, 100), new paper.Point(258, 100));
    var xhash3 = new paper.Path.Line(new paper.Point(242, 150), new paper.Point(258, 150));
    var xhash4 = new paper.Path.Line(new paper.Point(242, 200), new paper.Point(258, 200));
    var xhash5 = new paper.Path.Line(new paper.Point(242, 300), new paper.Point(258, 300));
    var xhash6 = new paper.Path.Line(new paper.Point(242, 350), new paper.Point(258, 350));
    var xhash7 = new paper.Path.Line(new paper.Point(242, 400), new paper.Point(258, 400));
    var xhash8 = new paper.Path.Line(new paper.Point(242, 450), new paper.Point(258, 450));

    var yhash1 = new paper.Path.Line(new paper.Point(50, 242), new paper.Point(50, 258));
    var yhash2 = new paper.Path.Line(new paper.Point(100, 242), new paper.Point(100, 258));
    var yhash3 = new paper.Path.Line(new paper.Point(150, 242), new paper.Point(150, 258));
    var yhash4 = new paper.Path.Line(new paper.Point(200, 242), new paper.Point(200, 258));
    var yhash5 = new paper.Path.Line(new paper.Point(300, 242), new paper.Point(300, 258));
    var yhash6 = new paper.Path.Line(new paper.Point(350, 242), new paper.Point(350, 258));
    var yhash7 = new paper.Path.Line(new paper.Point(400, 242), new paper.Point(400, 258));
    var yhash8 = new paper.Path.Line(new paper.Point(450, 242), new paper.Point(450, 258));

    //Group all the shit together and set the color to black so it will appear
    var planeGroup = new paper.Group(xline, yline, xhash1, xhash2, xhash3, xhash4, xhash5, xhash6, xhash7, xhash8, yhash1, yhash2, yhash3, yhash4, yhash5, yhash6, yhash7, yhash8);
    planeGroup.style = {
        strokeColor : 'black'
    };

    //Write axis labels
    var nAxis= new paper.PointText({
        content: 'N',
        point: new paper.Point(270, 20),
        fillColor: 'black',
        fontSize : 18,
    });

    var tAxis= new paper.PointText({
        content: 'T',
        point: new paper.Point(470, 230),
        fillColor: 'black',
        fontSize : 18,
    });

}
 
function drawTypeLine(type){

    var typeLine;
    var leftArrow;
    var rightArrow;

    switch(type){
        case "ISTJ":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(400,200));
            leftArrow = new paper.Path.Line(new paper.Point(400, 200), new paper.Point(400,210)).rotate(45, new paper.Point(400, 200));

            rightArrow = new paper.Path.Line(new paper.Point(400, 200), new paper.Point(400,210)).rotate(95, new paper.Point(400, 200));
            break;



        default:
            return;
    }
    var typeLineGroup = new paper.Group(typeLine, leftArrow, rightArrow);
    typeLineGroup.style = {
        strokeColor : 'black'
    };

    typeLine.strokeColor = 'black';

}
