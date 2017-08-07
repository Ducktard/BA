import { Controller } from 'angular-ecmascript/module-helpers';
import {Meteor} from 'meteor/meteor';
import {Locations} from '../../../lib/collections';

/**
 * @author Mario Curkovic
 *
 * This controller provides functionality for manageing locations.
 * A user can create and delte a location.
 * Locations can be part of an overeating episode.
 */
export default class LocationCntrl extends Controller {

    constructor(){
        super(...arguments);

        state = this.$state;

        this.subscribe('locations');

        this.helpers({
            data() {
                return Locations.find();
                }
        });
    }

    goToProfile(){
      state.go('tab.profile');
    }

    goToCreateLocation(){
      state.go('tab.addLocations');
    }

    goToSeeLocations(){
      state.go('tab.locations');
    }

    saveLocation(obj){
      if(this.validateLocation(obj)){
        obj.userId = Meteor.userId();
        this.callMethod('createLocation', obj);
        this.goToSeeLocations();
      }
    }

    validateLocation(obj){
      let onlyCharsAndNumbersAndSpace = /^[A-Za-z0-9 _]+$/;

      if(!onlyCharsAndNumbersAndSpace.test(obj.name)){
          this.createAlert("Bitte keine Sonderzeichen verwenden.","Hinzufügen fehlgeschlagen");
          return false;
      }

      return true;
    }


    deleteLocation(loca){
      this.callMethod('removeLocation', loca._id);
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

LocationCntrl.$name = 'LocationCntrl';
LocationCntrl.$inject = ['$stateParams','$state','$ionicActionSheet','$ionicPopup'];
