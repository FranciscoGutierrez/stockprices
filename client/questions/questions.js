Template.question.onCreated(function(){
  this.questions = new ReactiveVar(1);
});

Template.question.helpers({
  factors() {
    var w = Math.round(Session.get("slider1"));
    var s = Math.round(Session.get("slider2"));
    var t = Math.round(Session.get("slider3"));
    var a = Math.round(Session.get("slider4"));

    if (w == 0) w = "0"; if (s == 0) s = "0";
    if (t == 0) t = "0"; if (a == 0) a = "0";

    if(!$(".health"  ).attr("checked")) w = false
    if(!$(".safety"  ).attr("checked")) s = false
    if(!$(".traffic" ).attr("checked")) t = false
    if(!$(".polluted").attr("checked")) a = false

    return { w: w, s: s, t: t, a: a };
  },
  legend() {
    return Session.get("qnumber") + 1;
  },
  question() {
    var option = Session.get("option");
    var current = Number(Session.get("qnumber")) + 1 ;
    $(".question-container").fadeOut(function(){
      $(".question-"+Number(Session.get("qnumber"))).fadeIn();
    });
    return {option: option,number: number};
  },
  sliderGold1() { return {a: Session.get("gold1") | 0, x: Session.get("gold1")-4}; },
  sliderGold2() { return {a: Session.get("gold2") | 0, x: Session.get("gold2")-4}; },
  sliderGold3() { return {a: Session.get("gold3") | 0, x: Session.get("gold3")-4}; },
  sliderGold4() { return {a: Session.get("gold4") | 0, x: Session.get("gold4")-4}; },
  slider1() { return Session.get("slider1")},
  slider2() { return Session.get("slider2")},
  slider3() { return Session.get("slider3")},
  slider4() { return Session.get("slider4")}
});

