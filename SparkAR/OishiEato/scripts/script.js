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
const Patches = require('Patches');
const Animation = require('Animation');
const Time = require('Time');
 
function axisRotation(axis_x, axis_y, axis_z, angle_degrees) {
    var norm = Math.sqrt(axis_x*axis_x + axis_y*axis_y + axis_z*axis_z);
    axis_x /= norm;
    axis_y /= norm;
    axis_z /= norm;
    var angle_radians = angle_degrees * Math.PI / 180.0;
    var cos = Math.cos(angle_radians/2);
    var sin = Math.sin(angle_radians/2);
    return Reactive.rotation(
        cos, axis_x*sin, axis_y*sin, axis_z*sin);
}

// Log mouth openness value
//Diagnostics.watch("Mouth Openness - ", FaceTracking.face(0).mouth.openness);
//Diagnostics.watch("Mouth Center X ", FaceTracking.face(0).mouth.center.x);
//Diagnostics.watch("Mouth Center Y ", FaceTracking.face(0).mouth.center.y);
//Diagnostics.watch("Mouth Center Z ", FaceTracking.face(0).mouth.center.z);
 
//handlePatternModule();

// Handle bubbles of face [0]
var bubbleList0 = [];
bubbleList0.push(Scene.root.find('bubble00'));
bubbleList0.push(Scene.root.find('bubble01'));
bubbleList0.push(Scene.root.find('bubble02'));
bubbleList0.push(Scene.root.find('bubble03'));
bubbleList0.push(Scene.root.find('bubble04'));
bubbleList0.push(Scene.root.find('bubble05'));
bubbleList0.push(Scene.root.find('bubble06'));

handleBubbles(0, bubbleList0);

// Handle bubbles of face [1]
var bubbleList1 = [];
bubbleList1.push(Scene.root.find('bubble10'));
bubbleList1.push(Scene.root.find('bubble11'));
bubbleList1.push(Scene.root.find('bubble12'));
bubbleList1.push(Scene.root.find('bubble13'));
bubbleList1.push(Scene.root.find('bubble14'));
bubbleList1.push(Scene.root.find('bubble15'));
bubbleList1.push(Scene.root.find('bubble16'));

handleBubbles(1, bubbleList1);

var facePoint0 = Patches.getVectorValue("facePoint0");
var facePoint1 = Patches.getVectorValue("facePoint1");

//Diagnostics.watch("facePoint0 X ", facePoint0.x);
//Diagnostics.watch("facePoint0 Y ", facePoint0.y);
//Diagnostics.watch("facePoint0 Z ", facePoint0.z);

// Front
applyBalloonMovement(
    Scene.root.find('gyoza_front_plane0'), 
    0.6, 0.4, 0.2,
    1500, -3000, 4500);

applyBalloonMovement(
    Scene.root.find('gyoza_front_plane1'), 
    0.6, 0.2, 0.4,
    3000, -1500, 4500);

applyBalloonMovement(
    Scene.root.find('gyoza_front_plane2'), 
    0.4, 0.6, 0.2, 
    3000, -4500, 1500);

// Back
/*
applyBalloonMovement(
    Scene.root.find('gyoza_back_plane0'), 
    0.2, 0.4, 0.6,
    1500, 3000, 4500);

applyBalloonMovement(
    Scene.root.find('gyoza_back_plane1'), 
    0.2, 0.6, 0.4,
    3000, -1500, 4500);

applyBalloonMovement(
    Scene.root.find('gyoza_back_plane2'), 
    0.4, 0.6, 0.2, 
    4500, 1500, 3000);

applyBalloonMovement(
    Scene.root.find('gyoza_back_plane3'), 
    0.4, 0.6, 0.2, 
    4500, 3000, 1500);
/*/
applyRotationBounce(
    Scene.root.find('gyoza_back_plane0'), 
    10, 50, 2000
);
applyRotationBounce(
    Scene.root.find('gyoza_back_plane1'), 
    20, 60, 2100
);
applyRotationBounce(
    Scene.root.find('gyoza_back_plane2'), 
    0, 40, 2200
);
applyRotationBounce(
    Scene.root.find('gyoza_back_plane3'), 
    15, 45, 2300
);
applyRotationBounce(
    Scene.root.find('gyoza_back_plane4'), 
    25, 51, 2050
);
applyRotationBounce(
    Scene.root.find('gyoza_back_plane5'), 
    17, 48, 2250
);
applyRotationBounce(
    Scene.root.find('gyoza_back_plane6'), 
    12, 56, 2100
);
/**/

