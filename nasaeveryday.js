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

var API_KEY = '?api_key=mEs35gN5ULmDf9S8Thq5uXIQ3pAk8ZW6kM8qRBCZ';

var keywords = ["nebula","galaxy","stars","planet"];
var numImages = 1;
var downloadsFinished = 0;

for (i = 0; i < numImages; i++) {

    getImage(i);
}


function getImage(imageNum) {

    var word = keywords[ Math.floor(Math.random() * keywords.length) ];

    var url = 'https://images-api.nasa.gov/search?q=' + word + '&media_type=image';
    //url += API_KEY;

    $.get(url, function(data){

        var obj = JSON.parse(data);
        var items = obj.collection.items;
        var num = Math.floor(Math.random() * 6) + 1

        var url = items[num].links[0].href;
        console.log(url);
        download(url, imageNum);
    });
}

function download(url, imageNum) {

    var download = function(uri, filename, callback){
      request.head(uri, function(err, res, body){
        // console.log('content-type:', res.headers['content-type']);
        // console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };

    download(url, 'img' + imageNum + '.png', function(){

        downloadsFinished += 1;
        if (downloadsFinished == numImages)
            tweet();
    });
}


function tweet() {

  // post a tweet with media
  var b64content = fs.readFileSync('img0.png', { encoding: 'base64' })

  Twitter.post('media/upload', { media_data: b64content }, function (err, data, response) {
    // now we can assign alt text to the media, for use by screen readers and
    // other text-based presentations and interpreters
    var mediaIdStr = data.media_id_string
    var altText = " "
    var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

    Twitter.post('media/metadata/create', meta_params, function (err, data, response) {
      if (!err) {
        // now we can reference the media and post a tweet (media will attach to the tweet)
        var params = { status: ' ', media_ids: [mediaIdStr] }

        Twitter.post('statuses/update', params, function (err, data, response) {

          tweetFinished();
        })
      }
      else {
          console.log(err);
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
