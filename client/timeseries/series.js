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
    var data = Series.find({name: name}, {sort: {date: -1}});
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
          minPadding: 0
        },
        colors: ['#a1a1a1'],
        series: [{
          enableMouseTracking: false,
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
    return Math.round(Session.get("avg"));
  },
  prediction() {}
});
