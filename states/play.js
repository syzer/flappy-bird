function play(game) {

    var bird, ground;

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
        game.physics.arcade.gravity.y = 500;

        bird = newBird(game, 100, game.height / 2);
        // and add it to the game
        game.add.existing(bird);

        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(jump);

        ground = newGround(game, 0, 400, 335, 112);
        game.add.existing(ground);


        console.log('PLAY ITS AWESOME');
    }

    function update() {
        //if (!bird.inWorld) {
        //    restart();
        //}

        game.physics.arcade.collide(bird, ground);
    }

    // TODO bird
    // move bird up
    function jump() {
        bird.body.velocity.y = -250;
    }

    // TODO game
    function restart() {
        //game.state.start('play');
    }
}

