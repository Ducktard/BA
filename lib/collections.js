import { Mongo } from 'meteor/mongo';


/**
 * @author Mario Curkovic
 * New Collections have to be registered here.
 * for runtime purposes the checkins and overeatings are saved to one collection.
 * it is possible to query them by an attribute type which is set to checkin or overeating.
 * export const Overeatings = new Mongo.Collection('overeatings');
 */


export const Checkins = new Mongo.Collection('checkins');

export const Channel = new Mongo.Collection('channel');

export const Messages = new Mongo.Collection('messages');

export const Foods = new Mongo.Collection('foods');

export const Locations = new Mongo.Collection('locations');
