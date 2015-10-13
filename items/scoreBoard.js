function newScoreBoard(game, spec) {

    var width = game.width / 2 - 110;
    var height = game.height / 2 - 110;

    var medal,
        scoreBoard = {
            score: spec.score || 0,
            scoreBest: 0
        };

    // warning .. ugly
    updateScoreBest();

    //TODO as group and sane positioning.
    scoreBoard.display = function () {
        game.add.bitmapText(
            width, height,
            'flappyFont', 'Current score: ' + scoreBoard.score, 24
        );

        game.add.bitmapText(
            width, height - 40,
            'flappyFont', 'Highest score: ' + scoreBoard.scoreBest, 24
        );

        maybeGiveMedal();
    };

    function updateScoreBest() {
        var prevScoreBest = localStorage.getItem('scoreBest') || 0;

        scoreBoard.scoreBest = Math.max(scoreBoard.score, prevScoreBest);
        localStorage.setItem('scoreBest', scoreBoard.scoreBest);
        return scoreBoard.scoreBest;
    }

    // TODO add bronze medal
    // maybe relative positioning
    // maybe whole scoreBoard Bounce out
    function maybeGiveMedal() {
        if(scoreBoard.score >= 1 && scoreBoard.score < 10) {
        //if (scoreBoard.score >= 0 && scoreBoard.score < 10) {
            medal = game.add.sprite(width + 110, - 80, 'medals', 0);
            medal.anchor.setTo(0.5, 0.5);
        } else if (scoreBoard.score > 10) {
            medal = game.add.sprite(width + 110, - 80, 'medals', 1);
            medal.anchor.setTo(0.5, 0.5);
        }

        if (!medal) {
            return;
        }

        game.add.tween(medal)
            .to({y: height - 80}, 1000, Phaser.Easing.Bounce.Out, true);

        setTimeout(addShine, 1010);
    }

    function addShine() {
        var emitter = this.game.add.emitter(medal.x, medal.y, 400);
        emitter.width = medal.width;
        emitter.height = medal.height;

        emitter.makeParticles('particle');

        emitter.setRotation(-100, 100);

        emitter.minParticleScale = 0.25;
        emitter.maxParticleScale = 0.5;

        emitter.setXSpeed(0, 0);
        emitter.setYSpeed(0, 0);

        emitter.setAll('body.allowGravity', false);

        emitter.start(false, 800, 800);
    }

    return scoreBoard;
}