// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", function(req, res) {

    var dateParam = req.params.date_string || new Date(),
        options = {year: 'numeric', month: 'long', day: 'numeric'}; // obsolete - valid for "new Date().toLocaleDateString("en-us", options)"

    res.set({status: 200, 'content-type': 'text/plain' });

    if(new Date().setSeconds(+dateParam)) {
        res.send(JSON.stringify({unix: dateParam, natural: new Date(+dateParam * 1000).toUTCString()}));
    } else if (Date.parse(dateParam)) {
        res.send(JSON.stringify({unix: Date.parse(dateParam) / 1000, natural: new Date(dateParam).toUTCString()}));
    } else {
        res.send(JSON.stringify({unix: null, natural: "Invalid Date"}));
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});