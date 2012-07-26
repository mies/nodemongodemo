var mongo = require('mongodb');

console.log(process.ENV.WERCKER_MONGO_IPADDRESS);

var client = new Db('test', new Server(process.ENV.WERCKER_MONGO_IPADDRESS, 27017, {})),
exports.testSets = function(test) {
  mytest = function (err, collection) {
    collection.insert({a:2}, function(err, docs) {

      collection.count(function(err, count) {
        mytest.assertEquals(1, count);
      });

      // Locate all the entries using find
      collection.find().toArray(function(err, results) {
        mytest.assertEquals(1, results.length);
        mytest.assertTrue(results[0].a === 2);

        // Let's close the db
        client.close();
      });
    });
  };

  client.open(function(err, p_client) {
    client.collection('test_insert', mytest);
  });
});
