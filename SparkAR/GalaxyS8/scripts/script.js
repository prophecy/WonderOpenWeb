//Header
//Copyright 20__-present, Facebook, Inc.
//All rights reserved.

//This source code is licensed under the license found in the
//LICENSE file in the root directory of this source tree.

const Scene = require('Scene');
const Reactive = require('Reactive');
const TouchGestures = require('TouchGestures')


var pivot = Scene.root.find('origin')
var planeTracker = Scene.root.find('planeTracker0');

TouchGestures.onTap().subscribe(function(gesture) {
	planeTracker.trackPoint(gesture.location);
});

TouchGestures.onPan(planeTracker).subscribe(function(gesture) {
	planeTracker.trackPoint(gesture.location, gesture.state);
});

TouchGestures.onPinch().subscribe(function(gesture) {
	var lastScaleX = pivot.transform.scaleX.lastValue;
	pivot.transform.scaleX = Reactive.mul(lastScaleX, gesture.scale);

	var lastScaleY = pivot.transform.scaleY.lastValue;
	pivot.transform.scaleY = Reactive.mul(lastScaleY, gesture.scale);

	var lastScaleZ = pivot.transform.scaleZ.lastValue;
	pivot.transform.scaleZ = Reactive.mul(lastScaleZ, gesture.scale);
});

TouchGestures.onRotate(pivot).subscribe(function(gesture) {
  var lastRotationY = pivot.transform.rotationY.lastValue;
  pivot.transform.rotationY = Reactive.add(lastRotationY, Reactive.mul(-1, gesture.rotation));
});
