var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var router = express.Router();

var lagBusStops = [
    {
      "name": "Jibowu",
      "region": "Yaba"
    },
    {
      "name": "WAEC",
      "region": "Yaba"
    },
    {
      "name": "YabaTech",
      "region": "Yaba"
    },
    {
      "name": "Onigbongbo",
      "region": "Maryland"
    },
    {
      "name": "Mende",
      "region": "Maryland"
    },
    {
      "name": "Police College",
      "region": "Maryland"
    },
    {
      "name": "Law School",
      "region": "VI"
    },
    {
      "name": "First Gate",
      "region": "VI"
    },
    {
      "name": "Sandfill",
      "region": "VI"
    }];

router.route('/')
.get(function(request, response) {
  if(request.query.region) {
    var a = [], i;
    for(i = 0; i < lagBusStops.length; i++) {
      if(lagBusStops[i].region === request.query.region) {
        a.push(lagBusStops[i].name);
      }
    }
    response.json(a);
  }
  else {
    response.json(lagBusStops);
  }
})

.post(parseUrlencoded, function(request, response) {
  if(request.body.region) {
    var busStop = createBusStop(request.body.name, request.body.region);
    response.status(201).json(busStop);
  }
  else {
    response.status(400).json('Invalid Bus-Stop!');
  }
})

.put(parseUrlencoded, function(request, response) {
  if(request.query.region) {
    var busStopRegion = request.query.region;
    for(i = 0; i < lagBusStops.length; i++) {
      if(lagBusStops[i].region === busStopRegion) {
        if(request.body.region) {
          lagBusStops[i].region = request.body.region;
          response.status(201).json(lagBusStops[i].region);
        }
        else {
          response.status(400).json('Invalid Bus Region!');
        }
      }
    }
  }
});

router.route('/:name')
.get(function(request, response) {
  var i, busStop = request.params.name;
  for(i = 0; i < lagBusStops.length; i++) {
    if(lagBusStops[i].name === busStop) {
      return response.json(lagBusStops[i]);
    }
  }
  response.status(404).json("Bus-stop not found!");
})

.put(parseUrlencoded, function(request, response) {
  var busStop = request.params.name;
  for(i = 0; i < lagBusStops.length; i++) {
    if(lagBusStops[i].name === busStop) {
      if(request.body.name) {
        lagBusStops[i].name = request.body.name;
        response.status(201).json(lagBusStops[i].name);
      }
      else {
        response.status(400).json('Invalid Bus-Stop!');
      }
    }
  }
})

.delete(function(request, response) {
  var i, busStop = request.params.name;
  for(i = 0; i < lagBusStops.length; i++) {
    if(lagBusStops[i].name === busStop) {
      lagBusStops.splice(i, 1);
      response.sendStatus(200);
    }
  }
  response.sendStatus(404);
});



function createBusStop(n, r){
  lagBusStops.push({"name": n, "region": r});
  return n;
}

module.exports = router;
