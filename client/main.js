import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Types } from '../imports/api/collections.js';
import { Humans } from '../imports/api/collections.js';

//importing paper.js
import '../imports/paper-full.js';
var paper = require('../imports/paper-full.js');

import './main.html';

Template.search.onCreated( () => {
    let template = Template.instance();
        template.searchQuery = new ReactiveVar();
        template.autorun( () => {

            template.subscribe( 'humans_publish', template.searchQuery.get(), () => {

            });

            console.log('happening status: happening');
        });
        template.subscribe('types_publish');
});

Template.search.helpers({
    query() {
        return Template.instance().searchQuery.get();
    },
    types() {
        let types = Types.find();
        if ( types ) {
            return types;
        }
    },
    humans() {
        let humans = Humans.find();
        if ( humans ) {
            return humans;
        }
    } 
});

Template.search.events({
    'keyup [name="input_search"]' ( event, template ) {
        let value = event.target.value.trim();
        if ( value !== '' && event.keyCode === 13 ) {
            template.searchQuery.set( value );
        }

        if ( value === '' ) {
            template.searchQuery.set( value );
        }
    },
    'click a' (event, template) {
        let value = event.target.text;
        Template.instance('search').searchQuery.set(value);
        if (paper.project.activeLayer.lastChild.name === 'typeLine'){

            paper.project.activeLayer.lastChild.remove();
            
        }

        drawTypeLine(value);
        console.log(value);
    }

});

