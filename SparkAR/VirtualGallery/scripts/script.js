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

//* // PROD
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
const displayImg = Scene.root.find("displayImage");
const displayImgModel = Scene.root.find("displayImageModel");

Patches.setBooleanValue("isShowDisplayImage", false);
Patches.setBooleanValue("isShowSampleCanvas", true);

for (var i=0; i<14; ++i) {

	var imageName = undefined;
	var imageMatName = undefined;

	imageName = "image_" + i;
	imageMatName = "imageMat" + i;

	const testObj = Scene.root.find(imageName); 
	TouchGestures.onTap(testObj).subscribe(function(gesture) {
	
		// Show display image
		Patches.setBooleanValue("isShowDisplayImage", true);
	
		// Apply material
		const material = Materials.get(imageMatName);
		displayImgModel.material = material;
	});
}

TouchGestures.onTap(displayImg).subscribe(function(gesture) {

	Patches.setBooleanValue("isShowDisplayImage", false);
});