applyParalaxMovement(
    Scene.root.find('front_root'),
    Scene.root.find('back_root'),
    0.1, 0.1);

// --------------------------------------------------------------------------------
// MOVEMENT EFFECT
// --------------------------------------------------------------------------------

function applyBalloonMovement(obj, rx, ry, rz, tx, ty, tz) {

    var originList = [
        obj.transform.x.pinLastValue(), 
        obj.transform.y.pinLastValue(), 
        obj.transform.z.pinLastValue()
    ];

    var radiousList = [rx, ry, rz];
    var timeList = [tx, ty, tz];
    var transAnimList = [];

    for (var i=0; i<3; ++i) {

        const showTimeDriverParameters = {
            durationMilliseconds: timeList[i],
            loopCount: Infinity,
            mirror: true  
        };

        const timeDriver = Animation.timeDriver(showTimeDriverParameters);

        // Translate animation
        const curRadious = radiousList[i];
        const min = originList[i] - curRadious;
        const max = originList[i] + curRadious;
        const transSampler = Animation.samplers.easeInOutQuad(min, max);
        const transAnim = Animation.animate(timeDriver, transSampler);
    
        transAnimList.push(transAnim);

        timeDriver.start();
    }

    obj.transform.x = transAnimList[0];
    obj.transform.y = transAnimList[1];
    obj.transform.z = transAnimList[2];
}

function applyParalaxMovement(fLayer, bLayer, fw, bw) {

    fLayer.transform.x = Reactive.mul(facePoint0.x, fw);
    fLayer.transform.y = Reactive.mul(facePoint0.y, fw);
    bLayer.transform.x = Reactive.mul(facePoint0.x, -bw);
    bLayer.transform.y = Reactive.mul(facePoint0.y, -bw);
}

function applyRotationBounce(obj, minAngle, maxAngle, duration) {

    var time_driver = Animation.timeDriver({
        durationMilliseconds: duration,
        loopCount: Infinity
    });

    // Create a rotation sampler using Rotation objects generated
    // by the previously-defined axisRotation() method.
    var rotation_sampler = Animation.samplers.polyline({
        keyframes: [
            axisRotation(0,1,0,minAngle),
            axisRotation(0,1,0,maxAngle),
            axisRotation(0,1,0,minAngle),
        ],
        knots: [
            0, 1, 2
        ]
    });

    // Start the animation
    var rotation_signal = Animation.animate(time_driver, rotation_sampler);
    
    obj.transform.rotation = rotation_signal;

    time_driver.start();
}

// --------------------------------------------------------------------------------
// BUBBLE MODULE
// --------------------------------------------------------------------------------

// Use this var to handle bubble between face 1 and face 2
var sharedBubbleIndex = 0;
var showingBubbleIndex = -1;

