$(document).ready(function () {
    $("#button").on("click", function () {
        event.preventDefault()
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=3db0639e571abe86a3c9763857b80ed8"
        var city = $("#city").val()
        // ajax call request
        $.ajax({
            url: queryURL,
            method: "GET",
           
        })
            // After data comes back from the request
            .then(function (response) {
                console.log(queryURL);

                console.log(response);
                // storing the data from the AJAX request in the results variable
                // var results = response.data;
            })
    })
})