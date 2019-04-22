//Header
//Copyright 20__-present, Facebook, Inc.
//All rights reserved.

//This source code is licensed under the license found in the
//LICENSE file in the root directory of this source tree.

const Scene = require('Scene');
const Reactive = require('Reactive');
const TouchGestures = require('TouchGestures')

var targetObject = Scene.root.find('MedievalFantasyBook')
var planeTracker = Scene.root.find('planeTracker0');

TouchGestures.onTap().subscribe(function(gesture) {
	planeTracker.trackPoint(gesture.location);
});

TouchGestures.onPan(planeTracker).subscribe(function(gesture) {
	planeTracker.trackPoint(gesture.location, gesture.state);
});

TouchGestures.onPinch().subscribe(function(gesture) {
	var lastScaleX = targetObject.transform.scaleX.lastValue;
	targetObject.transform.scaleX = Reactive.mul(lastScaleX, gesture.scale);

	var lastScaleY = targetObject.transform.scaleY.lastValue;
	targetObject.transform.scaleY = Reactive.mul(lastScaleY, gesture.scale);

	var lastScaleZ = targetObject.transform.scaleZ.lastValue;
	targetObject.transform.scaleZ = Reactive.mul(lastScaleZ, gesture.scale);
});

TouchGestures.onRotate(targetObject).subscribe(function(gesture) {
  var lastRotationY = targetObject.transform.rotationY.lastValue;
  targetObject.transform.rotationY = Reactive.add(lastRotationY, Reactive.mul(-1, gesture.rotation));
});