function handleBubbles(faceIndex, bubbleList) {

    if (!!!sharedBubbleIndex)
        sharedBubbleIndex = 0;

    ++sharedBubbleIndex;
    if (sharedBubbleIndex >= bubbleList.length)
        sharedBubbleIndex = 0;

    var curBubble = bubbleList[sharedBubbleIndex];

    // Hide all bubbles
    function hideAllBubbles() {

        for (var i=0; i<bubbleList.length; ++i) {

            bubbleList[i].hidden = true;
        }
    } 
    hideAllBubbles();
 
    // Handle current bubble
    function changeBubble() {  

        for (var i=0; i<bubbleList.length; ++i) {

            if (sharedBubbleIndex === i) {

                // Adjust bubble index
                ++sharedBubbleIndex;

                if (sharedBubbleIndex >= bubbleList.length)
                    sharedBubbleIndex = 0;

                // Update current bubble
                curBubble = bubbleList[sharedBubbleIndex];

                break;
            }
        }
    }
    changeBubble();

    // Check weather the face is tracked
    FaceTracking.face(faceIndex).isTracked.monitor().subscribe(function(e) {

        // Untracked to tracked state
        if (e.newValue) {

            showBubble();
        }
        // Tracked to untracked state
        else {

            hideBubble();
            changeBubble();
        }
    }); 
 
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
            //hideBubble();
            //changeBubble();
            stopFeed();
        }
    });

    mouthOpen.monitor().subscribe(function() {

        var mouth = FaceTracking.face(faceIndex).mouth;

        if (mouth.openness.pinLastValue() >= MOUTH_OPENNESS_MIN_THRESHOLD) {
        
            var valXSub = mouth.center.x.monitor().subscribe(function(v) {
                latestMouthCenterX = v.newValue;
                valXSub.unsubscribe();
                feedIfReady();
            });

            var valYSub = mouth.center.y.monitor().subscribe(function(v) {
                latestMouthCenterY = v.newValue;
                valYSub.unsubscribe();
                feedIfReady();
            });

            var valZSub = mouth.center.z.monitor().subscribe(function(v) {
                latestMouthCenterZ = v.newValue;
                valZSub.unsubscribe();
                feedIfReady();
            });
        }
    })

    var counter = 3;

    function feedIfReady() {

        --counter;

        if (counter == 0) {

            // Update testy target
            var mouth = FaceTracking.face(faceIndex).mouth;
            testyTarget.transform.x = mouth.center.x;
            testyTarget.transform.y = mouth.center.y;
            testyTarget.transform.z = mouth.center.z;

            const timeInMilliseconds = 50;
            const intervalTimer = Time.setInterval(shouldStartFeed, timeInMilliseconds);

            function shouldStartFeed() { 
                Time.clearInterval(intervalTimer);
                startFeed(testyPoolList);
            }
        }
    }

    // --------------------------------------------------------------------------------
    // Testy pool

    var testyPoolList = [];

    var srcObj = Scene.root.find('testyPool');

    testyPoolList.push(Scene.root.find('testy0'));
    testyPoolList.push(Scene.root.find('testy1'));
    testyPoolList.push(Scene.root.find('testy2'));
    testyPoolList.push(Scene.root.find('testy3'));
    testyPoolList.push(Scene.root.find('testy4'));
    testyPoolList.push(Scene.root.find('testy5'));
    testyPoolList.push(Scene.root.find('testy6'));
    testyPoolList.push(Scene.root.find('testy7'));
    testyPoolList.push(Scene.root.find('testy8'));
    testyPoolList.push(Scene.root.find('testy9'));

    var testyTarget = Scene.root.find('testyTarget0');

    var feedTimeDriverList = [];

    var crushPoolList = [];

    var crushRoot = Scene.root.find('crushPool');

    crushPoolList.push(Scene.root.find('crush0'));
    crushPoolList.push(Scene.root.find('crush1'));
    crushPoolList.push(Scene.root.find('crush2'));
    crushPoolList.push(Scene.root.find('crush3'));
    crushPoolList.push(Scene.root.find('crush4'));
    crushPoolList.push(Scene.root.find('crush5'));
    crushPoolList.push(Scene.root.find('crush6'));
    crushPoolList.push(Scene.root.find('crush7'));
    crushPoolList.push(Scene.root.find('crush8'));
    crushPoolList.push(Scene.root.find('crush9'));

    var crushTimeDriverList = [];

    crushRoot.hidden = true;

    crushRoot.transform.x = testyTarget.transform.x;
    crushRoot.transform.y = testyTarget.transform.y;
    crushRoot.transform.z = testyTarget.transform.z;
    
    function startFeed(objList) {

        // Stop the old event before starting it again
        stopFeed();

        srcObj.hidden = false;
        crushRoot.hidden = false;

        const timeInMilliseconds = 120;
        const intervalTimer = Time.setInterval(shouldStartFeed, timeInMilliseconds);
        var feedIndex = 0;

        const crushTimeInMilliseconds = 100;
        const crushIntervalTimer = Time.setInterval(shouldStartCrush, crushTimeInMilliseconds);
        var crushIndex = 0;

        function shouldStartFeed() {

            runFeedInterval(objList, feedIndex++);

            if (feedIndex >= objList.length) {

                Time.clearInterval(intervalTimer);
            }                
        }

        function shouldStartCrush() {

            runCrushInterval(objList, crushIndex++);

            if (crushIndex >= objList.length) {

                Time.clearInterval(crushIntervalTimer);
            }
        }

        var xPointList = [];
        var xVariant = 4.0;

        // Set 1
        xPointList.push(-4.64605);  xPointList.push(2.01145);   xPointList.push(0.15905);   xPointList.push(-5.46574);
        xPointList.push(1.48324);   xPointList.push(-0.88440);  xPointList.push(5.19227);   xPointList.push(-0.17623);
        xPointList.push(-4.53221);  xPointList.push(3.80409);
        // Set 2
        xPointList.push(-0.58917);  xPointList.push(-7.88229);  xPointList.push(0.28566);   xPointList.push(-2.71326);
        xPointList.push(-4.56251);  xPointList.push(1.48852);   xPointList.push(7.26982);   xPointList.push(-1.98159);
        xPointList.push(-4.68881);  xPointList.push(5.47105);
        
        var yPointList = [];
        var yVariant = 4.0;

        // Set 1
        yPointList.push(-4.02526);  yPointList.push(3.29644);   yPointList.push(-4.92173);  yPointList.push(4.44748);
        yPointList.push(1.83189);   yPointList.push(5.47964);   yPointList.push(3.90241);   yPointList.push(-5.72946);
        yPointList.push(-0.65139);  yPointList.push(5.41456);
        // Set 2
        yPointList.push(-5.93434);  yPointList.push(4.94540);   yPointList.push(5.72991);   yPointList.push(-6.85919);
        yPointList.push(-4.76642);  yPointList.push(2.35872);   yPointList.push(-3.66115);  yPointList.push(2.37872);
        yPointList.push(2.26890);   yPointList.push(-6.83019);

        var yAngleList = [];
        var yAngleVariant = 180.0;

        yAngleList.push(0.88630); yAngleList.push(-0.34092); yAngleList.push(-0.36846); yAngleList.push(0.48486); 
        yAngleList.push(-0.67216); yAngleList.push(0.76679); yAngleList.push(-0.03117); yAngleList.push(0.98991); 
        yAngleList.push(0.38995); yAngleList.push(-0.14609); 

        const FEED_SET_COUNT = 8;
        var curSet = 0;

        var crushYAngleList = [];
        crushYAngleList.push(0.11449);    crushYAngleList.push(0.55922);    
        crushYAngleList.push(0.21852);    crushYAngleList.push(0.09600);
        crushYAngleList.push(0.82530);    crushYAngleList.push(0.95081);    
        crushYAngleList.push(0.84250);    crushYAngleList.push(0.77527);    
        crushYAngleList.push(0.85664);    crushYAngleList.push(0.53096);
        
        var crushNormDirList = [];
        
        for (var i=0; i<crushYAngleList.length; ++i) {

            var rad = crushYAngleList[i] * 2.0 * Math.PI;
            var xNorm = Math.cos(rad);
            var yNorm = Math.sin(rad);

            var tmp = [];
            tmp.push(xNorm);
            tmp.push(yNorm);

            crushNormDirList.push(tmp);
        }

        function runCrushInterval(objList, index) {

            // Manipulate crush angle
            const crushInterval = {
                durationMilliseconds: 300,
                loopCount: Infinity,
                mirror: false  
            };
            var crushTimeDriver = Animation.timeDriver(crushInterval);

             Diagnostics.log("tmp: " + crushNormDirList[index]);
            
            const cxSamp = Animation.samplers.easeInOutQuad(
                0,
                crushNormDirList[index][0] * 7.0
            );
            const cxAnim = Animation.animate(crushTimeDriver, cxSamp);

            const cySamp = Animation.samplers.easeInOutQuad(
                0,
                crushNormDirList[index][1] * 7.0
            );
            const cyAnim = Animation.animate(crushTimeDriver, cySamp);

            const czSamp = Animation.samplers.easeInOutQuad(
                0,
                7.0
            );
            const czAnim = Animation.animate(crushTimeDriver, czSamp);

            crushPoolList[index].transform.x = cxAnim;
            crushPoolList[index].transform.y = cyAnim;
            crushPoolList[index].transform.z = czAnim;

            crushTimeDriver.start();

            if (!(crushTimeDriverList.length > index))
                crushTimeDriverList.push(crushTimeDriver);
            else
                crushTimeDriverList[index] = crushTimeDriver;
        }

        function runFeedInterval(objList, index) {

            if (index == FEED_SET_COUNT - 1)
                curSet = (curSet == 0) ? FEED_SET_COUNT : 0; 

            // Manipulate position transition

            const shootFoodInterval = {
                durationMilliseconds: 800,
                loopCount: Infinity,
                mirror: false  
            };
    
            var feedTimeDriver = Animation.timeDriver(shootFoodInterval);
    
            const txSamp = Animation.samplers.easeInOutQuad(
                xPointList[index + curSet] * xVariant, 
                testyTarget.transform.x.pinLastValue() - srcObj.transform.x.pinLastValue());
            const txAnim = Animation.animate(feedTimeDriver, txSamp);
    
            const tySamp = Animation.samplers.easeInOutQuad(
                yPointList[index + curSet] * yVariant, 
                testyTarget.transform.y.pinLastValue() - srcObj.transform.y.pinLastValue());
            const tyAnim = Animation.animate(feedTimeDriver, tySamp);
    
            const tzSamp = Animation.samplers.easeInOutQuad(
                0, 
                testyTarget.transform.z.pinLastValue() - srcObj.transform.z.pinLastValue());
            const tzAnim = Animation.animate(feedTimeDriver, tzSamp);
            
            //Diagnostics.log("obj idx: " + objList[index]);

            objList[index].transform.x = txAnim;
            objList[index].transform.y = tyAnim;
            objList[index].transform.z = tzAnim;

            feedTimeDriver.start();

            if (!(feedTimeDriverList.length > index))
                feedTimeDriverList.push(feedTimeDriver);
            else
                feedTimeDriverList[index] = feedTimeDriver;

            // Manipulate angle 
            var curRot = yAngleList[index] * yAngleVariant;

            var qRotDriver = Animation.timeDriver({
                durationMilliseconds: 1000,
                loopCount: 1
            });
            var qRotsampler = Animation.samplers.polyline({
                keyframes: [
                    axisRotation(0, 0, 1, 0),
                    axisRotation(0, 0, 1, curRot),
                ],
                knots: [
                    0, 1
                ]
            });
            var qRotSignal = Animation.animate(qRotDriver, qRotsampler);
            qRotDriver.start(); 
 
            objList[index].transform.rotation = qRotSignal;
        }
    }

    function stopFeed() {

        for (var i=0; i<feedTimeDriverList.length; ++i)
            feedTimeDriverList[i].stop();

        for (var i=0; i<testyPoolList.length; ++i) {

            testyPoolList[i].transform.x = 0;     
            testyPoolList[i].transform.y = 0;     
            testyPoolList[i].transform.z = 0;     
        }
            
        srcObj.hidden = true;

        for (var i=0; i<crushTimeDriverList.length; ++i)
            crushTimeDriverList[i].stop();

        for (var i=0; i<crushTimeDriverList.length; ++i) {

            crushPoolList[i].transform.x = 0;
            crushPoolList[i].transform.y = 0;
            crushPoolList[i].transform.z = 0;
        }

        crushRoot.hidden = true;
    }

    // --------------------------------------------------------------------------------
    // Bubble animation

    const TARGET_BUBBLE_SCALE = 0.16;
    var curBubbleScale = TARGET_BUBBLE_SCALE;
    const SCALE_RATIO = 0.02;
    var shownBubbleX = 9; // Init with default value
    const X_SIDE_WEIGHT = 0.2;

    // Create a set of time driver parameters
    const showTimeDriverParameters = {

        // The duration of the driver
        durationMilliseconds: 200,
    
        // The number of iterations before the driver stops
        loopCount: 1,
    
        // Should the driver 'yoyo' back and forth
        mirror: false  
    };

    const BUBBLE_POSITION_Y = 0;

    function showBubble() {

        if (showingBubbleIndex != -1)
            return;
        showingBubbleIndex = faceIndex;

        curBubble.hidden = false;

        var qx = facePoint0.x.pinLastValue();
        var qy = facePoint0.y.pinLastValue();
        var qz = facePoint0.z.pinLastValue();

        if (faceIndex == 1) {

            qx = facePoint1.x.pinLastValue();
            qy = facePoint1.y.pinLastValue();
            qz = facePoint1.z.pinLastValue();
        }

        // Use this value to select bubble showing side
        var xSideNorm = -1.0 * (qx / Math.abs(qx));

        var range = Math.sqrt(qx*qx + qy*qy + qz*qz);

        // Create a time driver using the parameters
        const timeDriver = Animation.timeDriver(showTimeDriverParameters);

        // Translate animation
        //const translateXSampler = Animation.samplers.easeInOutQuad(latestMouthCenterX, range * xSideWeight);
        //const translationXAnim = Animation.animate(timeDriver, translateXSampler);

        //const translateYSampler = Animation.samplers.easeInOutQuad(latestMouthCenterY, BUBBLE_POSITION_Y);
        //const translationYAnim = Animation.animate(timeDriver, translateYSampler);

        shownBubbleX = range * xSideNorm * X_SIDE_WEIGHT;

        // Get scale factors (Linearly positive correlated with absolute Euclidean distance from camera)
        //     Find distance from bubble to camera | Given camera is always be at ( 0, 0, 0 )
        
        curBubbleScale = TARGET_BUBBLE_SCALE * SCALE_RATIO * range;
        
        // Scale animation
        const scaleQuadraticSampler = Animation.samplers.easeInOutQuad(0, curBubbleScale);
        const scaleAnimation = Animation.animate(timeDriver, scaleQuadraticSampler);

        // Bind the translation animation signal to the x-axis position signal of the plane
        //curBubble.transform.x = translationXAnim;
        //curBubble.transform.y = translationYAnim;
        curBubble.transform.x = shownBubbleX;
        curBubble.transform.y = BUBBLE_POSITION_Y;
        curBubble.transform.z = latestMouthCenterZ;
    
        curBubble.transform.scaleX = scaleAnimation;
        curBubble.transform.scaleZ = scaleAnimation;

        // Start the time driver (unlike value drivers this needs to be done explicitly)
        timeDriver.start();
    } 

    const hideTimeDriverParameters = {

        // The duration of the driver
        durationMilliseconds: 100,
    
        // The number of iterations before the driver stops
        loopCount: 1,
    
        // Should the driver 'yoyo' back and forth
        mirror: false  
    };

    function hideBubble() {

        if (showingBubbleIndex != faceIndex)
            return;

        // Create a time driver using the parameters
        const timeDriver = Animation.timeDriver(hideTimeDriverParameters);

        // Translate animation
        //const translateXSampler = Animation.samplers.easeInOutQuad(shownBubbleX, latestMouthCenterX);
        //const translationXAnim = Animation.animate(timeDriver, translateXSampler);

        //const translateYSampler = Animation.samplers.easeInOutQuad(BUBBLE_POSITION_Y, latestMouthCenterY);
        //const translationYAnim = Animation.animate(timeDriver, translateYSampler);

        // Scale animation
        const scaleQuadraticSampler = Animation.samplers.easeInOutQuad(curBubbleScale, 0);
        const scaleAnimation = Animation.animate(timeDriver, scaleQuadraticSampler);

        // Bind the translation animation signal to the x-axis position signal of the plane
        //curBubble.transform.x = translationXAnim;
        //curBubble.transform.y = translationYAnim;
        //curBubble.transform.z = latestMouthCenterZ; 
    
        curBubble.transform.scaleX = scaleAnimation;
        curBubble.transform.scaleZ = scaleAnimation;

        // Start the time driver (unlike value drivers this needs to be done explicitly)
        timeDriver.start(); 

        var handler = timeDriver.onAfterIteration().subscribe(function() {

            // Hide current bubble
            curBubble.hidden = true;

            if (showingBubbleIndex == faceIndex)
                showingBubbleIndex = -1;

            handler.unsubscribe();
        });
    }       
}