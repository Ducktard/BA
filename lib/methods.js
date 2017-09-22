import { Meteor } from 'meteor/meteor';

import { Accounts } from 'meteor/accounts-base';
import { Channel } from '../lib/collections';
import { Messages } from '../lib/collections';
import {Foods} from '../lib/collections';
import {Locations} from '../lib/collections';
import {Activities} from '../lib/collections';
import {Checkins} from '../lib/collections';
import {Goals} from '../lib/collections';
import {LeaderboardEntries} from '../lib/collections';


/**
* @author Mario Curkovic
*
* In this file server methods are implemented.
* They can be called by using  this.callMethod('xxx',params); for example:  this.callMethod('newUser',User);
*
*/
Meteor.methods({

  newUser(User){
    Accounts.createUser({
      username:User.username,
      email:User.email,
      password:User.password,
      profile: {
        createdOn: new Date(),
        realname: User.realname,
        age: User.age,
        playertype: User.playertype,
        level: 1,
        reachedLevel: new Date()
      }
    });

    LeaderboardEntries.insert({
      username: User.username,
      level: 1,
      points: 0,
      playertype: User.playertype
    });
    console.log("New User in db: ", User);
  },

setMessagesRead(userId,chanId){
  Messages.find({ "chanId": chanId }).forEach(function(myDoc){
    Messages.update({"_id": myDoc._id},{$addToSet:{"readBy":userId}});
  });
  // Messages.update({ "chanId": chanId }, {$push:{"readBy": userId}});
  console.log("Messages read: "  + chanId + " von: " + Meteor.users.find({"_id": userId}).username);
},


  moveToNextLevel(userId,maxLevel){
    var currentLevel = Meteor.users.findOne({_id:userId}).profile.level;
    if(maxLevel > currentLevel){
      nextLevel = currentLevel+1;
      Meteor.users.update({"_id":userId}, {
        $set:
        {"profile.level": nextLevel,
        "profile.reachedLevel": new Date()}
      });
      username = Meteor.users.findOne({"_id":userId}).username;
      LeaderboardEntries.update({"username":username},{$set:{ "level": nextLevel}});
      return true;
    }else{
      return false;
    }
  },

  lastCheckin(){
      return Checkins.find({},{sort:{"date": -1},limit:1}).date;
      {sort: {time: -1}}
  },

  repeatLevel(userId){
      Meteor.users.update({"_id":userId}, {
        $set:
        {"profile.reachedLevel": new Date()}
      });
      username = Meteor.users.findOne({"_id":userId}).username;
  },

  sendMessageToPlayerType(playertype,message){
    adminUserId = Meteor.users.findOne({"username": "admin"})._id;
    newsChanId = Channel.findOne({"name": "news"})._id;
    var result = []
    Meteor.users.find({"profile.playertype":playertype}).forEach(function(u) { result.push(u.username) });
    const msg = {
      username :"admin",
      message: message,
      chanId : newsChanId,
      userId : adminUserId,
      username : "admin",
      date : new Date(),
      readBy : [adminUserId],
      access:result,
    }
    console.log("send this fuckin msg: " + result);
    Messages.insert(msg);
  },

  addPoints(userId,points){
    var username = Meteor.users.findOne({_id:userId}).profile.username;
    LeaderboardEntries.update({"username":username},{
      $inc:{"points": points}
    });
  },




  loginUser(credentials){
    var user = Meteor.users.findOne({username: credentials.username});

    Meteor.loginWithPassword(credentials.username, credentials.password);

    console.log("UserID:",this.userId);
  },


  getUserByEmail(email){
    var usersemail = Meteor.users.find({"emails.address": email});

    if(usersemail != null){
      console.log("User with email" + email + "exists.");
      return true;
    }else{
      return false;
    }
  },

  getUserByUsername(username){
    var usersusername = Meteor.users.find({"username": username});

    if(usersusername != null){
      console.log("User with username" + username + "exists.");
      return true;
    }else{
      return false;
    }
  },

  removeChannel(chanId) {

    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
      'Must be logged to remove a chat.');
    }
    Channel.remove({ _id: chanId });

    console.log("Channel successfully deleted", Channel.remove({ _id: chanId }));
  },


  removeFood(foodId){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
      'Must be logged to remove a chat.');
    }

    Foods.remove({ _id: foodId});
    console.log("Food successfully deleted");
  },


  removeLocation(locationId){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
      'Must be logged to remove a chat.');
    }

    Locations.remove({ _id: locationId});
    console.log("Location successfully deleted");
  },

  addPoints(userId,points){
    console.log("test addpoints");
    currentusername = Meteor.users.findOne({"_id":userId}).username;
    console.log("currentusername: " + currentusername);
    LeaderboardEntries.update({"username":currentusername},{$inc:{"points": points}});
  },

  removeActivity(activityId){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
      'Must be logged to remove a chat.');
    }

    Activities.remove({ _id: activityId});
    console.log("Activity successfully deleted");
  }
});
