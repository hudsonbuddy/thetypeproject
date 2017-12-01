import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Types } from '../imports/api/types.js';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
});

Template.hello.helpers({
    types() {
        return Types.find({});
    },
});

Template.hello.events({
});

Template.search.onCreated( () => {
    let template = Template.instance();
        template.searchQuery = new ReactiveVar();
        template.autorun( () => {

            template.subscribe( 'types_publish', template.searchQuery.get(), () => {

            });

            console.log('happening status: happening');
        });
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
    }
});


