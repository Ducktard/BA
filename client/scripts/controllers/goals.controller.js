
import { Controller } from 'angular-ecmascript/module-helpers';
import { Meteor } from 'meteor/meteor';
import {Checkins} from '../../../lib/collections';
import {Overeatings} from '../../../lib/collections';
import {Goals} from '../../../lib/collections';

/**
* @author Johannes Weyers
*
* Controller for showing the Goals of the user
*/
export default class GoalsCntrl extends Controller {

  constructor(){
    super(...arguments);

    ionicActionSheet = this.$ionicActionSheet;
    ionicPopup = this.$ionicPopup;
    state = this.$state;

    this.currentLevel = Meteor.user().profile.level;
    currentLevel = this.currentLevel;

    this.levelReachedDate = Meteor.user().profile.reachedLevel;
    levelReachedDate = this.levelReachedDate;

    this.levelGoalDate = new Date(levelReachedDate.getTime() + 7*24*60*60000);

    this.subscribe('goals', function(){
      this.currentGoal =  Goals.findOne({"level":currentLevel});
    });

    this.subscribe('checkins', function(){
      this.numOfCheckinsInCurrentLevel = Checkins.find({"type":"Checkin","date": {$gt: levelReachedDate}}).count();
    });

    this.helpers({
      getNumOfOvereatingsInCurrentLevel(){return Checkins.find({"type":"Overeating","date": {$gt: levelReachedDate}}).count();},
      getNumOfCheckinsInCurrentLevel(){return Checkins.find({"type":"Checkin","date": {$gt: levelReachedDate}}).count();},
    });

  }

  dateToString(date){
    if(date instanceof Date){
      return date.toLocaleString() ;
    }else{
      s = new Date(date);
      return s.toLocaleString() ;
    }
  }
}

GoalsCntrl.$name = 'GoalsCntrl';
GoalsCntrl.$inject = ['$stateParams','$state','$ionicPopup'];
