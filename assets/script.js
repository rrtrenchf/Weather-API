  
$(document).ready(function () {
    //gave button an ID so when its clicked the function is triggered
    $("#button").on("click", function () {
        event.preventDefault()
        //city input by user
        var city = $("#city").val()
        localStorage.setItem("City", city)  
        $("#citySearch").append($("<button>").text(city))
        
        
        //queryURL with api key and city variable
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=6fcaead496f20955af428e501d122c6f&units=imperial"

        // ajax call request
        $.ajax({
            url: queryURL,
            method: "GET",
        })
            // After data comes back from the request
            .then(function (response) {
                console.log(queryURL);

                console.log(response);
                var temp = (response.main.temp);
                var hum = response.main.humidity;
                var windspeed = response.wind.speed;
                
                
                // storing the data from the AJAX request in the results variable
                $("#temp").text("temperature:" + temp)
                $("#hum").text("Humidity:" + hum)
                $("#windSpeed").text("Wind Speed:" + windspeed)
                $("#cityboard").text(city)
                $("#icon").attr("src",`https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`)
                

                var lat = response.coord.lat
                var lon = response.coord.lon
                var uvqueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=6fcaead496f20955af428e501d122c6f&lat=" + lat + "&lon=" + lon
                
                return $.ajax({
                    url: uvqueryURL,
                    method: "GET"
                })

            })
            .then(function (response) {
                console.log(response)
                $("#uv").text("UV index:" + uvi)
                var uvi = response.value
                var fivedayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=6fcaead496f20955af428e501d122c6f&units=imperial"
                // var iconURL =  
                return $.ajax({
                    url: fivedayURL, 
                    method: "GET"
                })
            })
            
            //for loop to go through the 5 day forecast. Each day an index stored in a variable.
            .then(function (response) {
                // console.log(response)
                var fiveDayForecast = $("#5dayForecast")
                fiveDayForecast.empty()
                for (i = 8; i < response.list.length; i+=8) {
                    console.log(response.list[i])
                    

                 //   <div class="card mr-1" id=dayOne style="width: 10rem;">
                 //       <p id="temp"></p>
                 //       <p id="hum"></p>
                 //       <p id="uv"></p>
                 //       <p id="windSpeed"></p>
                 //       <div class="card-body">
                 //       </div>
                
                //  </div>

              

                    var day = response.list[i];
                    var forecast = $("<div></div>");
                    forecast.addClass('card');
                    var temp = $(`<h3>Next Day</h3><p>Temp: ${day.main.temp}</p>`);
                    var hum= $(`<p>Humidity: ${day.main.humidity}</p>`);
                    var windSpeed= $(`<p>Wind Speed: ${day.wind.speed}</p>`);
                    var uvi= $(`<p>UV index: ${response.value}`)
                    var icon=$(`<img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">`)
                    console.log(day.weather[0].icon)
                    
                    //make items
                    forecast.append(temp,hum,windSpeed,uvi,icon);
                    //append items
                    fiveDayForecast.append(forecast)





                    // var currentDay = response.list[0]
                    // var daytwo = response.list[8]
                    // var daythree = response.list[16]
                    // var dayfour = response.list[24]
                    // var dayfive = response.list[32]
                    // response.list[i]
                    // var div = $("<div>")
                    // var tempel = $("<p>")
                    // tempel.text()
                    // if (i = 0, 8, 16, 24, 32) {
                    //     // $("#fiveday").append(div)
                    //     $("#daytwo").text(daytwo)
                    //     $("#daythree").text(daythree)
                    //     $("#dayfour").text(dayfour)
                    //     $("#dayfive").text(dayfive)
                      




                    // }

                }
                

                
            })
    })
})