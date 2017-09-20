import { Controller } from 'angular-ecmascript/module-helpers';
import { Meteor } from 'meteor/meteor';
import {Messages} from '../../../lib/collections';
/**
* Controller for managing the profile.
*/
export default class TabCntrl extends Controller {


  constructor(){
    super(...arguments);

    ionicPopup = this.$ionicPopup;
    state = this.$state;

    this.subscribe('messages');
    Session.set('newMsg',Messages.find({"readBy": {$ne: Meteor.userId()}}).count());
    this.helpers({

      numOfNewMsg(){
        if(Messages.find().count()>0){
          console.log("user id in tabs: " + Session.get('newMsg'));
          return Session.get('newMsg');
        }else{
          return 0;
        }
      },
    });

  }
}
