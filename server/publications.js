import { Meteor } from 'meteor/meteor';
import { Checkins, Overeatings, Channel, Messages, Foods, Locations, Activities, Goals,LeaderboardEntries, Notifications} from '../lib/collections';

/**
 * @author Mario Curkovic
 *
 * This file is used to provide Publications.
 * That are some kind of functionalities for a specific collection.
 * To use them (inside a client side angular controller) publish the collections by using this.subscribe('name'); eg: this.subscribe('messages');
 * Then the methods can be accessed by using: this.helpers({..}) eg:
 *     this.helpers({
            messages() {return Messages.find({ chanId: chanId });},
            data() {return Channel.findOne({_id: chanId});}
      });
 */

Meteor.publish('users', function() {
  console.log("avhkjwblch",Meteor.users.find({"object.userId": Meteor.userId()}) );
  return {
      find(){
        Meteor.users.find({"object.userId": Meteor.userId()});
      }
    }
});

Meteor.publishComposite('leaderboardEntries', function(){
    return{
      find() {
        return LeaderboardEntries.find({}, { sort: {level: -1,points: 1 } });
      }
    }
});

Meteor.publishComposite('foods', function(){
    return{
      find() {
        return Foods.find({"userId": this.userId});//{"userId": Meteor.userId()})
      }
    }
});



Meteor.publishComposite('locations', function(){
    return{
      find() {
        return Locations.find({"userId": this.userId});//{"userId": Meteor.userId()})
      }
    }
});

Meteor.publishComposite('activities', function(){
    return{
      find() {
        return Activities.find({"userId": this.userId});//{"userId": Meteor.userId()})
      }
    }
});

Meteor.publishComposite('checkins', function(){
    return{
      find() {
        return Checkins.find({"userId": this.userId}, { sort: {date: -1 } }); // {"sort" : ['date', 'asc']} );
      }
    }
});

Meteor.publishComposite('notifications', function(){
    return{
      find() {
        return Notifications.find({"userId": this.userId, "read":false}, { sort: {date: 1 } }); // {"sort" : ['date', 'asc']} );
      }
    }
});

Meteor.publishComposite('goals', function(){
    return{
      find() {
        return Goals.find();
      }
    }
});

Meteor.publishComposite('channel', function(){
    return{
      find() {
        return Channel.find();
      },
    children: [
      {
        find(chan) {
          return Channel.find({ _id: chan._id });
        }
      }
      ]
    }
});



Meteor.publishComposite('messages', function(){
    return{
      find() {
        return Messages.find(); //{"object.userId": user._id}
      }
      ,
      children: [
        {
          find(chan) {
            return Messages.find({ chanId: chan.chanId });
          }
        }

      ]

    }

});
