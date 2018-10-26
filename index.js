var Express = require(`express`);
var fs = require(`fs`);
var app = Express();


var characters = [{
    Id: 1,
    name: "RockmanChildren",
    Weapons: ['xBuster', 'Variable Weapons System'],
    affiliations: ['Maveric Hunters', 'Neo Arcadia Resistence'],
    gender: 'Male',
    creation: Date.now(),
    photo: {
        name: 'megaman.png',
        image: null
    }
}]

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

const PORT = 8090;

app.use(Express.static('public', options));
app.use(Express.json());

app.get(`/`, (req, res) => {
    Promise.all(getAllCharacters()).then((characters => {
        res.header(`Content-Type`, `application/json; charset=utf-8`);
        res.send(characters);
    }));
});

app.post(`/createCharacter`, () => {});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});


function getAllCharacters() {
    let promisses = [];

    characters.forEach(character => {
        promisses.push(getImage(character.photo.name).then((data) => {
            character.photo.image = data;
            return character;
        }));
    });

    return promisses;
}

function getImage(name) {
    return new Promise((resolve, reject) => {
        fs.readFile(`./public/assets/${name}`, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

