Template.welcome.helpers({
  option() {
    var option = Session.get("option");
    var map   = false;
    var dots  = false;
    var chart = false;

    if(option == "map")   map   = true;
    if(option == "dots")  dots  = true;
    if(option == "chart") chart = true;

    return {chart: chart, dots: dots, map: map};
  },
  simpleslider() {
    var val = 100;
    val = Number(Session.get("slider1"));
    if(val<5) { $(".slider-zero").css("visibility","hidden");  } else { $(".slider-zero").css("visibility","visible"); }
    if(val>95){ $(".slider-hound").css("visibility","hidden"); } else { $(".slider-hound").css("visibility","visible"); }
    return {a: Math.round(val), x: val-3};
  },
  doubleslider() {
    var val1 = 20;
    var val2 = 80;
    val1 = Number(Session.get("slider1"));
    val2 = Number(Session.get("slider2"));
    if(val1<5) { $(".slider-zero").css("visibility","hidden");  } else { $(".slider-zero").css("visibility","visible");  }
    if(val2>95){ $(".slider-hound").css("visibility","hidden"); } else { $(".slider-hound").css("visibility","visible"); }
    return {a: Math.round(val1), b: Math.round(val2), x: val1-2, y: val2-2};
  },
  qone(){
    var show   = false;
    var tcolor = "#A1A1A1";
    if(Number(Session.get("slider1")) == 44) show = true;
    if(show) tcolor =  "#27ae60";
    return {display: show, color: tcolor};
  },
  qtwo(){
    var show   = false;
    var tcolor = "#A1A1A1";
    if(Number(Session.get("slider1")) == 89) show = true;
    if(show) tcolor =  "#27ae60";
    return {display: show, color: tcolor};
  },
  qthree(){
    var show1 = false;
    var show2 = false;
    var c1 = "#A1A1A1";
    var c2 = "#A1A1A1";
    if(Number(Session.get("slider1")) == 25) show1 = true;
    if(Number(Session.get("slider2")) == 75) show2 = true;
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
    $(".wd-3").fadeOut(function(){
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
    $(".test-1").fadeOut(function(){
      Session.set("slider1",100);
      Session.set("slider2",100);
      $(".test-2").fadeIn();
    });
  },
  "click .wb-next-5-3" (event, instance) {
    $(".test-2").fadeOut(function(){
      Session.set("slider1",20);
      Session.set("slider2",80);
      $(".test-3").fadeIn();
    });
  },
  "click .wb-next-end" (event, instance) {
    Session.set("username",$(".welcome-input").val());
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
    start: 100,
    step: 1,
    connect: "lower",
    range: { 'min': 0, 'max': 100 }
  }).on('slide', function (ev, val) {
    Session.set("slider1",Number(val));
  });

  $("#test-slider2").noUiSlider({
    start: 100,
    step: 1,
    connect: "lower",
    range: { 'min': 0, 'max': 100 }
  }).on('slide', function (ev, val) {
    Session.set("slider1",Number(val));
  });

  $("#test-slider3").noUiSlider({
    start: [20,80],
    animate: true,
    step: 1,
    tooltips: true,
    connect:  true,
    range: {'min': 0, 'max': 100}
  }).on('slide', function (ev, val) {
    Session.set("slider1",Number(val[0]));
    Session.set("slider2",Number(val[1]));
  });

};
