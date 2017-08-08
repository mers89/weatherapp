$(document).ready(function() {
  getLocation();
})

function getLocation() {
  var location;
  $.ajax({
    format: "jsonp",
    dataType: "jsonp",
    url: "http://ip-api.com/json",
    success: function(data) {
      location = (data.lat + "," + data.lon);
      $("#weather-location").html(data.city + ", " + data.region);
      getURL(location)
    },
    error: function() {
      httpsLocation();
    },
    method: "GET"
  });

  function httpsLocation() {
    if (navigator.geolocation) {
      var location;
      navigator.geolocation.getCurrentPosition(passLocation);
    }
  }

  function passLocation(position) {
    location = position.coords.latitude + ", " + position.coords.longitude;
    setCity(location);
    getURL(location);
  }
}

function setCity(latLon) {
  var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latLon + "&sensor=true";
  url = url.replace(/\s/g, "");
  $.ajax({
    format: "json",
    dataType: "json",
    url: url,
    success: function(data) {
      $('#weather-location').html(data.results[0].address_components[2].long_name);
    },
    method: "GET"
  });
}

function getURL(location, tempSetting) {
  var url = ("https://api.forecast.io/forecast/2b4b9e2d0c9c7ba61f588616d2967c9c/" + location);
  //console.log(url);
  getJson(url);

}

function getJson(url) {
  //console.log("started getJson with this url: " + url);

  $.ajax({
      format: "jsonp",
      dataType: "jsonp",
      url: url,
      success: function(json) {
        //console.log("great success");
        $("#weather-current").html(Math.round(json.currently.temperature) + "°");
        $("#weather-high").html("High: " + Math.round(json.daily.data[0].temperatureMax) + "°");
        $("#weather-low").html("Low: " + Math.round(json.daily.data[0].temperatureMin) + "°");
        setBackground(json.currently.icon);
      }

    })
    .error(function(jqXHR, textStatus, errorThrown) {
      alert("error: " + JSON.stringify(jqXHR));
    })
}

$("#temp-type").on("click", function() {
  var currentTemp = $("#weather-current").html().replace(/°/g, "");
  var highTemp = $("#weather-high").html().replace(/°/g, "");
  var lowTemp = $("#weather-low").html().replace(/°/g, "");
  lowTemp = lowTemp.replace("Low: ", "");
  highTemp = highTemp.replace("High: ", "");

  if ($("#temp-type").html() == "Fahrenheit") {
    $("#weather-current").html(toCelsius(currentTemp) + "°");
    $("#weather-high").html("High: " + toCelsius(highTemp) + "°");
    $("#weather-low").html("Low: " + toCelsius(lowTemp) + "°");
    $("#temp-type").html("Celsius");

  } else if ($("#temp-type").html() == "Celsius") {
    $("#weather-current").html(toFahrenheit(currentTemp) + "°");
    $("#weather-high").html("High: " + toFahrenheit(highTemp) + "°");
    $("#weather-low").html("Low: " + toFahrenheit(lowTemp) + "°");
    $("#temp-type").html("Fahrenheit");

  }

  function toCelsius(num) {
    var newNum = (parseInt(num) - 32) * 5 / 9;
    return Math.round(newNum);
  }

  function toFahrenheit(num) {
    var newNum = (parseInt(num) * 9 / 5) + 32;
    return Math.round(newNum);
  }

})

function setBackground(weatherIcon) {
  //console.log(weatherIcon);
  switch (weatherIcon) {
   case "clear-day":
  $('body').css("background-image", 'url("http://res.cloudinary.com/mers/image/upload/v1502151184/giphy_1_juapbo.webp")');
      //Set background image
      break;
   case "fog":
       $('body').css("http://res.cloudinary.com/mers/image/upload/v1502160663/fog_qoeevk.gif")');
      break;
   case "rain":
       $('body').css("background-image", 'url("http://res.cloudinary.com/mers/image/upload/v1502157013/rain_zk3rso.webp")');
      //Set different background image
      break;
    case "cloudy":
      case "partly-cloudy-day":
       $('body').css("background-image", 'url("http://unsplash.com/photos/KFnu4Y0uNJA/download?force=true")');
      break;
    case "clear-night":
      case "partly-cloudy-night":
     $('body').css("background-image", 'url("http://res.cloudinary.com/mers/image/upload/v1502160647/night_z9hooy.webp")');
      break;
    case "snow":
      case "sleet":
      $('body').css("background-image", 'url("http://res.cloudinary.com/mers/image/upload/v1502157009/snow_zwjmch.gif")');
      break;
    case "wind":
        $('body').css("background-image", 'url("http://res.cloudinary.com/mers/image/upload/v1502157006/windy_lq2ts1.gif")');
      break;
  }

}
