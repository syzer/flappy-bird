function newBird(game, x, y, frame) {

    var bird = game.add.sprite(x, y, 'bird'),
        flapSound = game.add.audio('flap'),
        alive = true,
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    bird.animations.add('flap');
    bird.animations.play('flap', 12, true);

    game.physics.arcade.enableBody(bird);

    // set the sprite's anchor to the center
    bird.anchor.setTo(0.5, 0.5);

    bird.flap = function () {
        bird.body.velocity.y = -350;
        game.add.tween(bird)
            .to({angle: -20}, 100).start();
        flapSound.play();
    };

    bird.update = function () {
        if (!bird.angle) {
            return;
        }

        if (bird.angle < 90) {
            bird.angle += 1.5;
        }
    };

    //TODO awesome death animation
    bird.hit = function() {
        if (!alive) {
            return
        }
        // reset animation to 0 frame
        bird.animations.stop();

        bird.body.velocity.y = -400;
        bird.body.velocity.x = +100;
        bird.angle += 30;
        console.log('Da bird had died');
        alive = false;
        game.input.onDown.removeAll();
    };

    bird.getX = function () {
        return bird.world.x;
    };

    spaceKey.onDown.add(bird.flap);
    game.input.onDown.add(bird.flap);

    return bird;
}