
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// Core game loop

var wonderCore = {
    getFps: function(fps) {},
    update: function() {},
    render: function() {}
};

var prevTimeStamp = 0;

function loop(timestamp) {

    var deltaTime = timestamp - prevTimeStamp;

    var fps = 1000 / deltaTime;

    wonderCore.getFps(fps);
    wonderCore.update(deltaTime);
    wonderCore.render();

    prevTimeStamp = timestamp;
    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
