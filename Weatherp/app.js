const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files from the 'public' directory

app.get("/", function (req, res) {
res.render("home")
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "5e0bb6dd00624e8897fa615b77bef059";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    unit +
    "&appid=" +
    apiKey;

  https.get(url, function (response) {
    let body = "";

    response.on("data", function (data) {
      body += data;
    });

    response.on("end", function () {
      const weatherData = JSON.parse(body);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      console.log(temp);
      // Send data to the result page
      res.render("result", {
        temp: temp,
        description: description,
      });
    });
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
