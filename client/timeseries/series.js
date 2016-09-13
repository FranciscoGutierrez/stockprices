var Highcharts = require('highcharts/highstock');

Template.series.onCreated(function(){
  var name = Template.instance().data['name'];
  this.stock = new ReactiveVar(Stocks.findOne({name:name}));
  Meteor.subscribe("series", name);
});

Template.series.helpers({
  createChart: function () {
    var prices = [];
    var name = this.name;
    var max = 0;
    var min = 0;
    var data  = Series.find({name: name}, {sort: {date: 1}});
    var price = Series.findOne({name:name});
    if(price) max = price.max;
    if(price) min = price.min;
    data.forEach(function(item) { prices.push(item.close); });

    Meteor.defer(function() {
      Highcharts.chart('chart-'+name, {
        chart:{
          type:'line',
          marginRight:0,
          marginBottom:0,
          marginLeft:0,
          marginTop:0
        },
        tooltip: {
          animation: false,
          enabled: false,
          followPointer: false,
          followTouchMove: false,
        },
        yAxis: {
          offset: -13,
          minPadding: 0,
          tickLength: 0,
          ceiling: 200,
          max: 200,
          floor: 0,
          min: 0,
          minRange: min,
          tickAmount: 5,
        },
        colors: ['#717171'],
        series: [{
          enableMouseTracking: false,
          marker: { enabled: false },
          type: 'line',
          data: prices
        }]
      });
    });
  },
  stock() {
    var color = "green";
    var arrow = "up";
    if(this.diff < 0){ color = "red"; arrow = "down"; }
    return {name: this.name, title: this.title, close: this.close,  diff: this.diff, percent: this.prcnt, color: color, arrow:arrow};
  },
  avg() {
    var avg = Math.round(Session.get("avg"));
    if($("#forecast-ko").highcharts()) {
      $("#forecast-ko").highcharts().series[0].data[1].update(45.33 + (avg/100));
      $("#forecast-ko").highcharts().yAxis[0].setExtremes(35.97,81.12);
    }
    return avg;
  },
  prediction() {
    var stock = Template.instance().stock.get();
    var close = this.last;
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

    m1 = m1/n;
    m2 = m2/n;

    lwr_max = lwr_max/n;
    lwr_min = lwr_min/n;
    upr_max = upr_max/n;
    upr_min = upr_min/n;
    fit_lwr = fit_lwr/n;
    fit_upr = fit_upr/n;

    y = (m2  * c) + m1;
    v = (200 * y).toFixed(2);

    lwr = ((lwr_min) + ((lwr_max - lwr_min) * c));
    upr = ((upr_min) + ((upr_max - upr_min) * c));

    fit_upr = m2 + m1;
    fit_lwr = m1;

    var upr_c = (upr-y)/5;
    var lwr_c = (y-lwr)/5;

    if(y < 0) y = 0;
    if(c < 0) c = 0;
    if(v < 0) v = 0;
    if(y > 100) y = 100;
    if(c > 100) c = 100;

    var positive = true;
    var difference = (v - close).toFixed(2);
    if(difference < 0) positive = false;

    return {
      value: v, // Actual predicted value;
      y: 100 - (y*100), // Uses percentages
      y2:(100 - (y*100))-11, // Uses percentages
      diff: difference,
      show: show,
      start: 100-((stock.last/200)*100),
      lwr: 100 - (lwr*100),
      upr: 100 - (upr*100),
      upr1: (100 - ((upr - upr_c*1)*100)),
      upr2: (100 - ((upr - upr_c*2)*100)),
      upr3: (100 - ((upr - upr_c*3)*100)),
      upr4: (100 - ((upr - upr_c*4)*100)),
      upr5: (100 - ((upr - upr_c*5)*100)),
      lwr1: (100 - ((lwr + lwr_c*1)*100)),
      lwr2: (100 - ((lwr + lwr_c*2)*100)),
      lwr3: (100 - ((lwr + lwr_c*3)*100)),
      lwr4: (100 - ((lwr + lwr_c*4)*100)),
      lwr5: (100 - ((lwr + lwr_c*5)*100)),
      positive: positive
    }
  }
});
