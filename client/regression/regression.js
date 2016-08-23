Template.lifequality.onCreated(function(){
  var r = Template.instance().data['cityname'];
  this.my_city = new ReactiveVar(Stocks.findOne({"name":r}));
});

Template.lifequality.helpers({
  city() {
    var city = Template.instance().my_city.get();
    var name = this.cityname;
    if(name == "dis" ) name = "Disney";
    if(name == "msft") name = "Microsoft";
    if(name == "aapl") name = "Apple";
    if(name == "ko") name = "Coke";
    if(name == "ibm") name = "IBM";
    if(name == "nke") name = "Nike";
    return name;
  },
  pred() {
    var city = Template.instance().my_city.get();
    var x = 0;
    var y = 0;
    var c = Session.get("avg");
    var upr1 = 0;
    var upr2 = 0;
    var lwr1 = 0;
    var lwr2 = 0;

    return {
      value: Math.round((((y * c) + x)*10)),
        y: 100-(((y * c) + x)*10),
      upr: 150-(((y*100)+x)*150)/10,
      lwr: 150-((x*150)/10),
      upr1: 150-(upr1*150)/10,
      upr2: 150-(upr2*150)/10,
      lwr1: 150-(lwr1*150)/10,
      lwr2: 150-(lwr2*150)/10,
      c: c,
      /*
      ra1: 0   + 150-((x*150)/10),      ra2:  0  + 150-(((y*100)+x)*150)/10,
       a1: r_lwr1   + 150-((x*150)/10),  a2: r_lwr2  + 150-(((y*100)+x)*150)/10,
      rb1: r_lwr1   + 150-((x*150)/10), rb2: r_lwr2  + 150-(((y*100)+x)*150)/10,
       b1: r_lwr1*2 + 150-((x*150)/10),  b2: r_lwr2*2 + 150-(((y*100)+x)*150)/10,
      rc1: r_lwr1*2 + 150-((x*150)/10), rc2: r_lwr2*2 + 150-(((y*100)+x)*150)/10,
       c1: r_lwr1*3 + 150-((x*150)/10),  c2: r_lwr2*3 + 150-(((y*100)+x)*150)/10,
      rd1: r_lwr1*3 + 150-((x*150)/10), rd2: r_lwr2*3 + 150-(((y*100)+x)*150)/10,
       d1: r_lwr1*4 + 150-((x*150)/10),  d2: r_lwr2*4 + 150-(((y*100)+x)*150)/10,
      re1: r_lwr1*4 + 150-((x*150)/10), re2: r_lwr2*4 + 150-(((y*100)+x)*150)/10,
       e1: r_lwr1*5 + 150-((x*150)/10),  e2: r_lwr2*5 + 150-(((y*100)+x)*150)/10,

      // Second area
      raa1: (150-((x*150)/10)) - 0,        raa2: (150-(((y*100)+x)*150)/10) - 0,
       aa1: (150-((x*150)/10)) - r_upr1,    aa2: (150-(((y*100)+x)*150)/10) - r_upr2,
      rbb1: (150-((x*150)/10)) - r_upr1,   rbb2: (150-(((y*100)+x)*150)/10) - r_upr2,
       bb1: (150-((x*150)/10)) - r_upr1*2,  bb2: (150-(((y*100)+x)*150)/10) - r_upr2*2,
      rcc1: (150-((x*150)/10)) - r_upr1*2, rcc2: (150-(((y*100)+x)*150)/10) - r_upr2*2,
       cc1: (150-((x*150)/10)) - r_upr1*3,  cc2: (150-(((y*100)+x)*150)/10) - r_upr2*3,
      rdd1: (150-((x*150)/10)) - r_upr1*3, rdd2: (150-(((y*100)+x)*150)/10) - r_upr2*3,
       dd1: (150-((x*150)/10)) - r_upr1*4,  dd2: (150-(((y*100)+x)*150)/10) - r_upr2*4,
      ree1: (150-((x*150)/10)) - r_upr1*4, ree2: (150-(((y*100)+x)*150)/10) - r_upr2*4,
       ee1: (150-((x*150)/10)) - r_upr1*5,  ee2: (150-(((y*100)+x)*150)/10) - r_upr2*5
       */
    };
  },
  weather() {
    var h = parseInt(Session.get("strength-h"));
    var current = this.cityname;
    var title = "dummy.png";
    $('paper-checkbox[checked]').each(function() {
      var name = $(this).attr('class').split(' ')[0];
      if(name=="health") title = current+"_w.png";
    });
    return {name: title};
  },
  safety() {
    var s = parseInt(Session.get("strength-s"));
    var current = this.cityname;
    var title = "dummy.png";
    $('paper-checkbox[checked]').each(function() {
      var name = $(this).attr('class').split(' ')[0];
      if(name=="safety") title = current+"_s.png";
    });
    return {name: title};
  },
  traffic() {
    var t = parseInt(Session.get("strength-t"));
    var current = this.cityname;
    var title = "dummy.png";
    $('paper-checkbox[checked]').each(function() {
      var name = $(this).attr('class').split(' ')[0];
      if(name=="traffic") title = current+"_t.png";
    });
    return {name: title};
  },
  airqual() {
    var p = parseInt(Session.get("strength-p"));
    var current = this.cityname;
    var title = "dummy.png";
    $('paper-checkbox[checked]').each(function() {
      var name = $(this).attr('class').split(' ')[0];
      if(name=="polluted") title = current+"_a.png";
    });
    return {name: title};
  }
});
