
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// Core game loop

function stackTrace() {
    var err = new Error();
    return err.stack;
}

var wonderCore = {
    fpsText: undefined,
    getFps: function(fps) { if (!!this.fpsText) this.fpsText.html("FPS: " + fps); },
    start: function() {},
    update: function() {},
    render: function() {},
    log: function(val) { console.log(val); console.log(stackTrace()) },
};

var prevTimeStamp = 0;

function loop(timestamp) {

    var dt = timestamp - prevTimeStamp;

    // Get FPS
    var fps = 1000 / dt;
    wonderCore.getFps(fps);

    // Update loop with delta time
    wonderCore.update(dt);

    // Render function
    wonderCore.render();

    // Request runloop
    prevTimeStamp = timestamp;
    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
