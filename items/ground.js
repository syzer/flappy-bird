function newGround(game, x, y, width, height) {

    var ground = game.add.tileSprite(0, 400, 280, 112, 'ground'),
        groundSound = game.add.audio('groundHit');

    // xSpeed, ySpeed
    ground.autoScroll(-200, 0);
    game.physics.arcade.enableBody(ground);

    ground.body.allowGravity = false;

    // will not move after collision
    ground.body.immovable = true;


    ground.stop = function() {
        // stopScroll()
        ground.autoScroll(0,0);
    };

    ground.hit = function() {
        groundSound.play();

    };

    return ground;
}