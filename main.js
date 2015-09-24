var game = new Phaser.Game(700, 490, Phaser.AUTO, 'game');

// game container
var main = function (game) {

    var bird, pipes;

    return {

        // before hook
        preload: function () {
            game.load.image('bird', 'assets/bird.png');
            game.load.image('pipe', 'assets/pipe.png');
            game.stage.backgroundColor = '#71c5ce';
        },

        // after preload display game sprites
        create: function () {
            // there are 3 game engines available
            game.physics.startSystem(Phaser.Physics.ARCADE);

            // add bird
            bird = game.add.sprite(100, 100, 'bird');

            // physics makes bird fall
            game.physics.arcade.enable(bird);
            bird.body.gravity.y = 1000;

            var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            spaceKey.onDown.add(jump);

            // TODO why in Phaser groups physics API is different?
            pipes = game.add.group();
            pipes.enableBody = true;
            pipes.createMultiple(10, 'pipe');

        },

        // main game loop
        update: function () {
            if (bird.inWorld == false) {
                restart();
            }
        }

    };

    // TODO bird
    // move bird up
    function jump() {
        bird.body.velocity.y = -250;
    }

    // TODO game
    function restart() {
        game.state.start('main');
    }
};

game.state.add('main', main(game));
game.state.start('main');
