/*
*  Gets data from address bar using Iron-Router
*  Sets the session according this data.
*/
Router.configure({
  layoutTemplate: 'dummy'
});

Router.route('/:_id', {
  data: function () {
    var courses;
    var option = Router.current().params._id;

    Session.setDefault("slider1",100);
    Session.setDefault("slider2",100);
    Session.setDefault("slider3",100);
    Session.setDefault("slider4",100);
    //
    Session.setDefault("avg",0);
    Session.setDefault("test1",200);
    Session.setDefault("test2",200);
    //
    Session.setDefault("slider1-on",false);
    Session.setDefault("slider2-on",false);
    Session.setDefault("slider3-on",false);
    Session.setDefault("slider4-on",false);

    Meteor.subscribe("stocks", function(){
      //Meteor.subscribe("series", function(){
        $(".loading-screen").fadeOut(function(){
          $(this).remove();

          Meteor.subscribe("answers");
          Session.setDefault("qnumber",0);
          Session.setDefault("option",option);
          Session.setDefault("gold1",100);
          Session.setDefault("gold2",100);
          Session.setDefault("gold3",100);
          Session.setDefault("gold4",100);
          Session.setDefault("slider1-click",0);
          Session.setDefault("slider2-click",0);
          Session.setDefault("slider3-click",0);
          Session.setDefault("slider4-click",0);
          Session.setDefault("slider1-slide",0);
          Session.setDefault("slider2-slide",0);
          Session.setDefault("slider3-slide",0);
          Session.setDefault("slider4-slide",0);
          Session.setDefault("ssid",Meteor.default_connection._lastSessionId);

          a = [1,2,3,4,5];
          b = [6,7,8,9,10,11,12];
          b = shuffle(b);
          c = Array.prototype.concat.apply([], [a, b]);
          Session.setDefault("order",c);

          var isChrome = !!window.chrome && !!window.chrome.webstore;
          if(isChrome) {
            Blaze.render(Template.welcome,$(".welcome-screen")[0]);
          } else {
            $(".welcome-screen").text("This evaluation is only available in Google Chrome. 1.0 - 48 or above.");
          }

          jQuery(document).ready(function($) {
            if (window.history && window.history.pushState) {
              $(window).on('popstate', function() {
                var hashLocation = location.hash;
                var hashSplit = hashLocation.split("#!/");
                var hashName = hashSplit[1];
                if (hashName !== '') {
                  var hash = window.location.hash;
                  if (hash === '') {
                    alert('Warning! \nIf you press the back button again you will lose your progress.');
                  }
                }
              });
              window.history.pushState('forward', null, './'+option);
            }
          //});

        });
      });
    });
  }
});

function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}
