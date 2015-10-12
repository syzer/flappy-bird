function play(game) {

    var bird;

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

        // add bird
        bird = game.add.sprite(30, 100, 'bird');
        // set the sprite's anchor to the center
        bird.anchor.setTo(0.5, 0.5);

        //bird.animations.add('flap');
        bird.animations.play('flap', 12, true);

        // physics makes bird fall
        game.physics.arcade.enableBody(bird);
        bird.body.gravity.y = 1000;

        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(jump);

        console.log('PLAY ITS AWESOME');
    }

    function update() {
        //if (!bird.inWorld) {
        //    restart();
        //}
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
}

