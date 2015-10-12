function newBird(game, x, y, frame) {
    var bird;

    // add bird
    bird = game.add.sprite(x, y, 'bird');

    bird.animations.add('flap');
    bird.animations.play('flap', 12, true);

    game.physics.arcade.enableBody(bird);

    // set the sprite's anchor to the center
    bird.anchor.setTo(0.5, 0.5);

    bird.flap = function () {
        bird.body.velocity.y = -350;
        game.add.tween(bird)
            .to({angle: -20}, 100).start();
    };

    bird.update = function () {
        if (bird.angle < 90) {
            bird.angle += 1.5;
        }
    };

    return bird;
}