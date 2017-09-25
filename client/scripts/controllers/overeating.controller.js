
import {Controller} from 'angular-ecmascript/module-helpers';
import {Meteor} from 'meteor/meteor';
import {Checkins} from '../../../lib/collections';
import {Foods} from '../../../lib/collections';
import {Locations} from '../../../lib/collections';
import {Goals} from '../../../lib/collections';

export default class OvereatingCntrl extends Controller{

    constructor(){
      super(...arguments);

      ionicActionSheet = this.$ionicActionSheet;
      ionicPopup = this.$ionicPopup;
      state = this.$state;

      this.subscribe('foods');
      this.subscribe('locations');

      levelReachedDate = Meteor.user().profile.reachedLevel;
      this.subscribe('checkins', function(){
        this.numOfOvereatingsInCurrentLevel = Checkins.find({"type":"Overeating","date": {$gt: levelReachedDate}}).count();
      });

      this.currentLevel = Meteor.user().profile.level;
      currentLevel = this.currentLevel;
      this.subscribe('goals', function(){
        this.currentGoal = Goals.findOne({"level":currentLevel});
      });

      this.helpers({
          dataFood() {  return Foods.find(); },
          dataLocations(){return Locations.find();},
      });

      this.foods = [];
    }


      goToOvereating(){
        state.go('tab.overeating');
      }

      goToCreateOvereating(){
            state.go('tab.createOvereating');
      }



      createOvereating(object){
        if(this.checkIfOvereatingIsValid(object)){

            object.date = new Date();
            object.userId = Meteor.userId();
            object.type = "Overeating";
            object.foods = this.foods;
            if(this.currentGoal.overeatings <= this.numOfOvereatingsInCurrentLevel){
              this.createAlert("Das Level ist leider nicht erreicht worden, Sie dürfen das Level aber nochmal widerholen");
              this.callMethod('repeatLevel',Meteor.userId());
              this.foods = [];
              return;
            }
            this.callMethod('createCheckinOrOvereating', object);
            this.callMethod('addPoints',Meteor.userId(),-10);
            this.createAlert("Essattacke wurde erfolgreich gespeichert. ", "Erfassung erfolgreich");
            setTimeout(state.go('tab.createOvereating'),1000);
          //delete foods list
          this.foods = [];

        }
      }

    checkIfOvereatingIsValid(over){
        if(over == null ||  over.stress == undefined || over.hunger == undefined){
          this.createAlert("Bitte alle benötiften Daten angeben. ","Erfassung nicht erfolgreich");
          return false;
        }

        return true;
    }


    /**
     * Method is called when a food element in the view is clicked.
     * If it exists it is removed from the list, otherwise it is added to
     * the list.
     * @param food has tehe property name
     */
      getFoodsOneByOne(food){
        if(this.contains(this.foods,food.name)){
            //delete food from list
            position = this.foods.indexOf(food.name);
            if ( ~position ) {
              this.foods.splice(position, 1);
            }
        }else{ //put food in list
            this.foods.push(food.name);
        }
      }


    /**
     * Method checks if the value of obj is element of the a.
     * @param a
     * @param obj
     * @returns {boolean}
     */
      contains(a, obj) {
          for (var i = 0; i < a.length; i++) {
              if (a[i].valueOf() == obj.valueOf()) {
                  return true;
              }
          }
          return false;
      }


    info(){
      this.createAlert("In dieser Ansicht kannst du eine Essattacke angeben.","Info");
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


OvereatingCntrl.$name = 'OvereatingCntrl';
OvereatingCntrl.$inject = ['$stateParams','$state','$ionicActionSheet','$ionicPopup'];
