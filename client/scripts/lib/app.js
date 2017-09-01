/**
 * Class is needed to load all js files in a required sequence.
 * Every new Controller has to be loaded here.
 * Some libraries has to be loaded here.
 */

// Libs
import 'angular-animate';
import 'angular-meteor';
import 'angular-sanitize';
import 'angular-ui-router';
import 'angular-moment';
import Loader from 'angular-ecmascript/module-loader';
import 'ionic-scripts';
import Angular from 'angular';
import { Meteor } from 'meteor/meteor';

//package for Authentication
import { Accounts } from 'meteor/accounts-base';

//date filter
import CalendarFilter from '../filters/calendar.filter';


// Modules
import RoutesConfig from '../routes';
//Routes and RoutesRunner
import RoutesRunner from '../routes';

//auth
import AuthenticationCntrl from '../controllers/authentication.controller.js';

//checkin CheckinCntrl
import CheckinCntrl from '../controllers/checkin.controller.js';

//overeating controller
import OvereatingCntrl from '../controllers/overeating.controller.js';

//User Cntrl
import UserCntrl from '../controllers/user.controller.js';

//channel
import ChannelsCntrl from '../controllers/channels.controller.js';
import ChannelCntrl from '../controllers/channel.controller.js';

//foods
import FoodCntrl from '../controllers/food.controller.js';

//locations
import LocationCntrl from '../controllers/location.controller.js';

//activities
import ActivityCntrl from '../controllers/activity.controller.js';




const App = 'Ellipsa';

// App
Angular.module(App, [
  'angular-meteor',
  'angularMoment',
  'ionic'
]);


new Loader(App)
  .load(CalendarFilter)
  .load(AuthenticationCntrl)
  .load(CheckinCntrl)
  .load(OvereatingCntrl)
  .load(UserCntrl)
  .load(ChannelCntrl)
  .load(ChannelsCntrl)
  .load(FoodCntrl)
  .load(LocationCntrl)
  .load(ActivityCntrl)
  .load(RoutesConfig);

// Startup
if (Meteor.isCordova) {
  Angular.element(document).on('deviceready', onReady);
}
else {
  Angular.element(document).ready(onReady);
}

function onReady() {
  Angular.bootstrap(document, [App]);
}
