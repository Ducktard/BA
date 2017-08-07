import Moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {Checkins} from '../lib/collections';


/**
 * @author Mario Curkovic
 *
 * If you need some dummy data in some of your collection,
 * you can do that here. The data will be inserted when the project is build.
 */
Meteor.startup(() => {


//bootstrap

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
