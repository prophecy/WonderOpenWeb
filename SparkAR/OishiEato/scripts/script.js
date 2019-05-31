
// --------------------------------------------------------------------------------
// IMPORT EXTERNAL MODULES
// --------------------------------------------------------------------------------

const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const FaceTracking = require('FaceTracking');
const Reactive = require('Reactive');
const Patches = require('Patches');
const Animation = require('Animation');
const Time = require('Time');

// --------------------------------------------------------------------------------
// SHARED VARS & CALLBACKS
// --------------------------------------------------------------------------------

// Todo: Remove these
var feedTimeDriverList = [];
var crushTimeDriverList = [];

// --------------------------------------------------------------------------------
// SCENE DATABASE
// --------------------------------------------------------------------------------

// Handle bubbles of face #0
var bubbleList0 = [];
bubbleList0.push(Scene.root.find('bubble00'));
bubbleList0.push(Scene.root.find('bubble01'));
bubbleList0.push(Scene.root.find('bubble02'));
bubbleList0.push(Scene.root.find('bubble03'));
bubbleList0.push(Scene.root.find('bubble04'));
bubbleList0.push(Scene.root.find('bubble05'));
bubbleList0.push(Scene.root.find('bubble06'));

// Verify
for (var i=0; i<bubbleList0.length; ++i)
    if (bubbleList0[i] === undefined)
        Diagnostics.log("obj is undefined");

// Handle bubbles of face #1
var bubbleList1 = [];
bubbleList1.push(Scene.root.find('bubble10'));
bubbleList1.push(Scene.root.find('bubble11'));
bubbleList1.push(Scene.root.find('bubble12'));
bubbleList1.push(Scene.root.find('bubble13'));
bubbleList1.push(Scene.root.find('bubble14'));
bubbleList1.push(Scene.root.find('bubble15'));
bubbleList1.push(Scene.root.find('bubble16'));

// Verify
for (var i=0; i<bubbleList1.length; ++i)
    if (bubbleList1[i] === undefined)
        Diagnostics.log("obj is undefined");

var srcObj = Scene.root.find('testyPool');

var foodFeederRoot0 = Scene.root.find('footFeederRoot0');

var testyPoolList = [];
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

var crushRoot = Scene.root.find('crushPool');

var crushPoolList = [];
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

const facePoint0 = Patches.getVectorValue("facePoint0");
const facePoint1 = Patches.getVectorValue("facePoint1");

const frontRoot = Scene.root.find('front_root');
const backRoot = Scene.root.find('back_root');

const MOUTH_OPENNESS_MIN_THRESHOLD = 0.1;
const MOUTH_CLOSSNESS_MAX_THRESHOLD = 0.07;

// --------------------------------------------------------------------------------
// THEME VARS
// --------------------------------------------------------------------------------

// GYOZA
const gyozaFrontPlane0 = Scene.root.find('gyoza_front_plane0');
const gyozaBackPlane1 = Scene.root.find('gyoza_back_plane1');
const gyozaBackPlane2 = Scene.root.find('gyoza_back_plane2');

// --------------------------------------------------------------------------------
// SCENE LOGIC
// --------------------------------------------------------------------------------

//Diagnostics.watch("facePoint0 X ", facePoint0.x);
//Diagnostics.watch("facePoint0 Y ", facePoint0.y);
//Diagnostics.watch("facePoint0 Z ", facePoint0.z);

//Diagnostics.watch("Mouth Openness - ", FaceTracking.face(0).mouth.openness);
//Diagnostics.watch("Mouth Center X ", FaceTracking.face(0).mouth.center.x);
//Diagnostics.watch("Mouth Center Y ", FaceTracking.face(0).mouth.center.y);
//Diagnostics.watch("Mouth Center Z ", FaceTracking.face(0).mouth.center.z);

// --------------------------------------------------------------------------------
// @ START

