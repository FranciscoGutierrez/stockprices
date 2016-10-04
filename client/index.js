import { Meteor } from 'meteor/meteor';

Stocks  = new Meteor.Collection('stocks');
Answers = new Meteor.Collection('answers');
Series  = new Meteor.Collection('series');

Template.body.helpers({
  assignment() {
    return Session.get("ssid");
  },
  googleform() {
    var url = "";
    if(Session.get("option") == "dots"  ) url = "https://goo.gl/forms/o1TwDt4nBkFdXudg2";
    if(Session.get("option") == "series") url = "https://goo.gl/forms/3gGVfknHgq6u8Zgf1";
    if(Session.get("option") == "chart" ) url = "https://goo.gl/forms/zkk9zSsL1KsCwEQ83";
    return url;
  }
});

Template.body.events({
  'click .start-questions'(event, instance) {
  }
});
