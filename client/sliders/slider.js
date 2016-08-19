import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../index.html';

Template.slider.onCreated(function sliderOnCreated() {
  // slider starts at 100.
  this.slider = new ReactiveVar(100);
});

Template.slider.helpers({
  value() {
    // when the slider updates, set the value reactively.
    return Template.instance().slider.get();
  },
});

Template.slider.events({
  'mouseenter paper-slider'(event, instance) {
    // start catching events when the mouseenters, (hackish?)
    instance.$("paper-slider").on("immediate-value-changed", function() {
      instance.slider.set($(this).prop("immediateValue"));
    });
  },
});
