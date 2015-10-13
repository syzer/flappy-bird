function newScoreBoard(game, spec) {

    var medal,
        scoreBoard = {
            score: spec.score || 0,
            scoreBest: 0
        };

    updateScoreBest();

    //TODO as group and sane positioning.
    scoreBoard.display = function() {
        var score = game.add.bitmapText(
            game.width / 2 - 110, game.height / 2 - 140,
            'flappyFont', 'Current score: ' + scoreBoard.score, 24
        );

        var scoreBest = game.add.bitmapText(
            game.width / 2 - 110, game.height / 2 - 170,
            'flappyFont', 'Highest score: ' + scoreBoard.scoreBest, 24
        );
    };

    function updateScoreBest() {
        var prevScoreBest = localStorage.getItem('scoreBest') || 0;

        scoreBoard.scoreBest = Math.max(scoreBoard.score, prevScoreBest);
        localStorage.setItem('scoreBest', scoreBoard.scoreBest);
        return scoreBoard.scoreBest;
    }

    return scoreBoard;
}