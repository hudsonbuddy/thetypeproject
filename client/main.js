import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Types } from '../imports/api/collections.js';
import { Humans } from '../imports/api/collections.js';

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
        console.log(value);
    }

});





