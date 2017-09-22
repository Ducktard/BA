import { Controller } from 'angular-ecmascript/module-helpers';
import { Meteor } from 'meteor/meteor';
import {Checkins} from '../../../lib/collections';


/**
* @author Johannes Weyers
*
* Controller for showing history and their details
*/
export default class HistoryCntrl extends Controller {


  constructor(){
    super(...arguments);

    ionicPopup = this.$ionicPopup;
    state = this.$state;

    this.subscribe('checkins');

    checkInId = this.$stateParams.checkInId;

    this.helpers({
      savedCheckinData() {return Checkins.findOne({_id: checkInId});},
      data() {return Checkins.find();},
    });

    userId = Meteor.userId();
    username = Meteor.user().username;

    setTimeout('', 1000);
    setInterval(function(){Session.set('newMsg',Messages.find({"readBy": {$ne: userId},"access":{$in: [username,"all"]}}).count());}, 2000);
  }

  // info: details about saved checkins and overeatings
  savedCheckinInfo(){
    this.createAlert("Hier kannst du deine eingegebenen Daten ansehen {{checkInId}}","Info");
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

  goToStats(){
    state.go('tab.statistik');
  }

  goToHistory(){
    state.go('tab.history');
  }

  //history info
  infoHistory(){
    this.createAlert("Hier werden alle deine Checkins und Essattacken in einer Historie angezeigt","Info");
  }

}

HistoryCntrl.$name = 'HistoryCntrl';
HistoryCntrl.$inject = ['$stateParams','$state','$ionicActionSheet','$ionicPopup'];
