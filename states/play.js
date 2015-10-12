function play(game) {

    var bird,
        ground,
        pipeGenerator,
        pipeGroup;

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

        bird = newBird(game, 30, game.height / 2);
        // and add it to the game
        game.add.existing(bird);

        ground = newGround(game, 0, 400, 335, 112);
        game.add.existing(ground);

        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(flap);
        game.input.onDown.add(flap);

        pipeGenerator = game.time.events.loop(Phaser.Timer.SECOND * 1.55, generatePipes);
        pipeGenerator.timer.start();

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
        var pipeY = game.rnd.integerInRange(-100, 100);

        pipeGroup = newPipeGroup(game);

        //TODO
        //if (!pipeGroup) {
        //pipeGroup.reset(game.width + pipeGroup.width/2, pipeY);

        pipeGroup.x = game.width;
        pipeGroup.y = pipeY;
    }

}

