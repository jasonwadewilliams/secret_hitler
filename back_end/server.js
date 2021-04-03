const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/players', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});




const gameSchema = new mongoose.Schema({
  groupCode: String,
})
const Game = mongoose.model('Game', gameSchema);


const playerSchema = new mongoose.Schema({
  game: {
    type: mongoose.Schema.ObjectId,
    ref: 'Game'
  },
  name: String,
  role: String,
  isAlive: Boolean,
});

// create a virtual paramter that turns the default _id field into id
//playerSchema.virtual('id')
//  .get(function() {
//    return this._id.toHexString();
//});
const Player = mongoose.model('Player', playerSchema);







// Create a new game.
app.post('/api/games', async (req, res) => {
  const game = new Game({
    groupCode: req.body.groupCode,
  });
  try {
    await game.save();
    res.send(game);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// Add a player to a game.
app.post('/api/games/:gameID/players', async (req, res) => {
  try {
      let game = await Game.findOne({_id: req.params.gameID});
      if (!game) {
          res.send(404);
          return;
      }
      let player = new Player({
          game: game,
          name: req.body.name,
          role: req.body.role,
          isAlive: req.body.isAlive,
      });
      await player.save();
      res.send(player);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});


// Get a list of all of the games.
app.get('/api/games', async (req, res) => {
  try {
    let games = await Game.find();
    res.send(games);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// Get a list of all the players in a given game.
app.get('/api/games/:gameID/players', async (req, res) => {
  try {
      let game = await Game.findOne({_id: req.params.gameID});
      if (!game) {
          res.send(404);
          return;
      }
      let players = await Player.find({game:game});
      res.send(players);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});







app.delete('/api/players/:id', async (req, res) => {
  try {
    await Player.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/players/:id', async (req, res) => {
  try {
    var player = await Player.findOne({
      _id: req.params.id
    });
    player.name = req.body.name;
    player.isAlive = req.body.isAlive;
    player.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



app.listen(3000, () => console.log('Server listening on port 3000!'));
