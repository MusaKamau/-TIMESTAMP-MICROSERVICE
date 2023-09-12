// index.js
// where your node app starts

// init project
var express = require('express');
const timestamp = require('unix-timestamp')
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


// your first API endpoint... 

app.get("/api/:date?",(req,res)=>{
  if(!req.params.date){
    let date=new Date()
    const unix = Date.parse(date)
    const utc = date.toUTCString()
    res.send({unix,utc})
    res.end()
    return;
  }
  else{
    let unix = req.params.date
    if(isNaN(unix)==false){
      unix = parseInt(unix)
    let utc = new Date(parseInt(unix))
    utc = utc.toUTCString()
    res.send({unix , utc})
    res.end()
    return;
    }
    else{
      const date = new Date(req.params.date)
      if(date!="Invalid Date"){
      let unix = Date.parse(date)
      unix = parseInt(unix)
      const utc = date.toUTCString()
      res.send({unix  , utc  })
      res.end()
      return;
      }
      else{
        res.send({error : "Invalid Date"})
        res.end()
        return;
      }
    }
  
  }
})
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