Template.question.events({
  "click .question-answers" (event,instance) {
    $(".question-buttons").css("visibility","visible");
  },
  "click .big-golden"(event, instance) {
    var current = Number(Session.get("qnumber"));
    var question = Session.get("order")[current];
    // Reset the sidebar...
    Session.set("slider1",100);
    Session.set("slider2",100);
    Session.set("slider3",100);
    Session.set("slider4",100);

    Session.set("slider1-on",false);
    Session.set("slider2-on",false);
    Session.set("slider3-on",false);
    Session.set("slider4-on",false);
    // Clear the sidebar
    $(".content-left").empty();
    $(".visualisations").empty();
    $(".start-question").fadeIn();

    $(".question-answers").css("visibility","hidden");
    $(".question-buttons").css("visibility","hidden");

    $(".golden").fadeOut(function(){
      setTimeout(function() {
        Session.set("qnumber",current+1);
        $(".question-"+(Session.get("order")[current+1])).fadeIn();
        $(".start-question-container").fadeIn( function() {
          $(".start-question").fadeIn();
        });
      }, 700);
    });

  },
  "click .big-next"  (event, instance) {
    if(Number(Session.get("qnumber")) >= 11) {
      var current  = Number(Session.get("qnumber"));
      var question = Session.get("order")[current];
      var timeend = Date.now();
      var weather = Math.round(Session.get("slider1"));
      var safety  = Math.round(Session.get("slider2"));
      var traffic = Math.round(Session.get("slider3"));
      var air     = Math.round(Session.get("slider4"));
      var gold1 = Session.get("gold1");
      var gold2 = Session.get("gold2");
      var gold3 = Session.get("gold3");
      var gold4 = Session.get("gold4");
      var slider1_click = Session.get("slider1-click",0);
      var slider2_click = Session.get("slider2-click",0);
      var slider3_click = Session.get("slider3-click",0);
      var slider4_click = Session.get("slider4-click",0);
      var slider1_slide = Session.get("slider1-slide",0);
      var slider2_slide = Session.get("slider2-slide",0);
      var slider3_slide = Session.get("slider3-slide",0);
      var slider4_slide = Session.get("slider4-slide",0);
      var actions = slider1_click + slider2_click + slider3_click + slider4_click + slider1_slide + slider2_slide + slider3_slide + slider4_slide;
      var correct = false;

      if(weather == 0) weather = "0"; if(safety == 0) safety = "0";
      if(traffic == 0) traffic = "0"; if(air    == 0) air    = "0";

      if(!Session.get("slider1-on")) weather = false;
      if(!Session.get("slider2-on")) safety  = false;
      if(!Session.get("slider3-on")) traffic = false;
      if(!Session.get("slider4-on")) air     = false;

      if(question==1) {
        //"Consumer trust is moderate (50%) and Economic Growth is very good (100%),
        //Which stock loses more than any other?"
        ans_a = $("input[name=cities]:checked").val();
        if(ans_a == "ibm")  correct = true;
      }

      if(question==2) {
        //"You expect a very good Consumer Trust (100%) and a very bad Dow Jones Index (0%),
        //- McDonald's loses more than {select}
        ans_a = $("input[name=cities]:checked").val();
        if(ans_a == "disney")  correct = true;
      }

      if(question==3) {
        //"You expect IBM's stock to be exactly $127.91 and you only consider one factor.
        //Which factor needs to be very good (100%) to confirm your expectation?"
        ans_a = $("input[name=factors]:checked").val();
        if(ans_a == "dow jones index")  correct = true;
      }

      if(question==4) {
        //"Consumer Trust is moderately bad (25%), Economic Growth and the Dow Jones Index are moderately good (75%).
        //What is the value for the Worldwide News, when Home Depot's stock is $129.99?"
        ans_a = Session.get("slider2");
        if(ans_a == 65)  correct = true;
        if(ans_a == 64)  correct = true;
        if(ans_a == 66)  correct = true;
      }

      if(question==5) {
        //"If you consider all 4 factors to be moderately good (75%)
        //Which stocks are expected to grow more than 5%?"
        ans_a = $("option:selected").text();
        if(ans_a == "ChevronApple")  correct = true;
        if(ans_a == "AppleChevron")  correct = true;
      }

      if(question==6) {
        //"If you consider all 4 factors to be moderate (50%).
        //Which company has the least certain stock price value?"
        ans_a = "apple";
        if(ans_a = "apple")  correct = true;
      }

      if(question==7) {
        //"Worldwide News are very good (100%),
        //Which 2 companies have the highest predicted stock value?"
        ans_a = $("option:selected").text();
        if(ans_a == "Home DepotIBM")  correct = true;
        if(ans_a == "IBMHome Depot")  correct = true;
      }

      if(question==8) {
        //"If you consider all 4 factor to be very bad (0%),
        //Which is the most profitable stock to invest?"
        ans_a = $("input[name=cities]:checked").val();
        if(ans_a == "apple")  correct = true
      }

      if(question==9) {
        //"You have very precise expectations, Consumer Trust at 39%, Worldwide News at 68%, Economic Growth at 38% and the Dow Jones Index at 62%.
        //The {select} stock is expected to gain more (procentually) than {...} but less than {...}."
        ans_a = $("option:selected").text();
        if(ans_a == "ChevronHome DepotApple")  correct = true
      }

      if(question==10) {
        //"Economic Growth and Consumer Trust are moderate (Both 50%),
        //What is the value for Dow Jones Index, when Chevron stock is $110.11?"
        var ans_a = Session.get("slider4");
        if(ans_a == 19)  correct = true;
        if(ans_a == 20)  correct = true;
        if(ans_a == 21)  correct = true;
      }

      if(question==11) {
        //"You expect the Economic Growth to be moderate (50%)
        //How does the Dow Jones index has to be, so that the growth of Apple is exactly the opposite of the growth of IBM?"
        var ans_a = Session.get("slider4");
        if(ans_a == 77)  correct = true;
        if(ans_a == 78)  correct = true;
        if(ans_a == 79)  correct = true;
      }

      if(question==12) {
        //If you discard all other indicators,
        //the difference between very bad (0%) and very good (100%) Worldwide News has the strongest effect on {select}.
        var ans_a = $("input[name=cities]:checked").val();
        if(ans_a == "home depot") correct = true;
      }

      $("input:radio").removeAttr("checked");
      $("input:checkbox").removeAttr("checked");
      $('select').val('')
      //console.log({
      Answers.insert({
        userid:    Session.get("ssid"),
        timestart: Session.get("qstart"),
        timeend:   timeend,
        timespent: timeend - Session.get("qstart"),
        slider1_click: slider1_click,
        slider2_click: slider2_click,
        slider3_click: slider3_click,
        slider4_click: slider4_click,
        slider1_slide: slider1_slide,
        slider2_slide: slider2_slide,
        slider3_slide: slider3_slide,
        slider4_slide: slider4_slide,
        golden1: gold1,
        golden2: gold2,
        golden3: gold3,
        golden4: gold4,
        actions:  actions,
        question: question,
        correct:  correct,
        answer:   ans_a,
        viz:      Session.get("option"),
        slider1:  Session.get("slider1-on"),
        slider2:  Session.get("slider2-on"),
        slider3:  Session.get("slider3-on"),
        slider4:  Session.get("slider4-on")
      });
      $(".big-thanks").fadeIn();

    } else {
      var current  = Number(Session.get("qnumber"));
      var question = Session.get("order")[current];
      var timeend = Date.now();
      var weather = Math.round(Session.get("slider1"));
      var safety  = Math.round(Session.get("slider2"));
      var traffic = Math.round(Session.get("slider3"));
      var air     = Math.round(Session.get("slider4"));
      var gold1 = Session.get("gold1");
      var gold2 = Session.get("gold2");
      var gold3 = Session.get("gold3");
      var gold4 = Session.get("gold4");
      var slider1_click = Session.get("slider1-click",0);
      var slider2_click = Session.get("slider2-click",0);
      var slider3_click = Session.get("slider3-click",0);
      var slider4_click = Session.get("slider4-click",0);
      var slider1_slide = Session.get("slider1-slide",0);
      var slider2_slide = Session.get("slider2-slide",0);
      var slider3_slide = Session.get("slider3-slide",0);
      var slider4_slide = Session.get("slider4-slide",0);
      var actions = slider1_click + slider2_click + slider3_click + slider4_click + slider1_slide + slider2_slide + slider3_slide + slider4_slide;
      var correct = false;
      var ans_a = "";

      if(weather == 0) weather = "0"; if(safety == 0) safety = "0";
      if(traffic == 0) traffic = "0"; if(air    == 0) air    = "0";

      if(!Session.get("slider1-on")) weather = false;
      if(!Session.get("slider2-on")) safety  = false;
      if(!Session.get("slider3-on")) traffic = false;
      if(!Session.get("slider4-on")) air     = false;

      if(question==1) {
        //"Consumer trust is moderate (50%) and Economic Growth is very good (100%),
        //Which stock loses more than any other?"
        ans_a = $("input[name=cities]:checked").val();
        if(ans_a == "ibm")  correct = true;
      }

      if(question==2) {
        //"You expect a very good Consumer Trust (100%) and a very bad Dow Jones Index (0%),
        //- McDonald's loses more than {select}
        ans_a = $("input[name=cities]:checked").val();
        if(ans_a == "disney")  correct = true;
      }

      if(question==3) {
        //"You expect IBM's stock to be exactly $127.91 and you only consider one factor.
        //Which factor needs to be very good (100%) to confirm your expectation?"
        ans_a = $("input[name=factors]:checked").val();
        if(ans_a == "dow jones index")  correct = true;
      }

      if(question==4) {
        //"Consumer Trust is moderately bad (25%), Economic Growth and the Dow Jones Index are moderately good (75%).
        //What is the value for the Worldwide News, when Home Depot's stock is $129.99?"
        ans_a = Session.get("slider2");
        if(ans_a == 65)  correct = true;
        if(ans_a == 64)  correct = true;
        if(ans_a == 66)  correct = true;
      }

      if(question==5) {
        //"If you consider all 4 factors to be moderately good (75%)
        //Which stocks are expected to grow more than 5%?"
        ans_a = $("option:selected").text();
        if(ans_a == "ChevronApple")  correct = true;
        if(ans_a == "AppleChevron")  correct = true;
      }

      if(question==6) {
        //"If you consider all 4 factors to be moderate (50%).
        //Which company has the least certain stock price value?"
        ans_a = "apple";
        if(ans_a = "apple")  correct = true;
      }

      if(question==7) {
        //"Worldwide News are very good (100%),
        //Which 2 companies have the highest predicted stock value?"
        ans_a = $("option:selected").text();
        if(ans_a == "Home DepotIBM")  correct = true;
        if(ans_a == "IBMHome Depot")  correct = true;
      }

      if(question==8) {
        //"If you consider all 4 factor to be very bad (0%),
        //Which is the most profitable stock to invest?"
        ans_a = $("input[name=cities]:checked").val();
        if(ans_a == "apple")  correct = true
      }

      if(question==9) {
        //"You have very precise expectations, Consumer Trust at 39%, Worldwide News at 68%, Economic Growth at 38% and the Dow Jones Index at 62%.
        //The {select} stock is expected to gain more (procentually) than {...} but less than {...}."
        ans_a = $("option:selected").text();
        if(ans_a == "ChevronHome DepotApple")  correct = true
      }

      if(question==10) {
        //"Economic Growth and Consumer Trust are moderate (Both 50%),
        //What is the value for Dow Jones Index, when Chevron stock is $110.11?"
        var ans_a = Session.get("slider4");
        if(ans_a == 19)  correct = true;
        if(ans_a == 20)  correct = true;
        if(ans_a == 21)  correct = true;
      }

      if(question==11) {
        //"You expect the Economic Growth to be moderate (50%)
        //How does the Dow Jones index has to be, so that the growth of Apple is exactly the opposite of the growth of IBM?"
        var ans_a = Session.get("slider4");
        if(ans_a == 77)  correct = true;
        if(ans_a == 78)  correct = true;
        if(ans_a == 79)  correct = true;
      }

      if(question==12) {
        //If you discard all other indicators,
        //the difference between very bad (0%) and very good (100%) Worldwide News has the strongest effect on {select}.
        var ans_a = $("input[name=cities]:checked").val();
        if(ans_a == "home depot") correct = true;
      }

      $("input:radio").removeAttr("checked");
      $("input:checkbox").removeAttr("checked");
      $('select').val('')
      //console.log({
      Answers.insert({
        userid:    Session.get("ssid"),
        timestart: Session.get("qstart"),
        timeend:   timeend,
        timespent: timeend - Session.get("qstart"),
        slider1_click: slider1_click,
        slider2_click: slider2_click,
        slider3_click: slider3_click,
        slider4_click: slider4_click,
        slider1_slide: slider1_slide,
        slider2_slide: slider2_slide,
        slider3_slide: slider3_slide,
        slider4_slide: slider4_slide,
        golden1: gold1,
        golden2: gold2,
        golden3: gold3,
        golden4: gold4,
        actions:  actions,
        question: question,
        correct:  correct,
        answer:   ans_a,
        viz:      Session.get("option"),
        slider1:  Session.get("slider1-on"),
        slider2:  Session.get("slider2-on"),
        slider3:  Session.get("slider3-on"),
        slider4:  Session.get("slider4-on")
      });

      Session.set("slider1-click",0);
      Session.set("slider2-click",0);
      Session.set("slider3-click",0);
      Session.set("slider4-click",0);
      Session.set("slider1-slide",0);
      Session.set("slider2-slide",0);
      Session.set("slider3-slide",0);
      Session.set("slider4-slide",0);

      // Reset the sidebar...
      Session.set("slider1",100);
      Session.set("slider2",100);
      Session.set("slider3",100);
      Session.set("slider4",100);

      Session.set("slider1-on",false);
      Session.set("slider2-on",false);
      Session.set("slider3-on",false);
      Session.set("slider4-on",false);

      // Clear the sidebar
      $(".content-left").empty();
      $(".visualisations").empty();
      $(".start-question").fadeIn();
      // Hide answers from questionnare
      // Go to next question..
      $(".question-"+question).fadeOut(function(){
        if(current == 5) {
          $(".question-answers").css("visibility","hidden");
          $(".question-buttons").css("visibility","hidden");
          $(".question-5-1").fadeIn();
          $(".start-question-container").fadeIn( function() {
            $(".start-question").fadeIn();
          });
        } else if(current == 7) {
          $(".question-answers").css("visibility","hidden");
          $(".question-buttons").css("visibility","hidden");
          $(".question-7-1").fadeIn();
          $(".start-question-container").fadeIn( function() {
            $(".start-question").fadeIn();
          });
        } else if(current == 9) {
          $(".question-answers").css("visibility","hidden");
          $(".question-buttons").css("visibility","hidden");
          $(".question-9-1").fadeIn();
          $(".start-question-container").fadeIn( function() {
            $(".start-question").fadeIn();
          });
        } else if(current == 11) {
          $(".question-answers").css("visibility","hidden");
          $(".question-buttons").css("visibility","hidden");
          $(".question-11-1").fadeIn();
          $(".start-question-container").fadeIn( function() {
            $(".start-question").fadeIn();
          });
        } else {
          $(".question-answers").css("visibility","hidden");
          $(".question-buttons").css("visibility","hidden");
          Session.set("qnumber",current+1);
          $(".question-"+(Session.get("order")[current+1])).fadeIn();
          $(".start-question-container").fadeIn( function() {
            $(".start-question").fadeIn();
          });
        }
      });
    }
  },
  "click .start-question" (event,instance) {
    Session.set("qstart",Date.now());
    $(".start-question").fadeOut(function(){
      var option = Session.get("option");
      Blaze.render(Template.sidebar, $(".content-left")[0]);
      if(option == "series") Blaze.render(Template.timeseries, $(".visualisations")[0]);
      if(option ==  "chart") Blaze.render(Template.regression, $(".visualisations")[0]);
      if(option ==   "dots") Blaze.render(Template.dots, $(".visualisations")[0]);
      $(".answers").fadeIn();
    });
  },
  "click .big-finish" (event, instance) {
  },
  "click .fd-next" (event, instance) {
    var a = $("input[name=difficulty]:checked").val();
    $(".feedback-difficulty").fadeOut(function(){
      Session.set("feedback-difficulty",a);
      $(".feedback-preference").fadeIn();
    });
  }
});


