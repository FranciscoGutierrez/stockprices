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
    var c = Session.get("avg")/100;
    var n = 0;
    var upr1 = 0;
    var upr2 = 0;
    var lwr1 = 0;
    var lwr2 = 0;
    var show = false;

    // Get the prediction given the current value of each slider...
    var advice = 0;
    var news   = 0;
    var media  = 0;
    var index  = 0;

    var lwr_max = 0;
    var lwr_min = 0;
    var upr_max = 0;
    var upr_min = 0;

    var fit_lwr = 0;
    var fit_upr = 0;

    var m1 = 0;
    var m2 = 0;

    if(Session.get("slider1-on")) {
      m1 += stock.a_m1;
      m2 += stock.a_m2;
      lwr_max += stock.a_lwr_max;
      lwr_min += stock.a_lwr_min;
      upr_max += stock.a_upr_max;
      upr_min += stock.a_upr_min;
      fit_lwr += stock.a_fit_max;
      fit_upr += stock.a_fit_min;
      n = n+1;
      show = true;
    }
    if(Session.get("slider2-on")){
      m1 += stock.n_m1;
      m2 += stock.n_m2;
      lwr_max += stock.n_lwr_max;
      lwr_min += stock.n_lwr_min;
      upr_max += stock.n_upr_max;
      upr_min += stock.n_upr_min;
      fit_lwr += stock.n_fit_max;
      fit_upr += stock.n_fit_min;
      n = n+1;
      show = true;
    }
    if(Session.get("slider3-on")){
      m1 += stock.m_m1;
      m2 += stock.m_m2;
      lwr_max += stock.m_lwr_max;
      lwr_min += stock.m_lwr_min;
      upr_max += stock.m_upr_max;
      upr_min += stock.m_upr_min;
      fit_lwr += stock.m_fit_max;
      fit_upr += stock.m_fit_min;
      n = n+1;
      show = true;
    }
    if(Session.get("slider4-on")){
      m1 += stock.i_m1;
      m2 += stock.i_m2;
      lwr_max += stock.i_lwr_max;
      lwr_min += stock.i_lwr_min;
      upr_max += stock.i_upr_max;
      upr_min += stock.i_upr_min;
      fit_lwr += stock.i_fit_max;
      fit_upr += stock.i_fit_min;
      n = n+1;
      show = true;
    }

    var q1 = (stock.max).toFixed(2);
    var q2 = (stock.max*0.75).toFixed(2);
    var q3 = (stock.max/2).toFixed(2);
    var q4 = (stock.max*0.25).toFixed(2);
    var q5 = 0;

    lwr_max = 150-((lwr_max/n)*150);
    lwr_min = 150-((lwr_min/n)*150);
    upr_max = 150-((upr_max/n)*150);
    upr_min = 150-((upr_min/n)*150);

    m1 = m1/n;
    m2 = m2/n;

    fit_upr = m1;
    fit_lwr = (m2 * 1) + m1;

    var r_lwr1 = lwr_min/5;
    var r_lwr2 = lwr_max/5;
    var r_upr1 = upr_min/5;
    var r_upr2 = upr_max/5;

    y = (m2 * c) + m1;
    v = (stock.max * y).toFixed(2);

    if(y < 0) y = 0;
    if(c < 0) c = 0;
    if(v < 0) v = 0;
    if(y > 100) y = 100;
    if(c > 1) c = 1;

    return {
      value: v, // Actual predicted value;
      y: 100 - (y*100), // Uses percentages
      upr:  150 - (fit_upr*150), // Frome here, everything uses pixels!
      lwr:  150 - (fit_lwr*150),
      upr1: upr_min,
      upr2: upr_max,
      lwr1: lwr_min,
      lwr2: lwr_max,
      c: c*100,
      q1: q1,
      q2: q2,
      q3: q3,
      q4: q4,
      q5: q5,
      show: show
      //
      // ra1: 0 + 150-((x*150)),        ra2: 0 + 150-(((y*100)+x)*150),
      // a1:  r_lwr1   + 150-((x*150)),  a2: r_lwr2  + 150-(((y*100)+x)*150),
      // rb1: r_lwr1   + 150-((x*150)), rb2: r_lwr2  + 150-(((y*100)+x)*150),
      // b1:  r_lwr1*2 + 150-((x*150)),  b2: r_lwr2*2 + 150-(((y*100)+x)*150),
      // rc1: r_lwr1*2 + 150-((x*150)), rc2: r_lwr2*2 + 150-(((y*100)+x)*150),
      // c1:  r_lwr1*3 + 150-((x*150)),  c2: r_lwr2*3 + 150-(((y*100)+x)*150),
      // rd1: r_lwr1*3 + 150-((x*150)), rd2: r_lwr2*3 + 150-(((y*100)+x)*150),
      // d1:  r_lwr1*4 + 150-((x*150)),  d2: r_lwr2*4 + 150-(((y*100)+x)*150),
      // re1: r_lwr1*4 + 150-((x*150)), re2: r_lwr2*4 + 150-(((y*100)+x)*150),
      // e1:  r_lwr1*5 + 150-((x*150)),  e2: r_lwr2*5 + 150-(((y*100)+x)*150),
      //
      // // Second area
      // raa1: (150-((x*150))) - 0,        raa2: (150-(((y*100)+x)*150)) - 0,
      // aa1:  (150-((x*150))) - r_upr1,    aa2: (150-(((y*100)+x)*150)) - r_upr2,
      // rbb1: (150-((x*150))) - r_upr1,   rbb2: (150-(((y*100)+x)*150)) - r_upr2,
      // bb1:  (150-((x*150))) - r_upr1*2,  bb2: (150-(((y*100)+x)*150)) - r_upr2*2,
      // rcc1: (150-((x*150))) - r_upr1*2, rcc2: (150-(((y*100)+x)*150)) - r_upr2*2,
      // cc1:  (150-((x*150))) - r_upr1*3,  cc2: (150-(((y*100)+x)*150)) - r_upr2*3,
      // rdd1: (150-((x*150))) - r_upr1*3, rdd2: (150-(((y*100)+x)*150)) - r_upr2*3,
      // dd1:  (150-((x*150))) - r_upr1*4,  dd2: (150-(((y*100)+x)*150)) - r_upr2*4,
      // ree1: (150-((x*150))) - r_upr1*4, ree2: (150-(((y*100)+x)*150)) - r_upr2*4,
      // ee1:  (150-((x*150))) - r_upr1*5,  ee2: (150-(((y*100)+x)*150)) - r_upr2*5
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
