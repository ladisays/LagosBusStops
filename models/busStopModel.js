var mongoose = require('mongoose');
// connect to our local database
// mongoose.connect('mongodb://localhost/LagosBusStops');

//connect to the database hosted on mongolabs.com
mongoose.connect('mongodb://lagbus:superUser@ds031681.mongolab.com:31681/lagosbusstops');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('yay!');
});

var Schema = mongoose.Schema;

var busStopSchema = Schema ({
  name : String,
  region : String
});

var BusStopModel = mongoose.model('BusStopModel', busStopSchema);


// BusStopModel.find(function(err, bs) {
//   if(err) {
//     return handleError(err);
//   }
//   console.log(bs);
// });

module.exports = BusStopModel;