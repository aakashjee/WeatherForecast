window.onscroll = function() {myFunction()};

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

document.getElementById('now');


    //get location
      var x = document.getElementById("demo");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(weatherdata);
      } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
      }

      //fetch weather API
    function weatherdata(position) {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&appid=b2c336bb5abf01acc0bbb8947211fbc6')
    .then(response => response.json())
      .then(data => {
        //current weather forecast
        console.log('current weather \n');
        console.log(data);

      document.getElementById("icon").src = 'img/'+data.weather[0].icon+'.png';
      document.getElementById("description").innerHTML =data.weather[0].description;
      document.getElementById("temprature").innerHTML =(data.main.temp-273).toFixed(2)+"°C"; 
      document.getElementById("wind-speed").innerHTML =(data.wind.speed).toFixed(2)+"m/s"; 
      document.getElementById("wind-direction").innerHTML =(data.wind.deg).toFixed(2)+"°"; 
      document.getElementById("humidity").innerHTML =(data.main.humidity).toFixed(2)+"g/m3"; 
      document.getElementById("minmax-temp").innerHTML =(data.main.temp_min-273).toFixed(2)+"°C"+'-'+(data.main.temp_max-273).toFixed(2)+"°C"; 
    })
    .catch(err => {
    console.log(err);
    });


//hourly and daily forcast
//it take more time to load complete weather data thats why made seperatly

fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&appid=b2c336bb5abf01acc0bbb8947211fbc6')
.then(response => response.json())
.then(data => {
  console.log('complete weather \n');
  console.log(data);

  //google chart>>hourly forecast
      google.charts.load('current', {'packages':['corechart']});

        var d = new Date();
        var hr=d.getHours();
        var hourly=data.hourly;
        var arrayHr=new Array();
        var push1;

        arrayHr=[['Time','Temprature(in °C)']];
    
        hourly.forEach(element => {
          if(hr>12)hr-=12;
          push1=[(hr).toString(),JSON.parse(((element.temp-263).toFixed(2)))];
          arrayHr.push(push1);
          hr+=1;
        });

        google.charts.setOnLoadCallback(drawChart1);
    
        function drawChart1() {
          var data1 = google.visualization.arrayToDataTable(arrayHr);
    
          var options1 = {
            title: 'hourly forecast',
            curveType: 'function',
            legend: { position: 'top' },
            backgroundColor:'lightgreen'
          };
    
          var chart1 = new google.visualization.LineChart(document.getElementById('curve_chart1'));
    
          chart1.draw(data1, options1);
        }


      //daily weather forecast
      var daily=data.daily;
      var arrayDaily=new Array();
      var push2;
      var day=1;

      arrayDaily=[['Day','Max_Temprature(in °C)','Min_Temprature(in C)']];

      daily.forEach(element => {
        push2=['day'+(day.toString()),JSON.parse((element.temp.max-273).toFixed(2)),JSON.parse((element.temp.min-273).toFixed(2))]
        arrayDaily.push(push2);
        day++;
      });

      google.charts.setOnLoadCallback(drawChart2);

        function drawChart2() {
          var data2 = google.visualization.arrayToDataTable(arrayDaily);
    
          var options2 = {
            title: 'daily forecast',
            curveType: 'function',
            legend: { position: 'top' },
            backgroundColor:'lightgreen'
          };
    
          var chart2 = new google.visualization.LineChart(document.getElementById('curve_chart2'));
    
          chart2.draw(data2, options2);
        }

      })
      .catch(err => {
	    console.log(err);
      });
    } 