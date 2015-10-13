function gameOver(game/*TODO score*/) {

    var Scoreboard = function (game) {
        Phaser.Group.call(this, game)
    };

    Scoreboard.prototype = Object.create(Phaser.Group.prototype);
    Scoreboard.prototype.constructor = Scoreboard;

    return {

        // before hook
        preload: preload,

        // after preload display game sprites
        create: create,

        // 60 fps
        update: update,

        // AKA free
        shutdown: shutdown

    };

    function preload() {
    }

    function create() {
        // TODO ->scoreBoard
        var scoreBoard = {
            width: 100,
            scoreText: '15',
            scoreBestText: '36'
        };

        game.add.sprite(0, 0, 'background');

        game.scoreGroup = game.add.group();

        //TODO _.curry
        var score = game.add.bitmapText(
            game.width / 2 - 65, game.height / 2 - 150,
            'flappyFont', scoreBoard.scoreText, 24
        );
        game.scoreGroup.add(score);

        var scoreBest =  game.add.bitmapText(
            game.width / 2 - 65, game.height / 2 - 170,
            'flappyFont', scoreBoard.scoreBestText, 24
        );
        game.scoreGroup.add(scoreBest);

        var gameOverText = game.add.bitmapText(
            game.width / 2 - 65, game.height / 2 - 80,
            'flappyFont', 'Game over !', 24
        );
        game.add.tween(gameOverText)
            .to({y: game.height / 2 - 50}, 350, Phaser.Easing.Linear.None, true, 0, 1000, true);

        console.log('gameOver is not that awesome');
    }

    function update() {
    }

    function shutdown() {
    }

}

