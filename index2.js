var Express = require(`express`);
var app = Express();

var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html', 'png', 'jpg', 'jpeg'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
 }

app.use(Express.json());
app.use(Express.static('public', options));

app.listen(8090, function() {
    console.log(`Server listen on 8090 xxx`);
});

app.get(`/`, function(req, res){    
    res.send(`<label style="background-color:blue"><strong>ola mundo</strong></label>`);
});

app.post(`/`, function(req, res){    
    console.log(req.body);

    res.send(req.body);
});