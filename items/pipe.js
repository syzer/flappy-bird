function newPipe(game, x, y, frame) {
    // frames have 2 frames
    var pipe = game.add.sprite(x, y, 'pipe', frame);

    pipe.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enableBody(pipe);
    pipe.body.allowGravity = false;
    pipe.body.immovable = true;

    return pipe;
}

function newPipeGroup(game, parent) {

    var pipeGroup = game.add.group();

    var topPipe = newPipe(game, 0, 0, 0);
    pipeGroup.add(topPipe);

    var bottomPipe = newPipe(game, 0, 440, 1);
    pipeGroup.add(bottomPipe);

    this.hasScored = false;

    return pipeGroup;
}
