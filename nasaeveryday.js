
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
var keywordNumPages = [2,12,42,43]  // max number of pages for each keyword search

var mainChars1 = ['✲','✳','✴','✵','✶','✷','✸','✹','✺','✻','✼','✽','✾','✿','❀','❁','❂','❃','❄','❅','❆','❇','❈','❉'];
var mainChars2 = ['⁜','⁕','⛯','※','•','●','⛭','✜','✡','✢','✣','✤','✥','✦','✧','✩','✪','✫','✬','✭','✮','✯','✰','✱'];
var midChars = ['◦','.','◜','◝','◞','◟','⎺','⎻','⎼','⎽'];
var fillerChars = ['‥','‧','․',' '];

var emoji = ['🚀','✨','💓','💗','💔','💚','💞','💙','💑','💜','💟','💖','💝','💘','💛','💕','❤️','♥️','❣️','😍',
'💋','😘','😚','😽','💫','🐾','💐','🌸','💮','🏵','🌹','🌺','🌼','🌷','🌱','🍃','🌍','🌎','🌏','🌐','🌑','🌒',
'🌓','🌔','🌕','🌖','🌗','🌘','🌙','🌚','🌛','🌜','☀','🌝','🌞','⭐','🌟','🌠'];

var emoticons = ["(*•̀ᴗ•́*)و", "(๑•̀ㅂ•́)و","(๑˃̵ᴗ˂̵)و","╭( ･ㅂ･)و","( •̀ᄇ• ́)ﻭ✧","(๑•̀ㅂ•́)و✧","(๑˃̵ᴗ˂̵)و","╭( ･ㅂ･)و ̑̑ ˂ᵒ͜͡ᵏᵎ⁾✩","(•́⌄•́๑)૭✧","ೕ(`･୰･´)","٩(ര̀ᴗര́)","✧٩(•́⌄•́๑)",
"٩(｡•ω•｡)و","٩(✪ꀾ⍟༶)و","୧( ⁼̴̶̤̀ω⁼̴̶̤́ )૭","٩(｡•ㅅ•｡)و","٩( ´･ш･)و","٩(•̤̀ᵕ•̤́๑)૭✧","٩(๑❛ワ❛๑)و","٩( ᐛ )و","✧٩(•́⌄•́๑)و ✧","٩(๑•̀ㅂ•́)و","٩(ˊᗜˋ*)و",
"(و ˃̵ᴗ˂̵)و","(ง ͡ʘ ͜ʖ ͡ʘ)ง","✧٩(ˊωˋ*)و✧",

"(●♡∀♡)","乂‿乂","٩(♡ε♡ )۶","ლζ*♡ε♡*ζლ","⊂（♡⌂♡）⊃","(๑♡3♡๑)","(๑♡⌓♡๑)","♱♡‿♡♰",
"(●♡∀♡))ヾ☆*。","(^▿^)۶〜♡","(｡・‧̫・｡).*＊♡","(ෆˊ͈ ु꒳ ूˋ͈ෆ)","( ◜◒◝ )♡","(´∩｡• ᵕ •｡∩`) ♡",
"ლ(́◉◞౪◟◉‵ლ)","ʚ♡⃛ɞ(ू•ᴗ•ू❁)","⸌̷̻( ᷇ॢॢ ᷆◍)⸌̷̻♡⃛","(๑ Ỡ ◡͐ Ỡ๑)ﾉ♡","(♡ ὅ ◡ ὅ )ʃ♡","(๑╹ڡ╹)╭ ～ ♡",
"(⋈◍＞◡＜◍)。✧♡","♡✧。 (⋈◍＞◡＜◍)。✧♡",

"( ◞･౪･)","（‐＾▽＾‐）","(*＾▽＾)／","°˖✧◝(⁰▿⁰)◜✧˖°","(❁´▽`❁)*✲ﾟ*","೭੧(❛▿❛✿)੭೨","(๑꒪▿꒪)*",
"φ(*⌒▽⌒)ﾉ","(๑★ .̫ ★๑)","੭व(๑• .̫ •๑) ✧",

"o(≧∇≦o)","σ(≧ε≦ｏ)","o(*>ω<*)o","(ﾉ^ヮ^)ﾉ*:・ﾟ✧","(ﾉ´ヮ´)ﾉ*:･ﾟ✧","(۶ꈨຶꎁꈨຶ )۶ʸᵉᵃʰᵎ","˭̡̞(◞⁎˃ᆺ˂)◞*✰",
".+:｡(ﾉ･ω･)ﾉﾞ","ヾ（〃＾∇＾）ﾉ♪","⌒ﾟ(❀>◞౪◟<)ﾟ⌒","╰(✧∇✧╰)","ヾ│・ェ・ヾ│","ヾ(０∀０*★)ﾟ*･.｡",
"＼(^▽^＠)ノ","＼（＾▽＾）／","ヽ(；▽；)ノ","ヽ( ★ω★)ノ","ヾ(＠† ▽ †＠）ノ","✧(๑✪д✪)۶ㅂ٩(✪д✪๑)✧",
"癶(癶✺౪✺ )癶",

"(*/ω＼*)","◑.◑","( ⚆ _ ⚆ )","━(◯Δ◯∥)━ン","(　〇□〇）","(((φ(◎ロ◎;)φ)))","ゞ◎Д◎ヾ","（｀〇Д〇）",
"（ΟΔΟ；；）","(O∆O)","｡ﾟ(TヮT)ﾟ｡"];


