var express = require('express');

var app = express();
app.set('port', 4758);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/phrases', function(req, res, next) {
    res.send(JSON.stringify(x));
});

app.get('/words', function(req, res, next) {

  res.send(JSON.stringify(x));
});

app.use(function(req,res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - No Page Here!');
  });
  
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.send('500 - Server Error');
  });
  
  app.listen(app.get('port'), function(){
    console.log(`Express started on http://${process.env.HOSTNAME}:${app.get('port')}; press Ctrl-C to terminate.`);
  });