var express = require('express');

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var BusStopModel = require('../models/busStopModel');

var router = express.Router();

router.route('/')
.get(function(request, response) {
  if(request.query.region) {
    BusStopModel.find({region: request.query.region}, '-_id name region', function(err, bs) {
      if(err) {
        return handleError(err);
      }
      response.json(bs);
    });
  }
  else {
    BusStopModel.find({}, '-_id name region', function(err, bs) {
      if(err) {
        return handleError(err);
      }
      response.json(bs);
    });
  }
})

.post(parseUrlencoded, function(request, response) {
  if(request.body.region) {
    BusStopModel.create({name: request.body.name, region: request.body.region}, function(err, bs) {
      if(err) {
        handleError(err);
      }
      response.status(201).json(bs);
    });
  }
  else {
    response.status(400).json('Invalid Bus-Stop!');
  }
});

// .put(parseUrlencoded, function(request, response) {
//   if(request.query.region) {
//     var query = {region: request.query.region};
//     BusStopModel.update(query, { $set: {region: request.body.region}}, function(err, bs) {
//       if(err) {
//         return handleError(err);
//       }
//       response.status(201).json(bs + ' document(s) affected.');
//     });
//     // for(i = 0; i < lagBusStops.length; i++) {
//     //   if(lagBusStops[i].region === busStopRegion) {
//     //     if(request.body.region) {
//     //       lagBusStops[i].region = request.body.region;
//     //       response.status(201).json(lagBusStops[i].region);
//     //     }
//     //     else {
//     //       response.status(400).json('Invalid Bus Region!');
//     //     }
//     //   }
//     // }
//   }
// });

// router.route('/busstops')
// .get(function(request, response) {
//   BusStopModel.find({}, '-_id name -region', function(err, bs) {
//     // if(err) {
//     //   return handleError(err);
//     // }
//     response.json(bs);
//   });
// });

router.route('/:name')
.get(function(request, response) {
  BusStopModel.find({name: request.params.name}, '_id name region', function(err, bs) {
    if(err) {
      return handleError(err);
    }
    response.json(bs);
  });
  // Can't seem to resolve the error when a bus stop is not found!
  // response.status(404).json("Bus-stop not found!"); 
})

.put(parseUrlencoded, function(request, response) {
  var query = {name: request.params.name};
  BusStopModel.update(query, { $set: {name: request.body.name}}, function(err, bs) {
    if(err) {
      return handleError(err);
    }
    response.status(201).json(bs + ' document was affected');
  });
})

.delete(function(request, response) {
  var i, query = {name: request.params.name};
  BusStopModel.remove(query, function(err, bs) {
    if(err) {
      return handleError(err);
    }
    response.status(200).json(bs + ' document was removed!');
  })
  // response.sendStatus(404);
});


module.exports = router;
