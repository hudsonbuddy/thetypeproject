import { Mongo } from 'meteor/mongo';
 
export const Types = new Mongo.Collection('personality_types');
export const Humans = new Mongo.Collection('humans');
