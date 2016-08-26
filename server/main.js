import { Meteor } from 'meteor/meteor';

Stocks = new Meteor.Collection('stocks');
Series = new Meteor.Collection('series');
Answers = new Meteor.Collection('answers');

Meteor.publish("stocks", function () {
  return Stocks.find({});
});

Meteor.publish("answers", function () {
  return Answers.find({});
});

Meteor.publish("series", function (name) {
  return Series.find({ name: name});
});
