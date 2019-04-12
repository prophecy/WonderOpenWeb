//Header
//Copyright 20__-present, Facebook, Inc.
//All rights reserved.

//This source code is licensed under the license found in the
//LICENSE file in the root directory of this source tree.

const Scene = require('Scene');
const Reactive = require('Reactive');
const TouchGestures = require('TouchGestures')

var target_obj = Scene.root.find('bubble_dialogue')
var planeTracker = Scene.root.find('planeTracker0');

TouchGestures.onTap().subscribe(function(gesture) {
	planeTracker.trackPoint(gesture.location);
});

TouchGestures.onPan(planeTracker).subscribe(function(gesture) {
	planeTracker.trackPoint(gesture.location, gesture.state);
});

TouchGestures.onPinch().subscribe(function(gesture) {
	var lastScaleX = target_obj.transform.scaleX.lastValue;
	target_obj.transform.scaleX = Reactive.mul(lastScaleX, gesture.scale);

	var lastScaleY = target_obj.transform.scaleY.lastValue;
	target_obj.transform.scaleY = Reactive.mul(lastScaleY, gesture.scale);

	var lastScaleZ = target_obj.transform.scaleZ.lastValue;
	target_obj.transform.scaleZ = Reactive.mul(lastScaleZ, gesture.scale);
});

TouchGestures.onRotate(target_obj).subscribe(function(gesture) {
  var lastRotationY = target_obj.transform.rotationY.lastValue;
  target_obj.transform.rotationY = Reactive.add(lastRotationY, Reactive.mul(-1, gesture.rotation));
});
