import { Config } from 'angular-ecmascript/module-helpers';

import { Runner } from 'angular-ecmascript/module-helpers';

import { Meteor } from 'meteor/meteor';

//index
import indexTemplateUrl from '../index.html';

//tabs
import tabsTemplateUrl from '../templates/tabs.html';


//auth stuff
import registerTemplateUrl from '../templates/register.html';
import loginTemplateUrl from '../templates/login.html';

//other html
//checkin
import checkinemplateUrl from '../templates/checkin.html';
import createcheckinemplateUrl from '../templates/createcheckin.html';
//overeating
import overeatingTemplateUrl from '../templates/overeating.html';
import createOvereatingTemplate from '../templates/createovereating.html';

//goals -> only visible for achievers
import goalsTemplateUrl from '../templates/goals.html';

//history
import historyTemplateUrl from '../templates/history.html';
import savedCheckinTemplateUrl from '../templates/savedCheckin.html';

//profile
import profileTemplateUrl from '../templates/profile.html';

//channel
import seeChannelsTemplateUrl from '../templates/channels.html';
import createChannelTemplateUrl from '../templates/createChannel.html';
import channelTemplateUrl from '../templates/channel.html';

//food
import addFootTemplateUrl from '../templates/addFood.html';
import seeFoodsTemplateUrl from '../templates/foods.html';

//location
import seeLocationsTemplateUrl from '../templates/locations.html';
import addLocationsTemplateUrl from '../templates/addLocation.html';

//activity
import seeActivitiesTemplateUrl from '../templates/activities.html';
import addActivitiesTemplateUrl from '../templates/addActivity.html';


//collection
import {Checkins} from '../../lib/collections';

/**
 * @author Mario Curkovic
 *
 * Here all routes have to be registered inside of the configure() method.
 * Although the template have to be loaded here from '../template'.
 */
 class RoutesConfig extends Config {

   constructor() {
     super(...arguments);

     //this.isAuthorized = false;

   }


  configure() {
    this.$stateProvider

      .state('tab', {
        url: '/tab',
        abstract: true,
        cache: false,
        templateUrl: tabsTemplateUrl,
        //TODO: how to secure route?!?
      /*  resolve: {
        //       user: this.isAuthorized,
               checkins() {
                 return Meteor.subscribe('checkins');
               }
        }*/
/*        resolve:{
              "check":function($location){
                  if(1==2){
                      //Do something
                      console.log("access");
                    }else{
                        this.$state.go('login');   //redirect user to home.
                        console.log("You don't have access here");
        }
    }
}*/
        })


      .state('tab.checkin', {
          url: '/checkin',
          views: {
            'tab-create-checkin': {
              templateUrl: checkinemplateUrl,
              controller : 'CheckinCntrl as checkin'
            }
          }/*,
          resolve:{
                "check":function($location){
                    if(1==2){
                        //Do something
                        console.log("access");
                      }else{
                          $location.path('/');    //redirect user to home.
                          console.log("You don't have access here");
          }
      }
  }*/
        })

     .state('tab.createCheckin',{
       url: '/checkin/create',
       views: {
         'tab-create-checkin': {
       templateUrl: createcheckinemplateUrl,
       controller:  'CheckinCntrl as checkin'
                        }
              }
     })



//overeatings

     .state('tab.createOvereating',{
       url: '/overeating/create',
       views: {
         'tab-create-overeating': {
       templateUrl: createOvereatingTemplate,
       controller:  'OvereatingCntrl as overeating'
                        }
              }
     })


     .state('tab.overeating',{
       url: '/overeating',
       views: {
         'tab-create-overeating': {
       templateUrl: overeatingTemplateUrl,
       controller:  'OvereatingCntrl as overeating'
                        }
              }
     })

     //goals
     .state('tab.goals',{
       url: '/goals',
       views: {
         'tab-goals':{
           templateUrl: goalsTemplateUrl,
           controller: 'CheckinCntrl as checkin'
         }
       }
     })

     //history
     .state('tab.history',{
       url: '/history',
       views: {
         'tab-history': {
       templateUrl: historyTemplateUrl,
       controller:  'CheckinCntrl as checkin'
                        }
              }
     })

     .state('savedCheckin',{
       url: '/history/:checkInId',
           templateUrl: savedCheckinTemplateUrl,
           //important otherwise the channelId in the $stateParams sometimes dont get updated
           cache: false,
           controller:   'CheckinCntrl as checkin'
     })

     .state('tab.channels',{
       url: '/channels',
       views: {
         'tab-channel': {
       templateUrl: seeChannelsTemplateUrl,
       controller:  'ChannelsCntrl as channels'
                        }
              }
     })


     .state('channel',{
       url: '/channel/:chanId',
       templateUrl: channelTemplateUrl,
       //important otherwise the channelId in the $stateParams sometimes dont get updated
       cache: false,
       controller:   'ChannelCntrl as channel'
     })


     .state('tab.createChannel',{
       url: '/channel/create',
       views: {
         'tab-channel': {
       templateUrl: createChannelTemplateUrl,
       controller:  'ChannelsCntrl as channels'
                        }
              }
     })




      //auth stuff
      .state('login', {
        url: '/login',
        templateUrl: loginTemplateUrl,
        controller : 'AuthenticationCntrl as auth'
      })

      .state('register',{
        url: '/register',
        templateUrl:registerTemplateUrl,
        controller: 'AuthenticationCntrl as auth'
      })

      //user profile

      .state('tab.profile', {
          url: '/profile',
          views: {
            'tab-profile': {
              templateUrl: profileTemplateUrl,
              controller: 'UserCntrl as usr'
            }
          }
        })

/*Food stuff*/
        .state('tab.foods', {
          url: '/foods',
          views: {
            'tab-profile':{
              templateUrl: seeFoodsTemplateUrl,
              controller : 'FoodCntrl as foods'
            }
          }
        })

      .state('tab.addFoods', {
        url: '/foods/add',
        views: {
          'tab-profile':{
            templateUrl: addFootTemplateUrl,
            controller : 'FoodCntrl as foods'
          }
        }
      })

/*Location stuff*/
      .state('tab.locations', {
        url: '/locations',
        views: {
          'tab-profile':{
            templateUrl: seeLocationsTemplateUrl,
            controller : 'LocationCntrl as locations'
          }
        }
      })

      .state('tab.addLocations', {
      url: '/locations/add',
      views: {
        'tab-profile':{
          templateUrl: addLocationsTemplateUrl,
          controller :  'LocationCntrl as locations'
        }
      }
      })

/*Activity stuff*/
      .state('tab.activities', {
        url: '/activities',
        views: {
          'tab-profile':{
            templateUrl: seeActivitiesTemplateUrl,
            controller : 'ActivityCntrl as activities'
          }
        }
      })

      .state('tab.addActivities', {
      url: '/activities/add',
      views: {
        'tab-profile':{
          templateUrl: addActivitiesTemplateUrl,
          controller :  'ActivityCntrl as activities'
        }
      }
      })

    this.$urlRouterProvider.otherwise('login');

  }




}



//on route change
RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

class RoutesRunner extends Runner {
  run() {
    this.$rootScope.$on('$stateChangeError', (...args) => {
      const err = _.last(args);

      if (err === 'AUTH_REQUIRED') {
        this.$state.go('login');
      }
    });
  }
}

RoutesRunner.$inject = ['$rootScope', '$state'];

export default [RoutesConfig, RoutesRunner];
