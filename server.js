const express = require("express");
const bodyParser = require("body-parser");
const fetch = import("node-fetch");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  let locDate = {
    temp: "Temp",
    desc: "Description",
    location: "Location",
    humidity: "Humidity ",
    feel: "Feel ",
    speed: "Speed",
  };
  res.render("index", { locDate: locDate });
});

app.post("/", async (req, res) => {
  try {
    const location = await req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.APIKEY}&units=metric`;
    let response = await fetch.then((module) => module.default(url));
    let data = await response.json();
    let locDate = {};
    locDate.temp = Math.round(data.main.temp);
    locDate.desc = data.weather[0].description;
    locDate.feel = data.main.feels_like;
    locDate.humidity = data.main.humidity;
    locDate.speed = data.wind.speed;
    locDate.location = location;
    console.log(locDate);
    res.render("index", { locDate: locDate });
  } catch (err) {
    console.log(err);
    res.status(400).json({ data: "not found!" });
  }
});

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
