import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.sidebar.helpers({
  average() {
    var avg = Session.get("slider1") + Session.get("slider2") + Session.get("slider3") + Session.get("slider4");
    return  Math.round(avg/4);
  },
});
