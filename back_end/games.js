const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
 
const users = require("./users.js");
const User = users.model;
const validUser = users.valid;



const gameSchema = new mongoose.Schema({
	groupCode: String,
	status: String,
})
const Game = mongoose.model('Game', gameSchema);


const playerSchema = new mongoose.Schema({
	game: {
		type: mongoose.Schema.ObjectId,
		ref: 'Game'
	},
	name: String,
	role: Number,
	isAlive: Boolean,
});
const Player = mongoose.model('Player', playerSchema);



//===================== post =======================
// Create a new game.
router.post('/', async (req, res) => {
	try {
		const game = new Game({
			groupCode: req.body.groupCode,
			status: req.body.status,
		});
		await game.save();
		res.send(game);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});
// Add a player to a game.
router.post('/:gameID/players', async (req, res) => {
	try {
		let game = await Game.findOne({_id: req.params.gameID});
		if (!game) {
			res.sendStatus(404);
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




//==================== Get ==============================
// Get a list of all of the games.
router.get('/', async (req, res) => {
	try {
		let games = await Game.find();
		res.send(games);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});
// Get a list of all the players in a given game from game code.
router.get('/:gameID/players', async (req, res) => {
	try {
		let game = await Game.findOne({_id: req.params.gameID});
		if (!game) {
			res.sendStatus(404);
			return;
		}
		let players = await Player.find({game:game});
		res.send(players);
	} catch (error) {
			console.log(error);
			res.sendStatus(500);
	}
});
// Get a single player in a given game from game id and player id.
router.get('/:gameID/players/:playerID', async (req, res) => {
    try {
        let player = await Player.findOne({_id:req.params.playerID, game: req.params.gameID});
        if (!player) {
            res.sendStatus(404);
            return;
        }
        res.send(player);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
// Get a single game given game code.
router.get('/gamecode/:gameCode', async (req, res) => {
	try {
		let game = await Game.findOne({groupCode: req.params.gameCode});
		if (!game) {
			res.sendStatus(404);
			return;
		}
		res.send(game);
	} catch (error) {
			console.log(error);
			res.sendStatus(500);
	}
});





//======================= delete ============================
// Delete a game and the subsequent players.
router.delete('/:gameID/players', async (req, res) => {
	try {
		let game = await Game.findOne({_id: req.params.gameID});
		if (!game) {
				res.sendStatus(404);
				return;
		}
		let players = await Player.find({game:game});
		players.forEach(async function(player) {
			await player.delete();
		});

		await game.delete();
		res.sendStatus(200);
	} catch (error) {
			console.log(error);
			res.sendStatus(500);
	}
});
// Delete a player from a given game id.
router.delete('/:gameID/players/:playerID', async (req, res) => {
	try {
		let player = await Player.findOne({_id:req.params.playerID, game: req.params.gameID});
        if (!player) {
            res.sendStatus(404);
            return;
        }

		await player.delete();
		res.sendStatus(200);
	} catch (error) {
			console.log(error);
			res.sendStatus(500);
	}
});





//========================= update =============================
// Update a players info.
router.put('/:gameID/players/:playerID', async (req, res) => {
    try {
        let player = await Player.findOne({_id:req.params.playerID, game: req.params.gameID});
        if (!player) {
            res.sendStatus(404);
            return;
        }
        player.name = req.body.name;
        player.isAlive = req.body.isAlive;
		player.role = req.body.role;
        await player.save();
        res.send(player);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
router.put('/roleChange/:gameID/players/:playerID', async (req, res) => {
    try {
        let player = await Player.findOne({_id:req.params.playerID, game: req.params.gameID});
        if (!player) {
            res.sendStatus(404);
            return;
        }
		player.role = req.body.role;
        await player.save();
        res.send(player);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
router.put('/:gameID', async (req, res) => {
    try {
        let game = await Game.findOne({_id:req.params.gameID});
        if (!game) {
			res.sendStatus(404);
			return;
	}
        game.status = req.body.status;
        await game.save();
        res.send(game);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = {
	model: Game, Player,
	routes: router,
}