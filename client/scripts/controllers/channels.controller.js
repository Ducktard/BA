import { Controller } from 'angular-ecmascript/module-helpers';
import { Meteor } from 'meteor/meteor';
import {Channel} from '../../../lib/collections';
import {Checkins} from '../../../lib/collections';
import {Messages} from '../../../lib/collections';
// import { Session } from 'meteor/session';
/**
* @author Mario Curkovic
*
* Controller for handling channels.
* Channels are some kind of group chats, where all users who are interested in the topic can write messages.
*/
export default class ChannelsCntrl extends Controller {


  constructor(){
    super(...arguments);

    ionicPopup = this.$ionicPopup;
    state = this.$state;

    this.subscribe('channel');
    this.subscribe('messages');


    this.helpers({
      data() {return Channel.find();},
      // unreadMsgInChannel(){
      //   if(Messages.find({"chanId":Session.get('channels.chanId'),"readBy": {$ne: Meteor.userId()}}).count() == 0){
      //
      //     return false;
      //   }
      //   return true;}
      // });
    });
}
    setChannel(chanId){
      Session.set('channels.chanId', chanId);
    }

    unreadMsgInChannel(chanId){
      var x = Messages.find({"chanId":chanId,"readBy": {$ne: Meteor.userId()}}).count();
      if(x == 0){
        return false;
      }
      return true;
    }


    goToCreateChannel(){
      state.go('tab.createChannel');
    }

    goToChannels(){
      state.go('tab.channels');
    }


    createChannel(obj){
      if(this.checkIfChannelNameIsValid(obj)){
        obj.userId = Meteor.userId();
        obj.visibility = "public";
        this.callMethod('createChannel', obj);
        this.goToChannels();
      }
    }

    checkIfChannelNameIsValid(obj){
      let regexChannelname = /^[a-zA-Z0-9_]+$/;
      if(regexChannelname.test(obj.name)){
        return true;
      }else{
        this.createAlert("Bitte benutze keine Sonderzeichen für Channelnamen.","Fehler beim Channel erstellen.")
        return false;
      }
    }

    removeChannel(chan) {
      this.callMethod('removeChannel', chan._id);
    }


    info(){
      this.createAlert("Hier findest Du sogenannte Channel, in denen du dich mit anderen Usern über alles was dich so interessiert austauschen kannst. ","Info");
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


  ChannelsCntrl.$name = 'ChannelsCntrl';
  ChannelsCntrl.$inject = ['$stateParams','$state','$ionicActionSheet','$ionicPopup'];
