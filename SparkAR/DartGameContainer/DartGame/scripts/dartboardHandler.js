//Header
//Copyright 20__-present, Facebook, Inc.
//All rights reserved.

//This source code is licensed under the license found in the
//LICENSE file in the root directory of this source tree.

// Reference:
// https://developers.facebook.com/docs/ar-studio/reference/classes/reactivemodule.rotation/

const Scene = require('Scene');
const Reactive = require('Reactive');
const TouchGestures = require('TouchGestures');
const Animation = require('Animation');
const Diagnostics = require('Diagnostics');
const Materials = require('Materials');
//const Persistence = require('Persistence');
const Networking = require('Networking');

var dartboardRoot = Scene.root.find('dartboardRoot');
var dartboard = Scene.root.find('dartboard')
var planeTracker = Scene.root.find('planeTracker0');
var scoreTxt = Scene.root.find('scoreTxt');

var startStopRect = Scene.root.find('startStopRect');
var startButtonMat = Materials.get('startButtonMat');
var stopButtonMat = Materials.get('stopButtonMat');

// Todo: Replace this with register/login mechanism
const token = 'pbBeI6KxVHoPqdXSRlmOwnWoInguhMza16H432SKr1kS8ZyDNvARY972XAaxqNpLMBPV0IbzVBx1xuugDA6pmcnPFKRyYx9w8glkoxv56MoJJDJ3xVXVH8xP4EBu4L7ybUqMs3YVwklfORtQ4alCctyzNrP6KNj0ghlFwVr8CdmSDWhxvoXhR9CQCOuM8XRW';
//var promise = Persistence.userScope.set('access_token', {data: accessToken});
//promise.then(function(value) {
//	Diagnostics.log(value);
//})

const scoreIndex = [ 20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5 ];
const PI = 3.14159;
const PI_2 = 6.28318;

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// Gesture

TouchGestures.onTap().subscribe(function(gesture) {

	moveDartboardRoot(gesture.location);
});

TouchGestures.onTap(startStopRect).subscribe(function() {
	
	startStopSpinning();
});

TouchGestures.onPinch().subscribe(function(gesture) {

	if (currEnum == StateEnum.IDLE) {

		var lastScaleX = dartboardRoot.transform.scaleX.pinLastValue();
		dartboardRoot.transform.scaleX = Reactive.mul(lastScaleX, gesture.scale);
	
		var lastScaleY = dartboardRoot.transform.scaleY.pinLastValue();
		dartboardRoot.transform.scaleY = Reactive.mul(lastScaleY, gesture.scale);
	
		var lastScaleZ = dartboardRoot.transform.scaleZ.pinLastValue();
		dartboardRoot.transform.scaleZ = Reactive.mul(lastScaleZ, gesture.scale);
	}
});

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// functions on state

// Game vars
var StateEnum = {
	IDLE: 0,
	SPINNING: 1,
	SLOWDOWN: 2,
	STOPPED: 3,
	SUBMITTING: 4,
	SUBMITTED: 5
}

var currEnum = StateEnum.IDLE;

function moveDartboardRoot(location) {

	if (currEnum != StateEnum.IDLE)
		return;

	planeTracker.trackPoint(location);
}

function startStopSpinning() {

	if (currEnum == StateEnum.IDLE)
		startSpinning();
	else if (currEnum == StateEnum.SPINNING)
		stopSpinning();
}

function startSpinning() {

	currEnum = StateEnum.SPINNING;

	// Chnage button mat
	startStopRect.material = stopButtonMat;

	// Start the animation
	var rotation_signal = Animation.animate(time_driver, rotation_sampler);
	time_driver.start();

	dartboard.transform.rotation = rotation_signal;
}

function stopSpinning() {

	currEnum = StateEnum.SLOWDOWN;

	// Todo: Have slow down animation
	spinningStopped();
}

function spinningStopped() {

	currEnum = StateEnum.STOPPED;

	time_driver.stop();

	// Chnage button mat
	startStopRect.material = startButtonMat;

	submitPoint();
}

function submitPoint() {

	currEnum = StateEnum.SUBMITTING;

	// Get poin from dartboard angle
	var rad = dartboard.transform.rotationZ.pinLastValue();
	var sz = PI_2 / 20;
	var offset = (PI / 2) - (sz / 2);
	var index = Math.floor((rad - offset) / sz);
	if (index < 0)
		index = 20 + index;
	var score = scoreIndex[index];

	Diagnostics.log('Score: ' + score);
	scoreTxt.text = 'Score: ' + score;
	
	/*
	// Call this function when submitted
	submitted();
	/*/
	//==============================================================================
	// Create the request
	//==============================================================================

	// Store the URL we're sending the request to
	const url = 'https://powerful-lowlands-46130.herokuapp.com/score';

	Diagnostics.log("token: " + token);

	// Todo: Convert score from string to integer here	
	var bodyObj = {
		token:token,
		score:parseInt(score, 10)
	};

	var bodyStr = JSON.stringify(bodyObj);

	Diagnostics.log("bodyStr: " + bodyStr);

	// Create a request object
	const request = {

		// The HTTP Method of the request
		// (https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
		method: 'POST',

		// The HTTP Headers of the request
		// (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
		headers: {
			'Content-type': 'application/json'
		},

		// The data to send, in string format
		body: bodyStr
		//body: JSON.stringify({title: 'Networking Module'})
	};

	Diagnostics.log("request: " + JSON.stringify(request));

	//==============================================================================
	// Send the request and log the results
	//==============================================================================

	// Send the request to the url
	Networking.fetch(url, request).then(function(result) {

		// Check the status of the result
		// (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
		if ((result.status >= 200) && (result.status < 300)) {

			Diagnostics.log('Submit score success');
			
			// If the request was successful, chain the JSON forward
			return result.json();
		}

		// If the request was not successful, throw an error
		throw new Error('HTTP status code - ' + result.status);

	}).then(function(json) {

		// Log the JSON obtained by the successful request
		Diagnostics.log('Successfully sent - ' + json.title);

		submitted();

	}).catch(function(error) {

		// Log any errors that may have happened with the request
		Diagnostics.log('error.message: ' + error.message);
		Diagnostics.log('error: ' + error);

		SubmitError();
	});
	/**/
}

function SubmitError() {

	// Todo: Should show retry button

	currEnum = StateEnum.IDLE;
}

function submitted() {

	// Todo: Set something in the scene

	currEnum = StateEnum.IDLE;
}

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// Math things

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