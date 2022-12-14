var http = require('http');
var fs   = require('fs');
const { dirname } = require('path');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http.createServer(function(req, res) {
  if(req.url.substring(0, 5) === '/api/' && req.url.length > 5){
    let findBeatle = req.url.split('/').pop();
    let foundBeatle = beatles.find((b) => findBeatle === encodeURI(b.name));
    if(foundBeatle){
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.end(JSON.stringify(foundBeatle))
    }else{
      res.writeHead(404);
      res.end('No existe ese Beatle')
    }
  }

  if(req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var html = fs.readFileSync(`${__dirname}/index.html`);
    res.end(html);
  }else{
    res.writeHead(404);
    res.end('No existe ese Beatle')
  }

  let findBeatle = req.url.split('/').pop();
  let foundBeatle = beatles.find((b) => findBeatle === encodeURI(b.name));

  if(foundBeatle){
    res.writeHead(200, {'Content-Type': 'text/html'})
    let read = fs.readFileSync(`${__dirname}/beatle.html`)
    read = read.replace(/{name}/g, foundBeatle.name)
    read = read.replace({birthdate}, foundBeatle.birthdate)
    read = read.replace({profilePic}, foundBeatle.profilePic)
    res.end(read);
  }else{
    res.writeHead(404);
    res.end('No existe ese Beatle')
  }

  // Segunda alternativa
  // if(req.url === '/api' || req.url === '/api/'){
  //   res.writeHead(200, {'Content-Type': 'application/json'})
  //   res.end(JSON.stringify(beatles));
  // }else if(req.url === '/api/John%20Lennon'){
  //   res.writeHead(200, {'Content-Type': 'application/json'})
  //   res.end(JSON.stringify(beatles[0]))
  // }else if(req.url === '/api/Paul%20McCartney'){
  //   res.writeHead(200, {'Content-Type': 'application/json'})
  //   res.end(JSON.stringify(beatles[1]))
  // }else if(req.url === '/api/George%20Harrison'){
  //   res.writeHead(200, {'Content-Type': 'application/json'})
  //   res.end(JSON.stringify(beatles[2]))
  // }else if(req.url === '/api/Richard%20Starkey'){
  //   res.writeHead(200, {'Content-Type': 'application/json'})
  //   res.end(JSON.stringify(beatles[3]))
  // }
}).listen(3000, '127.0.0.1')

