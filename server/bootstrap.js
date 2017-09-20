import Moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {Checkins} from '../lib/collections';
import {Goals} from '../lib/collections';
import {Channel} from '../lib/collections';
import {Messages} from '../lib/collections';

/**
 * @author Mario Curkovic
 *
 * If you need some dummy data in some of your collection,
 * you can do that here. The data will be inserted when the project is build.
 */
Meteor.startup(() => {


//bootstrap

//Definition of goals realated to a period of one week for every goal,
  // The goals become tougher with increasing level
  if(Goals.find().count() == 0){
    const goals = [
      {
        level : 1,
        checkins: 3,
        overeatings: 5
      },
      {
        level : 2,
        checkins: 5,
        overeatings: 4
      },
      {
        level : 3,
        checkins: 7,
        overeatings: 3
      },
      {
        level : 4,
        checkins: 9,
        overeatings: 2
      },
      {
        level : 5,
        checkins: 11,
        overeatings: 2
      },
      {
        level : 6,
        checkins: 12,
        overeatings: 1
      },
      {
        level : 7,
        checkins: 14,
        overeatings: 0
      }

    ];
    //
    goals.forEach((m) => {
      Goals.insert(m);
    });

  }


if(Meteor.users.find({"username": "admin"}).count() == 0){
  Accounts.createUser({
    username:"admin",
    email: "admin@admin.de",
    password:"admin",
    profile: {
      createdOn: new Date(),
      realname: "admin",
      age: "65",
      playertype: "admin",
      level: 5,
      reachedLevel: new Date()
    }
  });
}
this.adminUserId = Meteor.users.findOne({"username": "admin"})._id;

//Create
if(Channel.find({"name": "news"}).count() == 0 ){
  var object = {
    name: "news",
    description: "Hier bekommst du die neuesten Infos",
    visibility: "private",
    access: "all"
  }
  Channel.insert(object);

}
this.newsChanId = Channel.findOne({"name": "news"})._id;


if(Messages.find({"message": "Willkommen zu Ellipsa! Hier werden Sie in zukunft über alle interessanten Dinge Rund um die App informiert"}).count() == 0 ){
  const welcomeMsg = {
    username :"admin",
    message: "Willkommen zu Ellipsa! Hier werden Sie in zukunft über alle interessanten Dinge Rund um die App informiert",
    chanId : this.newsChanId,
    userId : this.adminUserId,
    username : "admin",
    date : new Date(),
    readBy : [this.adminUserId],
    visibility: "public",
    access:["all"]
  }
  Messages.insert(welcomeMsg);
}

const permissionMsg = {
  username :"admin",
  message: "test permission",
  chanId : this.newsChanId,
  userId : this.adminUserId,
  username : "admin",
  date : new Date(),
  readBy : [this.adminUserId],
  visibility: "private",
  access: ["winner"]
}
Messages.insert(permissionMsg);
/*if(Checkin.find().count() !== 0) return;
  const checkins = [
    {
      name : 'first dummy',
      count : 1,
      createdAt: new Date()
    },
    {
      name : 'second dummy',
      count : 2,
      createdAt: new Date()
    },
    {
      name : 'third dummy',
      count : 28,
      createdAt: new Date()
    }
  ];
  //
checkins.forEach((m) => {
    Checkin.insert(m);
  });

*/


});
