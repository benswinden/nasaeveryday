var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit({
  consumer_key: '	zko70zxdDMmlYtNzxLBOhVxvr',
  consumer_secret: 'Th4sGFawesmItp81910q9NXgNSOsrlRmXPJUaYljcj6wwNAAxR',
  access_token: '850353253141409792-eaVBZQkYAhnVnkATeuZTipK37WO2BO1',
  access_token_secret: 'agVfUW3OPeSRwijaoLkGrKdLOGwdjwq7sbsL1YL8lXgto',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

//
//  tweet 'hello world!'
//
Twitter.post('statuses/update', { status: 'hai' }, function(err, data, response) {
  console.log(data)
})
