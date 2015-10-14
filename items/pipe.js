function newPipe(game, x, y, frame) {
    // frames have 2 frames
    var pipe = game.add.sprite(x, y, 'pipe', frame),
        pipeHitSound = game.add.audio('pipeHit');

    pipe.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enableBody(pipe);
    pipe.body.allowGravity = false;
    pipe.body.immovable = true;

    pipe.hit = function () {
        pipeHitSound.play();
    };

    return pipe;
}

function newPipeGroup(game, parent) {
    var pipeGroup = game.add.group();

    var topPipe = newPipe(game, 0, 0, 0);
    pipeGroup.add(topPipe);

    var bottomPipe = newPipe(game, 0, 440, 1);
    pipeGroup.add(bottomPipe);

    pipeGroup.hasScored = false;
    pipeGroup.exists = true;

    topPipe.body.velocity.x = -200;
    bottomPipe.body.velocity.x = -200;
    //this.setAll('body.velocity.x', -200);

    pipeGroup.update = function () {
        checkWorldBounds();
    };

    pipeGroup.stop = function () {
        //pipeGroup.callAll('stop');
        topPipe.body.velocity.x = 0;
        bottomPipe.body.velocity.x = 0;
    };

    pipeGroup.isAfter = isAfter;

    function checkWorldBounds() {
        if (!topPipe.inWorld) {
            pipeGroup.exists = false;
        }
    }

    function isAfter(x) {
        return topPipe.world.x <= x;
    }

    return pipeGroup;
}
