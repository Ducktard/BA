import Moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {Checkins} from '../lib/collections';
import {Goals} from '../lib/collections';

/**
 * @author Mario Curkovic
 *
 * If you need some dummy data in some of your collection,
 * you can do that here. The data will be inserted when the project is build.
 */
Meteor.startup(() => {


//bootstrap

//Definition of goals realated to a period of one week for every goal,
  // The goals become tougher with increasing level
  if(Goals.find().count() !== 0) return;
const goals = [
  {
    level : 1,
    checkins: 3,
    overeatings: 5
  },
  {
    level : 2,
    checkins: 5,
    overeatings: 4
  },
  {
    level : 3,
    checkins: 7,
    overeatings: 3
  },
  {
    level : 4,
    checkins: 9,
    overeatings: 2
  },
  {
    level : 5,
    checkins: 11,
    overeatings: 2
  },
  {
    level : 6,
    checkins: 12,
    overeatings: 1
  },
  {
    level : 7,
    checkins: 14,
    overeatings: 0
  }

];
//
goals.forEach((m) => {
  Goals.insert(m);
});

/*if(Checkin.find().count() !== 0) return;
  const checkins = [
    {
      name : 'first dummy',
      count : 1,
      createdAt: new Date()
    },
    {
      name : 'second dummy',
      count : 2,
      createdAt: new Date()
    },
    {
      name : 'third dummy',
      count : 28,
      createdAt: new Date()
    }
  ];
  //
checkins.forEach((m) => {
    Checkin.insert(m);
  });

*/


});
