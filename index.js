var inquirer = require('inquirer');
var Game = require('./trackgame');

var game = new Game('player');

console.log('Welcome to Hangman!');

inquirer.prompt([
	{
		type: 'input',
		name: 'username',
		message: 'What is your name? '
	}
]).then(function(answer){
	game.username = answer.username;
	game.startGame();
});