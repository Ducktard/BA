import Ionic from 'ionic-scripts';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Meteor } from 'meteor/meteor';
import {Channel} from '../../../lib/collections';
import {Messages} from '../../../lib/collections';
/*TODO: Make input text label bigger if text is long*/

/**
* @author Mario Curkovic
*
* Controller for handling one channel.
* That means subscribe all messages for the channel, and provide a Method for saveing messages.
*/
export default class ChannelCntrl extends Controller {


  constructor(){
    super(...arguments);

    this.isIOS = Ionic.Platform.isWebView() && Ionic.Platform.isIOS();
    this.isCordova = Meteor.isCordova;

    Session.set('messageLength',0);
    state = this.$state;
    chanId = this.$stateParams.chanId; //unique autogenerated id from the route
    if(Session.get('newMsg')>0){
      this.callMethod('setMessagesRead', Meteor.userId(),chanId);
      Session.set('newMsg', Messages.find({"readBy": {$ne: Meteor.userId()}}).count());
    }


    this.subscribe('messages');
    this.subscribe('channel');


    this.helpers({
      messages() {return Messages.find({ chanId: chanId });},
      data() {return Channel.findOne({_id: chanId});},
      sendButtonVisibility(){
        if(Session.get('messageLength')==0){
          return "diasbled";
        }
      },
    });

    this.autoScroll;

  }

  setMsgLength(object){
    Session.set('messageLength',object.message.length);
  }

  goToChannels(){
    state.go('tab.channels');
  }

  saveMessage(object,visible){
    const username = Meteor.user().username;
    object.chanId = chanId;
    object.userId = Meteor.userId();
    object.username = username;
    object.date = new Date();
    object.readBy = [Meteor.userId()];
    if(visible){
      object.access = "all";
    }else{
      object.access =Channel.findOne({_id:chanId}).access;
      ;
    }
    this.callMethod('createMessage', object);
    this.autoScroll();
  }

  permitToShowMessage(message){
    if(Messages.find({"_id": message._id,"access":{$in: [Meteor.user().username,"all"]}}).count() != 0){
      return true;
    }else{
      return false;
    }
  }


  inputUp () {
    if (this.isIOS) {
      this.keyboardHeight = 216;
    }

    this.scrollBottom(true);
  }

  inputDown () {
    if (this.isIOS) {
      this.keyboardHeight = 0;
    }

    this.$ionicScrollDelegate.$getByHandle('chatScroll').resize();
  }

  closeKeyboard () {
    if (this.isCordova) {
      cordova.plugins.Keyboard.close();
    }
  }

  autoScroll() {
    let recentMessagesNum = this.messages.length;

    this.autorun(() => {
      const currMessagesNum = this.getCollectionReactively('messages').length;
      const animate = recentMessagesNum != currMessagesNum;
      recentMessagesNum = currMessagesNum;
      this.scrollBottom(animate);
    });
  }

  scrollBottom(animate) {
    this.$timeout(() => {
      this.$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
    }, 300);
  }


  info(){
    if(this.data.description != undefined){
      this.createAlert(this.data.description,"Info")
    }else{
      this.createAlert("Keine Beschreibung verfügbar.","Info")
    }

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


ChannelCntrl.$name = 'ChannelCntrl';
ChannelCntrl.$inject = ['$stateParams','$state','$ionicPopup','$timeout','$ionicScrollDelegate','$log'];
