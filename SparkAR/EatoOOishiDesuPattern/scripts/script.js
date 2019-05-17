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
const Patches = require('Patches');
 
// Log mouth openness value
//Diagnostics.watch("Mouth Openness - ", FaceTracking.face(0).mouth.openness);
//Diagnostics.watch("Mouth Center X ", FaceTracking.face(0).mouth.center.x);
//Diagnostics.watch("Mouth Center Y ", FaceTracking.face(0).mouth.center.y);
//Diagnostics.watch("Mouth Center Z ", FaceTracking.face(0).mouth.center.z);
 
handlePatternModule();

// Handle quotes of face [0]
var quoteList0 = [];
quoteList0.push(Scene.root.find('quote00'));
quoteList0.push(Scene.root.find('quote01'));
quoteList0.push(Scene.root.find('quote02'));
quoteList0.push(Scene.root.find('quote03'));
quoteList0.push(Scene.root.find('quote04'));
quoteList0.push(Scene.root.find('quote05'));
quoteList0.push(Scene.root.find('quote06'));

handleQuoteModule(0, quoteList0);

// Handle quotes of face [1]
var quoteList1 = [];
quoteList1.push(Scene.root.find('quote10'));
quoteList1.push(Scene.root.find('quote11'));
quoteList1.push(Scene.root.find('quote12'));
quoteList1.push(Scene.root.find('quote13'));
quoteList1.push(Scene.root.find('quote14'));
quoteList1.push(Scene.root.find('quote15'));
quoteList1.push(Scene.root.find('quote16'));

handleQuoteModule(1, quoteList1);

var facePoint0 = Patches.getVectorValue("facePoint0");
var facePoint1 = Patches.getVectorValue("facePoint1");

//Diagnostics.watch("facePoint0 X ", facePoint0.x);
//Diagnostics.watch("facePoint0 Y ", facePoint0.y);
//Diagnostics.watch("facePoint0 Z ", facePoint0.z);

function handlePatternModule() {

    // Document about animation
    // https://developers.facebook.com/docs/ar-studio/reference/classes/animationmodule.samplerfactory
 
    function moveRow(duration, rowObj, srcX, dstX) {

        // Create a set of time driver parameters
        const timeDriverParameters = {
        
            // The duration of the driver
            durationMilliseconds: duration,
        
            // The number of iterations before the driver stops
            loopCount: Infinity,
        
            // Should the driver 'yoyo' back and forth
            mirror: false
        };
            
        // Create a time driver using the parameters
        const timeDriver = Animation.timeDriver(timeDriverParameters);
        
        // Create a sampler with a quadratic change in and out from -5 to 5
        const quadraticSampler = Animation.samplers.linear(srcX, dstX);
        
        // Create an animation combining the driver and sampler
        const translationAnimation = Animation.animate(timeDriver, quadraticSampler);
        
        rowObj.transform.x = translationAnimation;
        
        // Start the time driver (unlike value drivers this needs to be done explicitly)
        timeDriver.start();	
    }

    var row0 = Scene.root.find('row0');
    var row1 = Scene.root.find('row1');
    var row2 = Scene.root.find('row2');
    var row3 = Scene.root.find('row3');

    var row4 = Scene.root.find('row4');
    var row5 = Scene.root.find('row5');
    var row6 = Scene.root.find('row6');
    var row7 = Scene.root.find('row7');

    moveRow(7500, row0, -10, 10);
    moveRow(7500, row1, 10, -10);
    moveRow(7500, row2, -10, 10);
    moveRow(7500, row3, 10, -10);

    moveRow(7500, row4, -10, 10);
    moveRow(7500, row5, 10, -10);
    moveRow(7500, row6, -10, 10);
    moveRow(7500, row7, 10, -10);
}
 
var sharedQuoteIndex = 0;

function handleQuoteModule(faceIndex, quoteList) {

    if (!!!sharedQuoteIndex)
        sharedQuoteIndex = 0;

    ++sharedQuoteIndex;
    if (sharedQuoteIndex >= quoteList.length)
        sharedQuoteIndex = 0;

    var curQuote = quoteList[sharedQuoteIndex];

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

            if (sharedQuoteIndex === i) {

                // Adjust quote index
                ++sharedQuoteIndex;

                if (sharedQuoteIndex >= quoteList.length)
                    sharedQuoteIndex = 0;

                // Update current quote
                curQuote = quoteList[sharedQuoteIndex];

                break;
            }
        }
    }
    changeQuote();

    // Check weather the face is tracked
    FaceTracking.face(faceIndex).isTracked.monitor().subscribe(function(e) {

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

    var mouthOpen = FaceTracking.face(faceIndex).mouth.openness.gt(Reactive.val(MOUTH_OPENNESS_MIN_THRESHOLD));
    var mouthClose = FaceTracking.face(faceIndex).mouth.openness.gt(Reactive.val(MOUTH_CLOSSNESS_MAX_THRESHOLD));

    var latestMouthCenterX = 0;
    var latestMouthCenterY = 0;
    var latestMouthCenterZ = 0;

    mouthClose.monitor().subscribe(function() {

        var mouth = FaceTracking.face(faceIndex).mouth;

        if (mouth.openness.pinLastValue() <= MOUTH_CLOSSNESS_MAX_THRESHOLD) {

            // Reset counter
            counter = 3;
            hideQuote();
        }
    });

    mouthOpen.monitor().subscribe(function() {

        var mouth = FaceTracking.face(faceIndex).mouth;

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

    const TARGET_QUOTE_SCALE = 0.16;
    var currentQuoteScale = TARGET_QUOTE_SCALE;
    const SCALE_RATIO = 0.02;

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

        var qx = facePoint0.x.pinLastValue();
        var qy = facePoint0.y.pinLastValue();
        var qz = facePoint0.z.pinLastValue();

        if (faceIndex == 1) {

            qx = facePoint1.x.pinLastValue();
            qy = facePoint1.y.pinLastValue();
            qz = facePoint1.z.pinLastValue();
        }

        var range = Math.sqrt(qx*qx + qy*qy + qz*qz);
        
        //Diagnostics.log("Range: " + range);

        // Create a time driver using the parameters
        const timeDriver = Animation.timeDriver(showTimeDriverParameters);

        // Translate animation
        const translateXSampler = Animation.samplers.easeInOutQuad(latestMouthCenterX, 9);
        const translationXAnim = Animation.animate(timeDriver, translateXSampler);

        // Todo: remove this tmp
        const tmpYOffset = 1.0;

        const translateYSampler = Animation.samplers.easeInOutQuad(latestMouthCenterY + tmpYOffset, -3);
        const translationYAnim = Animation.animate(timeDriver, translateYSampler);

        // Get scale factors (Linearly positive correlated with absolute Euclidean distance from camera)
        //     Find distance from quote to camera | Given camera is always be at ( 0, 0, 0 )
        
        currentQuoteScale = TARGET_QUOTE_SCALE * SCALE_RATIO * range;
        
        // Scale animation
        const scaleQuadraticSampler = Animation.samplers.easeInOutQuad(0, currentQuoteScale);
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
        const scaleQuadraticSampler = Animation.samplers.easeInOutQuad(currentQuoteScale, 0);
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
}