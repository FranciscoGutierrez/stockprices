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

    var sldr1 = Session.get("slider1")/100;
    var sldr2 = Session.get("slider2")/100;
    var sldr3 = Session.get("slider3")/100;
    var sldr4 = Session.get("slider4")/100;

    var advice = 0;
    var news   = 0;
    var media  = 0;
    var index  = 0;

    var q1 = (stock.max).toFixed(2);
    var q2 = (stock.max*0.75).toFixed(2);
    var q3 = (stock.max/2).toFixed(2);
    var q4 = (stock.max*0.25).toFixed(2);
    var q5 = 0;

    if(Session.get("slider1-on")) {
      advice = (stock.a_m1 * sldr1) + stock.a_m2;
      n = n+1;
      show = true;
    }
    if(Session.get("slider2-on")) {
      news = (stock.n_m1 * sldr2) + stock.n_m2;
      n = n+1;
      show = true;
    }
    if(Session.get("slider3-on")) {
      media = (stock.m_m1 * sldr3) + stock.m_m2;
      n = n+1;
      show = true;
    }
    if(Session.get("slider4-on")) {
      index = (stock.i_m1 * sldr4) + stock.i_m2;
      n = n+1;
      show = true;
    }

    y = 100 - (((advice + news + media + index)/n)*100);
    v = (200 * (1 - (y/100))).toFixed(2);

    if(y < 0) y = 0;
    if(c < 0) c = 0;
    if(v < 0) v = 0;
    if(y > 100) y = 100;
    if(c > 100) c = 100

  return {
    a1: (200-(y*1.0))-14,
    a2: (200-(y*1.2))-14,
    a3: (200-(y*1.4))-14,
    a4: (200-(y*1.6))-14,
    a5: (200-(y*1.8))-14,
    a6: (200-(y*2))-14, // This is correct!
    a7: (200-(y*2.2))-14,
    a8: (200-(y*2.4))-14,
    a9: (200-(y*2.6))-14,
    a10:(200-(y*2.8))-14,
    a11:(200-(y*3.0))-14,
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