// Handle movements
applyBalloonMovement(gyozaFrontPlane0, 0.6, 0.4, 0.2, 1500, -3000, 4500);
applyRotationBounce(gyozaBackPlane1, 20, 40, 600);
applyRotationBounce(gyozaBackPlane2, 20, 40, 1000);
applyParalaxMovement(frontRoot, backRoot, 0.1, 0.1);

// Init food feeder
const FOOD_FEEDER_RANGE = 50.0;

foodFeederRoot0.hidden = true;
initFoodFeeder(testyPoolList, crushPoolList, FOOD_FEEDER_RANGE);

// --------------------------------------------------------------------------------
// @ FACE DETECTED

// Bubble transformations
const X_SIDE_WEIGHT = 0.14; 
const BUBBLE_POSITION_Y = -8.8;
const TARGET_BUBBLE_SCALE = 0.0032;

// Bubble list mgr vars
var currentBibbleIndex = 0;
const BUBBLE_SIZE = bubbleList0.length;
var isBubbleVisible = false;
var curFaceOwnBubble = -1;

// Hide all bubbles
function hideAllBubbles(bubbleList) {
    for (var i=0; i<bubbleList.length; ++i)
        bubbleList[i].hidden = true;
} 
    
hideAllBubbles(bubbleList0);
hideAllBubbles(bubbleList1);
    
function onFaceTracked(faceIndex) {

    var curBubble = undefined;
    var curFacePoint = undefined;

    if (faceIndex == 0) {

        Diagnostics.log("Face #0 is tracked");
        curBubble = bubbleList0[currentBibbleIndex];
        curFacePoint = facePoint0;
    }
    else if (faceIndex == 1) {

        Diagnostics.log("Face #1 is tracked");
        curBubble = bubbleList1[currentBibbleIndex];
        curFacePoint = facePoint1;
    }

    // Check is in front of the other
    if (!isBubbleVisible) {

        showBubble(curBubble, curFacePoint, X_SIDE_WEIGHT, BUBBLE_POSITION_Y, TARGET_BUBBLE_SCALE);
        curFaceOwnBubble = faceIndex;
    }
    
    isBubbleVisible = true;
}

function onFaceUntracked(faceIndex) {

    var curBubble = undefined;
 
    if (faceIndex == 0)
        curBubble = bubbleList0[currentBibbleIndex];
    else if (faceIndex == 1)
        curBubble = bubbleList1[currentBibbleIndex];

    hideBubble(curBubble);

    if (! (++currentBibbleIndex < BUBBLE_SIZE))
        currentBibbleIndex = 0;

    isBubbleVisible = false;
}

handleFaceTrackingState(0, function() { onFaceTracked(0); }, function() { onFaceUntracked(0); });
handleFaceTrackingState(1, function() { onFaceTracked(1); }, function() { onFaceUntracked(1); });

// --------------------------------------------------------------------------------
// @ OPEN MOUTH

function onFace0MouthOpen() {

    Diagnostics.log("onFace0MouthOpen"); 

    var mouth = FaceTracking.face(0).mouth;
    
    foodFeederRoot0.transform.x = mouth.center.x;
    foodFeederRoot0.transform.y = mouth.center.y;
    foodFeederRoot0.transform.z = mouth.center.z;

    foodFeederRoot0.hidden = false;
}

function onFace0MouthClose() {

    Diagnostics.log("onFaceMouthClose");

    foodFeederRoot0.hidden = true;
}

handleMouthOpeningState(
    0, 
    MOUTH_OPENNESS_MIN_THRESHOLD, MOUTH_CLOSSNESS_MAX_THRESHOLD, 
    onFace0MouthOpen, onFace0MouthClose);


// --------------------------------------------------------------------------------
// GENERIC FUNCTIONS
// --------------------------------------------------------------------------------

// Handle mouth opennes

// TRICKED: Use this line to bind signal 
//var mouth = FaceTracking.face(faceIndex).mouth;
       
