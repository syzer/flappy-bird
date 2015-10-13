var WIDTH = 280;
var HEIGHT = 490;
var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'game');

// game container
function preload(game) {

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
        game.load.image('preloader', 'assets/preloader.gif');
        asset = game.add.sprite(WIDTH / 2, HEIGHT / 2, 'preloader');
        asset.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(asset);
        game.add.text(game.width/2 - 50, game.height/2 + 50, 'Click start!', { fill: '#ffffff' });

        game.load.spritesheet('bird', 'assets/bird.png', 34, 24, 3);
        game.load.spritesheet('pipe', 'assets/pipes.png', 54, 320, 2);

        game.stage.backgroundColor = '#71c5ce';
        game.load.onLoadComplete.addOnce(onDone);

        game.load.image('background', 'assets/background.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('title', 'assets/title.png');
        game.load.image('startButton', 'assets/start-button.png');
        game.load.bitmapFont('flappyFont',
            'assets/fonts/flappyfont/flappyfont.png',
            'assets/fonts/flappyfont/flappyfont.fnt'
        );

        game.load.audio('score', 'assets/score.wav');
        game.load.audio('flap', 'assets/flap.wav');
        game.load.audio('pipeHit', 'assets/sfx_hit.ogg');
        //game.load.audio('pipeHit', 'assets/pipe-hit.wav');
        game.load.audio('groundHit', 'assets/ground-hit.wav');

        game.load.image('scoreboard', 'assets/scoreboard.png');
        game.load.image('gameover', 'assets/gameover.png');
        game.load.spritesheet('medals', 'assets/medals.png', 44, 46, 2);
        game.load.image('particle', 'assets/particle.png');
    }

    function update() {
        if (isPreloadDone) {
            game.state.start('menu');
        }
    }

    function onDone() {
        isPreloadDone = true;
    }
}

game.state.add('preload', preload(game));
game.state.add('menu', menu(game));
game.state.add('play', play(game));
game.state.add('gameOver', gameOver(game));
game.state.start('preload');
