import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Channel } from '../lib/collections';
import {Foods} from '../lib/collections';
import {Locations} from '../lib/collections';
import {Activities} from '../lib/collections';
import {Messages} from '../lib/collections';
import {Checkins} from '../lib/collections';
import {LeaderboardEntries} from '../lib/collections';
import {Notifications} from '../lib/collections';

Meteor.methods({


  createFood(food){
    Foods.insert(food);
  },

  createMessage(message){
    Messages.insert(message);
  },

  createChannel(channel){
    Channel.insert(channel);
  },

  createCheckinOrOvereating(checkin){
     Checkins.insert(checkin);
  },

  createLocation(location){
    Locations.insert(location);
  },

  createActivity(activity){
    Activities.insert(activity);
  },

  createLeaderboardEntry(entry){
    LeaderboardEntries.insert(entry);
  },

/* the notification object needs the following Attributes:
 * userId (receiver)
 * read (should be false, because the receiver has not yet read it),
 * header (header of the notification)
 * message (message of the notification)
 */
 /**
 * Method for creating a Notification.
 * @param notification
 */
  createNotification(notification){
    Notifications.insert(notification);
  }


});
