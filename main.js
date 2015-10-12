var WIDTH = 280;
var HEIGHT = 490;
var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'game');

// game container
function main(game) {

    var bird, title;
    var asset, done;

    return {

        // before hook
        preload: preload,

        // after preload display game sprites
        create: create,

        // 60 fps
        update: update
    };

    function create() {
        // there are 3 game engines available
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // add bird
        bird = game.add.sprite(100, 100, 'bird');

        // physics makes bird fall
        game.physics.arcade.enable(bird);
        bird.body.gravity.y = 1000;

        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(jump);
    }

    function preload() {
        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');
        game.stage.backgroundColor = '#71c5ce';

        game.load.onLoadComplete.addOnce(onDone);
        asset = game.add.sprite(WIDTH / 2, HEIGHT / 2, 'preloader');
        asset.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(asset);

        game.load.image('background', 'assets/background.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('title', 'assets/title.png');
        game.load.image('startButton', 'assets/start-button.png');

        var bird = game.load.spritesheet('bird', 'assets/bird.png', 34, 24, 3);
    }

    function update() {
        if (done) {
            game.state.start('menu');
        }
    }

    // TODO bird
    // move bird up
    function jump() {
        bird.body.velocity.y = -250;
    }

    // TODO game
    function restart() {
        game.state.start('main');
    }

    function onDone() {
        done = true;
    }
}

game.state.add('main', main(game));
game.state.add('menu', menu(game));
game.state.add('play', play(game));
game.state.start('main');
