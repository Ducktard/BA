import { Meteor } from 'meteor/meteor';

import { Accounts } from 'meteor/accounts-base';
import { Channel } from '../lib/collections';
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



  moveToNextLevel(userId,maxLevel){
    var currentLevel = Meteor.users.findOne({_id:userId}).profile.level;
    if(maxLevel > currentLevel){
      nextLevel = currentLevel+1;
      Meteor.users.update({"_id":userId}, {
        $set:
        {"profile.level": nextLevel,
        "profile.reachedLevel": new Date()}
      });
      return true;
    }else{
      return false;
    }
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


  removeActivity(activityId){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
      'Must be logged to remove a chat.');
    }

    Activities.remove({ _id: activityId});
    console.log("Activity successfully deleted");
  }
});
