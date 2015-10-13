function scoreBoard(game, score) {

    var medal, bestScore, scoreBoard;

    game.scoreText.setText(score.toString());

    scoreBoard.flap = function () {
        scoreBoard.body.velocity.y = -350;
        game.add.tween(scoreBoard)
            .to({angle: -20}, 100).start();
    };

    scoreBoard.update = function () {
        if (scoreBoard.angle < 90) {
            scoreBoard.angle += 1.5;
        }
    };

    scoreBoard.getX = function () {
        return scoreBoard.world.x;
    };

    return scoreBoard;
}