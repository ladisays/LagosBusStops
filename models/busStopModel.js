var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/LagosBusStops'); // connect to our database

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