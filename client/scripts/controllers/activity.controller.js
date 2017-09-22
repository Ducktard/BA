import {Controller} from 'angular-ecmascript/module-helpers';
import {Meteor} from 'meteor/meteor';
import {Activities} from '../../../lib/collections';

/**
 * @author Johannes Weyers
 *
 * Controller for handling activities.
 *
 *
 */
export default class ActivityCntrl extends Controller{

  constructor(){
    super(...arguments);

    state = this.$state;
    ionicPopup = this.$ionicPopup;

    this.subscribe('activities');

    this.helpers({
        data() {
            return Activities.find();
            }
    });

  }


  saveActivity(obj){
    if(this.validateActivity(obj)){
      obj.userId = Meteor.userId();
      this.callMethod('createActivity', obj);
        this.goToSeeActivity()
    }

  }


  validateActivity(obj){
    let onlyCharsAndNumbersAndSpace = /^[A-Za-z0-9 _]+$/;

    if(!onlyCharsAndNumbersAndSpace.test(obj.name)){
        this.createAlert("Bitte keine Sonderzeichen verwenden.","Hinzufügen fehlgeschlagen");
        return false;
    }
    if(isNaN(obj.calories)){
            this.createAlert("Die Kalorien haben einen numerischen Wert.","Hinzufügen fehlgeschlagen");
            return false;
    }
    return true;
  }


  goToProfile(){
    state.go('tab.profile');
  }

  goToCreateActivity(){
      state.go('tab.addActivities');
  }

  goToSeeActivities(){
    state.go('tab.activities');
  }

  getActivitiesByUserId(){
    Activities.find({"userId": Meteor.userId()});
  }

  deleteActivity(activity){
    this.callMethod('removeActivity', activity._id);
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

ActivityCntrl.$name = 'ActivityCntrl';
ActivityCntrl.$inject = ['$stateParams','$state','$ionicActionSheet','$ionicPopup'];
