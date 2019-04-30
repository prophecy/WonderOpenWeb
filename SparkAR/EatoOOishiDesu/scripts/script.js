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
const Diagnostics = require('Diagnostics');
const FaceTracking = require('FaceTracking');
const Reactive = require('Reactive');

// Log mouth openness value
Diagnostics.watch("Mouth Openness - ", FaceTracking.face(0).mouth.openness);

// Handle mouth opennes
const MOUTH_OPENNESS_MIN_THRESHOLD = 0.1;

var mouthOpen = FaceTracking.face(0).mouth.openness.gt(Reactive.val(MOUTH_OPENNESS_MIN_THRESHOLD));

mouthOpen.monitor().subscribe(function() {

    if (FaceTracking.face(0).mouth.openness.pinLastValue() >= MOUTH_OPENNESS_MIN_THRESHOLD) {
    
        Diagnostics.log("Rawww!");
    }
})