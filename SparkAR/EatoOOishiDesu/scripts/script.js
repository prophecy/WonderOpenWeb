/*
Welcome to scripting in Spark AR Studio!
From making things move to triggering audio clips,
reactive programming can help you achieve your scripting goals.

Helpful links:

Scripting Basics - https://fb.me/spark-scripting-basics
Reactive Programming - https://fb.me/spark-reactive-programming
Changelogs - https://fb.me/spark-changelog

Note: Feel free to delete the contents of this script and start from scratch.
*/

// How to load in modules, complete list - https://fb.me/spark-scripting-reference
const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const FaceTracking = require('FaceTracking');
const Reactive = require('Reactive');
const Animation = require('Animation');

// Log mouth openness value
Diagnostics.watch("Mouth Openness - ", FaceTracking.face(0).mouth.openness);
Diagnostics.watch("Mouth Center X ", FaceTracking.face(0).mouth.center.x);
Diagnostics.watch("Mouth Center Y ", FaceTracking.face(0).mouth.center.y);
Diagnostics.watch("Mouth Center Z ", FaceTracking.face(0).mouth.center.z);

// Show/hide quote and it's tweening here
var quote1 = Scene.root.find('quote1');
quote1.hidden = true;

// Handle mouth opennes
const MOUTH_OPENNESS_MIN_THRESHOLD = 0.1;

var mouthOpen = FaceTracking.face(0).mouth.openness.gt(Reactive.val(MOUTH_OPENNESS_MIN_THRESHOLD));

mouthOpen.monitor().subscribe(function() {

    if (FaceTracking.face(0).mouth.openness.pinLastValue() >= MOUTH_OPENNESS_MIN_THRESHOLD) {
    
        Diagnostics.log("Rawww!");
        quote1.hidden = false;

        playQuote();
    }
}) 

//==============================================================================
// Animate quote position
//==============================================================================

// Create a set of time driver parameters
const timeDriverParameters = {

    // The duration of the driver
    durationMilliseconds: 1500,
  
    // The number of iterations before the driver stops
    loopCount: 1,
  
    // Should the driver 'yoyo' back and forth
    mirror: true  
};

// Create a time driver using the parameters
const timeDriver = Animation.timeDriver(timeDriverParameters);

function playQuote() {

    // Get mouth pos
    //const mouthCenterX = FaceTracking.face(0).mouth.center.x.pinLastValue();
    //const mouthCenterY = FaceTracking.face(0).mouth.center.y.pinLastValue();
    //const mouthCenterZ = FaceTracking.face(0).mouth.center.z.pinLastValue();
    //Diagnostics.log("mx: " + mouthCenterX + " my: " + mouthCenterY + " mz: " + mouthCenterZ);
 
    // Translate animation
    const translateXSampler = Animation.samplers.easeInOutQuad(4, 12);
    const translationXAnim = Animation.animate(timeDriver, translateXSampler);

    const translateYSampler = Animation.samplers.easeInOutQuad(-4, -3);
    const translationYAnim = Animation.animate(timeDriver, translateYSampler);

    // Scale animation
    const scaleQuadraticSampler = Animation.samplers.easeInOutQuad(0, 0.16);
    const scaleAnimation = Animation.animate(timeDriver, scaleQuadraticSampler);

    // Bind the translation animation signal to the x-axis position signal of the plane
    quote1.transform.x = translationXAnim;
    quote1.transform.y = translationYAnim;

    quote1.transform.scaleX = scaleAnimation;
    //quote1.transform.scaleY = translationAnimation;
    quote1.transform.scaleZ = scaleAnimation;

    // Start the time driver (unlike value drivers this needs to be done explicitly)
    timeDriver.start(); 
} 