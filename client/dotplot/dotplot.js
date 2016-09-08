Template.dotplot.onCreated(function(){
  var r = Template.instance().data['name'];
  this.stock = new ReactiveVar(Stocks.findOne({"name":r}));
});


Template.dotplot.helpers({
  stock() {
    var color = "green";
    var arrow = "up";
    if(this.diff < 0){ color = "red"; arrow = "down"; }
    return {name: this.name, title: this.title, close: this.close,  diff: this.diff, percent: this.prcnt, color: color, arrow:arrow};
  },
  avg() {
    return Math.round(Session.get("avg"));
  },
  prediction() {
    var stock = Template.instance().stock.get();
    var sum_c = [];
    var sum_b = [];
    var sum_x = [];
    var sum_y = [];
    var show  = false;
    var n = 0;
    var v = 0;
    var advice = 0;

    var sum_upr1 = [];
    var sum_upr2 = [];
    var sum_lwr1 = [];
    var sum_lwr2 = [];

    var c = Session.get("avg")/100;

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

    var q1 = (stock.max).toFixed(2);
    var q2 = (stock.max*0.75).toFixed(2);
    var q3 = (stock.max/2).toFixed(2);
    var q4 = (stock.max*0.25).toFixed(2);
    var q5 = 0;

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

    m1 = m1/n;
    m2 = m2/n;

    var fit_upr = (m2 * 1) + m1;
    var fit_lwr = m1;

    y = (m2 * c) + m1;
    v = (200 * y).toFixed(2);

    if(y < 0) y = 0;
    if(c < 0) c = 0;
    if(v < 0) v = 0;
    if(y > 100) y = 100;
    if(c > 100) c = 100

  return {
    a1: (fit_upr*200)-14,
    a2: (y*200)-14,
    a3: (y*200)-14,
    a4: (y*200)-14,
    a5: (y*200)-14,
    a6: (y*200)-14, // This is correct!
    a7: (y*200)-14,
    a8: (y*200)-14,
    a9: (y*200)-14,
    a10:(y*200)-14,
    a11:(fit_lwr*200)-14,
    text: v,
    p: 0,
    q1: q1,
    q2: q2,
    q3: q3,
    q4: q4,
    q5: q5,
    show: show
  }
  }
});
