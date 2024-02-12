const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var fs = require("fs");
var path = require("path");

app.use(bodyParser.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.get('/api/getstate', (req, res) => {

  var statesList = JSON.parse(
    fs.readFileSync(path.resolve("states.json"), "utf8")
  );
  var stateList = statesList.records
  console.log(stateList)

  if(stateList) {
    res.json({ success: true, data: stateList });
  } else {
    res.json({ success: false, data: "Not Found Any State List" });
  }
});


app.post('/api/getcities', (req, res) => {
  const {stateCode} = req.body

  var citiesList = JSON.parse(
    fs.readFileSync(path.resolve("cities.json"), "utf8")
  );

  if(stateCode) {
    var filterCities = citiesList.records.filter(function(city){
      return city.stateCode === stateCode
    });

    if(filterCities) {
      res.json({ success: true, data: filterCities });
    } else {
      res.json({ success: false, data: "Not State Code Mateched with our Records." });
    }
  } else {
    res.json({ success: false, data: "Please Put Right State Code To Get Right Cities List." });
  }
});
