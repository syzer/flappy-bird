var WIDTH = 280;
var HEIGHT = 490;
var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'game');

// game container
function main(game) {

    var asset, isPreloadDone;

    return {

        // before hook
        preload: preload,

        // after preload display game sprites
        create: create,

        // 60 fps
        update: update
    };

    function create() {
    }

    function preload() {
        asset = game.add.sprite(WIDTH / 2, HEIGHT / 2, 'preloader');
        asset.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(asset);

        game.load.spritesheet('bird', 'assets/bird.png', 34, 24, 3);
        game.load.spritesheet('pipe', 'assets/pipes.png', 54, 320, 2);

        game.stage.backgroundColor = '#71c5ce';
        game.load.onLoadComplete.addOnce(onDone);

        game.load.image('background', 'assets/background.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('title', 'assets/title.png');
        game.load.image('startButton', 'assets/start-button.png');
    }

    function update() {
        if (isPreloadDone) {
            //game.state.start('menu');
            game.state.start('play');
        }
    }

    function onDone() {
        isPreloadDone = true;
    }
}

game.state.add('main', main(game));
game.state.add('menu', menu(game));
game.state.add('play', play(game));
game.state.start('main');
