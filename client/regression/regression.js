Template.lifequality.onCreated(function(){
  var r = Template.instance().data['name'];
  this.my_stock = new ReactiveVar(Stocks.findOne({"name":r}));
});

Template.lifequality.helpers({
  stock() {
    var color = "green";
    var arrow = "up";
    if(this.diff < 0){ color = "red"; arrow = "down"; }
    return {name: this.name, title: this.title, close: this.close,  diff: this.diff, percent: this.prcnt, color: color, arrow:arrow};
  },
  pred() {
    var stock = Template.instance().my_stock.get();
    var x = 0;
    var y = 0;
    var v = 0;
    var c = Session.get("avg");
    var n = 0;
    var upr1 = 0;
    var upr2 = 0;
    var lwr1 = 0;
    var lwr2 = 0;
    var show = false;
    // Get the value of each slider and adjust it to decimals.
    var sldr1 = Session.get("slider1")/100;
    var sldr2 = Session.get("slider2")/100;
    var sldr3 = Session.get("slider3")/100;
    var sldr4 = Session.get("slider4")/100;
    // Get the prediction given the current value of each slider...
    var advice = 0;
    var news   = 0;
    var media  = 0;
    var index  = 0;

    if(Session.get("slider1-on")) {
      advice = (stock.a_m1 * sldr1) + stock.a_m2;
      n = n+1;
      show = true;
    }
    if(Session.get("slider2-on")){
      news = (stock.n_m1 * sldr2) + stock.n_m2;
      n = n+1;
      show = true;
    }
    if(Session.get("slider3-on")){
      media = (stock.m_m1 * sldr3) + stock.m_m2;
      n = n+1;
      show = true;
    }
    if(Session.get("slider4-on")){
      index = (stock.i_m1 * sldr4) + stock.i_m2;
      n = n+1;
      show = true;
    }

    var q1 = (stock.max).toFixed(2);
    var q2 = (stock.max*0.75).toFixed(2);
    var q3 = (stock.max/2).toFixed(2);
    var q4 = (stock.max*0.25).toFixed(2);
    var q5 = 0;
    console.log(stock.max)
    y = 100 - (((advice + news + media + index)/n)*100);
    v = (stock.max * (1 - (y/100))).toFixed(2);

    if(y < 0) y = 0;
    if(c < 0) c = 0;
    if(v < 0) v = 0;
    if(y > 100) y = 100;
    if(c > 100) c = 100;
    
    return {
      value: v, // Actual predicted value;
      y: y, // Uses percentages
      upr:  150-(((y*100)+x)*150)/10, // Frome here, everything uses pixels!
      lwr:  150-((x*150)/10),
      upr1: 150-(upr1*150)/10,
      upr2: 150-(upr2*150)/10,
      lwr1: 150-(lwr1*150)/10,
      lwr2: 150-(lwr2*150)/10,
      c: c,
      q1: q1,
      q2: q2,
      q3: q3,
      q4: q4,
      q5: q5,
      show: show,
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
  advice() {
    var current = this.name;
    var title = "dummy.png";
    if(Session.get("slider1-on")) title = current + "_a.png";
    return {name: title};
  },
  news() {
    var current = this.name;
    var title = "dummy.png";
    if(Session.get("slider2-on")) title = current + "_n.png";
    return {name: title};
  },
  media() {
    var current = this.name;
    var title = "dummy.png";
    if(Session.get("slider3-on")) title = current + "_m.png";
    return {name: title};
  },
  index() {
    var current = this.name;
    var title = "dummy.png";
    if(Session.get("slider4-on")) title = current + "_i.png";
    return {name: title};
  }
});
