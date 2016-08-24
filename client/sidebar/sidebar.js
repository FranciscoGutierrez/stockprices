import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.sidebar.helpers({
  average() {
    var avg = 0;
    var div = 0;
    if(Session.get("slider1-on")) {
      avg = Session.get("slider1") + avg;
      div++;
    }
    if(Session.get("slider2-on")) {
      avg = Session.get("slider2") + avg;
      div++;
    }
    if(Session.get("slider3-on")) {
      avg = Session.get("slider3") + avg;
      div++;
    }
    if(Session.get("slider4-on")) {
      avg = Session.get("slider4") + avg;
      div++;
    }
    Session.set("avg",Math.round(avg/div));
    return  Math.round(avg/div);
  },
});
