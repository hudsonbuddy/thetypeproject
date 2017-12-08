import { Types } from '../../imports/api/collections.js';

Meteor.publish( 'types_publish', function types_publish() {
    return Types.find();
});
