import { Controller } from 'angular-ecmascript/module-helpers';
import { Meteor } from 'meteor/meteor';
import {Channel} from '../../../lib/collections';
import {Checkins} from '../../../lib/collections';

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

        this.helpers({
            data() {return Channel.find();}
        });
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
