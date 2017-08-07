$(document).ready(function(){
 var lat;
 var long;
 $.getJSON("http://ip-api.com/json",function(data2){
  lat=data2.lat;
  long= data2.lon;
  var api =
      'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=208582f6415477b23f27f050de854385'; 
 
  
 $.getJSON(api, function(data){
  var fTemp;
  var cTemp;
  var kTemp;
  var tempSwap=true;
  var weatherType= 
 data.weather[0].description;
 kTemp = data.main.temp;
 var windSpeed= data.wind.speed;
 var city = data.name;
 
 //Temperature in Kelvin
 fTemp = (kTemp)*(9/5)-459.67.toFixed(1);
 //Temperature in F
  //City name
 cTemp = (kTemp-273).toFixed(1);
 
 console.log(city);
 $("#city").html(city);
  $("#weatherType").html(weatherType);
$("#fTemp").html(fTemp + " &#8457;");
 $("#fTemp").click(function(){
  if(tempSwap===false){
   
    $("#fTemp").html(fTemp + " &#8457;");
   tempSwap=true;
  }
  else{
   $("#fTemp").html(cTemp + "&#8451;");
  
   tempSwap=false;
  }
 });
 windSpeed = (2.237*(windSpeed)).toFix(1);
 $("#windSpeed").html(windSpeed + " mph");
 if(fTemp>80){
  
 }

 if (fTemp>70){
  $('body').css('background-image', 'url(https://www.freeimageslive.co.uk/files/images006/clouds_1.jpg)');
  
 }
});
 });

});

<script type="text/javascript" src="index.js"></script>


