//Header
//Copyright 20__-present, Facebook, Inc.
//All rights reserved.

//This source code is licensed under the license found in the
//LICENSE file in the root directory of this source tree.

// Reference:
// https://developers.facebook.com/docs/ar-studio/reference/classes/reactivemodule.rotation/

const Scene = require('Scene');
const Reactive = require('Reactive');
const TouchGestures = require('TouchGestures')
const RawTouchGesture = require('RawTouchGesture')
const Animation = require('Animation');
const Diagnostics = require('Diagnostics')

var dartboard = Scene.root.find('dartboard')
var planeTracker = Scene.root.find('planeTracker0');

// Game vars
var StateEnum = {
	IDLE: 0,
	SPINNING: 1,
	SLOWDOWN: 2,
	RESULT: 3,
}

var currEnum = StateEnum.IDLE;

TouchGestures.onTap().subscribe(function(gesture) {

	if (currEnum == StateEnum.IDLE) {

		// Move track point in front of the camera
		planeTracker.trackPoint(gesture.location);
		
		startSpinning();
	}
});

function startSpinning() {

	currEnum = StateEnum.SPINNING;

	// Start the animation
	var rotation_signal = Animation.animate(time_driver, rotation_sampler);
	time_driver.start();

	dartboard.transform.rotation = rotation_signal;
}

TouchGestures.onPinch().subscribe(function(gesture) {

	if (currEnum == StateEnum.IDLE) {

		var lastScaleX = dartboard.transform.scaleX.lastValue;
		dartboard.transform.scaleX = Reactive.mul(lastScaleX, gesture.scale);
	
		var lastScaleY = dartboard.transform.scaleY.lastValue;
		dartboard.transform.scaleY = Reactive.mul(lastScaleY, gesture.scale);
	
		var lastScaleZ = dartboard.transform.scaleZ.lastValue;
		dartboard.transform.scaleZ = Reactive.mul(lastScaleZ, gesture.scale);
	}
});

// Construct a Rotation object from a quaternion-based values.
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

var time_driver = Animation.timeDriver({
    durationMilliseconds: 2000,
    loopCount: Infinity
});

// Create a rotation sampler using Rotation objects generated
// by the previously-defined axisRotation() method.
var rotation_sampler = Animation.samplers.polyline({
    keyframes: [
		axisRotation(1,0,0,0),
		axisRotation(0,0,1,90),
		axisRotation(0,0,1,180),
		axisRotation(0,0,1,270),
		axisRotation(0,0,1,356)
    ],
    knots: [
		0, 2, 4, 6, 8
    ]
});