const express = require("express");
const bodyParser = require("body-parser");
const fetch = import("node-fetch");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config();
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", async (req, res) => {
  let location = await req.body.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.APIKEY}&units=metric`;
  const response = await fetch.then((module) => module.default(url));
  const weatherData = await response.json();
  const temp = Math.floor(weatherData.main.temp)
  const desc = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;
  const imageUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  res.write(`<h1>The Current Weather in ${location} is ${desc}</h1>`)
  res.write(`<h1>The Current Temperature is ${temp} degree celsius</h1>`)
  res.write(`<img src='${imageUrl}'>`)
});
const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
