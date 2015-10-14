function newBird(game, x, y, frame) {

    var bird = game.add.sprite(x, y, 'bird'),
        flapSound = game.add.audio('flap');

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
    // TODO change gravity.. stop animation
    bird.hit = function() {
        console.log('Da bird had died');
    };

    bird.getX = function () {
        return bird.world.x;
    };

    return bird;
}