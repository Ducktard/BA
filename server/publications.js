import { Meteor } from 'meteor/meteor';
import { Checkins, Overeatings, Channel, Messages, Foods, Locations, Activities} from '../lib/collections';

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
  return Meteor.users.find({"object.userId": Meteor.userId()});
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
