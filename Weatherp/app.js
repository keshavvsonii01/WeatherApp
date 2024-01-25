const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extented:true}));



app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
    const query = req.body.cityName;
    const apiKey = "5e0bb6dd00624e8897fa615b77bef059"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&units=" + unit+"&appid="+ apiKey

    https.get(url,function(response){
        console.log(response)

        response.on("data", function(data){
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description
        console.log(temp);
        console.log(description);
        res.write("<h1>The temp - " + temp + "</h1>");
        res.write("The description is " + description);
        res.send();
        })
    })
})






app.listen(3000, function(){
    console.log("Started!");
});