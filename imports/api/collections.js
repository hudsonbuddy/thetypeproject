import { Mongo } from 'meteor/mongo';
 
export const Types = new Mongo.Collection('personality_types');
export const People = new Mongo.Collection('people');
