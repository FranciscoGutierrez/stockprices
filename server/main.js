import { Meteor } from 'meteor/meteor';

Cities = new Meteor.Collection('cities');
Answers = new Meteor.Collection('answers');

Meteor.publish("cities", function () {
  return Cities.find({});
});

Meteor.publish("answers", function () {
  return Answers.find({});
});
