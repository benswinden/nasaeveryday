var twit = require('twit'),
    config = require('./config.js'),
    fs = require('fs'),
    request = require('request'),
    najax = $ = require('najax');

var Twitter = new twit({
  consumer_key: 'eE7NNENAsRPlNqhIAZLb3RceC',
  consumer_secret: 'fxGBijBhebpRXvJ5qb6VDvGXSC5Il5QqYWeLjGgYElZG0hLPpd',
  access_token: '859831823819579398-E4uqNRsH4rmpcksZj5TiqsybyS4HiTm',
  access_token_secret: 'P6SkqgihLEbOrLx5DpsuEqcML4Ld958sB6N9E3KrIYmfk',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})


getImage();


function getImage() {

    $.get('https://images-api.nasa.gov/search?q=apollo%2011%20&description=moon%20landing%20&media_type=image', function(data){

        console.log(data);
    });
}

function download() {

    var download = function(uri, filename, callback){
      request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };

    download('https://www.google.com/images/srpr/logo3w.png', 'img.png', function(){
      tweet();
    });
}


function tweet() {

  // post a tweet with media
  var b64content = fs.readFileSync('img.png', { encoding: 'base64' })

  Twitter.post('media/upload', { media_data: b64content }, function (err, data, response) {
    // now we can assign alt text to the media, for use by screen readers and
    // other text-based presentations and interpreters
    var mediaIdStr = data.media_id_string
    var altText = "Small flowers in a planter on a sunny balcony, blossoming."
    var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

    Twitter.post('media/metadata/create', meta_params, function (err, data, response) {
      if (!err) {
        // now we can reference the media and post a tweet (media will attach to the tweet)
        var params = { status: 'loving life #nofilter', media_ids: [mediaIdStr] }

        Twitter.post('statuses/update', params, function (err, data, response) {

          tweetFinished();
        })
      }
    })
  })

}

function tweetFinished() {

    // Now delete the file we just downloaded and posted
    fs.unlink('img.png', function(err){

        if(err) return console.log(err);
        console.log('File deleted successfully');
    })
}





//
//  tweet 'hello world!'
//
// Twitter.post('statuses/update', { status: 'hai' }, function(err, data, response) {
//   console.log(data)
// })

//
// post a tweet with media
//
// var b64content = fs.readFileSync('img.png', { encoding: 'base64' })
//
// Twitter.post('media/upload', { media_data: b64content }, function (err, data, response) {
//   // now we can assign alt text to the media, for use by screen readers and
//   // other text-based presentations and interpreters
//   var mediaIdStr = data.media_id_string
//   var altText = "Small flowers in a planter on a sunny balcony, blossoming."
//   var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
//
//   Twitter.post('media/metadata/create', meta_params, function (err, data, response) {
//     if (!err) {
//       // now we can reference the media and post a tweet (media will attach to the tweet)
//       var params = { status: 'loving life #nofilter', media_ids: [mediaIdStr] }
//
//       Twitter.post('statuses/update', params, function (err, data, response) {
//         console.log(data)
//       })
//     }
//   })
// })
