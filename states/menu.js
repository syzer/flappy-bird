// initial menu
function menu(game) {

    return {

        // before hook
        preload: preload,

        // after preload display game sprites
        create: create,

        // main game loop
        update: update

    };

    function preload() {
    }

    function create() {
        game.add.sprite(0, 0, 'background');

        var ground = newGround(game, 0, 400, 335, 112);
        game.add.existing(ground);

        game.titleGroup = game.add.group();
        var title = game.add.sprite(0, 0, 'title');
        game.titleGroup.add(title);

        var bird = newBird(game, 50, 100);
        game.titleGroup.add(bird);

        bird.animations.add('flap');
        bird.animations.play('flap', 12, true);

        game.titleGroup.x = 30;
        game.titleGroup.y = 30;

        // create an oscillating animation tween for the group
        game.add.tween(game.titleGroup)
            .to({y: 15}, 550, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

        var startButton = game.add.button(WIDTH / 2, HEIGHT/ 2, 'startButton', startClick);
        startButton.anchor.setTo(0.5, 0.5);

        console.log('menu loaded');

    }

    function update() {
    }

    function startClick() {
        console.log('clicked start');
        game.state.start('play');
    }

}

