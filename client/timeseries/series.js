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
          offset: -15,
          minPadding: 0,
          tickLength: 0,
          ceiling: max,
          floor: min,
          max: max,
          min: min,
          minRange: min
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

    var start = Number(this.start);
    var close = Number(this.close);
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

    y = 100 - (((advice + news + media + index)/n)*100);
    v = (stock.max * (1 - (y/100))).toFixed(2);

    difference = ((v - close)/close)*100;
    y =  start - difference;

    if(y < 0) y = 0;
    if(c < 0) c = 0;
    if(v < 0) v = 0;
    if(y > 100) y = 100;
    if(c > 100) c = 100;
    return {
      value: v, // Actual predicted value;
      y: y.toFixed(2), // Uses percentages
      diff: difference,
      show: show
    }
  }
});
