import { Controller } from 'angular-ecmascript/module-helpers';
import { Meteor } from 'meteor/meteor';
import {LeaderboardEntries} from '../../../lib/collections';
import { Session } from 'meteor/session';

/**
* @author Johannes Weyers
* Controller for managing the profile.
*/
export default class LeaderboardCntrl extends Controller {


  constructor(){
    super(...arguments);

    ionicPopup = this.$ionicPopup;
    state = this.$state;
Session.set('newMsg',Messages.find({"readBy": {$ne: Meteor.userId()},"access":{$in: [Meteor.user().username,"all"]}}).count());
    this.subscribe("leaderboardEntries");



    this.helpers({
      allBoardEntries(){ return LeaderboardEntries.find();},

    });

  }

  info(){
    this.createAlert("Hier kannst du sehen wie gut du im Vergleich zu anderen Nutzern bist "+
    " ","Info");
  }

  /**
  * Method for creating an alert.
  * @param message
  * @param header
  */
  createAlert(message, header){
    ionicPopup.alert({
      title: header,
      template: message,
      okType: 'button-positive button-clear'
    });
  }


}

LeaderboardCntrl.$name = 'LeaderboardCntrl';
LeaderboardCntrl.$inject = ['$stateParams','$state','$ionicPopup'];
