import { Controller } from 'angular-ecmascript/module-helpers';
import {Meteor} from 'meteor/meteor';
import {LeaderboardEntries} from '../../../lib/collections';
import { Session } from 'meteor/session';
/**
* @author Mario Curkovic
*
* Controller for handling all authentication purposes.
* Basically this means registering and login.
*/
export default class AuthenticationCntrl extends Controller {


  constructor(){
    super(...arguments);
    ionicPopup = this.$ionicPopup;
    state = this.$state;

    this.subscribe("leaderboardEntries");

    this.helpers({
      existingUser(){
        Session.set("userExists",LeaderboardEntries.find({"username":Session.get('username')}));
        return Session.get('userExists');
      }
    });
  }


  goToRegister(){
    state.go('register');
  }

  goToLogin(){
    state.go('login');
  }

  setUsernameSession(username){
    Session.set('username', username);
  }

  registerUser(User,existingUser){
    if(this.checkIfUserValid(User,existingUser)){
      this.callMethod('newUser',User);
      //go to route
      this.$state.go('login');

    }
  }

  /**
  * Method checks if user credentials are valid.
  * @param User
  */
  checkIfUserValid(User){
    //console.log("New User", User);
    let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let reUsername =  /^[A-Za-z0-9 _]+$/; // or /^\w+$/ as mentioned

    if(User == null || User.username == null || User.email == null || User.password == null|| User.realname == null ){
      this.createAlert("Bitte alle Daten angeben. ", "Registrierung fehlgeschlagen");
      return false;
    }

    if(!regexEmail.test(User.email)){
      this.createAlert("Deine E-Mail Adresse ist nicht valide.", "Registrierung fehlgeschlagen");
      return false;
    }


    var res = this.callMethod('getUserByEmail',User.email);
    if(res){
      this.createAlert("Email ist bereits vergeben. ", "Registrierung fehlgeschlagen");
    };

    if (!reUsername.test(User.username)) { //|| !reUsername.test(User.realname)
      this.createAlert("Bitte nur Buchstaben und Zahlen für die Benutzernamen benutzen. ", "Registrierung fehlgeschlagen")
      return false;
    }

    if(User.username.length <= 4){
      this.createAlert("Benutzername muss mindestens 4 Buchstaben lang sein. ", "Registrierung fehlgeschlagen")
      return false;
    }

    if(User.password.length <= 4){
      this.createAlert("Das Password muss mindestens 5 Buchstaben lang sein. ", "Registrierung fehlgeschlagen")
      return false;
    }

    if(User.password == User.passwordbestaetigen ){
      delete User.passwordbestaetigen;
    }else{
      this.createAlert("Die Passwörter müssen übereinstimmen.", "Registrierung fehlgeschlagen")
      return false;
    }

    if(User.age <1 || User.age>100){
      this.createAlert("Bist du sicher, dass du so alt bist?", "Registrierung fehlgeschlagen")
      return false;
    }
    //everything is valid

      if(Session.get('userExists') != null){
        console.log("Username ist bereits vergeben! Bitte wählen Sie einen anderen Username.");
        this.createAlert("Username ist bereits vergeben! Bitte wählen Sie einen anderen Username.", "Registrierung fehlgeschlagen");
        return false;
      }else{
        return true;
      }


  }



  doLoginAction(credentials) {
    Meteor.loginWithPassword(credentials.username, credentials.password, function(err) {
      if (err) {
        //show popup if login failed
        //console.log("login failed");
        this.ionicPopup.alert({
          title: err.reason || 'Login fehlgeschlagen',
          template: 'Bitte nochmal versuchen. ',
          okType: 'button-positive button-clear'
        });
      }else{
        //login succesfull
        this.state.go('tab.profile');
      }

    });
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

AuthenticationCntrl.$name = 'AuthenticationCntrl';
AuthenticationCntrl.$inject= ['$stateParams','$state','$ionicPopup'];
