import { Controller } from 'angular-ecmascript/module-helpers';
import { Meteor } from 'meteor/meteor';
/**
 * Controller for managing the profile.
 */
export default class UserCntrl extends Controller {


  constructor(){
      super(...arguments);

      ionicPopup = this.$ionicPopup;
      state = this.$state;

      this.helpers({
        userdata(){ return Meteor.user();}

      });

  }

  goToFoods(){
    state.go('tab.foods');
  }

  goToLocations(){
    state.go('tab.locations');
  }

  goToActivities(){
    state.go('tab.activities');
  }

  logout(){
      Meteor.logout();
      state.go('login');
  }


  info(){
    this.createAlert("In deinem profil kannst du deine Daten einsehen und deine Orte an denen du üblicherweise Essattacken hast, sowie die Lebensmittel "+
    " mit denen du dich überisst verwalten. Dann kannst du diese später beim festhalten von Essattacken bequem anklicken. ","Info");
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

isAchiever(){
   return false;
}

}

UserCntrl.$name = 'UserCntrl';
UserCntrl.$inject = ['$stateParams','$state','$ionicPopup'];
