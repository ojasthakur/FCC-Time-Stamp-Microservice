// server.js
// where your node app starts
require('dotenv').config()

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/', (req, res) => {
  const unixTimeStamp = new Date().getTime();
  const date = new Date()
  // console.log(unixTimeStamp);
  res.status(202).json({
    unix: unixTimeStamp,
    utc: date.toUTCString()
  })
})
app.get('/api/:id', (req, res) => {
  // console.log(req.params)
  if (req.params.id.length === 13) {
    
    const unixTimeStamp = new Date(Number(req.params.id)).getTime();
    const date = new Date(Number(req.params.id)).toUTCString()
    
    if (date === 'Invalid Date') {
      return res.status(400).json({
        error: 'Invalid Date'
      })
    }

    return res.status(200).json({
    unix: unixTimeStamp,
    utc: date
    })
  } else {
      const unixTimeStamp = new Date(req.params.id).getTime();
    const date = new Date(req.params.id).toUTCString()    
    if (date === 'Invalid Date') {
      return res.status(400).json({
        error: 'Invalid Date'
      })
    }
    return res.status(200).json({
    unix: unixTimeStamp,
    utc: date
  })
  }

  

  
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
