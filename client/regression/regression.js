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
    var close = this.close;

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

    fit_upr = (m2 * 1) + m1;
    fit_lwr = m1;

    var fit_lwr_pixels = 150-(fit_lwr*150);
    var fit_upr_pixels = 150-(fit_upr*150);

    var r_lwr1 = (fit_lwr_pixels-lwr_min)/5;
    var r_lwr2 = (fit_upr_pixels-lwr_max)/5;

    var r_upr1 = (fit_lwr_pixels-upr_min)/5;
    var r_upr2 = (fit_upr_pixels-upr_max)/5;

    y = (m2 * c) + m1;
    v = (200 * y).toFixed(2);

    if(y < 0) y = 0;
    if(c < 0) c = 0;
    if(v < 0) v = 0;
    if(y > 100) y = 100;
    if(c > 1) c = 1;

    var difference = (v - close).toFixed(2);
    var positive = true;
    if(difference < 0) positive = false;
    return {
      value: v, // Actual predicted value;
      y: 100 - (y*100), // Uses percentages
      y2: (100 - (y*100))+8,
      upr:  fit_upr_pixels, // Frome here, everything uses pixels!
      lwr:  fit_lwr_pixels,
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
      positive: positive,
      diff: Math.abs(difference),
      show: show,
      ra1: fit_lwr_pixels,              ra2: fit_upr_pixels,
       a1: fit_lwr_pixels - r_upr2,      a2: fit_upr_pixels - r_upr1,
      rb1: fit_lwr_pixels - r_upr2,     rb2: fit_upr_pixels - r_upr1,
       b1: fit_lwr_pixels - (r_upr2*2),  b2: fit_upr_pixels - (r_upr1*2),
      rc1: fit_lwr_pixels - (r_upr2*2), rc2: fit_upr_pixels - (r_upr1*2),
       c1: fit_lwr_pixels - (r_upr2*3),  c2: fit_upr_pixels - (r_upr1*3),
      rd1: fit_lwr_pixels - (r_upr2*3), rd2: fit_upr_pixels - (r_upr1*3),
       d1: fit_lwr_pixels - (r_upr2*4),  d2: fit_upr_pixels - (r_upr1*4),
      re1: fit_lwr_pixels - (r_upr2*4), re2: fit_upr_pixels - (r_upr1*4),
       e1: fit_lwr_pixels - (r_upr2*5),  e2: fit_upr_pixels - (r_upr1*5),
      // // Second area
      raa1: fit_lwr_pixels,              raa2: fit_upr_pixels,
       aa1: fit_lwr_pixels - r_lwr2,      aa2: fit_upr_pixels - r_lwr1,
      rbb1: fit_lwr_pixels - r_lwr2,     rbb2: fit_upr_pixels - r_lwr1,
       bb1: fit_lwr_pixels - (r_lwr2*2),  bb2: fit_upr_pixels - (r_lwr2*2),
      rcc1: fit_lwr_pixels - (r_lwr2*2), rcc2: fit_upr_pixels - (r_lwr2*2),
       cc1: fit_lwr_pixels - (r_lwr2*3),  cc2: fit_upr_pixels - (r_lwr2*3),
      rdd1: fit_lwr_pixels - (r_lwr2*3), rdd2: fit_upr_pixels - (r_lwr2*3),
       dd1: fit_lwr_pixels - (r_lwr2*4),  dd2: fit_upr_pixels - (r_lwr2*4),
      ree1: fit_lwr_pixels - (r_lwr2*4), ree2: fit_upr_pixels - (r_lwr2*4),
       ee1: fit_lwr_pixels - (r_lwr2*5),  ee2: fit_upr_pixels - (r_lwr2*5)
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
