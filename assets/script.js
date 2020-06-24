$(document).ready(function () {
    //gave button an ID so when its clicked the function is triggered
    $("#button").on("click", function () {
        event.preventDefault()
        //city input by user
        var city = $("#city").val()
        //queryURL with api key and city variable
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=3db0639e571abe86a3c9763857b80ed8&units=imperial"
        
        // ajax call request
        $.ajax({
            url: queryURL,
            method: "GET",

           
        })
            // After data comes back from the request
            .then(function (response) {
                console.log(queryURL);

                console.log(response);
                var temp=(response.main.temp);
                // storing the data from the AJAX request in the results variable
                $("#temp").text("temperature:" + temp)
                
                var lat=response.coord.lat
                var lon=response.coord.lon


                var uvqueryURL= "http://api.openweathermap.org/data/2.5/uvi?appid=3db0639e571abe86a3c9763857b80ed8&lat=" +lat+ "&lon=" +lon
                return $.ajax({
                    url: uvqueryURL,
                    method: "GET"
                })

            })
            .then(function(response) {
                console.log(response)
                $("#uv").text("UV index:"+ response.value)
                

                var fivedayURL= "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=3db0639e571abe86a3c9763857b80ed8&units=imperial"
                return $.ajax({
                    url:fivedayURL,
                    method:"GET"

                    
                })

                
            })
            .then(function(response){
                console.log(response)
                for(i=0;i<response.list.length; i++){
                    var currentDay=response.list[i]
                    response.list[i]
                    var div=$("<div>")
                    var tempel=$("<p>")
                    $("#fiveday").append(div)
                    tempel.text()

                }

            })
    })
})