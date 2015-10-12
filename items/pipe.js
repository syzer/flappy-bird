function newPipe(game, x, y, frame) {
    var pipe = game.add.sprite(x, y, 'bird');

    pipe.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enableBody(pipe);
    pipe.body.allowGravity = false;
    pipe.body.immovable = true;

    return pipe;
}

function newPipeGroup(game, parent) {
    var topPipe = newPipe(game, 0, 0, 0);
    game.add(topPipe);

    var bottomPipe = newPipe(game, 0, 440, 1);
    game.add(bottomPipe);

    this.hasScored = false;

    return game.topPipe;
}
