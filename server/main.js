import { Meteor } from 'meteor/meteor';

Stocks = new Meteor.Collection('stocks');
Answers = new Meteor.Collection('answers');

Meteor.publish("stocks", function () {
  return Stocks.find({});
});

Meteor.publish("answers", function () {
  return Answers.find({});
});