var numImages = 1;
var downloadsFinished = 0;

var tweetTextChance = 0.6;      // percent chance of text happening in a tweet


for (i = 0; i < numImages; i++) {

    getImage(i);
}


function getImage(imageNum) {

    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
    console.log("Get Image" + '\n');

    var randomArrayIndex = randomInt(0, keywords.length - 1);

    var word = keywords[randomArrayIndex];
    var maxPageNum = keywordNumPages[randomArrayIndex];

    var pageNum = Math.floor(Math.random() * maxPageNum) + 1

    var url = 'https://images-api.nasa.gov/search?q=' + word + '&media_type=image' + '&page=' + pageNum;
    //url += API_KEY;

    console.log("Keyword: " + word + "  Max Number Pages: " + maxPageNum + "   Page Num: " + pageNum);
    console.log("Search URL: " + url);

    $.get(url, function(data){

        var obj = JSON.parse(data);
        var items = obj.collection.items;
        var num = randomInt(0, items.length - 1);

        var url = items[num].links[0].href;

        console.log("Random Image Number: " + num);
        console.log("Image URL: "+ url + '\n');

        download(url, imageNum);
    });
}

function download(url, imageNum) {

    console.log("Downloading...");

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
            console.log("Download Complete" + '\n');
            tweet();
    });
}


function tweet() {

    console.log("Tweeting...");

    // post a tweet with media
    var b64content = fs.readFileSync('img0.png', { encoding: 'base64' })

    Twitter.post('media/upload', { media_data: b64content }, function (err, data, response) {
        // now we can assign alt text to the media, for use by screen readers and
        // other text-based presentations and interpreters
        var mediaIdStr = data.media_id_string
        var altText = " "
        var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

        var tweetText = createText();
        console.log("Tweet text: " + tweetText + '\n');

        Twitter.post('media/metadata/create', meta_params, function (err, data, response) {

            if (!err) {
                // now we can reference the media and post a tweet (media will attach to the tweet)
                var params = { status: tweetText, media_ids: [mediaIdStr] }

                Twitter.post('statuses/update', params, function (err, data, response) {

                    console.log("Tweet Complete" + '\n');
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
    fs.unlink('img0.png', function(err){

        if(err) return console.log(err);
        console.log('File deleted successfully');
        console.log("-=-=-=-=-=-=-=-=-=-=-=-" + '\n');
    })
}

function createText() {

    var ran = Math.random();
    var tweetText = "";

    // Tweet an empty string
    if (ran < 0.1) {
        tweetText = ' ';
    }
    // Tweet an emoji or two
    else if (ran < 0.3) {

        var numEmoji = randomInt(1,2);
        for (i = 0;i < numEmoji; i++) {
            tweetText += emoji[randomInt(0, emoji.length - 1)];
        }
    }
    //A unicode text tweet
    else if (ran < 0.6) {

        var numMain1 = randomInt(0,1);
        var numMain2 = randomInt(0,1);
        var numMid = randomInt(2,5);
        var numFiller = randomInt(6,12);

        for (i = 0; i < numMain1; i++) {

            tweetText += mainChars1[randomInt(0, mainChars1.length - 1)];
        }
        for (i = 0; i < numMain2; i++) {

            tweetText += mainChars2[randomInt(0, mainChars2.length - 1)];
        }

        for (i = 0; i < numMid; i++) {

            tweetText += midChars[randomInt(0, midChars.length - 1)];
        }
        for (i = 0; i < numFiller; i++) {

            tweetText += fillerChars[randomInt(0, fillerChars.length - 1)];
        }

        tweetText = shuffleString(tweetText);
    }
    else {

        tweetText = emoticons[randomInt(0, emoticons.length - 1)];
    }

    return tweetText;
}

 function shuffleString(word) {
    var a = word.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

function randomInt(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
