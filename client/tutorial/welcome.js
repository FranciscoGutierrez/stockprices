
Template.welcome.helpers({
  option() {
    var option = Session.get("option");
    var map   = false;
    var dots  = false;
    var chart = false;

    if(option == "series") map   = true;
    if(option == "dots")   dots  = true;
    if(option == "chart")  chart = true;

    return {chart: chart, dots: dots, map: map};
  },
  simpleslider() {
    var val = 100;
    val = Number(Session.get("test1"));
    if(val<15) { $(".slider-zero").css("visibility","hidden");  } else { $(".slider-zero").css("visibility","visible"); }
    if(val>180){ $(".slider-hound").css("visibility","hidden"); } else { $(".slider-hound").css("visibility","visible"); }
    return {a: Math.round(val), x: (val-8)/2};
  },
  doubleslider() {
    var val1 = 0;
    var val2 = 200;
    val1 = Number(Session.get("test1"));
    val2 = Number(Session.get("test2"));
    if(val1<15) { $(".slider-zero").css("visibility","hidden");  } else { $(".slider-zero").css("visibility","visible");  }
    if(val2>180){ $(".slider-hound").css("visibility","hidden"); } else { $(".slider-hound").css("visibility","visible"); }
    return {a: Math.round(val1), b: Math.round(val2), x: (val1-8)/2, y: (val2-8)/2};
  },
  qone(){
    var show   = false;
    var tcolor = "#A1A1A1";
    if(Number(Session.get("test1")) == 131) show = true;
    if(show) tcolor =  "#27ae60";
    return {display: show, color: tcolor};
  },
  qtwo(){
    var show   = false;
    var tcolor = "#A1A1A1";
    if(Number(Session.get("test1")) == 89) show = true;
    if(show) tcolor =  "#27ae60";
    return {display: show, color: tcolor};
  },
  qthree(){
    var show1 = false;
    var show2 = false;
    var c1 = "#A1A1A1";
    var c2 = "#A1A1A1";
    if(Number(Session.get("test1")) == 75)  show1 = true;
    if(Number(Session.get("test2")) == 150) show2 = true;
    if(show1) c1 =  "#27ae60";
    if(show2) c2 =  "#27ae60";
    return {display: show1*show2, color1: c1, color2: c2};
  }
});

Template.welcome.events({
  "click .rb-high" (event, instance) {
    $(".tutorial-map-two").fadeIn();
  },
  "click .rb-medium, click .rb-low" (event, instance) {
    $(".tutorial-map-two").fadeOut();
  },
  'click .wb-ok'  (event, instance) {
    $(".welcome-screen").fadeOut(function(){
      $(this).remove();
    });
  },
  "click .wb-next-0" (event, instance) {
    $(".wd-0").fadeOut(function(){
      $(".wd-1").fadeIn(function(){
        $(".wb-next-1").fadeIn();
      });
    });
  },
  "click .wb-next-1" (event, instance) {
    $(".wd-1").fadeOut(function(){
      $(".wd-2").fadeIn(function(){
        $(".wb-next-2").fadeIn();
      });
    });
  },
  "click .wb-next-2" (event, instance) {
    $(".wd-2").fadeOut(function(){
      $(".wd-3").fadeIn(function(){
        $(".wb-next-3").fadeIn();
      });
    });
  },
  "click .wb-next-3" (event, instance) {
    $(".wd-3").fadeOut(function(){ // Fixing this for Stock prices version
      $(".wd-4").fadeIn(function(){
        $(".wb-next-4").fadeIn();
      });
    });
  },
  "click .wb-next-4" (event, instance) {
    $(".wd-4").fadeOut(function(){
      $(".welcome-h1").text("Now a short test!");
      $(".wd-5").fadeIn(function(){
        // $(".wb-next-5").fadeIn();
      });
    });
  },
  "click .wb-next-5" (event, instance) {
    $(".wd-5").fadeOut(function(){
      $(".welcome-h1").text("That's it!");
      $(".wd-end").fadeIn(function(){
        $(".wb-next-end").fadeIn();
      });
    });
  },
  "click .wb-next-5-2" (event, instance) {
    $(".test-1").fadeOut(function(){ //nOT USED...
      Session.set("test1",100);
      Session.set("test2",100);
      $(".test-2").fadeIn();
    });
  },
  "click .wb-next-5-3" (event, instance) {
    $(".test-1").fadeOut(function(){ //Fixed for stockprices
      Session.set("test1",0);
      Session.set("test2",200);
      $(".test-3").fadeIn();
    });
  },
  "click .wb-next-end" (event, instance) {
    $(".welcome-screen").fadeOut(function(){
      $(this).remove();
      Session.set("qnumber",0);
    });
  },
  "click .skip-tutorial" (event, instance) {
    $(".welcome-screen").fadeOut(function(){
      $(this).remove();
    });
  }
});

Template.welcome.rendered = function () {

  $("#test-slider1").noUiSlider({
    start: 200,
    step: 1,
    connect: "lower",
    range: { 'min': 0, 'max': 200 }
  }).on('slide', function (ev, val) {
    Session.set("test1",Number(val));
  });

  $("#test-slider3").noUiSlider({
    start: [0,200],
    animate: true,
    step: 1,
    tooltips: true,
    connect:  true,
    range: {'min': 0, 'max': 200}
  }).on('slide', function (ev, val) {
    Session.set("test1",Number(val[0]));
    Session.set("test2",Number(val[1]));
  });

};
