var http = require('http');
var fs = require('fs');


let Parser = require('rss-parser');
let parser = new Parser();
const loggeditems = [];

(async () => {
  let feed = await parser.parseURL('https://www.di.se/rss');

  console.log(feed.title);
  //check that we actually have items
  if (feed && feed.items && feed.items.length >= 10 ) {
    //post 10 latest items, newest items start at feed[0]... by default
    for (var i = 0; i < 10; i++) {
      var s = feed.items[i].pubDate.substring(17,22) + " " + feed.items[i].title;
      console.log(s);
      loggeditems[i] = s;
    }
  }

})();


//we put up a local host since we are using node
http.createServer(function (req, res) {
  fs.readFile('demofile1.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write(data);
    res.write('---------------------------------------------<br>');
      loggeditems.forEach(
    item => {
     res.write(item + '<br>');
    });
  res.end('---------------------------------------------');
    return res.end();
  });
}).listen(8080);


//ultimately I couldn't get css files to work, it's my first time using node so I leave it to the experts to tell me why