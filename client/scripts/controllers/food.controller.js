
import {Controller} from 'angular-ecmascript/module-helpers';
import {Meteor} from 'meteor/meteor';
import {Foods} from '../../../lib/collections';

/**
 * @author Mario Curkovic
 *
 * Controller for handling foods.
 * Each user manages a lot of food. This controller provides create, validate, and delte functionality
 * for food.
 */
export default class FoodCntrl extends Controller{

  constructor(){
    super(...arguments);
Session.set('newMsg',Messages.find({"readBy": {$ne: Meteor.userId()},"access":{$in: [Meteor.user().username,"all"]}}).count());
    state = this.$state;
    ionicPopup = this.$ionicPopup;

    this.subscribe('foods');

    this.helpers({
        data() {
            return Foods.find();
            }
    });

  }


  saveFood(obj){
    if(this.validateFood(obj)){
      obj.userId = Meteor.userId();
      this.callMethod('createFood', obj);
        this.goToSeeFoods()
    }

  }


  validateFood(obj){
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

  goToCreateFood(){
      state.go('tab.addFoods');
  }

  goToSeeFoods(){
    state.go('tab.foods');
  }

  getFoodsByUserId(){
    Foods.find({"userId": Meteor.userId()});
  }

  deleteFood(food){
    this.callMethod('removeFood', food._id);
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

FoodCntrl.$name = 'FoodCntrl';
FoodCntrl.$inject = ['$stateParams','$state','$ionicActionSheet','$ionicPopup'];
