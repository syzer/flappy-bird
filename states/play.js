function play(game) {

    var bird, ground, pipeGeneretor;

    return {

        // before hook
        preload: preload,

        // after preload display game sprites
        create: create,

        // 60 fps
        update: update

    };

    function preload() {
    }

    function create() {

        game.add.sprite(0, 0, 'background');

        // there are 3 game engines available
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // physics makes bird fall
        game.physics.arcade.gravity.y = 1000;

        bird = newBird(game, 100, game.height / 2);
        // and add it to the game
        game.add.existing(bird);

        ground = newGround(game, 0, 400, 335, 112);
        game.add.existing(ground);

        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(flap);
        game.input.onDown.add(flap);

        pipeGeneretor = game.time.events.loop(Phaser.Timer.SECOND * 1.55, generatePipes);
        pipeGeneretor.timer.start();

        console.log('PLAY ITS AWESOME');
    }

    function update() {
        //if (!bird.inWorld) {
        //    restart();
        //}

        game.physics.arcade.collide(bird, ground);
    }

    function flap() {
        bird.flap();
    }

    function restart() {
        //game.state.start('play');
    }

    function generatePipes() {
        console.log('generating pipes!');

        var pipeY = game.rnd.integerInRange(-100, 100);
        var pipeGroup = newPipeGroup(game);
        pipeGroup.x = game.width;
        pipeGroup.y = pipeY;
    }

}

