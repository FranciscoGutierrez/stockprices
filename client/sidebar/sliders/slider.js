import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.slider.onCreated(function sliderOnCreated() {
  // slider starts at 100.
  this.slider = new ReactiveVar(100);
});

Template.slider.helpers({
  value() {
    // when the slider updates, set the value reactively.
    return Template.instance().slider.get();
  },
  show() {
    return Session.get(Template.instance().data.tag+"-on");
  }
});

Template.slider.events({
  'mouseenter paper-slider'(event, instance) {
    // start catching events when the mouseenters, (hackish?)
    instance.$("paper-slider").on("immediate-value-changed", function() {
      instance.slider.set($(this).prop("immediateValue"));
      Session.set(instance.data.tag, instance.slider.get());
    });
  },
  'click paper-slider'(event, instance){
    Session.set(instance.data.tag+"-slide", Session.get(instance.data.tag+"-slide")+1);
  },
  'click paper-checkbox'(event, instance) {
    Session.set(instance.data.tag+"-click", Session.get(instance.data.tag+"-click")+1);
    var status = Session.get(instance.data.tag+"-on");
    $(".question-answers").css("visibility","visible");
    Session.set(instance.data.tag, 100);
    Template.instance().slider.set(100);
    if(status) {
      Session.set(instance.data.tag+"-on", false);
    } else {
      Session.set(instance.data.tag+"-on", true);
    }

    var question = Session.get("order")[Number(Session.get("qnumber"))];
    if (question == 4)  $(".question-buttons").css("visibility","visible");
    if (question == 10) $(".question-buttons").css("visibility","visible");
    if (question == 11) $(".question-buttons").css("visibility","visible");
  }
});
