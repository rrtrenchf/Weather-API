  
$(document).ready(function () {
    //gave button an ID so when its clicked the function is triggered
    $("#button").on("click", function () {
        event.preventDefault()
        //city input by user
        var city = $("#city").val()
        localStorage.setItem("City", city)  
        
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
                // $("#fiveday").append(div)




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
                $("#uv").text("UV index:" + response.value)


                var fivedayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=6fcaead496f20955af428e501d122c6f&units=imperial"
                // var iconURL =  "https://openweathermap.org/img/wn/10d@2x.png"
                return $.ajax({
                    url: fivedayURL, 
                    method: "GET"


                })


            })
            
            //for loop to go through the 5 day forecast. Each day an index stored in a variable.
            .then(function (response) {
                // console.log(response)
                for (i = 8; i < response.list.length; i+=8) {
                    console.log(response.list[i])
                    
                
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