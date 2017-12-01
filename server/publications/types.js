import { Types } from '../../imports/api/types.js';

Meteor.publish( 'types_publish', function( search ) {
    check(search, Match.OneOf( String, null, undefined ) );
    let query = {},
    projection = { limit: 10, sort: { type: 1 } };

    if ( search ) {
        let regex = new RegExp( search, 'i' );
        query = {
            $or: [
                { type: regex },
                { name: regex },
                { personality: regex }
            ]
        };
        projection.limit = 100;
    }

    return Types.find( query, projection );
});
