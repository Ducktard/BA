import { Controller } from 'angular-ecmascript/module-helpers';
import { Meteor } from 'meteor/meteor';
import {Checkins} from '../../../lib/collections';
import {Overeatings} from '../../../lib/collections';
import {Goals} from '../../../lib/collections';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

/**
* @author Mario Curkovic
*
* Controller for handling checkins.
* A checkin is a set of physical parameters that a user can/should
* enter several times a day.
*/
export default class CheckinCntrl extends Controller {

  constructor(){
    super(...arguments);

    ionicActionSheet = this.$ionicActionSheet;
    ionicPopup = this.$ionicPopup;
    state = this.$state;

    checkInId = this.$stateParams.checkInId;

    var hungerEnums = ["wenig", "mittel", "sehr"];
    this.hungerEnums = hungerEnums;

    this.levelReachedDate = Meteor.user().profile.reachedLevel;
    levelReachedDate = this.levelReachedDate;
    this.levelGoalDate = new Date(levelReachedDate.getTime() + 7*24*60*60000);
    this.currentLevel = Meteor.user().profile.level;
    currentLevel = this.currentLevel;


    this.subscribe('checkins');


    now = new Date();
    if(Session.get('lastCheckin') instanceof Date){
      this.checkinLabel = Session.get('lastCheckin').getTime() > now.getTime() ? "bereits eingecheckt":"Checkin";
    }else{
      this.checkinLabel = "Checkin";
    }

    this.subscribe('goals', function(){
      this.currentGoal =  Goals.findOne({"level":currentLevel});
    });

    this.helpers({
      data() {return Checkins.find();},
      getNumOfCheckinsInCurrentLevel(){return Checkins.find({"type":"Checkin","date": {$gt: levelReachedDate}}).count();},
      getNumOfOvereatingsInCurrentLevel(){return Checkins.find({"type":"Overeating","date": {$gt: levelReachedDate}}).count();},
      currentGoal(){return Goals.findOne({"level":currentLevel});},
      maxLevel(){return Goals.find().count();},
    });
  }

  startCounter(lastcheckin){
    setInterval(tick(lastcheckin), 1000);
  }

  tick(lastcheckin){
    now = new Date();
    nowSec = now.getTime()/1000;
    oneHourBefore = new Date((nowSec - 60*60)*1000);
    lastcheckinSec = lastcheckin.getTime()/1000;
    // if()
    this.checkinLabel = "clicked";

  }



  goToCheckin(){
    state.go('tab.checkin');
  }


  goToCreateCheckin(){
    state.go('tab.createCheckin');
  }

  dateToStringWithTime(date){
    if(date instanceof Date){
      return (date.getDate()) + "." + (date.getUTCMonth()+1) + "." + date.getFullYear() + " , " + date.getUTCHours() + ":" + date.getUTCMinutes() + " Uhr";
    }else{
      s = new Date(date);
      return (s.getDate()) + "." + (s.getUTCMonth()+1) + "." + s.getFullYear() + " , " + s.getUTCHours() + ":" + s.getUTCMinutes() + " Uhr";
    }
  }

  dateToString(date){
    if(date instanceof Date){
      return date.toLocaleString();
    }else{
      s = new Date(date);
      return s.toLocaleString();
    }
  }




  createCheckin(object,NumOfCheckinsInCurrentLevel,NumOfOvereatingsInCurrentLevel,currentGoal,maxLevel){

    if(this.checkIfCheckinIsValid(object)){
      object.date = new Date();
      object.userId = Meteor.userId();
      object.type = "Checkin";

      Session.set('lastCheckin',object.date);
      //Actions that are performed if checkin or overeating is valid
      this.callMethod('createCheckinOrOvereating', object);
      this.callMethod('addPoints',Meteor.userId(),5);
      if((NumOfCheckinsInCurrentLevel)+1 >= currentGoal.checkins){
        if(NumOfOvereatingsInCurrentLevel <= currentGoal.overeatings){ // checking if user has enough checkins to enter next level
          //methods that are called if next Level is reached
          this.callMethod('moveToNextLevel',Meteor.userId(),maxLevel, function(){ // enter next level if there is one
            this.createAlert("Mit diesem Checkin haben Sie das nächste Level erreicht!" +
            " Willkommen in Level " + (currentGoal.level +1) ,"Checkin erfolgreich");
            //Achievements conditions and extensions can be placed here
            this.callMethod('sendMessageToPlayer',Meteor.user().username,currentGoal.achievementAchiever);
            this.callMethod('addPoints',Meteor.userId(),15);

          });
        }
      }
      this.createAlert("Checkin wurde erfolgreich gespeichert. ","Checkin erfolgreich");
      setTimeout(state.go('tab.createCheckin'), 1000);
    }
  }

  checkIfCheckinIsValid(check){
    if(check == undefined ||  check.stress == undefined || check.hunger == undefined || check.sleep == undefined ||
      check.restedness == undefined || check.weight == undefined || check.weight.length == 0){
        this.createAlert("Bitte die Maske vollständig ausfüllen.",'Checkin fehlgeschlagen ');
        return false;
      }
      if(isNaN(check.weight)){
        this.createAlert("Bitte dein Gewicht in Kilo angeben. ",'Checkin fehlgeschlagen ');
        return false;
      }
      return true;
    }


    //checkin info
    info(){
      this.createAlert("In dieser Ansicht kannst Du einen Checkin anlegen."  +
      "Dies solltest du drei mal täglich machen, damit die App genug Infos sammeln kann um dich"+
      "bei deinem Ziel zu unterstützen","Info");
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


  CheckinCntrl.$name = 'CheckinCntrl';
  CheckinCntrl.$inject = ['$stateParams','$state','$ionicPopup'];
