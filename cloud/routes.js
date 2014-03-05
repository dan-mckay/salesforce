var fs = require('fs');


module.exports = {
  index: function(req, res) {
    res.sendfile('index.html');
  }
}