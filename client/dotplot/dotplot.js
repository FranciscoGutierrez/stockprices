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
    v = (stock.max * (1 - (y/100))).toFixed(2);

    /*
    if($(".health").attr("checked")) {
      sum_c.push(weather);
      sum_b.push(r_w);
      sum_x.push(stock.w_m1);
      sum_y.push(stock.w_m2);
      sum_upr1.push(stock.w_upr_min);
      sum_upr2.push(stock.w_upr_max);
      sum_lwr1.push(stock.w_lwr_min);
      sum_lwr2.push(stock.w_lwr_max);
    }
    if($(".traffic").attr("checked")) {
      sum_c.push(traffic);
      sum_b.push(r_t);
      sum_x.push(stock.t_m1);
      sum_y.push(stock.t_m2);
      sum_upr1.push(stock.t_upr_min);
      sum_upr2.push(stock.t_upr_max);
      sum_lwr1.push(stock.t_lwr_min);
      sum_lwr2.push(stock.t_lwr_max);
    }
    if($(".safety").attr("checked")) {
      sum_c.push(safety);
      sum_b.push(r_s);
      sum_x.push(stock.s_m1);
      sum_y.push(stock.s_m2);
      sum_upr1.push(stock.s_upr_min);
      sum_upr2.push(stock.s_upr_max);
      sum_lwr1.push(stock.s_lwr_min);
      sum_lwr2.push(stock.s_lwr_max);
    }
    if($(".polluted").attr("checked")) {
      sum_c.push(pollution);
      sum_b.push(r_p);
      sum_x.push(stock.a_m1);
      sum_y.push(stock.a_m2);
      sum_upr1.push(stock.a_upr_min);
      sum_upr2.push(stock.a_upr_max);
      sum_lwr1.push(stock.a_lwr_min);
      sum_lwr2.push(stock.a_lwr_max);
    }

    var c = Session.get("avg");
    if($('paper-checkbox[checked]').length == 1) c = (sum_c.reduce((a,b)=>a+b,0));
    var x = sum_x.reduce((a,b)=>a+b,0)/sum_x.length;
    var y = sum_y.reduce((a,b)=>a+b,0)/sum_y.length;
    var upr1 = sum_upr1.reduce((a,b)=>a+b,0)/sum_upr1.length; //min
    var upr2 = sum_upr2.reduce((a,b)=>a+b,0)/sum_upr2.length; //max
    var lwr1 = sum_lwr1.reduce((a,b)=>a+b,0)/sum_lwr1.length; //min
    var lwr2 = sum_lwr2.reduce((a,b)=>a+b,0)/sum_lwr2.length; //max

    if(isNaN(c)) c = 0;
    if(isNaN(x)) x = 0;
    if(isNaN(y)) y = 0;
    if(isNaN(upr1)) upr1 = 0;
    if(isNaN(upr2)) upr2 = 0;
    if(isNaN(lwr1)) lwr1 = 0;
    if(isNaN(lwr2)) lwr2 = 0;

    var upr = (y*100)+x;
    var lwr = x;

    var r_upr2 = (((upr2 - upr )/5) * 20);
    var r_upr1 = (((upr1 - lwr )/5) * 20);
    var r_lwr2 = (((upr  - lwr2)/5) * 20);
    var r_lwr1 = (((lwr  - lwr1)/5) * 20);

    var p = (upr2-(((y * 100) + x))/5)*1.2;
    var px = 7; //dot width...
    var dots = (((y * c) + x)*20);
    var text = Math.round(((dots/20)*10));

    if(isNaN(text)) text = 0;
    if(isNaN(qol))   qol = 0;

    var upr = (y*100)+x;
    var lwr = x;

    var top = (((upr2 - upr1)/100) * (qol)) + upr1;
    var bot = (((lwr2 - lwr1)/100) * (qol)) + lwr1;
    var top_p = ((top-(dots/20))*20)/5;
    var bot_p = (((dots/20)-bot)*20)/5;
    //console.log("stock: " + stock.stock + " t: " + top + " b: " + bot + " d:" + dots/20);
    */
/*
    return {
      a1: (dots-(bot_p*5))-px,
      a2: (dots-(bot_p*4))-px,
      a3: (dots-(bot_p*3))-px,
      a4: (dots-(bot_p*2))-px,
      a5: (dots-bot_p)-px,
      a6: (dots)-px,
      a7: (dots+top_p)-px,
      a8: (dots+(top_p*2))-px,
      a9: (dots+(top_p*3))-px,
      a10:(dots+(top_p*4))-px,
      a11:(dots+(top_p*5))-px,
      text: text,
      p: 0
    }
  */
  return {
    a1: 0,
    a2: 0,
    a3: 0,
    a4: 0,
    a5: 0,
    a6: (200-(y*2))-14,
    a7: 0,
    a8: 0,
    a9: 0,
    a10:0,
    a11:0,
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
