import { People } from '../../imports/api/collections.js';

Meteor.publish( 'people_publish', function( search ) {
    check(search, Match.OneOf( String, null, undefined ) );
    let query = {},
    projection = { limit: 10, sort: { type: 1 } };

    if ( search ) {
        let regex = new RegExp( search, 'i' );
        query = {
            $or: [
                { name: regex },
                { type: regex }
            ]
        };
        projection.limit = 100;
    }

    return People.find( query, projection );
});
