var MongoClient = require('mongodb').MongoClient;



var MONGO_CONN_USERNAME = "*****";
var MONGO_CONN_PASS = "****";
var MONGO_CONN_IP = "192.168.0.101";
var MONGO_CONN_PORT = "27017";
var MONGO_CONN_DB = "Burclarbozki";
var MONGO_CONN_AUTH = "authSource=admin";

var MONGO_CONN_URL =
    "mongodb+srv://user:rZTVYHSDDbngOcnL@burclarbozki.lof87jj.mongodb.net/?retryWrites=true&w=majority";

var url = MONGO_CONN_URL;

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Burclarbozki");
    var myobj = {
        "balikAylik": "",
        "balikGunluk": "",
        "balikAskYorum": "",
        "balikHaftalik": "",
        "balikAskBaslik": "",
        "balikDiyetBaslik": "",
        "balikDiyetYorum": "",
        "balikKariyerBaslik": "",
        "balikKariyerYorum": "",
        "balikOlumluYonBaslik": "",
        "balikOlumluYonYorum": "",
        "balikOlumsuzYonBaslik": "",
        "balikOlumsuzYonYorum": "",
        "balikSaglikBaslik": "",
        "balikSaglikYorum": "",
        "balikStilBaslik": "",
        "balikStilYorum": ""
    };
    dbo.collection("balikBurc").insertOne(myobj, function (err, res) {
        if (err) throw err;

        db.close();
    });
});