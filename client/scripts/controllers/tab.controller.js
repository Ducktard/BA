import { Controller } from 'angular-ecmascript/module-helpers';
import { Meteor } from 'meteor/meteor';
import {Messages} from '../../../lib/collections';
import {Channel} from '../../../lib/collections';
/**
* Controller for managing the profile.
*/
export default class TabCntrl extends Controller {


  constructor(){
    super(...arguments);

    ionicPopup = this.$ionicPopup;
    state = this.$state;

    this.subscribe('messages');
    Session.set('newMsg',Messages.find({"readBy": {$ne: Meteor.userId()},"access":{$in: [Meteor.user().username,"all"]}}).count());
    this.helpers({
      numOfNewMsg(){
        if(Messages.find().count()>0){
          return Session.get('newMsg');
        }else{
          return 0;
        }
      },
    });

  }
}