Template.question.rendered = function () {
  var self = this;
  this.$("#question-slider1").noUiSlider({
    start: 100,
    step: 1,
    connect: "lower",
    range: {'min': 0, 'max': 100}
  }).on('slide', function (ev, val) {
    Session.set("gold1",Number(val));
  }).on('set', function(){
    self.$(".question-buttons").css("visibility","visible");
  });

  this.$("#question-slider2").noUiSlider({
    start: 100,
    step: 1,
    connect: "lower",
    range: {'min': 0, 'max': 100}
  }).on('slide', function (ev, val) {
    Session.set("gold2",Number(val));
  }).on('set', function(){
    self.$(".question-buttons").css("visibility","visible");
  });

  this.$("#question-slider3").noUiSlider({
    start: 100,
    step: 1,
    connect: "lower",
    tooltips: true,
    range: {'min': 0, 'max': 100}
  }).on('slide', function (ev, val) {
    Session.set("gold3",Number(val));
  }).on('set', function(){
    self.$(".question-buttons").css("visibility","visible");
  });

  this.$("#question-slider4").noUiSlider({
    start: 100,
    step: 1,
    connect: "lower",
    tooltips: true,
    range: {'min': 0, 'max': 100}
  }).on('slide', function (ev, val) {
    Session.set("gold4",Number(val));
  }).on('set', function(){
    self.$(".question-buttons").css("visibility","visible");
  });
};
