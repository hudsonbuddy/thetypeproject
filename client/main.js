import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Types } from '../imports/api/collections.js';
import { People } from '../imports/api/collections.js';

//importing paper.js
import '../imports/paper-full.js';
var paper = require('../imports/paper-full.js');

import './main.html';

Template.search.onCreated( () => {
    let template = Template.instance();
        template.searchQuery = new ReactiveVar();
        template.autorun( () => {

            template.subscribe( 'people_publish', template.searchQuery.get(), () => {

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
    people() {
        let people = People.find();
        if ( people ) {
            return people;
        }
    },
    sanguines() {
       let san = Types.find({ id: { $in: [ 1, 5, 12, 14 ] } });
       if (san) {
           return san;
       }
    },
    phlegmatics() {
       let phl = Types.find({ id: { $in: [ 2, 6, 11, 13 ] } });
       if (phl) {
           return phl;
       }

    },
    cholerics() {
       let cho = Types.find({ id: { $in: [ 4, 8, 9, 15 ] } });
       if (cho) {
           return cho;
       }

    },
    melancholics() {
       let mel = Types.find({ id: { $in: [ 3, 7, 10, 16 ] } });
       if (mel) {
           return mel;
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

Template.search.rendered = function() {
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
    var xline = new paper.Path.Line(new paper.Point(0, 150), new paper.Point(300, 150));
    var yline = new paper.Path.Line(new paper.Point(150, 0), new paper.Point(150, 300));
    
    //Draw hash marks

    var xhash1 = new paper.Path.Line(new paper.Point(145, 30), new paper.Point(155, 30));
    var xhash2 = new paper.Path.Line(new paper.Point(145, 60), new paper.Point(155, 60));
    var xhash3 = new paper.Path.Line(new paper.Point(145, 90), new paper.Point(155, 90));
    var xhash4 = new paper.Path.Line(new paper.Point(145, 120), new paper.Point(155, 120));
    var xhash5 = new paper.Path.Line(new paper.Point(145, 180), new paper.Point(155, 180));
    var xhash6 = new paper.Path.Line(new paper.Point(145, 210), new paper.Point(155, 210));
    var xhash7 = new paper.Path.Line(new paper.Point(145, 240), new paper.Point(155, 240));
    var xhash8 = new paper.Path.Line(new paper.Point(145, 270), new paper.Point(155, 270));

    var yhash1 = new paper.Path.Line(new paper.Point(30, 145), new paper.Point(30, 155));
    var yhash2 = new paper.Path.Line(new paper.Point(60, 145), new paper.Point(60, 155));
    var yhash3 = new paper.Path.Line(new paper.Point(90, 145), new paper.Point(90, 155));
    var yhash4 = new paper.Path.Line(new paper.Point(120, 145), new paper.Point(120, 155));
    var yhash5 = new paper.Path.Line(new paper.Point(180, 145), new paper.Point(180, 155));
    var yhash6 = new paper.Path.Line(new paper.Point(210, 145), new paper.Point(210, 155));
    var yhash7 = new paper.Path.Line(new paper.Point(240, 145), new paper.Point(240, 155));
    var yhash8 = new paper.Path.Line(new paper.Point(270, 145), new paper.Point(270, 155));

    //Group all the shit together and set the color to black so it will appear
    var planeGroup = new paper.Group(xline, yline, xhash1, xhash2, xhash3, xhash4, xhash5, xhash6, xhash7, xhash8, yhash1, yhash2, yhash3, yhash4, yhash5, yhash6, yhash7, yhash8);
    planeGroup.style = {
        strokeColor : 'black'
    };

    //Write axis labels
    var nAxis= new paper.PointText({
        content: 'N',
        point: new paper.Point(162, 12),
        fillColor: 'black',
        fontSize : 18,
    });

    var tAxis= new paper.PointText({
        content: 'T',
        point: new paper.Point(282, 138),
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
            typeLine = new paper.Path.Line(new paper.Point(150, 150), new paper.Point(240, 120));
            leftArrow = new paper.Path.Line(new paper.Point(240, 120), new paper.Point(240, 126));
            rightArrow = new paper.Path.Line(new paper.Point(240, 120), new paper.Point(240, 126));
            leftArrow.rotate(45, new paper.Point(240, 120));
            rightArrow.rotate(95, new paper.Point(240, 120));
            var typeLabel = new paper.PointText({
                content: 'ISTJ',
                point: new paper.Point(234, 114),
                fillColor: 'black',
                fontSize : 16,
                name : 'type_label',
            });
            break;
        case "ESTJ":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(450,150));
            leftArrow = new paper.Path.Line(new paper.Point(450, 150), new paper.Point(450,160));
            rightArrow = new paper.Path.Line(new paper.Point(450, 150), new paper.Point(450,160));
            leftArrow.rotate(45, new paper.Point(450, 150));
            rightArrow.rotate(95, new paper.Point(450, 150));
            var typeLabel = new paper.PointText({
                content: 'ESTJ',
                point: new paper.Point(430, 130),
                fillColor: 'black',
                fontSize : 16,
                name : 'type_label',
            });
            break;
        case "ENFP":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(350, 50));
            leftArrow = new paper.Path.Line(new paper.Point(350, 50), new paper.Point(350, 60));
            rightArrow = new paper.Path.Line(new paper.Point(350, 50), new paper.Point(350, 60));
            leftArrow.rotate(1, new paper.Point(350, 50));
            rightArrow.rotate(55, new paper.Point(350, 50));
            var typeLabel = new paper.PointText({
                content: 'ENFP',
                point: new paper.Point(340, 35),
                fillColor: 'black',
                fontSize : 16,
                name : 'type_label',
            });

            break;
        case "INFP":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(300, 100));
            leftArrow = new paper.Path.Line(new paper.Point(300, 100), new paper.Point(300, 110));
            rightArrow = new paper.Path.Line(new paper.Point(300, 100), new paper.Point(300, 110));
            leftArrow.rotate(-15, new paper.Point(300, 100));
            rightArrow.rotate(55, new paper.Point(300, 100));
            var typeLabel = new paper.PointText({
                content: 'INFP',
                point: new paper.Point(290, 90),
                fillColor: 'black',
                fontSize : 16,
                name : 'type_label',
            });

            break;
        //Phlegmatics            
        case "ISFJ":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(150, 200));
            leftArrow = new paper.Path.Line(new paper.Point(150, 200), new paper.Point(150, 210));
            rightArrow = new paper.Path.Line(new paper.Point(150, 200), new paper.Point(150, 210));
            leftArrow.rotate(-85, new paper.Point(150, 200));
            rightArrow.rotate(-15, new paper.Point(150, 200));
            var typeLabel = new paper.PointText({
                content: 'ISFJ',
                point: new paper.Point(140, 190),
                fillColor: 'black',
                fontSize : 16,
                name : 'type_label',
            });

            break;
        case "ESFJ":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(200, 150));
            leftArrow = new paper.Path.Line(new paper.Point(200, 150), new paper.Point(200, 160));
            rightArrow = new paper.Path.Line(new paper.Point(200, 150), new paper.Point(200, 160));
            leftArrow.rotate(-75, new paper.Point(200, 150));
            rightArrow.rotate(15, new paper.Point(200, 150));
            var typeLabel = new paper.PointText({
                content: 'ESFJ',
                point: new paper.Point(160, 130),
                fillColor: 'black',
                fontSize : 16,
                name : 'type_label',
            });
            break;
        case "ENTP":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(100, 50));
            leftArrow = new paper.Path.Line(new paper.Point(100, 50), new paper.Point(100, 60));
            rightArrow = new paper.Path.Line(new paper.Point(100, 50), new paper.Point(100, 60));
            leftArrow.rotate(-5, new paper.Point(100, 50));
            rightArrow.rotate(-55, new paper.Point(100, 50));
            var typeLabel = new paper.PointText({
                content: 'ENTP',
                point: new paper.Point(75, 40),
                fillColor: 'black',
                fontSize : 16,
                name : 'type_label',
            });

            break;
        case "INTP":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(50, 100));
            leftArrow = new paper.Path.Line(new paper.Point(50, 100), new paper.Point(50, 110));
            rightArrow = new paper.Path.Line(new paper.Point(50, 100), new paper.Point(50, 110));
            leftArrow.rotate(-85, new paper.Point(50, 100));
            rightArrow.rotate(-15, new paper.Point(50, 100));
            var typeLabel = new paper.PointText({
                content: 'INTP',
                point: new paper.Point(30, 85),
                fillColor: 'black',
                fontSize : 16,
                name : 'type_label',
            });
            break;

        //Melancholics
        case "ESTP":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(100, 300));
            leftArrow = new paper.Path.Line(new paper.Point(100, 300), new paper.Point(100, 310));
            rightArrow = new paper.Path.Line(new paper.Point(100, 300), new paper.Point(100, 310));
            leftArrow.rotate(-85, new paper.Point(100, 300));
            rightArrow.rotate(-145, new paper.Point(100, 300));
            var typeLabel = new paper.PointText({
                content: 'ESTP',
                point: new paper.Point(60, 330),
                fillColor: 'black',
                fontSize : 16,
                name : 'type_label',
            });

            break;
        case "ISTP":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(50, 350));
            leftArrow = new paper.Path.Line(new paper.Point(50, 350), new paper.Point(50, 360));
            rightArrow = new paper.Path.Line(new paper.Point(50, 350), new paper.Point(50, 360));
            leftArrow.rotate(-75, new paper.Point(50, 350));
            rightArrow.rotate(-140, new paper.Point(50, 350));
            var typeLabel = new paper.PointText({
                content: 'ISTP',
                point: new paper.Point(20, 380),
                fillColor: 'black',
                fontSize : 16,
                name : 'type_label',
            });
            break;
        case "ENFJ":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(200, 400));
            leftArrow = new paper.Path.Line(new paper.Point(200, 400), new paper.Point(200, 410));
            rightArrow = new paper.Path.Line(new paper.Point(200, 400), new paper.Point(200, 410));
            leftArrow.rotate(-115, new paper.Point(200, 400));
            rightArrow.rotate(-190, new paper.Point(200, 400));
            var typeLabel = new paper.PointText({
                content: 'ENFJ',
                point: new paper.Point(180, 420),
                fillColor: 'black',
                fontSize : 16,
                name : 'type_label',
            });

            break;
        case "INFJ":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(150, 450));
            leftArrow = new paper.Path.Line(new paper.Point(150, 450), new paper.Point(150, 460));
            rightArrow = new paper.Path.Line(new paper.Point(150, 450), new paper.Point(150, 460));
            leftArrow.rotate(-110, new paper.Point(150, 450));
            rightArrow.rotate(-195, new paper.Point(150, 450));
            var typeLabel = new paper.PointText({
                content: 'INFJ',
                point: new paper.Point(125, 475),
                fillColor: 'black',
                fontSize : 16,
                name : 'type_label',
            });

            break;

        //Cholerics
        case "ESFP":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(350, 300));
            leftArrow = new paper.Path.Line(new paper.Point(350, 300), new paper.Point(350, 310));
            rightArrow = new paper.Path.Line(new paper.Point(350, 300), new paper.Point(350, 310));
            leftArrow.rotate(85, new paper.Point(350, 300));
            rightArrow.rotate(165, new paper.Point(350, 300));
            var typeLabel = new paper.PointText({
                content: 'ESFP',
                point: new paper.Point(330, 325),
                fillColor: 'black',
                fontSize : 16,
                name : 'type_label',
            });

            break;
        case "ISFP":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(300, 350));
            leftArrow = new paper.Path.Line(new paper.Point(300, 350), new paper.Point(300, 360));
            rightArrow = new paper.Path.Line(new paper.Point(300, 350), new paper.Point(300, 360));
            leftArrow.rotate(-165, new paper.Point(300, 350));
            rightArrow.rotate(105, new paper.Point(300, 350));
            var typeLabel = new paper.PointText({
                content: 'ISFP',
                point: new paper.Point(285, 375),
                fillColor: 'black',
                fontSize : 16,
                name : 'type_label',
            });

            break;
        case "ENTJ":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(450, 400));
            leftArrow = new paper.Path.Line(new paper.Point(450, 400), new paper.Point(450, 410));
            rightArrow = new paper.Path.Line(new paper.Point(450, 400), new paper.Point(450, 410));
            leftArrow.rotate(85, new paper.Point(450, 400));
            rightArrow.rotate(165, new paper.Point(450, 400));
            var typeLabel = new paper.PointText({
                content: 'ENTJ',
                point: new paper.Point(435, 425),
                fillColor: 'black',
                fontSize : 16,
                name : 'type_label',
            });

            break;
        case "INTJ":
            typeLine = new paper.Path.Line(new paper.Point(250, 250), new paper.Point(400, 450));
            leftArrow = new paper.Path.Line(new paper.Point(400, 450), new paper.Point(400, 460));
            rightArrow = new paper.Path.Line(new paper.Point(400, 450), new paper.Point(400, 460));
            leftArrow.rotate(180, new paper.Point(400, 450));
            rightArrow.rotate(90, new paper.Point(400, 450));
            var typeLabel = new paper.PointText({
                content: 'INTJ',
                point: new paper.Point(390, 475),
                fillColor: 'black',
                fontSize : 16,
                name : 'type_label',
            });
            break;

        default:
            return;
    }
    var typeLineGroup = new paper.Group(typeLine, leftArrow, rightArrow, typeLabel);
    typeLineGroup.style = {
        strokeColor : 'black'
    };
    typeLineGroup.name = 'typeLine';


}


