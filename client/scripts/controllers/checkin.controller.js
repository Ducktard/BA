import { Controller } from 'angular-ecmascript/module-helpers';
import { Meteor } from 'meteor/meteor';
import {Checkins} from '../../../lib/collections';
import {Overeatings} from '../../../lib/collections';


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

      var hungerEnums = ["wenig", "mittel", "sehr"];
      this.hungerEnums = hungerEnums;

      this.subscribe('checkins');

      this.helpers({
        data() {return Checkins.find();}
      });

    }



  goToCheckin(){
    state.go('tab.checkin');
  }


  goToCreateCheckin(){
      state.go('tab.createCheckin');
  }

  createCheckin(object){
      if(this.checkIfCheckinIsValid(object)){
        object.date = new Date();
        object.userId = Meteor.userId();
        object.type = "Checkin";
        this.callMethod('createCheckinOrOvereating', object);
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
