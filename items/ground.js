function newGround(game, x, y, width, height) {

    var ground = game.add.tileSprite(0, 400, 280, 112, 'ground');
    // xSpeed, ySpeed
    ground.autoScroll(-200, 0);
    game.physics.arcade.enableBody(ground);

    ground.body.allowGravity = false;

    // will not move after collision
    ground.body.immovable = true;

    return ground;
}