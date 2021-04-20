const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/secretHitler', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});



const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));




// import the users module and setup its API path
const users = require("./users.js");
app.use("/api/users", users.routes);

// import the games module and setup its API path
const games = require("./games.js");
app.use("/api/games", games.routes);



app.listen(3001, () => console.log('Server listening on port 3001!'));
