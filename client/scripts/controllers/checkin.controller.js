import { Controller } from 'angular-ecmascript/module-helpers';
import { Meteor } from 'meteor/meteor';
import {Checkins} from '../../../lib/collections';
import {Overeatings} from '../../../lib/collections';
import {Goals} from '../../../lib/collections';
import { Tracker } from 'meteor/tracker';

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


    this.subscribe('checkins', function(){
      this.numOfCheckinsInCurrentLevel = Checkins.find({"type":"Checkin","date": {$gt: levelReachedDate}}).count();
    });


    numOfCheckinsInCurrentLevel = this.numOfCheckinsInCurrentLevel;

      this.subscribe('goals', function(){
        this.currentGoal =  Goals.findOne({"level":currentLevel});
        console.log("currentgoal inside subscribe: " + this.currentGoal);
      });

      // this.currentGoalCheckins = this.currentGoal.checkins;


      // // this.currentGoalOvereatings = Goals.findOne({"level":currentLevel}).overeatings;
      // this.nextGoal = Goals.findOne({"level":currentLevel+1});
      // this.nextGoalCheckins = this.nextGoal.checkins;
      // // this.nextGoalOvereatings = Goals.findOne({"level":currentLevel+1}).overeatings;
    // });


    this.helpers({
      data() {return Checkins.find();},
      savedCheckinData() {return Checkins.findOne({_id: checkInId});},
      getNumOfCheckinsInCurrentLevel(){return Checkins.find({"type":"Checkin","date": {$gt: levelReachedDate}}).count();},
      getNumOfOvereatingsInCurrentLevel(){return Checkins.find({"type":"Overeating","date": {$gt: levelReachedDate}}).count();},
      currentGoal(){return Goals.findOne({"level":currentLevel});}

    });

    this.leftCheckinsToNextLevel = this.getCheckins;



    this.goalChart = {
      data: [
        {label: 'Checkins bis zum Ziel', value: 3},
        {label: 'erledigte Checkins', value: 2}
      ],
      options:{
        colors:['#eaeaea','#00b200']
      }
    };
  }
  checkIfLevelIsReached(userId){
    // if()
    // if(Checkins.count()>=
    return false;
  }

  // {label: 'Checkins bis zum Ziel', value:chckns.length},
  // {label: 'erledigte Checkins', value: goalValue > this.getCheckins.length && this.goalValue - this.getCheckins.length || '0' }


  goToHistory(){
    state.go('tab.history');
  }


  goToCheckin(){
    state.go('tab.checkin');
  }


  goToCreateCheckin(){
    state.go('tab.createCheckin');
  }

  dateToString(date){
    if(date instanceof Date){
      return (date.getUTCDay()+1) + "." + date.getUTCMonth() + "." + date.getFullYear() + " , " + date.getUTCHours() + ":" + date.getUTCMinutes() + " Uhr";
    }else{
      s = new Date(date);
      return (s.getUTCDay()+1) + "." + s.getUTCMonth() + "." + s.getFullYear() + " , " + s.getUTCHours() + ":" + s.getUTCMinutes() + " Uhr";
    }
  }

  createCheckin(object){
    if(this.checkIfCheckinIsValid(object)){
      object.date = new Date();
      object.userId = Meteor.userId();
      object.type = "Checkin";
      this.callMethod('createCheckinOrOvereating', object);
      if(this.callMethod('checkIfLevelIsReached', Meteor.userId())){
        this.callMethod('moveToNextLevel',Meteor.userId());
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


    //history info
    infoHistory(){
      this.createAlert("Hier werden alle deine Checkins und Essattacken in einer Historie angezeigt","Info");
    }

    //Checkin/Overeating info
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
  }


  CheckinCntrl.$name = 'CheckinCntrl';
  CheckinCntrl.$inject = ['$stateParams','$state','$ionicPopup'];