function handleMouthOpeningState(faceIndex, openMinThres, closeMaxThres, openCallback, closCallback) {

    var mouthOpen = FaceTracking.face(faceIndex).mouth.openness.gt(Reactive.val(openMinThres));
    var mouthClose = FaceTracking.face(faceIndex).mouth.openness.lt(Reactive.val(closeMaxThres));
    
    mouthOpen.monitor().subscribe(function(flag) {
        if (flag.newValue)
            openCallback();
    });

    mouthClose.monitor().subscribe(function(flag) {
        if (flag.newValue)
            closCallback();
    });
}

function handleFaceTrackingState(faceIndex, trackCallback, untrackCallback) {

    // Check weather the face is tracked
    FaceTracking.face(faceIndex).isTracked.monitor().subscribe(function(e) {
        
        var mouthCenterPoint = [0, 0, 0];
        
        var mouth = FaceTracking.face(faceIndex).mouth;
    
        // Untracked to tracked state
        if (e.newValue) {
    
            // Reset counter
            var counter = 3;
    
            // Show feed effect by face+mouth transform
            var valXSub = mouth.center.x.monitor().subscribe(function(v) {
                mouthCenterPoint[0] = v.newValue;
                valXSub.unsubscribe();
                notifyIfTracked();
            }); 
    
            var valYSub = mouth.center.y.monitor().subscribe(function(v) {
                mouthCenterPoint[1] = v.newValue;
                valYSub.unsubscribe();
                notifyIfTracked();
            });
    
            var valZSub = mouth.center.z.monitor().subscribe(function(v) {
                mouthCenterPoint[2] = v.newValue;
                valZSub.unsubscribe();
                notifyIfTracked();
            });

            function notifyIfTracked() {

                --counter;

                if (counter == 0)
                    trackCallback(mouthCenterPoint);
            }
        }
        // Tracked to untracked state
        else {
            
            untrackCallback();
        }
    }); 
}

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
            axisRotation(0,1,0,minAngle),
            axisRotation(0,1,0,minAngle),

            axisRotation(0,1,0,maxAngle),
            axisRotation(0,1,0,minAngle)
        ],
        knots: [
            0, 1, 2, 3, 4
        ]
    });

    // Start the animation
    var rotation_signal = Animation.animate(time_driver, rotation_sampler);
    
    obj.transform.rotation = rotation_signal;

    time_driver.start();
}

// --------------------------------------------------------------------------------
// SPECIFIC FUNCTIONS
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// Bubble animation

function showBubble(obj, facePoint, xSideWeight, positionY, targetBubbleScale) { 

    const facePointX = facePoint.x.pinLastValue(); 
    const facePointY = facePoint.y.pinLastValue();
    const facePointZ = facePoint.z.pinLastValue();

    obj.hidden = false;

    const showTimeDriverParameters = {

        durationMilliseconds: 200,
        loopCount: 1,
        mirror: false  
    };

    // Range affects scale and position
    var range = Math.sqrt(facePointX*facePointX + facePointY*facePointY + facePointZ*facePointZ);

    // Use this value to select bubble showing side
    var xSideNorm = -1.0 * (facePointX / Math.abs(facePointX));

    var shownBubbleX = range * xSideNorm * xSideWeight;

    // Bind the translation animation signal to the x-axis position signal of the plane
    obj.transform.x = shownBubbleX;
    obj.transform.y = positionY;
    obj.transform.z = 0.0;

    // Create a time driver using the parameters
    const timeDriver = Animation.timeDriver(showTimeDriverParameters);

    // Get scale factors (Linearly positive correlated with absolute Euclidean distance from camera)
    //     Find distance from bubble to camera | Given camera is always be at ( 0, 0, 0 )
    
    var bubbleScale = targetBubbleScale * range;
     
    // Scale animation
    const scaleQuadraticSampler = Animation.samplers.easeInOutQuad(0, bubbleScale);
    const scaleAnimation = Animation.animate(timeDriver, scaleQuadraticSampler);

    obj.transform.scaleX = scaleAnimation;
    obj.transform.scaleZ = scaleAnimation;

    // Start the time driver (unlike value drivers this needs to be done explicitly)
    timeDriver.start();
}

