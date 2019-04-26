//Header
//Copyright 20__-present, Facebook, Inc.
//All rights reserved.

//This source code is licensed under the license found in the
//LICENSE file in the root directory of this source tree.

const Scene = require('Scene');
const Reactive = require('Reactive');
const TouchGestures = require('TouchGestures')
const Diagnostics = require('Diagnostics');
var Patches = require('Patches');
const Time = require('Time');
const Materials = require('Materials');

var origin = Scene.root.find('origin')
var planeTracker = Scene.root.find('planeTracker0');

var confidenceSub = planeTracker.confidence.monitor().subscribe(function (e) {

	Diagnostics.log("e.newValue: " + e.newValue);

	if (e.newValue == 'HIGH' || e.newValue == 'MEDIUM' || e.newValue == 'LOW') {
		confidenceSub.unsubscribe();

		Diagnostics.log("Object tracking ready!");

		// Open scene manually
		startScene();
	}
});

/* // PROD
Patches.setBooleanValue("isSceneStarted", false);
Patches.setBooleanValue("isShowLoadingUI", true);
/*/ // DBG
Patches.setBooleanValue("isSceneStarted", true);
Patches.setBooleanValue("isShowLoadingUI", false);
/**/

function startScene() {

	Diagnostics.log("startScene");

	const timeInMilliseconds = 500;
	const timeoutTimer = Time.setTimeout(realStartScene, timeInMilliseconds);

	function realStartScene() {
		
		Diagnostics.log("real start scene");

		Patches.setBooleanValue("isSceneStarted", true);
		Patches.setBooleanValue("isShowLoadingUI", false);
	}
}

// Test move obj on tapping point
const testObj = Scene.root.find("square_plane99");
const displayImg = Scene.root.find("displayImage");
const displayImgModel = Scene.root.find("displayImageModel");

Patches.setBooleanValue("isShowDisplayImage", false);
Patches.setBooleanValue("isShowSampleCanvas", true);
TouchGestures.onTap(testObj).subscribe(function(gesture) {

	// Show display image
	Patches.setBooleanValue("isShowDisplayImage", true);

	// Apply material
	const material = Materials.get("imageMat3");
	displayImgModel.material = material;
});

TouchGestures.onTap(displayImg).subscribe(function(gesture) {

	Patches.setBooleanValue("isShowDisplayImage", false);
});

/*
TouchGestures.onTap().subscribe(function(gesture) {
	planeTracker.trackPoint(gesture.location);
});

TouchGestures.onPan(planeTracker).subscribe(function(gesture) {
	planeTracker.trackPoint(gesture.location, gesture.state);
});

TouchGestures.onPinch().subscribe(function(gesture) {
	var lastScaleX = origin.transform.scaleX.pinLastValue();
	origin.transform.scaleX = Reactive.mul(lastScaleX, gesture.scale);

	var lastScaleY = origin.transform.scaleY.pinLastValue();
	origin.transform.scaleY = Reactive.mul(lastScaleY, gesture.scale);

	var lastScaleZ = origin.transform.scaleZ.pinLastValue();
	origin.transform.scaleZ = Reactive.mul(lastScaleZ, gesture.scale);
});

TouchGestures.onRotate(origin).subscribe(function(gesture) {
  var lastRotationY = origin.transform.rotationY.pinLastValue();
  origin.transform.rotationY = Reactive.add(lastRotationY, Reactive.mul(-1, gesture.rotation));
});

/**/