function gameOver(game) {
    // TODO ->scoreBoard
    var scoreBoard = {
        width: 100,
        score: 0,
        scoreBest: 0
    };

    return {

        // before hook
        preload: preload,

        //when called with game.start
        init: init,

        // after preload display game sprites
        create: create,

        // 60 fps
        update: update,

        // AKA free
        shutdown: shutdown

    };

    function preload() {
    }

    function init(spec) {
        spec = spec || {};
        scoreBoard.score = spec.score || 0;
        scoreBoard.scoreBest = Math.max(scoreBoard.score, scoreBoard.scoreBest);
    }

    function create() {

        game.add.sprite(0, 0, 'background');

        game.scoreGroup = game.add.group();

        var score = game.add.bitmapText(
            game.width / 2 - 110, game.height / 2 - 140,
            'flappyFont', "Current score: " + scoreBoard.score, 24
        );
        game.scoreGroup.add(score);

        var scoreBest = game.add.bitmapText(
            game.width / 2 - 110, game.height / 2 - 170,
            'flappyFont', "Highest score: " + scoreBoard.scoreBest, 24
        );
        game.scoreGroup.add(scoreBest);




        var gameOverText = game.add.bitmapText(
            game.width / 2 - 65, game.height / 2 - 80,
            'flappyFont', 'Game over !', 24
        );
        game.add.tween(gameOverText)
            .to({y: game.height / 2 - 70}, 350, Phaser.Easing.Linear.None, true, 0, 1000, true);



        console.log('gameOver is not that awesome');
    }

    function update() {
    }

    function shutdown() {
    }

}

