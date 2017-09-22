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
import 'ng-morris-js';
import 'morris.js/morris.js';
import 'raphael';


//package for Authentication
import { Accounts } from 'meteor/accounts-base';

//date filter
import CalendarFilter from '../filters/calendar.filter';

//Checkins
import {Checkins} from '../../../lib/collections';


// Modules
import RoutesConfig from '../routes';
//Routes and RoutesRunner
import RoutesRunner from '../routes';

//auth
import AuthenticationCntrl from '../controllers/authentication.controller.js';

//tabs TabCntrl
import TabCntrl from '../controllers/tab.controller.js';

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

//leaderboard
import LeaderboardCntrl from '../controllers/leaderboard.controller.js';

//leaderboard
import StatsCntrl from '../controllers/stats.controller.js';

const App = 'Ellipsa';

// App
Angular.module(App, [
  'angular-meteor',
  'angularMoment',
  'ionic',
  'ng-morris-js'

]);


new Loader(App)
  .load(CalendarFilter)
  .load(AuthenticationCntrl)
  .load(TabCntrl)
  .load(CheckinCntrl)
  .load(OvereatingCntrl)
  .load(UserCntrl)
  .load(ChannelCntrl)
  .load(ChannelsCntrl)
  .load(FoodCntrl)
  .load(LocationCntrl)
  .load(ActivityCntrl)
  .load(LeaderboardCntrl)
  .load(StatsCntrl)
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
