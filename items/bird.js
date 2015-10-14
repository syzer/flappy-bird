function newBird(game, x, y, frame) {

    var bird = game.add.sprite(x, y, 'bird'),
        flapSound = game.add.audio('flap'),
        alive = true;

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
        console.log('Da bird had died');
        // reset animation to 0 frame
        bird.animations.stop();

        bird.body.velocity.y = +400;
        bird.body.velocity.x = -10;
        bird.angle += +20;
        alive = false;
    };

    bird.getX = function () {
        return bird.world.x;
    };

    return bird;
}