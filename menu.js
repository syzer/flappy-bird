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

        // x, y, width, height, key
        var ground = game.add.tileSprite(0, 400, 280, 112, 'ground');
        // xSpeed, ySpeed
        ground.autoScroll(-200, 0);

        game.titleGroup = game.add.group();
        var title = game.add.sprite(0, 0, 'title');
        game.titleGroup.add(title);

        var bird = game.add.sprite(200, 5, 'bird');
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

