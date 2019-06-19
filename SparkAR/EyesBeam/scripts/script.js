const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const FaceTracking = require('FaceTracking');
const Reactive = require('Reactive');
const Patches = require('Patches');
const Animation = require('Animation');
const Time = require('Time');
const Networking = require('Networking');
const Materials = require('Materials');
const Textures = require('Textures');
const TouchGestures = require('TouchGestures');
const CameraInfo = require('CameraInfo');

const FaceGestures = require('FaceGestures');
const IrisTracking = require("IrisTracking");

const laserBeamLeft = Scene.root.find("laser_beam_left");
const laserBeamLeftMesh = Scene.root.find("laser_beam_left_mesh");

const laserBeamRight = Scene.root.find("laser_beam_right");
const laserBeamRightMesh = Scene.root.find("laser_beam_right_mesh");

function init() {

    laserBeamLeft.hidden = true;
    laserBeamRight.hidden = true;

    handleFaceTrackingState(0, function() { onFaceTracked(0); }, function() { onFaceUntracked(0); });

    handleEyeOpeningState(0, 0, function() { onEyeOpened(0, 0); }, function() { onEyeClosed(0, 0); });
    handleEyeOpeningState(0, 1, function() { onEyeOpened(0, 1); }, function() { onEyeClosed(0, 1); });    
}

function onFaceTracked(faceIndex) {

    if (faceIndex != 0)
        return;

    Diagnostics.log("On face #0 tracked.");
}

function onFaceUntracked(faceIndex) {

    if (faceIndex != 0)
        return;

    Diagnostics.log("On face #0 untracked.");
}


function onEyeOpened(faceIndex, eyeIndex) {

    Diagnostics.log("On eye open! eyeIndex: " + eyeIndex);

    var face = FaceTracking.face(faceIndex);

    if (eyeIndex == 0) {

        laserBeamLeft.hidden = false;

        // Iris ref
        // https://developers.facebook.com/docs/ar-studio/tracking-people-and-places/faces/Iris-tracking/
        var eyeballInfo = IrisTracking.leftEyeball(face);

        laserBeamLeft.transform.position = eyeballInfo.iris;
        //laserBeamLeft.transform.rotation = eyeballInfo.rotation;
    }
    else if (eyeIndex == 1) {

        laserBeamRight.hidden = false;

        var eyeballInfo = IrisTracking.rightEyeball(face);

        laserBeamRight.transform.position = eyeballInfo.iris;
        //laserBeamRight.transform.rotation = eyeballInfo.rotation;
    }
}

function onEyeClosed(faceIndex, eyeIndex) {

    Diagnostics.log("On eye close! eyeIndex: " + eyeIndex);

    if (eyeIndex == 0)
        laserBeamLeft.hidden = true;
    else if (eyeIndex == 1)
        laserBeamRight.hidden = true;
}

// [2019.06.13] Fixed face not show on iOS
//     This is about Facebook AR platform implementation problem occuring when user's face is tracked before finish loading.
//        Then cause mismatch state
var isFaceTracked = [ false, false ];

function checkTrackedStateWithDelay(faceIndex, trackCallback, untrackCallback) {

    const interval = Time.setInterval(checkTrackedState, 400);

    function checkTrackedState() {

        var state = FaceTracking.face(faceIndex).isTracked.pinLastValue();

        if (state != isFaceTracked[faceIndex]) {

            if (state == true)
                trackCallback();
            else
                untrackCallback();

            Time.clearInterval(interval);
        }
    }
}

function handleFaceTrackingState(faceIndex, trackCallback, untrackCallback) {

    checkTrackedStateWithDelay(faceIndex, trackCallback, untrackCallback);

    // Monitor tracking state
    FaceTracking.face(faceIndex).isTracked.monitor().subscribe(function(e) {

        if (isFaceTracked[faceIndex] != e.newValue) {

            isFaceTracked[faceIndex] = e.newValue;
        
            if (e.newValue)
                trackCallback();
            else
                untrackCallback();
        }
    }); 
}

// Check eye closing/opening and blink from
// Reference: https://developers.facebook.com/docs/ar-studio/reference/classes/facegesturesmodule/
function handleEyeOpeningState(faceIndex, eyeIndex, openCallback, closeCallback) {

    var face = FaceTracking.face(faceIndex);

    var hasEyeClosed = undefined;

    // Get from closeness callback
    if (eyeIndex == 0)
        hasEyeClosed = FaceGestures.hasLeftEyeClosed(face);
    else if (eyeIndex == 1)
        hasEyeClosed = FaceGestures.hasRightEyeClosed(face);

    // Monitor from closeness callback
    hasEyeClosed.monitor().subscribe(function(val) {

        if (val.newValue == true)
            closeCallback(faceIndex, eyeIndex);
        else
            openCallback(faceIndex, eyeIndex);
    });
}

init();