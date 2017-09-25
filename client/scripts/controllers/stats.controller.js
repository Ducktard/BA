import { Controller } from 'angular-ecmascript/module-helpers';
import { Meteor } from 'meteor/meteor';
import {Checkins} from '../../../lib/collections';


/**
* @author Johannes Weyers
*
* Controller for handling checkins.
* A checkin is a set of physical parameters that a user can/should
* enter several times a day.
*/
export default class StatsCntrl extends Controller {


  constructor(){
    super(...arguments);

    ionicPopup = this.$ionicPopup;
    state = this.$state;

    this.subscribe('checkins');
    this.data = [];
    this.subscribe("lineChartData");
    this.helpers({
      checkins(){return Checkins.find();}
    });
    this.finalData = [];

  // this.aggregateData(Checkins.find().fetch());

}


  aggregateData(){
    checkins = Checkins.find().fetch();
    data = []
    n = Object.assign({}, checkins[0]);
    n.date = checkins[0].date.getTime();
    data.push(n);
    if(checkins[0].type=="Checkin"){
      data[0].checkins = 1;
      data[0].overeatings = 0;
    }else{
      data[0].overeatings = 1;
      data[0].checkins = 0;
    }

    lastDate = new Date(checkins[0].date);
    for (i in checkins) {
      console.log(i);
      c = checkins[i];
      c.checkins = 1;
      c.overeatings = 1;

      if(lastDate.getTime() > c.date.getTime()+1000*60*60){
        lastDate = c.date;
        n = Object.assign({}, c);
        n.date = c.date.getTime();
        data.push(n);
      }else{
        if(lastDate.getTime() != c.date.getTime()){
          if(c.type ==  "Checkin"){
            data[data.length-1].checkins++;
          }else{
            data[data.length-1].overeatings++;
          }
        }
      }
    }
    // setTimeout('', 1000);
  console.log(data);
  data.reverse();
  this.finalData = data;
    // return data;
  }

  goToHistory(){
    state.go('tab.history');
  }
}

StatsCntrl.$name = 'StatsCntrl';
StatsCntrl.$inject = ['$stateParams','$state','$ionicActionSheet','$ionicPopup'];
