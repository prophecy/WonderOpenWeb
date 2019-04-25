//Header
//Copyright 20__-present, Facebook, Inc.
//All rights reserved.

//This source code is licensed under the license found in the
//LICENSE file in the root directory of this source tree.

const Scene = require('Scene');
const Reactive = require('Reactive');
const TouchGestures = require('TouchGestures')

var origin = Scene.root.find('origin')
var planeTracker = Scene.root.find('planeTracker0');

/*

TouchGestures.onTap().subscribe(function(gesture) {
	planeTracker.trackPoint(gesture.location);
});

TouchGestures.onPan(planeTracker).subscribe(function(gesture) {
	planeTracker.trackPoint(gesture.location, gesture.state);
});

TouchGestures.onPinch().subscribe(function(gesture) {
	var lastScaleX = origin.transform.scaleX.lastValue;
	origin.transform.scaleX = Reactive.mul(lastScaleX, gesture.scale);

	var lastScaleY = origin.transform.scaleY.lastValue;
	origin.transform.scaleY = Reactive.mul(lastScaleY, gesture.scale);

	var lastScaleZ = origin.transform.scaleZ.lastValue;
	origin.transform.scaleZ = Reactive.mul(lastScaleZ, gesture.scale);
});

TouchGestures.onRotate(origin).subscribe(function(gesture) {
  var lastRotationY = origin.transform.rotationY.lastValue;
  origin.transform.rotationY = Reactive.add(lastRotationY, Reactive.mul(-1, gesture.rotation));
});

*/