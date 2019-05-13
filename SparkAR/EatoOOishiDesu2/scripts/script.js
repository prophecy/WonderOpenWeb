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
 
// Get quote ref
var quote0 = Scene.root.find('quote0');
var quote1 = Scene.root.find('quote1');
var quote2 = Scene.root.find('quote2');
var quote3 = Scene.root.find('quote3');
var quote4 = Scene.root.find('quote4');
var quote5 = Scene.root.find('quote5');
var quote6 = Scene.root.find('quote6');

var curQuote = quote0;
 
// Indexing quotes
var quoteList = [];
quoteList.push(quote0);
quoteList.push(quote1);
quoteList.push(quote2);
quoteList.push(quote3);
quoteList.push(quote4);
quoteList.push(quote5);
quoteList.push(quote6);

// Hide all quotes
function hideAllQuotes() {

    for (var i=0; i<quoteList.length; ++i) {

        quoteList[i].hidden = true;
    }
}
hideAllQuotes();

// Handle current quote
function changeQuote() { 

    for (var i=0; i<quoteList.length; ++i) {

        if (curQuote === quoteList[i]) {

            // Adjust quote index
            if (i == quoteList.length - 1)
                i = 0;
            else
                ++i;

            // Update current quote
            curQuote = quoteList[i];
        }
    }
}

// Check weather the face is tracked
FaceTracking.face(0).isTracked.monitor().subscribe(function(e) {

    // Untracked to tracked state
    if (e.newValue) {

        // Do nothing
    }
    // Tracked to untracked state
    else {

        hideAllQuotes();
        changeQuote();
    }
});

//var confidenceSub = target.confidence.monitor().subscribe(function (e) {

    //Diagnostics.log("e.newValue: " + e.newValue);
//}); 

// Handle mouth opennes
const MOUTH_OPENNESS_MIN_THRESHOLD = 0.1;
const MOUTH_CLOSSNESS_MAX_THRESHOLD = 0.07;

var mouthOpen = FaceTracking.face(0).mouth.openness.gt(Reactive.val(MOUTH_OPENNESS_MIN_THRESHOLD));
var mouthClose = FaceTracking.face(0).mouth.openness.gt(Reactive.val(MOUTH_CLOSSNESS_MAX_THRESHOLD));

var latestMouthCenterX = 0;
var latestMouthCenterY = 0;
var latestMouthCenterZ = 0;

mouthClose.monitor().subscribe(function() {

    var mouth = FaceTracking.face(0).mouth;

    if (mouth.openness.pinLastValue() <= MOUTH_CLOSSNESS_MAX_THRESHOLD) {

        // Reset counter
        counter = 3;
        hideQuote();
    }
});

mouthOpen.monitor().subscribe(function() {

    var mouth = FaceTracking.face(0).mouth;

    if (mouth.openness.pinLastValue() >= MOUTH_OPENNESS_MIN_THRESHOLD) {
    
        var valXSub = mouth.center.x.monitor().subscribe(function(v) {
            latestMouthCenterX = v.newValue;
            valXSub.unsubscribe();
            playQuoteIfReady();
        });

        var valYSub = mouth.center.y.monitor().subscribe(function(v) {
            latestMouthCenterY = v.newValue;
            valYSub.unsubscribe();
            playQuoteIfReady();
        });

        var valZSub = mouth.center.z.monitor().subscribe(function(v) {
            latestMouthCenterZ = v.newValue;
            valZSub.unsubscribe();
            playQuoteIfReady();
        });
    }
}) 

var counter = 3;

function playQuoteIfReady() {

    --counter;

    if (counter == 0) {
        
        curQuote.hidden = false;
        showQuote();
    }
}

//==============================================================================
// Animate quote position
//==============================================================================

// Create a set of time driver parameters
const showTimeDriverParameters = {

    // The duration of the driver
    durationMilliseconds: 200,
  
    // The number of iterations before the driver stops
    loopCount: 1,
  
    // Should the driver 'yoyo' back and forth
    mirror: true  
};

function showQuote() {

    // Create a time driver using the parameters
    const timeDriver = Animation.timeDriver(showTimeDriverParameters);

    // Translate animation
    const translateXSampler = Animation.samplers.easeInOutQuad(latestMouthCenterX, 9);
    const translationXAnim = Animation.animate(timeDriver, translateXSampler);

    // Todo: remove this tmp
    const tmpYOffset = 1.0;

    const translateYSampler = Animation.samplers.easeInOutQuad(latestMouthCenterY + tmpYOffset, -3);
    const translationYAnim = Animation.animate(timeDriver, translateYSampler);

    // Scale animation
    const scaleQuadraticSampler = Animation.samplers.easeInOutQuad(0, 0.16); 
    const scaleAnimation = Animation.animate(timeDriver, scaleQuadraticSampler);

    // Bind the translation animation signal to the x-axis position signal of the plane
    curQuote.transform.x = translationXAnim;
    curQuote.transform.y = translationYAnim;
    curQuote.transform.z = latestMouthCenterZ;
  
    curQuote.transform.scaleX = scaleAnimation;
    //curQuote.transform.scaleY = translationAnimation;
    curQuote.transform.scaleZ = scaleAnimation;

    // Start the time driver (unlike value drivers this needs to be done explicitly)
    timeDriver.start(); 
} 

const hideTimeDriverParameters = {

    // The duration of the driver
    durationMilliseconds: 100,
  
    // The number of iterations before the driver stops
    loopCount: 1,
  
    // Should the driver 'yoyo' back and forth
    mirror: true  
};

function hideQuote() {

    // Create a time driver using the parameters
    const timeDriver = Animation.timeDriver(hideTimeDriverParameters);

    // Translate animation
    const translateXSampler = Animation.samplers.easeInOutQuad(9, latestMouthCenterX);
    const translationXAnim = Animation.animate(timeDriver, translateXSampler);

    // Todo: remove this tmp
    const tmpYOffset = 1.0;

    const translateYSampler = Animation.samplers.easeInOutQuad(-3, latestMouthCenterY + tmpYOffset);
    const translationYAnim = Animation.animate(timeDriver, translateYSampler);

    // Scale animation
    const scaleQuadraticSampler = Animation.samplers.easeInOutQuad(0.16, 0); 
    const scaleAnimation = Animation.animate(timeDriver, scaleQuadraticSampler);

    // Bind the translation animation signal to the x-axis position signal of the plane
    curQuote.transform.x = translationXAnim;
    curQuote.transform.y = translationYAnim;
    curQuote.transform.z = latestMouthCenterZ; 
  
    curQuote.transform.scaleX = scaleAnimation;
    //curQuote.transform.scaleY = translationAnimation;
    curQuote.transform.scaleZ = scaleAnimation;

    // Start the time driver (unlike value drivers this needs to be done explicitly)
    timeDriver.start(); 

    timeDriver.onAfterIteration().subscribe(function() {

        // Hide current quote
        curQuote.hidden = true;
    });
}