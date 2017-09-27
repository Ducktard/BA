import { Controller } from 'angular-ecmascript/module-helpers';
import { Meteor } from 'meteor/meteor';
import {Messages} from '../../../lib/collections';
import {Channel} from '../../../lib/collections';
import {Notifications} from '../../../lib/collections';
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
    this.subscribe('notifications');

    this.helpers({
      numOfNewMsg(){
        if(Messages.find().count()>0){
          return Session.get('newMsg');
        }else{
          return 0;
        }
      },
    });


    if(Meteor.user()){
      userId = Meteor.userId();
      username = Meteor.user().username;
    }

    //Update the badge for new Messages
    setInterval(function(){Session.set('newMsg',Messages.find({"readBy": {$ne: userId},"access":{$in: [username,"all"]}}).count());}, 1000);
    setInterval(function(){
      if(Notifications.find().count() != 0)
      {
        n = Notifications.findOne();
        ionicPopup.alert({
          title: n.header,
          template: n.message,
          okType: 'button-positive button-clear'
      });
      Notifications.update({"_id":n._id},{$set: {"read": true}});
    }
    }, 1000);

  }


createAlert(message, header){
      ionicPopup.alert({
        title: header,
        template: message,
        okType: 'button-positive button-clear'
      });
  }

checkNotifications(){
  setInterval(function(){
    checkNotifications();
    if(Notifications.find({"read": false}).count() > 0){
      notis = Notifications.find({"read": false}).fetch();
      for(n in notis){
        createAlert(n.message,n.header)

        // this.callMethod(n);
      }
    }
  }, 1000);

}
  /**
  * Method for creating an alert.
  * @param message
  * @param header
  */


}

TabCntrl.$name = 'TabCntrl';
TabCntrl.$inject = ['$stateParams','$state','$ionicActionSheet','$ionicPopup'];
