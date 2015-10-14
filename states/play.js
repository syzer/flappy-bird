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

        pipeGenerator = game.time.events.loop(Phaser.Timer.SECOND * 1.55, generatePipes);
        pipeGenerator.timer.start();

        scoreText = game.add.bitmapText(game.width / 2, 10, 'flappyFont', score.toString(), 24);

        scoreSound = game.add.audio('score');
    }

    function update() {

        game.physics.arcade.collide(bird, ground, onDeath);
        game.physics.arcade.collide(bird, pipeGroup, onDeath);
        checkScore(pipeGroup);
    }

    //TODO reuse old pipes
    function generatePipes() {

        var pipeY = game.rnd.integerInRange(-100, 100);

        pipeGroup = newPipeGroup(game);

        pipeGroup.x = game.width;
        pipeGroup.y = pipeY;

        // ugly fix the score always on top
        game.world.bringToTop(scoreText);
    }

    // maybe timeout to game over
    // reset game input()
    function onDeath(bird, obstacle) {
        console.log(obstacle, obstacle.key, obstacle.hit);
        obstacle.hit();
        ground.stop();
        pipeGenerator.timer.stop();
        pipeGroup.stop();
        bird.hit();

        if ('ground' === obstacle.key) {
            game.state.start('gameOver', true, false, {score: --score});
        }
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

