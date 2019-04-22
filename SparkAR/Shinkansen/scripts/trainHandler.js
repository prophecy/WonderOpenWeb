
const Scene = require('Scene');
const Reactive = require('Reactive');
const Animation = require('Animation');

var train = Scene.root.find('plane_01');

//==============================================================================
// Animate the plane's horizontal position continuously
//==============================================================================

// Create a set of time driver parameters
const timeDriverParameters = {

    // The duration of the driver
    durationMilliseconds: 5500,

    // The number of iterations before the driver stops
    loopCount: Infinity,

    // Should the driver 'yoyo' back and forth
    mirror: false
};

// Create a time driver using the parameters
const timeDriver = Animation.timeDriver(timeDriverParameters);

// Create a sampler with a quadratic change in and out from -5 to 5
const quadraticSampler = Animation.samplers.easeInOutQuad(-1000, 1000);

// Create an animation combining the driver and sampler
const translationAnimation = Animation.animate(timeDriver, quadraticSampler);

train.transform.x = translationAnimation;

// Start the time driver (unlike value drivers this needs to be done explicitly)
timeDriver.start();