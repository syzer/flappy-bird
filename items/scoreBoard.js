function newScoreBoard(game, spec) {

    var width = game.width / 2 - 110;
    var height = game.height / 2 - 110;

    var medal,
        scores = {
            score: spec.score || 0,
            scoreBest: 0
        },
        scoreBoard = game.add.group();

    // warning .. ugly
    updateScoreBest();

    //TODO as group and sane positioning.
    scoreBoard.display = function () {
        var currentScore = game.add.bitmapText(
            width, height,
            'flappyFont', 'Current score: ' + scores.score, 24
        );

        var topScore = game.add.bitmapText(
            width, height - 40,
            'flappyFont', 'Highest score: ' + scores.scoreBest, 24
        );

        scoreBoard.add(currentScore);
        scoreBoard.add(topScore);

        maybeGiveMedal();

        game.world.bringToTop(scoreBoard);
        game.add.tween(scoreBoard)
            .to({y: height - 140}, 1000, Phaser.Easing.Bounce.Out, true);
    };

    function updateScoreBest() {
        var prevScoreBest = localStorage.getItem('scoreBest') || 0;

        scores.scoreBest = Math.max(scores.score, prevScoreBest);
        localStorage.setItem('scoreBest', scores.scoreBest);
        return scores.scoreBest;
    }

    // TODO add bronze medal
    // maybe relative positioning
    // maybe whole scoreBoard Bounce out
    function maybeGiveMedal() {
        if (scores.score >= 1 && scores.score <= 5) {
            medal = game.add.sprite(width + 110, -80, 'medals', 0);
            medal.anchor.setTo(0.5, 0.5);
        } else if (scores.score > 5) {
            medal = game.add.sprite(width + 110, -80, 'medals', 1);
            medal.anchor.setTo(0.5, 0.5);
        }

        // ugliness behind that point
        if (!medal) {
            return;
        }

        scoreBoard.add(medal);

        game.add.tween(medal)
            .to({y: height - 80}, 1000, Phaser.Easing.Bounce.Out, true);

        setTimeout(addShine, 1010);
    }

    function addShine() {
        var emitter = game.add.emitter(medal.x, medal.y, 400);

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

        scoreBoard.add(emitter);
    }

    return scoreBoard;
}