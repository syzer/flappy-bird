function play(game) {

    return {

        // before hook
        preload: preload,

        // after preload display game sprites
        create: create,

        // 60 fps
        update: update

    };

    function preload() {
    }

    function create() {
        console.log('PLAY ITS AWESOME');
    }

    function update() {
        //if (!bird.inWorld) {
        //    restart();
        //}
    }



}

