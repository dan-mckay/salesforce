var sf = require('node-salesforce');
var creds = require('./credentials.js');  // Used to stor API keys etc
var queries = require('./queries.js');    // Used to build query strings

var conn = new sf.Connection({
  loginUrl: creds.url
});

console.log("conn", conn)

module.exports = {

  index: function(req, res) {
    res.sendfile('index.html');
  },

  login: function(req, res) {
    var userData = {};
    // var conn = new sf.Connection({
    //   loginUrl: creds.url
    // });

    conn.login(creds.username, creds.password, function(err, userInfo) {
      if (err) {
        res.send("Connection error: " + err);
      }
      console.log(userInfo)

      res.send({ 
        accessToken: conn.accessToken,
        instanceUrl: conn.instanceUrl
      })
    });
  },
  
  listAccounts: function(req, res) {
    conn.query(queries.listAccounts(), function(err, result) {
      if(err) res.send(err);
      res.send(result);
    });  
  },

  listCases: function(req, res) {
    conn.query(queries.listCases(), function(err, result) {
      if (err) res.send(err);
      res.send(result);
    });
  },

  listOpps: function(req, res) {
    conn.query(queries.listOpps(), function(err, result) {
      if (err) res.send(err);
      res.send(result);
    });
  },

  listCampaigns: function(req, res) {
    conn.query(queries.listCampaigns(), function(err, result) {
      if (err) res.send(err);
      res.send(result);
    });
  }, 

  accountDetails: function(req, res) {
    conn.sobject('Account').retrieve(req.params.accountId, function(err, account) {
      if (err) res.send(err);
      console.log(account)
      injectLatLong(account, function(err, data) {
        if(err) res.send(err);
        res.send(data);
      });
    });
  },


}

function injectLatLong(account, cb) {
  var url, body = '';
  var address = [
    account.BillingStreet,
    account.BillingCity,
    (account.BillingCountry || '')
  ].join(', ');
  address = address.replace(/ /g, '+');
  url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&sensor=false';
  console.log(url);
  http.get(url, function(data) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      body += chunk;
      console.log('BODY: ' + chunk);
    });
    var jsonRes = JSON.parse(data);
    console.log('jsonRes', jsonRes);
    if (jsonRes.status === 'OK') {
        account.latlng = jsonRes.results[0].geometry.location.lat + ',' + jsonRes.results[0].geometry.location.lng;
        console.log(account);
        return cb(null, account);
    } else {
      return cb(null, '0,0');
    }
  }).on('error', function(err) {
    return cb(err, null);
  }).on('finish', function() {
    return cb(null, body);
  });
}