Template.pathPage.rendered = function() {
    if(!this._rendered) {
        this._rendered = true;
        setupPlane();
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
        //Sanguine
        case "ISTJ":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(400,200));
            leftArrow = new paper.Path.Line(new paper.Point(400, 200), new paper.Point(400,210));
            rightArrow = new paper.Path.Line(new paper.Point(400, 200), new paper.Point(400,210));
            leftArrow.rotate(45, new paper.Point(400, 200));
            rightArrow.rotate(95, new paper.Point(400, 200));
            break;
        case "ESTJ":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(450,150));
            leftArrow = new paper.Path.Line(new paper.Point(450, 150), new paper.Point(450,160));
            rightArrow = new paper.Path.Line(new paper.Point(450, 150), new paper.Point(450,160));
            leftArrow.rotate(45, new paper.Point(450, 150));
            rightArrow.rotate(95, new paper.Point(450, 150));
            break;
        case "ENFP":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(350, 50));
            leftArrow = new paper.Path.Line(new paper.Point(350, 50), new paper.Point(350, 60));
            rightArrow = new paper.Path.Line(new paper.Point(350, 50), new paper.Point(350, 60));
            leftArrow.rotate(1, new paper.Point(350, 50));
            rightArrow.rotate(55, new paper.Point(350, 50));
            break;
        case "INFP":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(300, 100));
            leftArrow = new paper.Path.Line(new paper.Point(300, 100), new paper.Point(300, 110));
            rightArrow = new paper.Path.Line(new paper.Point(300, 100), new paper.Point(300, 110));
            leftArrow.rotate(-15, new paper.Point(300, 100));
            rightArrow.rotate(55, new paper.Point(300, 100));
            break;
        //Phlegmatics            
        case "ISFJ":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(150, 200));
            leftArrow = new paper.Path.Line(new paper.Point(150, 200), new paper.Point(150, 210));
            rightArrow = new paper.Path.Line(new paper.Point(150, 200), new paper.Point(150, 210));
            leftArrow.rotate(-85, new paper.Point(150, 200));
            rightArrow.rotate(-15, new paper.Point(150, 200));
            break;
        case "ESFJ":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(200, 150));
            leftArrow = new paper.Path.Line(new paper.Point(200, 150), new paper.Point(200, 160));
            rightArrow = new paper.Path.Line(new paper.Point(200, 150), new paper.Point(200, 160));
            leftArrow.rotate(-75, new paper.Point(200, 150));
            rightArrow.rotate(15, new paper.Point(200, 150));
            break;
        case "ENTP":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(100, 50));
            leftArrow = new paper.Path.Line(new paper.Point(100, 50), new paper.Point(100, 60));
            rightArrow = new paper.Path.Line(new paper.Point(100, 50), new paper.Point(100, 60));
            leftArrow.rotate(-5, new paper.Point(100, 50));
            rightArrow.rotate(-55, new paper.Point(100, 50));
            break;
        case "INTP":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(50, 100));
            leftArrow = new paper.Path.Line(new paper.Point(50, 100), new paper.Point(50, 110));
            rightArrow = new paper.Path.Line(new paper.Point(50, 100), new paper.Point(50, 110));
            leftArrow.rotate(-85, new paper.Point(50, 100));
            rightArrow.rotate(-15, new paper.Point(50, 100));
            break;

        //Melancholics
        case "ESTP":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(100, 300));
            leftArrow = new paper.Path.Line(new paper.Point(100, 300), new paper.Point(100, 310));
            rightArrow = new paper.Path.Line(new paper.Point(100, 300), new paper.Point(100, 310));
            leftArrow.rotate(-85, new paper.Point(100, 300));
            rightArrow.rotate(-145, new paper.Point(100, 300));
            break;
        case "ISTP":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(50, 350));
            leftArrow = new paper.Path.Line(new paper.Point(50, 350), new paper.Point(50, 360));
            rightArrow = new paper.Path.Line(new paper.Point(50, 350), new paper.Point(50, 360));
            leftArrow.rotate(-75, new paper.Point(50, 350));
            rightArrow.rotate(-140, new paper.Point(50, 350));
            break;
        case "ENFJ":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(200, 400));
            leftArrow = new paper.Path.Line(new paper.Point(200, 400), new paper.Point(200, 410));
            rightArrow = new paper.Path.Line(new paper.Point(200, 400), new paper.Point(200, 410));
            leftArrow.rotate(-115, new paper.Point(200, 400));
            rightArrow.rotate(-190, new paper.Point(200, 400));
            break;
        case "INFJ":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(150, 450));
            leftArrow = new paper.Path.Line(new paper.Point(150, 450), new paper.Point(150, 460));
            rightArrow = new paper.Path.Line(new paper.Point(150, 450), new paper.Point(150, 460));
            leftArrow.rotate(-110, new paper.Point(150, 450));
            rightArrow.rotate(-195, new paper.Point(150, 450));
            break;

        //Cholerics
        case "ESFP":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(350, 300));
            leftArrow = new paper.Path.Line(new paper.Point(350, 300), new paper.Point(350, 310));
            rightArrow = new paper.Path.Line(new paper.Point(350, 300), new paper.Point(350, 310));
            leftArrow.rotate(85, new paper.Point(350, 300));
            rightArrow.rotate(165, new paper.Point(350, 300));
            break;
        case "ISFP":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(300, 350));
            leftArrow = new paper.Path.Line(new paper.Point(300, 350), new paper.Point(300, 360));
            rightArrow = new paper.Path.Line(new paper.Point(300, 350), new paper.Point(300, 360));
            leftArrow.rotate(-165, new paper.Point(300, 350));
            rightArrow.rotate(105, new paper.Point(300, 350));
            break;
        case "ENTJ":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(450, 400));
            leftArrow = new paper.Path.Line(new paper.Point(450, 400), new paper.Point(450, 410));
            rightArrow = new paper.Path.Line(new paper.Point(450, 400), new paper.Point(450, 410));
            leftArrow.rotate(85, new paper.Point(450, 400));
            rightArrow.rotate(165, new paper.Point(450, 400));
            break;
        case "INTJ":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(400, 450));
            leftArrow = new paper.Path.Line(new paper.Point(400, 450), new paper.Point(400, 460));
            rightArrow = new paper.Path.Line(new paper.Point(400, 450), new paper.Point(400, 460));
            leftArrow.rotate(180, new paper.Point(400, 450));
            rightArrow.rotate(90, new paper.Point(400, 450));
            break;

        default:
            return;
    }
    var typeLineGroup = new paper.Group(typeLine, leftArrow, rightArrow);
    typeLineGroup.style = {
        strokeColor : 'black'
    };
    typeLineGroup.name = 'typeLine';


}


