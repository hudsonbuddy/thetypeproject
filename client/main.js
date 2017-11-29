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