function hideBubble(obj) {

    const hideTimeDriverParameters = {
        durationMilliseconds: 100,
        loopCount: 1,
        mirror: false  
    };

    // Create a time driver using the parameters
    const timeDriver = Animation.timeDriver(hideTimeDriverParameters);

    // Scale with animation
    var curBubbleScale = obj.transform.scaleX.pinLastValue();

    const scaleQuadraticSampler = Animation.samplers.easeInOutQuad(curBubbleScale, 0);
    const scaleAnimation = Animation.animate(timeDriver, scaleQuadraticSampler);

    obj.transform.scaleX = scaleAnimation;
    obj.transform.scaleZ = scaleAnimation;

    // Start the time driver (unlike value drivers this needs to be done explicitly)
    timeDriver.start(); 

    var handler = timeDriver.onAfterIteration().subscribe(function() {

        // Hide current bubble
        obj.hidden = true;

        handler.unsubscribe();
    });
}       

// --------------------------------------------------------------------------------
// Food feeder

function initFoodFeeder(foodObjList, crushObjList, range) {

    // Vars
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
        var yNorm = Math.sin(rad - (Math.PI * 0.6));

        var tmp = [];
        tmp.push(xNorm);
        tmp.push(yNorm);

        crushNormDirList.push(tmp);
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
 
        const txSamp = Animation.samplers.easeInOutQuad(xPointList[index + curSet] * xVariant, 0.0);
        const txAnim = Animation.animate(feedTimeDriver, txSamp);

        const tySamp = Animation.samplers.easeInOutQuad(yPointList[index + curSet] * yVariant, 0.0);
        const tyAnim = Animation.animate(feedTimeDriver, tySamp);

        const tzSamp = Animation.samplers.easeInOutQuad(range, 0.0);
        const tzAnim = Animation.animate(feedTimeDriver, tzSamp);
        
        //Diagnostics.log("obj idx: " + objList[index]);

        if (objList[index] !== undefined) {

            objList[index].transform.x = txAnim;
            objList[index].transform.y = tyAnim;
            objList[index].transform.z = tzAnim;
        }

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

        if (objList[index] !== undefined) {
            objList[index].transform.rotation = qRotSignal;
        }
    }

    function runCrushInterval(objList, index) {

        if (crushNormDirList[index] === undefined)
            return;
        if (crushNormDirList[index][0] === undefined)
            return;
        if (crushNormDirList[index][1] === undefined)
            return;

        // Manipulate crush angle
        const crushInterval = { 
            durationMilliseconds: 300,
            loopCount: Infinity,
            mirror: false  
        };
        var crushTimeDriver = Animation.timeDriver(crushInterval);

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

        objList[index].transform.x = cxAnim;
        objList[index].transform.y = cyAnim;
        objList[index].transform.z = czAnim;

        crushTimeDriver.start();

        if (!(crushTimeDriverList.length > index))
            crushTimeDriverList.push(crushTimeDriver);
        else
            crushTimeDriverList[index] = crushTimeDriver; 
    }

    const timeInMilliseconds = 120;
    const intervalTimer = Time.setInterval(shouldStartFeed, timeInMilliseconds);
    var feedIndex = 0;

    function shouldStartFeed() {

        runFeedInterval(foodObjList, feedIndex++);

        if (feedIndex >= foodObjList.length) {

            Time.clearInterval(intervalTimer);
        }                
    }

    const crushTimeInMilliseconds = 100;
    const crushIntervalTimer = Time.setInterval(shouldStartCrush, crushTimeInMilliseconds);
    var crushIndex = 0;

    function shouldStartCrush() {

        runCrushInterval(crushPoolList, crushIndex++);

        if (crushIndex >= crushPoolList.length) {

            Time.clearInterval(crushIntervalTimer);
        }
    }
}

// --------------------------------------------------------------------------------
// HTTP REQUEST
// --------------------------------------------------------------------------------


// Log mouth openness value

 
//handlePatternModule();

