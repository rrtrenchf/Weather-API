
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
                // console.log(queryURL)
                console.log(response);
                var temp = (response.main.temp);
                var hum = response.main.humidity;
                var windspeed = response.wind.speed;
                // storing the data from the AJAX request in the results variable
                $("#temp").text("temperature:" + temp)
                $("#hum").text("Humidity:" + hum)
                $("#windSpeed").text("Wind Speed:" + windspeed)
                $("#cityboard").text(city)
                $("#icon").attr("src", `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`)
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
                var uvi = response.value
                console.log(uvi)
                $("#uv").text(`UV Index:${uvi}`)
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
                for (i = 8; i < response.list.length; i += 8) {
                    var day = response.list[i];
                    var forecast = $("<div></div>");
                    forecast.addClass('card');
                    var temp = $(`<h3>Next Day</h3><p>Temp: ${day.main.temp}</p>`);
                    var hum = $(`<p>Humidity: ${day.main.humidity}</p>`);
                    var windSpeed = $(`<p>Wind Speed: ${day.wind.speed}</p>`);
                    var icon = $(`<img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">`)
                    //make items
                    forecast.append(temp, hum, windSpeed, icon);
                    //append items
                    fiveDayForecast.append(forecast)
                }



            })
    })
})