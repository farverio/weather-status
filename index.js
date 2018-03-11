let tempInF = false;

$(document).ready(function() {
  $('.short').hide();
  if (navigator.geolocation) {
    var currentPosition = '';
    navigator.geolocation.getCurrentPosition(function(position) {
      currentPosition = position;
      var lat = currentPosition.coords.latitude;
      var long = currentPosition.coords.longitude;
      var url = `http://api.apixu.com/v1/current.json?key=bd93fd4859fc4f0eb6325133181103&q=${lat},${long}`;
      $.getJSON(url, function(data) {
        var text = JSON.stringify(data);
        var json = JSON.parse(text);

        var country = json.location.country;
        var city = json.location.name;
        var state = json.location.region;

        var temp = json.current.temp_c;
        var temp_f = json.current.temp_f;
        var last_updated = json.current.last_updated.replace('-',' ');

        var wind = json.current.wind_kph;
        var humidity = json.current.humidity;
        var time = json.location.localtime.split(' ')[1];
        var cloud = json.current.cloud;

        $('#weather').html(`${city}, ${state}, ${country}`);

        if (temp < 10) {
          $('.grey-jumbo').css({
            backgroundImage: 'url(https://img00.deviantart.net/f6bf/i/2017/007/1/6/another_cold_day_by_augenweide-dauiznl.jpg)'
          });
          $('#temp').html("<h1>It's a pretty cold day today...<hr></h1>");
        } else if (temp > 10 && temp < 28) {
          $('.grey-jumbo').css({
            backgroundImage: 'url(https://i.ytimg.com/vi/BQxBh-Oen1w/maxresdefault.jpg)'
          });
          $('#temp').html("<h1>It's a sunny day today...<hr></h1>");
        } else {
          $('.grey-jumbo').css({
            backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/02/27/18/55/sunset-3186292_1280.jpg)'
          });
          $('#temp').html("<h1>It's a warm day today...<hr></h1>");
        }

        $('#info1').html(time);
        $('#info2').html(`Wind ${wind} kph`);
        $('#info3').html(`${temp} °C`);

        $('.short').show();

        // Toggle temp
        $('#switch').on('click', function() {
          if (!tempInF) {
            $('#info3').html(`${temp_f} °F`);
            $('#switch').text('Show in Celcius');
            tempInF = true;
          } else {
            $('#info3').html(`${temp} °C`);
            $('#switch').text('Show in Farenheight');
            tempInF = false;
          }
        });

        if (cloud <= 30) {
          $('#info5').html('Clear Sky');
        } else {
          $('#info5').html('Cloudy Sky');
        }
        $('#info6').html(`Humidity ${humidity}%`);
      })
    });
  }
});
