import { Controller } from 'angular-ecmascript/module-helpers';
import { Meteor } from 'meteor/meteor';
import {Messages} from '../../../lib/collections';
import {Channel} from '../../../lib/collections';
import { Session } from 'meteor/session';

/**
* Controller for managing the profile.
*/
export default class TabCntrl extends Controller {


  constructor(){
    super(...arguments);

    ionicPopup = this.$ionicPopup;
    state = this.$state;

    this.subscribe('messages');


    this.helpers({
      numOfNewMsg(){
        if(Messages.find().count()>0){
          return Session.get('newMsg');
        }else{
          return 0;
        }
      },
    });

    userId = Meteor.userId();
    username = Meteor.user().username;

    setTimeout('', 1000);
    setInterval(function(){Session.set('newMsg',Messages.find({"readBy": {$ne: userId},"access":{$in: [username,"all"]}}).count());}, 2000);
  }

//   setCurrentUser(){
//     do {
//       user = Meteor.user();
// } while (Meteor.user().username == null);
//     Session.set('newMsg',Messages.find({"readBy": {$ne: Meteor.userId()},"access":{$in: [user.username,"all"]}}).count());
//   }

}

TabCntrl.$name = 'TabCntrl';
TabCntrl.$inject = ['$stateParams','$state','$ionicActionSheet','$ionicPopup'];
