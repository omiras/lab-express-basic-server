// IMPORT PACKAGES
// Here you should import the required packages for your Express app: `express` and `morgan`
const express = require('express');
const logger = require('morgan');
const path = require('path');



// CREATE EXPRESS APP
// Here you should create your Express app:
const app = express();

app.set('view engine', 'ejs');




// MIDDLEWARE
// Here you should set up the required middleware:
// - `express.static()` to serve static files from the `public` folder
// - `express.json()` to parse incoming requests with JSON payloads
// - `morgan` logger to log all incoming requests
app.use(logger('tiny'));
app.use(express.json());
app.use(express.static('public'));



// ROUTES
// Start defining your routes here:
app.get('/', (req, res) => {

    const userData = require('./data/user-crimanlor.json');
    res.render('home', userData);
});

app.get('/blog', (req, res) => {
    const url = path.join(__dirname, 'views', 'blog.html');
    console.log("🚀 ~ file: app.js:34 ~ app.get ~ url:", url)
    res.sendFile(url);

});


app.get('/api/projects', (req, res) => {
    const projects = require('./data/projects.json');
    res.send(projects);
});

// si no hemos caido por ningún endpoint entonces es que el recurso que buscaba el usuario no existe en nuestro servidor
app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/views/not-found.html');
})



// START THE SERVER
// Make your Express server listen on port 5005:
app.listen(5005, () => {
    console.log(' Escuchando peticiones en el puerto 5005');
})
