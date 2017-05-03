var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit({
  consumer_key: 'eE7NNENAsRPlNqhIAZLb3RceC',
  consumer_secret: 'fxGBijBhebpRXvJ5qb6VDvGXSC5Il5QqYWeLjGgYElZG0hLPpd',
  access_token: '859831823819579398-xUjWBwIVz5FNCK0yRyTkdeIKIv8jSNa',
  access_token_secret: 'NHuDA2zVUFn50ECj8dZQHtTUyvhOY1j67mDXshTkA161r',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

//
//  tweet 'hello world!'
//
Twitter.post('statuses/update', { status: 'hai' }, function(err, data, response) {
  console.log(data)
})
