function gameOver(game) {

    var scoreBoard;

    return {

        preload: preload,

        //when called with game.start
        init: init,

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
        scoreBoard = newScoreBoard(game, spec);
    }

    function create() {
        console.log('bang! bang! your\'re dead');

        game.add.sprite(0, 0, 'background');
        scoreBoard.display();

        var gameOverText = game.add.bitmapText(
            game.width / 2 - 65, game.height / 2 - 80,
            'flappyFont', 'Game over !', 24
        );
        game.add.tween(gameOverText)
            .to({y: game.height / 2 - 70}, 350, Phaser.Easing.Linear.None, true, 0, 1000, true);


        var startButton = game.add.button(WIDTH / 2, HEIGHT/ 2, 'startButton',  game.startClick);
        startButton.anchor.setTo(0.5, 0.5);
    }

    function update() {
    }

    function shutdown() {
        scoreBoard.destroy();
    }


}

