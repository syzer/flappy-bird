function play(game) {

    var bird,
        ground,
        pipeGenerator,
        pipeGroup,
        // TODO scoreBoard->items
        score = 0,
        scoreText = "",
        scoreSound;

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
        pipeGroup = newPipeGroup(game);
        score = 0;
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

        scoreText = game.add.bitmapText(game.width / 2, 10, 'flappyFont', score.toString(), 24);

        scoreSound = game.add.audio('score');
    }

    function update() {

        game.physics.arcade.collide(bird, ground, onDeath);
        game.physics.arcade.collide(pipeGroup, bird, onDeath);
        checkScore(pipeGroup);
        //pipeGroup.forEach(function (pipe) {
        //    checkScore(pipeGroup);
        //    game.physics.arcade.collide(bird, pipe, onDeath);
        //});
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

        //TODO reset!
        //if (!pipeGroup) {
        //pipeGroup.reset(game.width + pipeGroup.width/2, pipeY);

        pipeGroup.x = game.width;
        pipeGroup.y = pipeY;
    }

    function onDeath() {
        console.log('bang! bang! your\'re dead');
        game.state.start('gameOver', true, false, {score: --score});
    }

    function shutdown() {
        game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
        bird.destroy();
        pipeGroup.destroy();
    }

    function checkScore(pipeGroup) {
        if (pipeGroup.exists
            && !pipeGroup.hasScored
            && pipeGroup.isAfter(bird.getX())
        ) {
            pipeGroup.hasScored = true;
            scoreText.setText(score.toString());
            score++;
            scoreSound.play();
        }
    }

}

