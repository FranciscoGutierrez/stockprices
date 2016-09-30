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
    if(Session.get("option") == "dots"  ) url = "http://goo.gl/forms/vLuOpASq7lNY0LA72";
    if(Session.get("option") == "series") url = "http://goo.gl/forms/O9e0eHP59WHNvukf2";
    if(Session.get("option") == "chart" ) url = "http://goo.gl/forms/IciXzcWdW6yWgLS02";
    return url;
  }
});

Template.body.events({
  'click .start-questions'(event, instance) {
  }
});
